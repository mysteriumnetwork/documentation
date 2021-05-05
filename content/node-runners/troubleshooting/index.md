---
title: Troubleshooting
weight: 10
---

## Reporting an issue

There may be a time when you encounter an issue with your node and we may ask you to submit your logs for further investigation.
In order for us to understand what is happening we'd like you to submit your node logs.

**Node logs do not include your node's traffic.**

1. [Login to your Node UI](/node-runners/node-ui/) and click the "Bug" button on the left side panel.

3. Report issue directly to Mysterium support using API service: 

```bash
curl -X POST --data '{"email":"your_email@gmail.com"}' localhost:4050/feedback/issue
```

## Introduction to Network troubleshooting

NAT (Network Address Translation) is used to enable internet access for computers that do not have an external internet address (IP). Usually of the form like:
 - 10.0.0.0/8 (10.0.0.0 – 10.255.255.255)
 - 172.16.0.0/12 (172.16.0.0 – 172.31.255.255)
 - 192.168.0.0/16 (192.168.0.0 – 192.168.255.255)

If you are running a node on a computer behind NAT you will need some means to enable access to your node from outside your local network.
Below are suggested methods to enable such external access.

Essentially you need to make ports on which node services run accessible from outside. Such enablement is also called "*port forwarding*".

## NAT Traversal

NAT Traversal also known as UDP encapsulation allows traffic to get to the specified destination when a device does not have a public IP address. This is usually the case if your ISP is doing NAT, or the external interface of your firewall is connected to a device that has NAT enabled.

The shortage of IPv4 addresses and the very slow transition to IPv6 leads to pragmatic solutions in the Internet: today many hosts are still using IPv4 and are connected to the Internet over a Network Address Translation (NAT) router. However, there are many applications, which need inbound connections, like e.g. peer-to-peer-based systems or voice-over-IP. For such NATed hosts inbound connections usually pose a problem, since without additional measures the router/firewall filters the incoming connection attempts. These additional measures are usually referred to as NAT traversal mechanisms and hole punching is one of those techniques.

*Hole punching* (or sometimes *punch*-through) is one of the most common techniques in computer networking for establishing a direct UDP connection between two parties in which one or both are behind firewalls or behind routers that use network address translation (*NAT*). It is called *UDP hole punching* because it *punches* a *hole* in the firewall of the network which allows a packet from an outside system to successfully reach the desired client on a network using NAT.

## Enable NAT traversal (hole punching) mechanism

> Currently, If port mapping succeeded, Mysterium is skipping the NAT hole punching. On the other hand, if port mapping process fails, we can skip it by adding a flag to disable NAT port mapping: **--nat-port-mapping=false*

Alternatively, providers can skip the process of manual port configuration and disable UPnP in their routers (if enabled). In this scenario, NAT hole punching will be prioritised and executed against port mapping processes.

It is recommended to add the following flag into service configuration file **--nat-port-mapping=false** to force NAT hole punching mechanism to work. 

In the end it would look like this:

```bash
DAEMON_OPTS="--nat-port-mapping=false --keystore.lightweight"
SERVICE_OPTS="openvpn,wireguard"
```

## Disable NAT traversal (hole punching) mechanism

While in most cases NAT hole punch helps the Mysterium node runners to establish the connection with our network consumers, the technique is not applicable in all scenarios or with all types of NATs, as NAT operating characteristics are not standardized.
If this approach does not work for you, you can try the following:

1. Enable UPnP feature. UPnP and NAT-PNP protocols provides automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not. 
2. Manually forward a port in your router.
3. Add the following flag into service configuration file: *--experiment-natpunching=false*

> NAT (Network Address Translation) is used to enable internet access for computers that do not have an external internet address (IP). Usually of the form like 192.168.x.y or 10.x.y.z

If you are running a node on a computer behind NAT you will need some means to enable access to your node from outside your local network. Below are suggested methods to enable such external access.

Essentially you need to make ports on which node services run accessible from outside. This can be achieved by enabling the automatic port configuration feature (UPnP) or manually forwarding ports on your router.

### UPnP or NAT-PNP support

UPnP and NAT-PNP protocols provides automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not. It allows apps on your device to open ports on your router when needed and to close them when they are stopped.

UPnP might be convenient, but it adds its own potential security issues. It assumes that every device on your local network is trustworthy. So if you happen to get infected by malware that wants to initiate a direct connection with a remote attacked, your UPnP router will allow it without question. Such a connection would be much more difficult to open with UPnP disabled.

## Port forwarding

It is a technique that is used to allow external devices access to computers services on private networks. It does this by mapping an external port to an internal IP address and port. Most online gaming Applications will require you to configure **port forwarding** on your home router. To understand port forwarding you need to understand what a TCP/IP port is and how ports and IP addresses are used together.

If UPnP or NAT-PNP method doesn't help, you can try forwarding the port manually. Port forwards are set up in your router. 

For **OpenVPN** protocol, you need to forward `27005` or any other custom port. OpenVPN by default uses UDP/TCP port 1194, so it is common for firewalls to monitor port 1194 (and other commonly used ports), rejecting encrypted traffic that tries to use it (or them).

**WireGuard** uses UDP to transmit the encrypted IP packets. The port can be freely selected from the high ports range. You need to configure WireGuard service to listen on 52820:53075 range of ports (WireGuard starts at 51820/UDP).

**Note!** 

- It is required to set ports needed for **P2P communication** too (range of P2P listen ports (e.g. 51820:52075));
- Disable NAT hole punching: add the following flag into service configuration file */etc/default/mysterium-node*: 

```bash
--experiment-natpunching=false
```
In the end it would look like this:

```bash
DAEMON_OPTS="--p2p.listen.ports=51820:52075 --experiment-natpunching=false --keystore.lightweight"
SERVICE_OPTS="--openvpn.port=27005 --wireguard.listen.ports=52820:53075 openvpn,wireguard"
```

A summary of the steps to setup a port forward in your router are:

1. Login to your router.
2. Navigate to your routers port forwarding section, also frequently called virtual server.
3. Create the port forward entries in your router.
4. Test that your ports are forwarded correctly.

[How to forward ports on your router | PCWorld](https://www.pcworld.com/article/244314/how_to_forward_ports_on_your_router.html)

### TCP/UDP Ports

A **TCP/UDP port** identifies an **application or service** on a machine in a TCP/IP network. On a TCP/IP network every device must have an IP address which identifies the device which can run **multiple** applications/services.The **port** identifies the **application/service** running on the machine. The use of ports allow computers/devices to run multiple services/applications.

## Firewall configuration

#### Logs show client attempts, but it does not fully connect

There might be many things, but most frequent is firewall. If You run node via docker image, check that *ip_forwarding* is enabled on a host and that UDP service port (specified by `--openvpn.port` flag) is allowed from outside.

check ip_forward status:

```bash
cat /proc/sys/net/ipv4/ip_forward
```

enable ip_forward if disabled:

```bash
sysctl -w net.ipv4.ip_forward=1
```

It also might be that default firewall forward policy is set to `DROP`. In that case try setting it to `ACCEPT`. Generic way to do it, provided there are no other interfering rules:

```bash
iptables -P FORWARD ACCEPT
```

## Forgot password

To reset your Node UI password, run the following commands via the node CLI:

```bash
myst reset --tequilapi
```
or
```bash
myst reset
```
