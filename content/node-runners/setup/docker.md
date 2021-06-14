---
title: Docker guide (Linux, Mac & Windows)
description: How to spin up a node on Docker
---

## Docker on Linux

[Docker](https://www.docker.com/) is a tool that enables developers to ship and run applications such as a Mysterium Node by the use of containers.
A container holds all the required libraries, services and other application dependencies and ships it as a single package.

The advantage of docker is that it requires a lot less computing power when compared to virtual machines as it reuses the kernel of the operating system on the host machine and isolates the containerized application from global system settings and environmental factors.
This makes it easy to run applications without worrying about the operating system compatibility issues, as well as collisions with other installed software or system configuration.


```bash
docker run --cap-add NET_ADMIN -d -p 4449:4449 --name myst -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node mysteriumnetwork/myst:latest service --agreed-terms-and-conditions wireguard
```

**_Note 1:_** Replace `$YOUR_MYSTERIUM_DIR` with the path where you'd like to store the node's configuration and keystore files, e.g.

```
export YOUR_MYSTERIUM_DIR=~/.mysterium
```

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

**_Note3:_** Use Docker detached mode by adding the option `--detach` or `-d`.

```
docker run -d IMAGE
```

It will run a Docker container in the background of your terminal.
If you run containers in the background, you can find out their details using `docker ps` and then reattach your terminal to its input and output.

Make sure to use volumes as in the example above to persist your node's identity through container and host system restarts or node image upgrades.

## Docker on Windows and MacOS

> While this guide is focused on Windows, the same instructions apply to macOS.

Docker Desktop for Windows is Docker designed to run on Windows 10 and macOS.
It is a native application that provides an easy-to-use development environment for building, shipping, and running dockerized apps.
Docker Desktop for Windows uses Windows-native Hyper-V virtualization and networking and is the fastest and most reliable way to run Dockerized apps on Windows.

### System Requirements

-   Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).
-   Hyper-V and Containers Windows features must be enabled.

_To check your Windows version, go to Command Prompt and type `winver`.
Virtualization support feature can be checked under Task Manager > CPU Performance (this option should be enabled by default)._

### Installation

[Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) and install Docker Desktop executable for Windows.

When the installation finishes, Docker starts automatically. The "whale" icon  
in the notification area indicates that Docker is running, and accessible from a terminal.

1.  Log in to your router and navigate to the NAT and Port Mapping/Forwarding section. Map the necessary custom port(s) from router to your local machine: [YOUR_PUBLIC_IP]:PORT to -> [YOUR_LOCAL_NETWORK_IP]:PORT. Your local machine should be publicly exposed via router.
2.  Open a command-line terminal and type the following command:

```bash
docker run --cap-add NET_ADMIN -p 4449:4449 -p 41920-42075:41920-42075/udp -p 61920-62075:61920-62075/udp --name myst -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node mysteriumnetwork/myst:latest --experiment-natpunching=false --p2p.listen.ports=41920:42075 service --agreed-terms-and-conditions --wireguard.listen.ports=61920:62075 wireguard
```

**_Note 1:_** Replace `$YOUR_MYSTERIUM_DIR` with the path where you'd like to store the node's configuration and keystore files, e.g.

```bash
export YOUR_MYSTERIUM_DIR=~/.mysterium
```

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

**_Note3:_** Use  Docker detached mode by adding the option `--detach` or `-d`.

**_Note4:_** Disable NAT hole punching by adding `--experiment-natpunching=false` option to use port forwarding.

**_Recommended port mappings:_**

- -p 4449:4449 The port to run Node UI on (default: 4449)
- -p 61920-62075:61920-62075/udp Range of WireGuard listen ports (e.g. 61920:62075)
- -p 41920-42075:41920-42075/udp Range of P2P listen ports (e.g. 41920:42075)
- --experiment-natpunching=false Disables NAT hole punching

You can use **_different values_** to change listed services' **_port_** numbers for clarity and convenience.

Your Windows Docker node is now ready to serve Mysterium Network users!

Make sure to use volumes as in the example above to persist your node's identity through container and host system restarts or node image upgrades.

## Docker on Windows and MacOS (Updated and simplified way)

### Known limitations:

- Because of the way networking is implemented in Docker Desktop for Windows/Mac, you cannot see a docker0 interface on the host. This interface is actually within the virtual machine.
- Docker Desktop for Windows/Mac can’t route traffic to Linux containers. 
- The docker (Linux) bridge network is not reachable from the Windows/Mac hosts.

In the previous Docker implementations it was mandatory to set up a Port forwarding so that ports exposed from Linux are forwarded to the host. Another requirement was to map the necessary custom port(s) from router to your local machine: [YOUR_PUBLIC_IP]:PORT to -> [YOUR_LOCAL_NETWORK_IP]:PORT so it become publicly exposed via router. This all was needed to override certain limitations and make it usable.

### Solution

Mysterium team made a workaround to bypass a recognized problem and known limitations and implemented a STUN (Simple Traversal of UDP over NAT or Session Traversal Utilities for NAT) servers to automatically determine the IP address and correct port(s) allocated to it by a NAT. It helped us to minimize the efforts needed and make it as simple as possible for Windows & Mac users.

### Installation

[Download](https://www.docker.com/products/docker-desktop) and install Docker Desktop executable for Windows/Mac.

When the installation finishes, Docker starts automatically. The "whale" icon in the notification area indicates that Docker is running, and accessible from a terminal. We now assume that Docker Desktop for Windows or Mac has been successfully installed and Docker Service is up and running.

#### For WINDOWS users: Open a command-line terminal and type the following command:

```bash
docker run --cap-add NET_ADMIN -p 4449:4449 --name myst -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node mysteriumnetwork/myst:latest service --agreed-terms-and-conditions wireguard
```

**_Note 1:_** Replace `$YOUR_MYSTERIUM_DIR` with the path where you'd like to store the node's configuration and keystore files, e.g.

```bash
export YOUR_MYSTERIUM_DIR=~/.mysterium
```

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

**_Note3:_** You can use Docker detached mode by adding the option `--detach` or `-d`.


#### For MacOS users: Open a command-line terminal and type the following command:

```bash
docker run --cap-add NET_ADMIN -p 4449:4449 --name myst -v $YOUR_MYSTERIUM_DIR:/var/lib/mysterium-node --device /dev/net/tun:/dev/net/tun mysteriumnetwork/myst:latest service --agreed-terms-and-conditions wireguard
```

**_Note 1:_** Replace `$YOUR_MYSTERIUM_DIR` with the path where you'd like to store the node's configuration and keystore files, e.g.

```bash
export YOUR_MYSTERIUM_DIR=~/.mysterium
```

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

**_Note3:_** You can use Docker detached mode by adding the option `--detach` or `-d`.


No manual port forwarding is needed. Your Windows/Mac Docker node is now ready to serve Mysterium Network users!



## Complete installation

Once the container is running please [log into the Node UI](/node-runners/node-ui/) to set up your service pricing, payout address and claim your node in [MMN](https://testnet2.mysterium.network) to receive bounties.
