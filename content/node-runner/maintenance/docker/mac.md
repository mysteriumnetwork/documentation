---
title: Docker for macOS
weight: 11
---



Start your node with the following command (custom port=25007 is used for the example below): 

```
docker run --cap-add NET_ADMIN -p 127.0.0.1:4449:4449 -p 25007:25007/udp \           --rm --name myst \           -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node \           mysteriumnetwork/myst \           --experiment-natpunching=false \           service \           --agreed-terms-and-conditions \           --openvpn.port=25007
```

*Replace* `$YOUR_MYSTERIUM_DIR` *with the path where you'd like to store the node's configuration and keystore files, e.g.* 

```
export YOUR_MYSTERIUM_DIR=~/.mysterium
```

1. Turn off NAT Traversal (port hole punching): *--experiment-natpunching=false*
2. Map Docker container ports manually: container port 25007 to [YOUR_LOCAL_NETWORK_IP]:25007
3. Once that is done, switch to your router and map the necessary custom port from router to your local machine: [YOUR_PUBLIC_IP]:25007 to -> [YOUR_LOCAL_NETWORK_IP]:25007. Your local machine should be publicly exposed via router.

Please note that such configuration can be used for Mac and Windows based Docker nodes while for Linux host based Docker nodes there is no need to run such port mapping configuration.
