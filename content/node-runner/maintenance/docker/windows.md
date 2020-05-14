---
title: Docker for Windows
weight: 3
---

Docker Desktop for Windows is Docker designed to run on Windows 10. It is a native Windows application that provides an easy-to-use development environment for building, shipping, and running dockerized apps. Docker Desktop for Windows uses Windows-native Hyper-V virtualization and networking and is the fastest and most reliable way to develop Docker apps on Windows. 

#### System Requirements

- Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later).
- Hyper-V and Containers Windows features must be enabled.

*To check your Windows version, go to Command Prompt and type winver. Virtualization support feature can be checked under Task Manager > CPU Performance (this option should be enabled by default).*

[Download](https://hub.docker.com/editions/community/docker-ce-desktop-windows/) and install Docker Desktop executable for Windows. 

When the installation finishes, Docker starts automatically. The "whale" icon  
in the notification area indicates that Docker is running, and accessible from a terminal.

1. Log in to your router and navigate to the NAT and Port Mapping/Forwarding section. Map the necessary custom port(s) from router to your local machine: [YOUR_PUBLIC_IP]:25007 to -> [YOUR_LOCAL_NETWORK_IP]:25007. Your local machine should be publicly exposed via router.
2. Open a command-line terminal and type the following command (previously mapped port=25007 is used for the example below):

```
docker run --cap-add NET_ADMIN -p 4449:4449 -p 25007:25007/udp --rm --name myst -v ~/.mysterium:/var/lib/mysterium-node mysteriumnetwork/myst --experiment-natpunching=false service --agreed-terms-and-conditions --openvpn.port=25007
```

 Your Windows Docker node is now ready to serve Mysterium Network users!
