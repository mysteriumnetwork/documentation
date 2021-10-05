---
title: dVPN Desktop Client Tutorial
description: Simple tutorial to show how you can build your own dVPN desktop client based on Electron + React
---

![Mysterium Network dVPN tutorial application](https://github.com/mysteriumnetwork/dvpn-desktop-tutorial/raw/main/docs/demo.png)

# To run
1. `git clone git@github.com:mysteriumnetwork/tequilapi-webapp-tutorial.git`
2. `yarn install`
3. `yarn dev` - to see how it looks like 

# Making client application.

Hello friends, in this tutorial we will show how to build the simplest desktop dVPN application based on the Electron framework and will cover the main parts of the dVPN client, to give you an understanding of how they interact.

For those who want's to go straight to the code,  [here is a link](https://github.com/mysteriumnetwork/dvpn-desktop-tutorial)

**What we will use:**

- NodeJs: >=v16.9.1
- npm: >=7.21.1
- yarn: >= 1.22.5
- Electron: >= 14.0.1
- Typescript: >= 4.4.3
- webpack: == 4.46.0 _// we can't use Webpack 5, because of limitation in electron-webpack_
- electron-webpack: >= 2.8.2
- React: >= 17.0.2
- @mysteriumnetwork/node: > 0.64.0 _// Client Mysterium Node_
- mysterium-vpn-js: > 15.1.0 _// Tequila API client_
- electron-builder: > 22.11.7

## How is client application work

![Client-Spuervisor-Node-WireGuard](https://github.com/mysteriumnetwork/dvpn-desktop-tutorial/raw/main/docs/scheme.png)

**Every client application consist of these four parts:**

- **Application** - your client application
- **Mysterium Node** - client node to interact with Mysterium Network
- **Supervisor** - service used to move out from Node any services that need escalation of privileges and also used to control them. Supervisor used only for client applications.
- **Wireguard** - VPN tunnel

**Typical application startup:**

1. Start the Node.
2. Install & Start Supervisor service(if it has not been installed yet).
3. Setup connection to the Node Tequila API through the localhost.
4. Setup connection to the Supervisor through the socket.
5. Do some application logic...

Each Mysterium client Node is running Tequila API on `localhost:44050` which is used for communication and control. To interact with this API we will use the package `mysterium-vpn-js`. You can see docs for API by opening [localhost:44050/docs](http://localhost:44050/docs) in your browser(when Node working) and by visiting [mysterium-vpn-js client](https://github.com/mysteriumnetwork/mysterium-vpn-js/blob/master/src/tequilapi-client.ts)
## Let's build some simple Electron App

Clone our demo repository to your local machine

1. `git clone git@github.com:mysteriumnetwork/tequilapi-webapp-tutorial.git`
2. `yarn install`
3. `yarn dev` - to see how it looks like

### Structure & main modules

Usually, people are building react app with the use of `create-react-app` tool which separates Source code from Electron.
But this approach has some negative consequences if we want that all our code to be written on TypeScript.
That's why we will be using `webkit` & `electron-webkit` wrapper.

From this point our project structure will look like this:

```
|static             // static files
|---bin             // place where bin from @mysteriumnetwork/node will be copied
|src                // our code
|---electron        // electron part with main process
|---|---node        // IPC Host code
|---renderer        // app part
|---|---api         // api methods to work with Tequila API
|---|---components  // UI components
|---shared          // shared code, libraries, utils
|---|---ipc         // IPC clients
```

In `electronWebpack` part of `package.json` we set location of our app parts like electron and app, also adding webpack config for renderer process.

We use `postinstall` directive to copy Node binaries to our static folder so we could get access to them later from the application.

```js
  "scripts": {
    "postinstall": "shx rm -rf static/bin && shx mkdir -p static/bin && shx cp -r node_modules/@mysteriumnetwork/node/bin/* static/bin",
    "dev": "electron-webpack dev",
    "clean": "shx rm -rf dist",
    "build": "electron-webpack",
    "bundle": "yarn build && electron-builder"
  },
  "electronWebpack": {
    "main": {
      "sourceDirectory": "src/electron"
    },
    "renderer": {
      "sourceDirectory": "src/renderer",
      "template": "src/renderer/index.html",
      "webpackConfig": "webpack.renderer.additions.js"
    }
  },
```

### Setting up Electron

The first entry point of our application is `src/electron/main.ts` which will run our Electron.
To create an Electron window we use:

```js
const win = new BrowserWindow({
  width: 650,
  height: 600,
  title: "Mysterium dVPN Tutorial",
  resizable: false,
  show: true,
  frame: true,
  backgroundColor: "#282c34",
  webPreferences: {
    webSecurity:false,            // We need to disable CORS check to be able to connect to Tequila API
    nodeIntegration: true,        // We can use Node.js in renderer process
    experimentalFeatures: true,
    nativeWindowOpen: true,
    contextIsolation: false,      // We can use Electron context in renderer process, so no need for contextBridge
  },
});

if (isDev) {
  win.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
} else {
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}
```

Besides typical stuff, we need to setup IPC channels for our Node and Supervisor. And stop Node and disconnect from Supervisor before quit

```js
  app.on("ready", async () => {
    mainWindow = await createWindow();
    supervisor.registerIPC()
    mysteriumNode.registerIPC(getMainWindow)
  });

  ....

  app.on("before-quit", async () => {
    await mysteriumNode.stop();
    await supervisor.disconnect();
  });
```

### Mysterium Node & Supervisor

In the `src/electron/node/` we have `mysteriumNode.ts` and `supervisor.ts`. This is our IPC listeners that runs in the Electron thread, and which will give our App the possibility to run Node and Supervisor. We need this because our renderer process with our app has no access to the system, but the electron process has.

We will communicate with them using IPC clients in `src/shared/ipc` folder.

In `mysteriumNode.ts` we have 3 IPC methods: start, stop and kill. If you need Import/Export identity methods you can find them [here](https://github.com/mysteriumnetwork/mysterium-vpn-desktop/blob/master/src/main/node/mysteriumNode.ts).

```js
 const mystBin = (): string => {
     let mystBinaryName = "bin/myst"
     if (platform() === "win32") {
         mystBinaryName += ".exe"
     }
     return staticAssetPath(mystBinaryName)
 }
 export class MysteriumNode {
     port?: number
     proc?: ChildProcess

     registerIPC(getMainWindow: () => BrowserWindow | null): void {
         ipcMain.handle(MainIpcListenChannels.StartNode, () => {
             return this.start()
         })
         ipcMain.handle(MainIpcListenChannels.StopNode, () => {
             return this.stop()
         })
         ipcMain.handle(MainIpcListenChannels.KillGhosts, async () => {
             if (!isDev) {
                 await Promise.all([this.killGhost(4050), this.killGhost(44050)])
             }
         })
     }

     // Myst process is not started from supervisor as supervisor runs as root user
     // which complicates starting myst process as non root user.
     start(port = TEQUILAPI_PORT): Promise<void> {
         this.port = port
         const mystProcess = spawnProcess(
             mystBin(),
             [
                 "--ui.enable=false",
                 "--usermode",
                 "--consumer",
                 `--tequilapi.port=${port}`,
                 "--discovery.type=api",
                 "daemon",
             ],
             {
                 stdio: "ignore", // Needed for unref to work correctly.
             },
         )

         mystProcess.stdout?.on("data", (d) => {
             log.info(d)
         })

         this.proc = mystProcess

         mystProcess.on("close", (code) => {
             log.info(`myst process exited with code ${code}`)
         })

         return Promise.resolve()
     }

     // Used to kill old processes before start a new one
     async killGhost(port: number): Promise<void> {
         const api = new TequilapiClientFactory(`http://127.0.0.1:${port}`, 3_000).build()
         let hc: NodeHealthcheck | undefined
         try {
             hc = await api.healthCheck(100)
         } catch (err) {
             log.info("No ghosts found on port", port)
         }
         if (!hc?.process) {
             return
         }
         log.info("Found a ghost node on port", port, "PID", hc.process)
         log.info("Attempting to shutdown gracefully")
         try {
             await api.stop()
             return
         } catch (err) {
             log.error("Could not stop node on port " + port +": "+err)
         }
         log.info("Attempting to kill process", hc.process)
         try {
             process.kill(hc.process)
         } catch (err) {
             log.error("Could not kill process PID " + hc.process +": "+err)
         }
     }

     async stop(): Promise<void> {
         log.info("Stopping myst")
         if (this.port) {
             log.info("Shutting down node gracefully on port", this.port)
             const api = new TequilapiClientFactory(`http://127.0.0.1:${this.port}`, 3_000).build()
             try {
                 await api.stop()
                 return
             } catch (err) {
                 log.error("Could not shutdown Mysterium node gracefully: "+err)
             }
         }
         if (this.proc) {
             log.info("Killing node process", this.proc.pid)
             try {
                 this.proc.kill()
             } catch (err) {
                 log.error("Could not kill node process: "+err)
             }
         }
     }
 }

 export const mysteriumNode = new MysteriumNode()
```

In `supervisor.ts` we have 4 IPC methods: install, upgrade, connect, disconnect. During Supervisor installation user will need to enter Admin password as it will be run with system privileges.

```js
function mystSockPath(): string {
     if (isWin) {
         return "\\\\.\\pipe\\mystpipe"
     }
     return "/var/run/myst.sock"
 }

 const supervisorBin = (): string => {
     let supervisorBinaryName = "bin/myst_supervisor"
     if (isWin) {
         supervisorBinaryName += ".exe"
     }
     return staticAssetPath(supervisorBinaryName)
 }

 export class Supervisor {
     conn?: Socket

     registerIPC(): void {
         ipcMain.handle(MainIpcListenChannels.SupervisorConnect, () => this.connect())
         ipcMain.handle(MainIpcListenChannels.SupervisorInstall, () => this.install())
         ipcMain.handle(MainIpcListenChannels.SupervisorUpgrade, () => this.upgrade())
         ipcMain.handle(MainIpcListenChannels.SupervisorDisconnect, () => this.disconnect())
     }

     async connect(): Promise<void> {
         log.info("Connecting to the supervisor...")
         const mystSock = mystSockPath()
         return await new Promise((resolve, reject) => {
             this.conn = net
                 .createConnection(mystSock)
                 .on("connect", () => {
                     log.info("Connected to: ", mystSock)
                     return resolve()
                 })
                 .on("data", (data: Buffer) => {
                     log.info("Server:", data.toString())
                 })
                 .on("error", function (data) {
                     return reject(data)
                 })
         })
     }

     //.....

     async upgrade(): Promise<void> {
         const bundledVersion = packageJson.dependencies["@mysteriumnetwork/node"]

         let runningVersion = ""
         try {
             runningVersion = await this.runningVersion()
         } catch (err) {
             log.error("Error checking running version", err)
         }

         log.info("Supervisor version bundled:", bundledVersion, "running:", runningVersion)

         if (runningVersion == bundledVersion) {
             log.info("Running supervisor version matches, skipping the upgrade")
             return
         }
         if (!semver.valid(runningVersion) || !semver.valid(bundledVersion)) {
             log.info("Exotic versions of supervisor found, proceeding to upgrade")
         } else if (semver.gte(runningVersion, bundledVersion)) {
             log.info("Running supervisor version is compatible, skipping the upgrade")
             return
         }
         log.info(`Upgrading supervisor ${runningVersion} → ${bundledVersion}`)
         await supervisor.install()
     }
     /**
      * Installing supervisor as system service
      **/
     async install(): Promise<void> {
         return await new Promise((resolve) => {
             sudoExec(`"${supervisorBin()}" -install -uid ${uid()}`)
             const waitUntilConnected = (): void => {
                 this.connect()
                     .then(() => resolve())
                     .catch(() => setTimeout(waitUntilConnected, 500))
             }
             setTimeout(waitUntilConnected, 500)
         })Mysterium Network
     }

     disconnect(): void {
         if (this.conn) {
             this.conn.destroy()
         }
     }
 }

 export const supervisor = new Supervisor()
```

### Main App

Our application is very simple and consists of a few views components and API to work with Node Tequila API.

Let's discuss the process of interaction with Node and creating VPN tunnel with some exit nodes:

1. We need to create an identity, which looks something like this `0x142362c0a179da288903f21adcba24686c01e654` and which is basically user id in Mysterium Network
2. To use identity we need to unlock it(with a password) and register in the Registry service of Mysterium Network.
3. Get a list of proposals using some filtration by country, connection type, price, speed, etc. The proposal is information about the provider(exit node) to which you are able to connect.
4. Connect to one of the providers and all traffic will be routed through him.
5. Disconnect from the provider to stop route traffic through him.

We will not be using any redux, mobx, etc. Instead, we will store state in the `api.ts` to make the app simpler.

```js
let tequilapi = new TequilapiClientFactory(
  `http://127.0.0.1:44050`,
  100000 // 100sec timeout. Some requests could take a while
).build();

type StateInterface = {
  currentIdentity: string,
  connectionInfo: ConnectionInfo | undefined,
  identities: IdentityRef[],
  loaded: boolean,
  connectionSucces: CallableFunction,
};

export var State: StateInterface = {
  currentIdentity: "",
  connectionInfo: undefined,
  identities: [],
  loaded: false,
  connectionSucces: () => {},
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getIdentity(
  id: string,
  password: string,
  create?: boolean
): Promise<any> {
  let consumerId = "";
  if (create) {
    let res = await tequilapi.identityCreate(password);
    await tequilapi.identityUnlock(res.id, password);
    await tequilapi.identityRegister(res.id);
    consumerId = res.id;
    State.identities.push(res);
  } else {
    consumerId = id;
    await tequilapi.identityUnlock(consumerId, password);
  }

  log.info("Got unclocked consumer identity");
  State.currentIdentity = consumerId;
}

export async function Startup() {
  try {
    await supervisorIPC.connect();
  } catch (err) {
    log.info("Failed to connect to the supervisor, installing", err);
    await supervisorIPC.install();
    await supervisorIPC.connect();
  }
  await nodeIPC.killGhosts();
  await nodeIPC.start();
  while (true) {
    try {
      await tequilapi.connectionStatus();
      break;
    } catch {
      await sleep(500);
    }
  }

  log.info("Node & Supervisor started");
}

export async function Register(res: IdentityResponse) {
  await getIdentity(res.id, res.password, res.create);
}

export async function Disconnect(): Promise<any> {
  let status = await tequilapi.connectionStatus();
  if (status.status == "Connected") {
    await tequilapi.connectionCancel();
    State.connectionInfo = undefined;
    log.info(`Disconnected from ${status.proposal?.providerId}`);
  }
}

export async function Preload(): Promise<boolean> {
  State.identities = await tequilapi.identityList();
  let status = await tequilapi.connectionStatus();
  State.loaded = true;
  if (status.status == "Connected") {
    State.connectionInfo = status;
    State.currentIdentity = status.consumerId || "";
    return true;
  } else {
    return false;
  }
}

export async function Back(): Promise<any> {
  await Disconnect();
  State.currentIdentity = "";
  State.connectionInfo = undefined;
}

export async function ConnectRandom(consumerId: string): Promise<any> {
  try {
    let status = await tequilapi.connectionStatus();
    if (status.status == "Connected") {
      await tequilapi.connectionCancel();
    }
    let proposal = {
      // There are different types of NAT networks for home internet. Some of them cant work with each other.
      natCompatibility: "auto",
      // openvpn and noop used only for testing
      serviceType: "wireguard",
    };
    let proposals = await tequilapi.findProposals(proposal);
    let num = Math.round(Math.random() * proposals.length);
    let prop = proposals[num];
    let request = {
      consumerId: consumerId,
      providerId: prop.providerId,
      serviceType: prop.serviceType,
    };
    let res = await tequilapi.connectionCreate(request);
    if (res.status == "Connected") {
      State.connectionInfo = res;
      State.connectionSucces();
      log.info(`Connected to ${res.proposal?.providerId}`);
    }
  } catch {
    State.connectionSucces();
  }
}
```

We use steps here instead of a router to just update the App view on State update in the API. On startup, we calling `Startup()` and `Preload()` to start the Node and the Supervisor and preload identities list with current connection status(if we reload the app during work)

After that, all pretty simple -> User select identity(or create new), unlock it, and connect to random Node.

```js
import {
  State,
  Startup,
  Preload,
  ConnectRandom,
  Register,
  Disconnect,
  Back,
} from "./api";

function App() {
  // using state just to refresh App cpmponent
  const [step, setStep] = useState("");

  // running once on App init
  useEffect(() => {
    async function run() {
      await Startup();
      let res = await Preload();
      if (res) {
        setStep("connectionInfo");
      } else {
        setStep("select");
      }
      State.connectionSucces = () => {
        setStep("connectionInfo");
      };
    }
    run();
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="dashboard">
        {!State.currentIdentity && !State.loaded && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        )}
        {!State.currentIdentity && State.loaded && (
          <Identity
            identities={State.identities}
            onSubmit={async (res: IdentityResponse) => {
              await Register(res);
              setStep("connectionMake");
            }}
          />
        )}
        {State.currentIdentity && (
          <Connection
            connect={async () => {
              setStep("Connection");
              ConnectRandom(State.currentIdentity);
            }}
            disconnect={async () => {
              await Disconnect();
              setStep("connectionMake");
            }}
            back={async () => {
              await Back();
              setStep("select");
            }}
            connection={State.connectionInfo}
            connecting={step == "Connection"}
          />
        )}
      </div>
    </div>
  );
}

export default App;
```

## Summarise

As you can see building dVPN application for Mysterium Network is simple enough. Just a few files for Node and Supervisor integration, Tequila API to control the Node and that's all.