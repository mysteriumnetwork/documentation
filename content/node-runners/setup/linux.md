---
title: Linux guide
description: How install and run a node on Linux
---

Hosting a node in a datacenter may ensure better throughput and higher earnings.
 
## Supported operating systems
- Raspbian 9/10
- Debian 9/10
- Ubuntu 18.04/20.04


## Installation

### Stable release 

There are two ways to install a stable release of Mysterium node.

On  `Debian`/`Ubuntu`  systems you can use  `Aptitude`  and execute:


```bash
sudo add-apt-repository ppa:mysteriumnetwork/node
sudo apt-get update
sudo apt install myst
```

If for some reason it fails, or you can't use Aptitude we also provide an installation script written in `bash` which can be downloaded and executed using this command:

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

In addition to downloading and installing our Node, these commands will also install additional required dependencies like WireGuard and OpenVPN if you don't have them already.

Once the installation is complete, check your service status.

### Latest non stable release 

Latest non stable releases include bug fixes and improvements that have not yet been pushed
for the whole user base and are not guaranteed to work. You should run these releases at your own risk
and should also consider backing up your `.mysterium` folder beforehand just in case.

To get them checkout our [launchpad](https://launchpad.net/~mysteriumnetwork) or [github releases](https://github.com/mysteriumnetwork/node/tags).

## Service health 

### Check service health 

Post installation service check:
```bash
sudo systemctl status mysterium-node.service
```

If everything is working you should see similar output to this:

```bash
mysterium@pop-os:~$ sudo systemctl status mysterium-node.service 
● mysterium-node.service - Server for Mysterium - decentralised VPN Network
     Loaded: loaded (/lib/systemd/system/mysterium-node.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2021-01-04 00:00:00 GMT;
       Docs: https://mysterium.network/
   Main PID: 1920 (myst)
      Tasks: 30 (limit: 19009)
     Memory: 73.0M
```

### View Node logs
Run the following command to diagnose issues:
```bash
sudo journalctl -u mysterium-node.service
```

To view the real-time daemon logs:

```bash
sudo journalctl -fu mysterium-node.service
```

### Save logs to a file
If your node is unable to report an issue through the built-in Node UI or TequilAPI, you may need to save the logs to a file and send them to us via [support@mysterium.network](mailto:support@mysterium.network).

```bash
sudo journalctl -u mysterium-node.service > node.logs
```

## Complete installation

Once the service is running please [log into the Node UI](/node-runners/node-ui/) to set up your service pricing, payout address and claim your node in [MMN](https://testnet2.mysterium.network) to receive bounties.

## Advaned configuration (optional)

### Get current config 

When your node is running you can print the config that it has currently loaded by executing:
```bash
myst config show
```

This config can be altered in several ways, which we'll cover below.

### Editing the config file

On initial start up node will create a config file which can be editted.
The config is located in: `/etc/mysterium-node/config.toml`.

Any text editor can be used to edit this file. As it's a `.toml` file formatting and
indentation is very important. For further reading follow the official [toml guide](https://toml.io/en/).

### Altering start up options

Editing start up options instead of the `config.tml` file has one crutial benefit: start up service options
overwrite any default or `config.toml` edited config values and become a single source of truth which cannot be changed at runtime.

Node typically runs as a systemd service, you can find the `.service` file by inspecting the service, which you can do
by running:
```bash
systemctl status mysterium-node.service | grep Loaded
```

The output of this command will be something similar to:
```bash
Loaded: loaded (/lib/systemd/system/mysterium-node.service; enabled; vendor preset: enabled)
```

The file location we can see in parentheses is our `.service` file location.
If you now inspect that file using `cat /lib/systemd/system/mysterium-node.service` you will find a line
similar to this:

```bash
ExecStart=/usr/bin/myst $CONF_DIR $SCRIPT_DIR $DATA_DIR $RUN_DIR $DAEMON_OPTS service --agreed-terms-and-conditions $SERVICE_OPTS
```

This is the line that gets executed when we start up the `Node service`. Here we're mainly interested in variables that are passed
to this command (variables are the strings which start with $ sign for example `$CONF_DIR`). These variables are defined in a file which is located at: `/etc/default/mysterium-node`

To edit the node configuration and launch options we want to edit the variable `$SERVICE_OPTS` adding additional flags to it, which will get passed
to our `node` once it's started. For example if we wanted to change our `openVPN` and `wireguard` default ports we would replace it with this:
```bash
SERVICE_OPTS="--openvpn.port 4443 --wireguard.listen.ports 52820:53075 openvpn,wireguard"
```

Note that `$SERVICE_OPTS` variable should always finish with `openvpn,wireguard` so any configuration you want to add, must go before that.

**To get the full list of configuration options execute:** `myst --help`

### Loading the new config 

In most cases a simple service reload should be enough. You can do that by running:
```bash
sudo systemctl restart mysterium-node.service 
```

After running the `restart` command make sure to check the service health and currently running config
using previously mentioned commands.

If node is refusing to restart and load the changes you've made, you can try to restart systemd daemon itself by running `systemctl daemon-reexec`
