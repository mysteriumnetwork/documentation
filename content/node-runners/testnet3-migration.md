---
title: Pre-Mainnet migration 
description: How to migrate to MainNet
---

## Migration to MainNet

The new MainNet node has many new features including a simplified onboarding flow, super fast and cheap registrations, Matic Polygon withdrawals and much more. For a majority of nodes your user accounts including an API keys were migrated from the old my.mysterium.network to the new Mystnodes.com platform.

Once your node is migrated to MainNet, you will automatically start earning in a new way based on supply and demand as explained in the [Payout Rules](https://mystnodes.com/payout-rules). **Migration for RaspberryPi nodes with pre-installed mystberry package will happen automatically by updating your node software.** If your node does not auto-update or something goes wrong - you can follow the steps below to manually update your node.

## Manually updating your node

### How to update your Raspberry Pi node

SSH into your Raspberry Pi using the following command:

```bash
ssh myst@ip-of-your-raspberry
```

The default password is  `mystberry`.

Then to update your RPI, run:

```bash
sudo apt update; sudo apt install myst
```

### How to update your Linux node

To update your Linux node, run:
```bash
sudo apt update; sudo apt install myst
```

### How to update your Docker node

In order to update your Docker node, run the following commands.

Pull the testnet3 node image:

```bash
docker pull mysteriumnetwork/myst:latest
```

Delete the container that is already being used for running node: 

```bash
docker rm -f myst
```

Follow the running a docker node guide (https://docs.mysterium.network/node-runners/setup/docker/) to start a new container on your machine.

## Steps to claim your node on mystnodes.com:

For your new nodes to appear in the new Mystnodes.com platform you must claim them via the new [Mystnodes.com onboarding page](https://mystnodes.com/onboarding), Node UI or Mysterium CLI app.

There are three ways of claiming your node:

1. By logging into the new Mystnodes.com platform, navigating to the Onboarding page and completing the process there.
2. By logging into the built-in Node UI and entering your API token into the NodeUI settings panel (your API token is the same as before. If needed, you can find and copy your API key in your [Mystnodes.com profile](https://mystnodes.com/me). 
3. By running the below commands via Mysterium CLI (CLI is a command line interface that allows you to manipulate a Mysterium node using just your terminal. It can be started using a myst cli command):

*Agree to Terms of Use (once)*: 
```bash
myst cli --agreed-terms-and-conditions`
```

*Claim your node*: 
```bash
mmn {api_key}
```

You should now see your node on the [My nodes list](https://mystnodes.com/nodes).

## Confirm your node is running

To confirm that your node is running on Linux and RPi, check the service status:
```bash
sudo systemctl status mysterium-node.service 
```

The output should look something like this:
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

On Docker, list your active containers:
```bash
docker ps
```
Your container should be up and running:
```bash
CONTAINER ID   IMAGE                          COMMAND                  CREATED          STATUS
074a8fcb572c   mysteriumnetwork/myst:latest   "/usr/local/bin/dock…"   44 seconds ago   Up 42 seconds  
```

### How to login to the Node UI

When your node is in a local network:
- If you're using a Macbook (OSX) or have Bonjour service installed on your OS, you can access it through http://raspberrypi.local:4449/ URL.
- On Windows, you should see a device in My Computer through the window explorer.
- Visiting your node's IP address under the port 4449 e.g. http://192.168.1.10:4449
- If the node is running locally on your computer you can access it through http://localhost:4449

When your node is in a data center:
- You will have to configure your server's firewall to expose the 4449 TCP port then access the UI through http://public-ip:4449

<div style="text-align:center">
  <img src="../images/node-ui/welcome.png" alt="Welcome" class="screenshot">
</div>


### Change payout (beneficiary) address

You can change the beneficiary address once you earn at least a little bit of MYST. The amount varies, but it's somewhere between 0.001 and 0.002 MYST. 
This is because a blockchain transaction will be made and you need to cover its fees.

You can change it through the Node UI during the onboarding process or through the settings page.

To change it via the CLI, run:

```bash
myst cli
```

```bash
identities beneficiary <identity> <beneficiary>
```
