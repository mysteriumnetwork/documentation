---
title: Router settings
weight: 10
---

###### NAT (Network Address Translation) is used to enable internet access for computers that do not have an external internet address (IP). Usually of the form like 192.168.x.y or 10.x.y.z

If you are running a node on a computer behind NAT you will need some means to enable access to your node from outside your local network. Below are suggested methods to enable such external access.

Essentially you need to make ports on which node services run accessible from outside. This can be achieved by enabling the automatic port configuration feature (UPnP) or manually forwarding ports on your router.

### UPnP or NAT-PNP support

UPnP and NAT-PNP protocols provides automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not. It allows apps on your device to open ports on your router when needed and to close them when they are stopped.

UPnP might be convenient but it adds its own potential security issues. It assumes that every device on your local network is trustworthy. So if you happen to get infected by malware that wants to initiate a direct connection with a remote attacked, your UPnP router will allow it without question. Such a connection would be much more difficult to open with UPnP disabled.

## Port forwarding

It is a technique that is used to allow external devices access to computers services on private networks. It does this by mapping an external port to an internal IP address and port. Most online gaming Applications will require you to configure **port forwarding** on your home router. To understand port forwarding you need to understand what a TCP/IP port is and how ports and IP addresses are used together.

If UPnP or NAT-PNP method doesn't help, you can try forwarding the port manually. Port forwards are setup in your router. You need to forward port `1194`. A summary of the steps to setup a port forward in your router are:

1. Login to your router.
2. Navigate to your routers port forwarding section, also frequently called virtual server.
3. Create the port forward entries in your router.
4. Test that your ports are forwarded correctly.

[How to forward ports on your router | PCWorld](https://www.pcworld.com/article/244314/how_to_forward_ports_on_your_router.html)



## Port Forwarding Example

Below is a screen shot of home router configuration which shows the manually forwarded ports.

### TCP/IP Ports

A **TCP/UDP port** identifies an **application or service** on a machine in a TCP/IP network. On a TCP/IP network every device must have an IP address which identifies the device which can run **multiple** applications/services.The **port** identifies the **application/service** running on the machine. The use of ports allow computers/devices to run multiple services/applications.

### 
