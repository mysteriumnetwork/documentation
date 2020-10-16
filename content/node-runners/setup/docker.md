---
title: Docker guide
description: How to spin up a node on Docker
---

[Docker](https://docker.com) is a tool that enables developers to ship and run applications such as a Mysterium Node by the use of containers.
A container holds all the required libraries, services and other application dependencies and ships it as a single package.

The advantage of docker is that it requires a lot less computing power when compared to virtual machines as it reuses the kernel of the operating system on the host machine and isolates the containerized application from global system settings and environmental factors.
This makes it easy to run applications without worrying about the operating system compatibility issues, as well as collisions with other installed software or system configuration.

## Running on a Linux host
  ```shell
docker run --cap-add NET_ADMIN -p 4449:4449 -p 25007:25007/udp \
    --rm --name myst \
    -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node \
    mysteriumnetwork/myst \
    --experiment-natpunching=false \
    service \
    --agreed-terms-and-conditions \
    --openvpn.port=25007
  ```

Replace `$YOUR_MYSTERIUM_DIR` with the path where you'd like to store the node's configuration and keystore files.

> **Make sure to use volumes as in the example above to persist your node's identity through container and host system restarts or node image upgrades.**

Please note that for Windows [Docker support is limited to Windows 10 64-bit](https://docs.docker.com/docker-for-windows/install/#system-requirements): Pro, Enterprise, or Education (Build 15063 or later).

## Tips

- Turn off NAT Traversal (port hole punching): --experiment-natpunching=false
- Map Docker container ports manually: container port 25007 to [YOUR\_LOCAL\_NETWORK_IP]:25007
- Once that is done, switch to your router and map the necessary custom port from router to your local machine:[YOUR\_PUBLIC\_IP]:25007 to -> [YOUR\_LOCAL\_NETWORK\_IP]:25007.
Now, your local machine should be publicly exposed via router.
