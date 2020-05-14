---
title: Linux
weight: 2
---

Getting started with Linux

###### Supported operating systems

- [ ] Raspbian 9/10
- [ ] Debian 9/10
- [ ] Ubuntu

You can install the Mysterium Node package by running the following script:

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

Once the installation is complete, you can check your service status:

```bash
sudo systemctl status mysterium-node.service
```

To view the daemon logs:

```bash
sudo journalctl -u mysterium-node.service
```
