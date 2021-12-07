---
title: Docker guide (Windows, MacOS & Linux)
description: How to spin up a node on Docker
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/C1Msfv0yNRQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

> While this video guide is focused on MacOS, the same instructions apply to Windows.

## Docker on Windows and MacOS

Docker Desktop for Windows is Docker designed to run on Windows 10 and macOS.
It is a native application that provides an easy-to-use development environment for building, shipping, and running dockerized apps.
Docker Desktop for Windows uses Windows-native Hyper-V virtualization and networking and is the fastest and most reliable way to run Dockerized apps on Windows.

### System Requirements

-   Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).
-   Hyper-V and Containers Windows features must be enabled.

_To check your Windows version, go to Command Prompt and type `winver`.
Virtualization support feature can be checked under Task Manager > CPU Performance (this option should be enabled by default)._

### Known limitations:

- Because of the way networking is implemented in Docker Desktop for Windows/Mac, you cannot see a docker0 interface on the host. This interface is actually within the virtual machine.
- Docker Desktop for Windows/Mac can’t route traffic to Linux containers.
- The docker (Linux) bridge network is not reachable from the Windows/Mac hosts.

### Installation

[Download](https://www.docker.com/products/docker-desktop) and install Docker Desktop executable for Windows/Mac.

When the installation finishes, Docker starts automatically. The "whale" icon in the notification area indicates that Docker is running, and accessible from a terminal. We now assume that Docker Desktop for Windows or Mac has been successfully installed and Docker Service is up and running.

#### For WINDOWS users: Open a command-line terminal and type the following command:

```bash
docker run --cap-add NET_ADMIN -d -p 4449:4449 --name myst -v myst-data:/var/lib/mysterium-node mysteriumnetwork/myst:latest service --agreed-terms-and-conditions
```

**_Note 1:_** Replace `myst-data` with the path where you'd like to store the node's configuration and keystore files, e.g.

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

#### For MacOS users: Open a command-line terminal and type the following command:

```bash
docker run --cap-add NET_ADMIN -d -p 4449:4449 --name myst -v myst-data:/var/lib/mysterium-node --device /dev/net/tun:/dev/net/tun mysteriumnetwork/myst:latest service --agreed-terms-and-conditions
```

**_Note 1:_** Replace `myst-data` with the path where you'd like to store the node's configuration and keystore files, e.g.

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

## Docker on Linux

[Docker](https://www.docker.com/) is a tool that enables developers to ship and run applications such as a Mysterium Node by the use of containers.
A container holds all the required libraries, services and other application dependencies and ships it as a single package.

The advantage of docker is that it requires a lot less computing power when compared to virtual machines as it reuses the kernel of the operating system on the host machine and isolates the containerized application from global system settings and environmental factors.
This makes it easy to run applications without worrying about the operating system compatibility issues, as well as collisions with other installed software or system configuration.


```bash
docker run --cap-add NET_ADMIN -d -p 4449:4449 --name myst -v myst-data:/var/lib/mysterium-node mysteriumnetwork/myst:latest service --agreed-terms-and-conditions
```

**_Note 1:_** Replace `myst-data` with the path where you'd like to store the node's configuration and keystore files, e.g.

**_Note2:_** By adding `--agreed-terms-and-conditions` command line option you accept our Terms & Conditions.

**_Note3:_** Use Docker detached mode by adding the option `--detach` or `-d`.

```
docker run -d IMAGE
```

It will run a Docker container in the background of your terminal.
If you run containers in the background, you can find out their details using `docker ps` and then reattach your terminal to its input and output.

Make sure to use volumes as in the example above to persist your node's identity through container and host system restarts or node image upgrades.

### Docker Compose

if you dont want to run it as an docker run command, you can create an `docker-compose.yml` an put the following code inside.

Create `docker-compose.yml`
```
touch docker-compose.yml
```

Add folowing configuration to it
```
version: '2.1'

services:
  mysterium:
    image: mysteriumnetwork/myst:latest
    restart: always
    expose:
      - 4449
      - 1194
      - 4050
    ports:
      - 4449:4449
      - 1194:1194
      - 4050:4050
    cap_add:
      - NET_ADMIN
    command: 'service --agreed-terms-and-conditions'
    volumes:
      - ./myst-data:/var/lib/mysterium-node
```

Create and folder as sibbling to `docker-compose.yml`:
```
mkdir myst-data
```

Now run your Docker-Container
```
docker-compose up -d
```


## Complete installation

Once the container is running please [log into the Node UI](/node-runners/node-ui/) to set up your service pricing, payout address and claim your node in [MMN](https://my.mysterium.network) to receive bounties.
