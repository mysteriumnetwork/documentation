---
title: Pre-mainnet migration 
description: How to migrate to Pre-mainnet
---

The new Testnet 3.0 My Mysterium Network platform is hosted on https://my.mysterium.network. 

Your accounts from old https://my.mysterium.network were migrated into new https://my.mysterium.network on July the 27th, so you should be able to login using the same credentials & claim your new nodes using the same API key. Please note that your earnings were also not affected and you should keep the same amount with you!

If you are running a Raspberry Pi node (with pre-configured mystberry package) it's likely that your node has been migrated automatically.

## Updating your node

If your node does not auto-update or something goes wrong. You can follow the following steps to update:

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
docker pull mysteriumnetwork/myst:testnet3
```

Delete the container that is already being used for running node: 

```bash
docker rm -f myst
```

Follow the running a docker node guide (https://docs.mysterium.network/node-runners/setup/docker/) to start a new container using :testnet3 tag.


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
074a8fcb572c   mysteriumnetwork/myst:testnet3   "/usr/local/bin/dock…"   44 seconds ago   Up 42 seconds  
```

## Claim your nodes

The new Pre-mainnet node has many new features including a simplified onboarding flow, super fast and cheap registrations and more. For a majority of nodes your payout (beneficiary) addresses and API keys were migrated to the new network.

**Once your node is updated, you must visit the Node UI Settings page to ensure that your API key is present under MMN integration section. If not, please re-enter your API key and Save it.**

For your new nodes to appear in the new My Mysterium platform you must claim them via the new Node UI or CLI app.

There are two ways of claiming your node:

1. By logging into the built-in Node UI and going through the onboarding process.
2. By running the below commands via Mysterium CLI (CLI is a command line interface that allows you to manipulate a Mysterium node using just your terminal. It can be started using a myst cli command):

*Agree to Terms of Use (once)*: 
```bash
myst cli --agreed-terms-and-conditions`
```

*Claim your node*: 
```bash
mmn {api_key}
```

**Note:** You can find and copy your MMN API key in your [MMN profile](https://testnet2.mysterium.network/user/profile).

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
