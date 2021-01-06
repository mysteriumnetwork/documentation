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
There are two ways to install a Mysterium node.

On  `Debian`/`Ubuntu`  systems you can use  `Aptitude`  and execute:


```bash
sudo add-apt-repository ppa:mysteriumnetwork/node
sudo apt-get update
sudo apt install myst
```

If for some reason it fails, or you can't use Aptitude we also provide an installation script written in `bash` which can be downloaded and executed using this command:

```bash
NETWORK=testnet2 sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

In addition to downloading and installing our Node, these commands will also install additional required dependencies like WireGuard and OpenVPN if you don't have them already.

Once the installation is complete, check your service status.

### Check service status

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
If your node is unable to report an issue through the built-in WebUI or TequilAPI, you may need to save the logs to a file and send them to us via [support@mysterium.network](mailto:support@mysterium.network).

```bash
sudo journalctl -u mysterium-node.service > node.logs
```
