---
title: Node Management with TequilAPI Tutorial
description: Creating a simple web app that shows us how to use TequilAPI
---

In this tutorial, we are going to make a web app that allows us to manage and view the stats of multiple nodes. We will use the [mysterium-vpn-js](https://github.com/mysteriumnetwork/mysterium-vpn-js) npm package to interact with our nodes and manage them.

For those who'd like to skip directly to the code, [here is a link](https://github.com/Guillembonet/tequilapi-webapp-tutorial)

Our web app will consist of 2 parts:
- A React application
- A web proxy

We need to use a web proxy due to CORS limitations. In future, if we can set the CORS origin whitelist within our nodes, we will no longer need it. These limitations are set for security reasons.

To follow this tutorial you first need to meet some requirements:
- Node.js >= 14.0
- npm
- yarn
- Mysterium node port 4449 forwarded in your router

Let's start by building the proxy, as it provides a base for our web app. We are going to use node.js with typescript to develop it.

## Proxy creation

1. Create a new directory called `proxy` where we will place the proxy code.

2. Run `yarn init` inside the proxy directory to start a new project. You can use the default values.

3. Install dependencies using `yarn add @types/node typescript` and `yarn add -D ts-node`.

4. Create the `tsconfig` file using `yarn tsc --init`.

5. Create an `index.ts` file.

6. Now let's add some code! We can use default libraries. To create a proxy we will need a server that listens to the requests and forwards them, and then forwards the reply back to us with the correct CORS headers. To create the server we type:

```ts
import { createServer, IncomingMessage, request, ServerResponse } from 'http';

createServer(onRequest).listen(5000);

function onRequest(req: IncomingMessage, res: ServerResponse) {
  
}

```

7. Then we need to transform our target URL into the correct format. We can call the API using this URL format: `http://localhost:5000/proxy/<ip>/<port>/tequilapi/<path>` and the proxy will transform it to `http://<ip>:<port>/tequilapi/<path>`. To do this transformation we can use the following code:

```ts
  let url = req.url?.split('/')
  //validity checks
  if (url!.length < 6) {
    res.write('url path too short');
    res.end();
    return
  }
  
  let target_ip = url![2]
  let target_port = url![3]
  let target_path = '/' + url!.slice(4).join('/')
```
We could add more validity checks to make sure that the URL we are getting is correct, but for now, we'll keep it simple.

8. We now want to forward the request to our node, and then forward the response back as our API response while modifying some headers to avoid the CORS issues. To do this, we can use this code:

```ts
  let cors_headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
    'Content-Type': '*/*',
    'Access-Control-Allow-Headers': '*'
  };

  var options = {
    hostname: target_ip,
    port: target_port,
    path: target_path,
    method: req.method,
    headers: req.headers
  };
  
  var proxy = request(options, function (target_res: IncomingMessage) {
    res.writeHead(target_res.statusCode!, cors_headers);
    target_res.pipe(res, {
      end: true
    });
  });

  req.pipe(proxy, {
    end: true
  });
```

9. We should also add some code to handle request errors. This way, if the address we are given doesn't work, it will notify as an API response instead of crashing:

```ts
  proxy.on('error', function(err) {
    console.log("Request failed")
    res.writeHead(500, cors_headers);
    res.write("Request to node failed")
    res.end()
  });
```

10. Finally, we need to answer the CORS preflight requests. A CORS preflight request is a CORS request that checks to see if the CORS protocol is understood and a server is aware of using specific methods and headers.  
 For example, the client might be asking a server if it would allow a DELETE request before actually sending one, by using a preflight request. You can learn more about them using this [link](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request).  
 To answer the client that everything is OK, we can use this code at the start of the onRequest function:

```ts
  if (req.method === 'OPTIONS') {
    // Pre-flight request. Reply successfully:
    res.writeHead(200, cors_headers);
    res.end();
    return;
  }
```

We completed our proxy! You can run it by using `yarn ts-node ./index.ts` or by adding this:

```json
"scripts": {
  "build": "tsc",
  "start": "node ./index.js",
  "dev": "ts-node ./index.ts"
}
```
to the root of `package.json` and using `yarn dev`.

## Web app creation

1. Let's start by going to the root of our project and running the create-react-app utility with the typescript option using `npx create-react-app --template typescript frontend`. This will create a new react project called "frontend".

2. Now, to install our dependencies we will use:
 - `yarn add mysterium-vpn-js`: to install the mysterium-vpn-js npm package
 - `yarn add @material-ui/core`: for style, so our web app is not ugly.
 - `yarn add @material-ui/icons`: for the refresh, start, and stop icons.

3. This very simple web app will allow us to add nodes, view some stats and be able to turn the Wireguard service on and off. To achieve this, we will modify the `App.tsx` file. We can start creating some variables to store our data. First, we will create a list of all our nodes addresses, a map to store the data of each node, and some helper functions to manipulate them:

```ts
  const [nodes, setNodes] = useState<Map<string,nodeData>>(new Map())
  const [nodesKeys, setNodesKeys] = useState<string[]>([])
  const updateNode = (k: string, v: nodeData) => {
    setNodes(new Map(nodes.set(k,v)));
  }
  const removeNode = (k: string) => {
    nodes.delete(k)
    setNodes(new Map(nodes));
    setNodesKeys((oldArray) => oldArray.filter(x => x != k))
  }
```

4. Let's also create some state variables for our inputs of IP, port, and password, which is the data we need to connect to our nodes. Then we can also add text fields in our HTML code for modifying the variables, as well as a button to trigger the addition of the node:

```ts
  const [ipField, setIpField] = useState('')
  const [portField, setPortField] = useState('')
  const [passwordField, setPasswordField] = useState('')
```
```html
  <Box display="flex" flexDirection="column" alignItems="center">
    <TextField type="text" label="IP" value={ipField} onChange={(event) => setIpField(event.target.value)}></TextField>
    <TextField type="number" label="Port" value={portField} onChange={(event) => setPortField(event.target.value)} style={{marginTop: '0.5em'}}></TextField>
    <TextField type="password" label="Password" value={passwordField} onChange={(event) => setPasswordField(event.target.value)} style={{marginTop: '0.5em'}}></TextField>
    <Button variant="contained" color="primary" onClick={() => addOrUpdateNode(ipField, portField, passwordField)} style={{marginTop: '2em'}}>Add Node</Button>
  </Box>
```

5. For a nice autocomplete experience, we can create a return type for the node data. This is all the data we will save in our nodes Map created in Step 3:

```ts
interface nodeData {
  token: string,
  api: TequilapiClient,
  health: NodeHealthcheck,
  stats: SessionStatsAggregatedResponse,
  idenities: IdentityRef[],
  services: ServiceInfo[]
} 
```

6. Now, let's create some functions to add or update a new node. This function will be triggered by our button:

```ts
  function addOrUpdateNode(ip: string, port: string, password?: string) {
    // Get data and save the result
    let address = ip + ':' + port
    getNodeData(ip, port, password).then(result => {
      if (password != undefined) {
        // Reset fields
        setIpField('')
        setPortField('')
        setPasswordField('')
      }
      updateNode(address, result)
      let index = nodesKeys.indexOf(address)
      if (index == -1) {
        setNodesKeys(oldArray => [...oldArray, address])
      }
    }).catch((e: any) => {
      // Need to request token again but we don't store the password, so we need to re-add node
      if (e instanceof TequilapiError && e.isUnauthorizedError) {
        alert("Request unauthorized, you need to add your node again.")
        removeNode(address)
      } else {
        if (e.originalResponseData) alert(e.originalResponseData)
        else alert(e.message)
      }
    })
  }

  async function getNodeData(ip: string, port: string, password?: string) : Promise<nodeData> {
    let address = ip + ':' + port
    let nodeApi: TequilapiClient | null = null
    let token: string | null = null
    if (password == undefined) {
      // If no password we assume the token is already in the api and saved
      if (nodes.has(address)) {
        token = nodes.get(address)!.token
        nodeApi = nodes.get(address)!.api
      }
    } else {
      // Create node client
      nodeApi = new TequilapiClientFactory('http://localhost:5000/proxy/' + ip + '/' + port + '/tequilapi').build()
      // Retrieve token
      let response = await nodeApi.authAuthenticate({ username: "myst", password: password }, true)
      token = response.token
    }
    if (nodeApi != null && token != null) {
      let health = await nodeApi.healthCheck()
      let stats = await nodeApi.sessionStatsAggregated()
      let idenities = await nodeApi.identityList()
      let services = await nodeApi.serviceList()
      return {
        api: nodeApi,
        health: health,
        stats: stats,
        idenities: idenities,
        services: services,
        token: token
      }
    }
    throw Error("Something went wrong when calling the node API")
  }
```

7. Let's also add functions to start and stop the node. We will always use our first identity for starting, and the first service for stopping. This is enough for the default node configuration:

```ts
  async function startNode(address: string) {
    if (nodes.has(address)) {
      let addressSplit = address.split(':')
      try {
        await nodes.get(address)!.api.serviceStart({
          providerId: nodes.get(address)!.idenities[0].id,
          type: "wireguard"
        })
        addOrUpdateNode(addressSplit[0], addressSplit[1])
      } catch (e) {
        // User doesn't have the updated status of the node, so we update it
        if (e instanceof TequilapiError && e.message.startsWith("Service already running")) {
          addOrUpdateNode(addressSplit[0], addressSplit[1])
        } else throw e
      }
    }
  }

  async function stopNode(address: string) {
    if (nodes.has(address)) {
      let addressSplit = address.split(':')
      try {
        await nodes.get(address)!.api.serviceStop(nodes.get(address)!.services[0].id)
        addOrUpdateNode(addressSplit[0], addressSplit[1])
      } catch (e) {
        // User doesn't have the updated status of the node, so we update it
        if (e instanceof TequilapiError && e.message.startsWith("Service not found")) {
          addOrUpdateNode(addressSplit[0], addressSplit[1])
        } else throw e
      }
    }
  }
```

8. Now let's create the table for displaying the data. We can do it with HTML code and a variable that will transform our node's data into table rows. We will also add a refresh button to trigger the update of all the nodes data:

```tsx
  const nodesList = nodesKeys.map((key, i) => {
    if (nodes.has(key)) {
      let sumTokens = nodes.get(key)!.stats.stats.sumTokens/(10**18)
      let apiLoaded = nodes.get(key)!.api instanceof HttpTequilapiClient
      return  (
        <TableRow key={'row_'+i}>
          <TableCell component="th" scope="row">{key}</TableCell>
          {nodes.get(key)!.services.length > 0 ? <TableCell>{nodes.get(key)!.services[0].status}</TableCell> : <TableCell>Stopped</TableCell>}
          <TableCell>{nodes.get(key)!.health.uptime}</TableCell>
          <TableCell>{nodes.get(key)!.health.version}</TableCell>
          <TableCell>{nodes.get(key)!.stats.stats.count}</TableCell>
          <TableCell>{sumTokens.toFixed(2)}</TableCell>
          {apiLoaded ? (<TableCell>
            {nodes.get(key)!.services.length == 0 && <IconButton aria-label="start" onClick={() => startNode(key)}>
              <PlayArrow />
            </IconButton>}
            {nodes.get(key)!.services.length > 0 && <IconButton aria-label="stop" onClick={() => stopNode(key)}>
              <Stop />
            </IconButton>}
          </TableCell>) : (<TableCell>No API loaded</TableCell>)}
        </TableRow>)
    }
    else return
  })
```

```html
  <Box display="flex" flexDirection="column" alignItems="center">
    <TableContainer component={Paper} style={{marginLeft: "10%", marginRight: "10%", width: "auto", marginTop: '2em'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>Service status</TableCell>
            <TableCell>Uptime</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Sessions</TableCell>
            <TableCell>Total Earnings (MYSTT)</TableCell>
            <TableCell>
              {nodesList.length > 0 && <IconButton aria-label="refresh" onClick={refreshAll}>
                <Refresh />
              </IconButton>}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {nodesList}
        </TableBody>
      </Table>
      </TableContainer>
  </Box>
```

9. Of course, now we need a function to update all the nodes, which is very simple:

```ts
  function refreshAll() {
    for (let nodeKey of nodesKeys) {
      let addressSplit = nodeKey.split(':')
      addOrUpdateNode(addressSplit[0], addressSplit[1])
    }
  }
```

10. Now we have a working web app that can see node data, and start or stop the service. There is only one thing that is going to bother us; when we refresh the page, all of our added nodes are reset and we have to add them again.  
To mitigate this problem, we need to ensure the data persists in the webpage's local storage. We can employ some UseEffect hooks, which will be called when we update our data to save it, and when we load our page to retrieve the data if there is some saved.  
We will also use the hooks to check if no API is initialized, which would mean that the nodes' data has just been retrieved from local storage, and therefore we need to refresh all the data to update it and reload the clients.

```ts
  // Retrieve data from local storage
  useEffect(() => {
    if(localStorage.getItem('nodes') && localStorage.getItem('nodesKeys')) {
      setNodes(new Map<string,nodeData>(JSON.parse(localStorage.getItem('nodes')!)))
      setNodesKeys(JSON.parse(localStorage.getItem('nodesKeys')!) as string[])
    }
  }, []);

  // Save node data to local storage
  useEffect(() => {
    // If none have API initialized call refreshAll
    if (nodesKeys.map(key => {
      if (nodes.has(key) && !(nodes.get(key)!.api instanceof HttpTequilapiClient))
        return false
      else
        return true
    }).every(x => x == false)) refreshAll()
    localStorage.setItem('nodes', JSON.stringify(Array.from(nodes.entries())));
  }, [nodes, nodesKeys]);

  useEffect(() => {
    localStorage.setItem('nodesKeys', JSON.stringify(nodesKeys));
  }, [nodesKeys]);
```

11. Another problem we now have is that the client used to call the API has not persisted in storage, but we have enough information to recreate it. We will create a function to do this, and we will call it in the `getNodeData` function if the client is not created:

```ts
  async function checkNodeAPI(nodeApi: TequilapiClient | null, ip: string, port: string, token: string): Promise<TequilapiClient> {
    // If it was retrived from localStorage and has no client we re-create it
    if (!(nodeApi instanceof HttpTequilapiClient)) {
      nodeApi = new TequilapiClientFactory('http://localhost:5000/proxy/' + ip + '/' + port + '/tequilapi').build()
      nodeApi.authSetToken(token)
    }
    return nodeApi
  }
```
And then this:
```ts
  // If no password we assume the token is already in the api and saved
  if (nodes.has(address)) {
    token = nodes.get(address)!.token
    nodeApi = nodes.get(address)!.api
  }
```
Will become:
```ts
  // If no password we assume the token is already in the api and saved
  if (nodes.has(address)) {
    token = nodes.get(address)!.token
    nodeApi = await checkNodeAPI(nodes.get(address)!.api, ip, port, token)
  }
```

We have finally completed our node management web app! Many improvements could be made, but I hope this guide provides inspiration and a good foundation for your future projects which use the node's TequilAPI!

To make the running of both projects easier, we can add this line in the `package.json` scripts of the frontend project:

```json
"dev": "yarn --cwd ../proxy dev & yarn start"
```

And then you can run the project using `yarn dev` in the frontend folder.

Happy hacking!
