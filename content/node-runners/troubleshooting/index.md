---
title: Network troubleshooting
weight: 10
---

### Introduction to Network troubleshooting

NAT (Network Address Translation) is used to enable internet access for computers that do not have an external internet address (IP). Usually of the form like 192.168.x.y or 10.x.y.z

If you are running a node on a computer behind NAT you will need some means to enable access to your node from outside your local network.
Below are suggested methods to enable such external access.

Essentially you need to make ports on which node services run accessible from outside. Such enablement is also called "*port forwarding*".

## NAT Traversal

NAT Traversal also known as UDP encapsulation allows traffic to get to the specified destination when a device does not have a public IP address. This is usually the case if your ISP is doing NAT, or the external interface of your firewall is connected to a device that has NAT enabled.

The shortage of IPv4 addresses and the very slow transition to IPv6 leads to pragmatic solutions in the Internet: today many hosts are still using IPv4 and are connected to the Internet over a Network Address Translation (NAT) router. However, there are many applications, which need inbound connections, like e.g. peer-to-peer-based systems or voice-over-IP. For such NATed hosts inbound connections usually pose a problem, since without additional measures the router/firewall filters the incoming connection attempts. These additional measures are usually referred to as NAT traversal mechanisms and hole punching is one of those techniques.  

*Hole punching* (or sometimes *punch*-through) is one of the most common techniques in computer networking for establishing a direct UDP connection between two parties in which one or both are behind firewalls or behind routers that use network address translation (*NAT*). It is called *UDP hole punching* because it *punches* a *hole* in the firewall of the network which allows a packet from an outside system to successfully reach the desired client on a network using NAT.

## Enable NAT traversal (hole punching) mechanism

###### Currently, If port mapping succeeded, Mysterium is skipping the NAT hole punching. On the other hand, if port mapping process fails, we can skip it by adding a flag to disable NAT port mapping: **--nat-port-mapping=false*

Alternatively, providers can skip the process of manual port configuration and disable UPnP in their routers (if enabled). In this scenario, NAT hole punching will be prioritised and executed against port mapping processes.

## Disable NAT traversal (hole punching) mechanism

While in most cases NAT hole punch helps the Mysterium node runners to establish the connection with our network consumers, the technique is not applicable in all scenarios or with all types of NATs, as NAT operating characteristics are not standardized.  
If this approach does not work for you, you can try the following:

1. Enable UPnP feature. UPnP and NAT-PNP protocols provides automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not. 
2. Manually forward a port in your router.
3. Add the following flag into service configuration file: *--experiment-natpunching=false*

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

## Firewall configuration

#### Logs show client attempts, but it does not fully connect

There might be many things, but most frequent is firewall. If You run node via docker image, check that *ip_forwarding* is enabled on a host and that UDP service port (specified by `--openvpn.port` flag) is allowed from outside.

check ip_forward status:

```
# cat /proc/sys/net/ipv4/ip_forward
```

enable ip_forward if disabled:

```
# sysctl -w net.ipv4.ip_forward=1
```

It also might be that default firewall forward policy is set to `DROP`. In that case try setting it to `ACCEPT`. Generic way to do it, provided there are no other interfering rules:

```
# iptables -P FORWARD ACCEPT
```

## I suspect that my hosting provider blocks ports, what to do?

For some hosting providers it is common to open just some pre-defined ports that are commonly used. Try setting any random service to test if incoming UDP port (i.e. 1194) is open. You can try using custom port using `openvpn.port=1234` option.

Sometimes hosting providers block most UDP ports altogether, even outgoing ones. In that case You can still run a node using TCP protocol. You can do that using `-openvpn.proto=TCP` option.

## I suspect that my firewall blocks access, what to do?

You can check all firewall rules with these commands:

```
# iptables -L -n
# iptables -L -n -t nat
```

To completely strip host of firewall rules and chains You can do:

```
# iptables -F
# iptables -t nat -F
# iptables -X
```

## Every time I reboot a host, I see unneeded firewall rules

Depending on Linux distribution You run, there might be different default firewall policies. Sometimes You might need to change / disable certain default policies. See respective firewall documentation of Your OS.

In some cases, firewall rules that are being introduced by docker package might interfere with Mysterium Network node rules (such as in Centos7 for example). In that case try changing conflicting rules or disable extended firewall rules by docker altogether. This might be achieved passing `--iptables=false` option before starting docker service.
