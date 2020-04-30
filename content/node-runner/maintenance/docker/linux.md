---
title: Docker for Linux
weight: 11
---

You should be able to run a node on any Linux OS that supports Docker. Tested on these operating systems: *Debian 9/10*, *Raspbian 9/10*, *Ubuntu* and *CentOS*.

You can check the latest Docker node versions here: [Docker Hub](https://hub.docker.com/r/mysteriumnetwork/myst/)

### Installation

Go to [docker](https://www.docker.com/) on how to get a recent docker version for Your OS.

### Running

```
sudo docker run --cap-add NET_ADMIN --net host --name myst -d mysteriumnetwork/myst service --agreed-terms-and-conditions --openvpn.port 1194
```

### Debugging

```
sudo docker logs -f myst
```
