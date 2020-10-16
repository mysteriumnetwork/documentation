---
title: Linux guide
description: How install and run a node on Linux
---

Hosting a node in a datacenter may ensure better throughput and higher earnings.
 
## Supported operating systems
- Raspbian 9/10
- Debian 9/10
- Ubuntu


## Installation
### Install and start Mysterium Node
In addition to our Node, this script will check for existing OpenVPN and WireGuard dependencies and install them if missing.

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

### Check service health
Post installation service check.
```bash
sudo systemctl status mysterium-node.service
```

### View Node logs
Run the following command to diagnose issues.
```bash
sudo journalctl -u mysterium-node.service
```

### Save logs to a file
If your node is unable to report an issue through the built-in WebUI, you may need to save the logs to a file and send them to us via [support@mysterium.network](mailto:support@mysterium.network).
```bash
sudo journalctl -u mysterium-node.service > node.logs
```
