---
title: Troubleshooting
weight: 10
---

## Reporting an issue

There may be a time when you encounter an issue with your node and we may ask you to submit your logs for further investigation.
For us to understand what is happening we'd like you to submit your node logs.

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

NAT Traversal is also known as UDP encapsulation allows traffic to get to the specified destination when a device does not have a public IP address. This is usually the case if your ISP is doing NAT, or the external interface of your firewall is connected to a device that has NAT enabled.

The shortage of IPv4 addresses and the very slow transition to IPv6 leads to pragmatic solutions on the Internet: today many hosts are still using IPv4 and are connected to the Internet over a Network Address Translation (NAT) router. However, there are many applications, which need inbound connections, like e.g. peer-to-peer-based systems or voice-over-IP. For such NATed hosts, inbound connections usually pose a problem, since without additional measures the router/firewall filters the incoming connection attempts. These additional measures are usually referred to as NAT traversal mechanisms and NAT hole punching is one of those techniques.

*Hole punching* (or sometimes *punch*-through) is one of the most common techniques in computer networking for establishing a direct UDP connection between two parties in which one or both are behind firewalls or behind routers that use network address translation (*NAT*). It is called *UDP hole punching* because it *punches* a *hole* in the firewall of the network which allows a packet from an outside system to successfully reach the desired client on a network using NAT.

## Enable NAT traversal (hole punching) mechanism

> Currently, If port mapping succeeded, Mysterium is skipping the NAT hole punching. On the other hand, if the port mapping process fails or it's not configured, then the NAT hole punching is used.  

The default comma separated order of NAT traversal methods to be used for providing service (default: "manual,upnp,holepunching").

Providers can change the ordering of NAT traversal methods and prioritize NAT hole punching. In this case *--traversal="holepunching,manual,upnp"* flag  should be added into the *DAEMON_OPTS=""* in the service configuration file: */etc/default/mysterium-node*. 

In the end it would look like this:

```bash
DAEMON_OPTS="--traversal=\"holepunching,manual,upnp\" --keystore.lightweight"
SERVICE_OPTS="wireguard"
```


## Disable NAT traversal (hole punching) mechanism

While in most cases NAT hole punch helps the Mysterium node runners to establish the connection with our network consumers, the technique is not applicable in all scenarios or with all types of NATs, as NAT operating characteristics are not standardized.

If this approach does not work for you, you can try the following:

1. Manually forward a port in your router.
2. Enable the UPnP feature. UPnP and NAT-PNP protocols provide automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not.

> NAT (Network Address Translation) is used to enable internet access for computers that do not have an external internet address (IP). Usually of the form like 192.168.x.y or 10.x.y.z

If you are running a node on a computer behind NAT you will need some means to enable access to your node from outside your local network. Below are suggested methods to enable such external access.

Essentially you need to make ports on which node services run accessible from outside. This can be achieved by enabling the automatic port configuration feature (UPnP) or manually forwarding ports on your router.

## Port forwarding

It is a technique that is used to allow external devices access to computer services on private networks. It does this by mapping an external port to an internal IP address and port. Most online gaming Applications will require you to configure **port forwarding** on your home router. 

Since **WireGuard** uses UDP to transmit the encrypted IP packets, you will have to manually forward the range of UDP ports. 

1. Open the terminal window and navigate to the following file (located in `/etc/default` directory):

```bash
nano /etc/default/mysterium-node
```
This file holds the default myst service configuration information.

2. Use `--udp.ports=""` flag to set range of listen ports (default: "10000:60000"). You can freely specify the range between 10000 and 60000. In the below example, we will use the following range: `--udp.ports="30000:60000"`. This flag `--udp.ports="30000:60000"` should be added into DAEMON_OPTS="" line.

In the end, it would look like this:

```bash
DAEMON_OPTS="--keystore.lightweight --udp.ports=30000:60000"
SERVICE_OPTS="wireguard"
```

<a href="https://ibb.co/VjwJnsf"><img src="https://i.ibb.co/M2BZwmF/config-file.png" alt="config-file" border="0"></a>

Write out the output by clicking `ctrl+o` and hit `enter`.

After you make changes to your service configuration file, use systemctl to introspect and restart your node service. Run `sudo systemctl restart mysterium-node` to apply the changes. 

**Note!**

* `--wireguard.listen.ports` & `--p2p.listen.ports*` has been deprecated starting from the Testnet3+, use above flag to manually set range of listen ports.

A summary of the steps to setup a port forward in your router are:

1. Login to your router.
2. Navigate to your router's port forwarding section, also frequently called virtual server.
3. Create the port forward entries in your router.
4. Test that your ports are forwarded correctly.

[How to forward ports on your router | PCWorld](https://www.pcworld.com/article/244314/how_to_forward_ports_on_your_router.html)


### UPnP or NAT-PNP support

UPnP and NAT-PNP protocols provide automatic port configuration features for various routers (gateways). Some routers have these features enabled by default, some have not. It allows apps on your device to open ports on your router when needed and to close them when they are stopped.

UPnP might be convenient, but it adds its potential security issues. It assumes that every device on your local network is trustworthy. So if you happen to get infected by malware that wants to initiate a direct connection with a remote attack, your UPnP router will allow it without question. Such a connection would be much more difficult to open with UPnP disabled.

### TCP/UDP Ports

A **TCP/UDP port** identifies an **application or service** on a machine in a TCP/IP network. On a TCP/IP network, every device must have an IP address that identifies the device which can run **multiple** applications/services.The **port** identifies the **application/service** running on the machine. The use of ports allows computers/devices to run multiple services/applications.

## Firewall configuration

#### Logs show client attempts, but it does not fully connect

There might be many things, but the most frequent is a firewall. If You run node via docker image, check that *ip_forwarding* is enabled on a host and that UDP service port is allowed from outside.

check ip_forward status:

```bash
cat /proc/sys/net/ipv4/ip_forward
```

enable ip_forward if disabled:

```bash
sysctl -w net.ipv4.ip_forward=1
```

It also might be that the default firewall forward policy is set to `DROP`. In that case, try setting it to `ACCEPT`. Generic way to do it, provided there are no other interfering rules:

```bash
iptables -P FORWARD ACCEPT
```

## Running the node behind a Mobile Router

If you are planning to run the node behind the Mobile Router (cellular network), then you need to take into account the following:

1. check that "Cone NAT" is used under "NAT settings" of the Router
2. check the "Firewall" settings of the Router, that it's not blocking the traffic
3. check your "IP filter" settings, that there are no special rules for the packets
4. check your "MAC Address Filter" settings, that there are no special rules for the device you are running node on

## Forgot password

#### To reset your Node UI password in Linux, run the following commands via terminal:

```bash
myst reset --tequilapi
```
or
```bash
myst reset
```

#### Raspberry Pi

SSH into your RaspberryPi:

```bash
ssh myst@ip-of-your-raspberry
```
then run:

```bash
myst reset
```

#### Docker

Open terminal window and run:

```bash
docker exec -it <container-id> /bin/sh
```
then run:

```bash
myst reset
```

#### Set new password

Open your Node UI in your browser (must be on the local network, this won't work through a reverse proxy) and enter your new password on the set-up screen.
