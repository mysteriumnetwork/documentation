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

### TCP/UDP Ports

A **TCP/UDP port** identifies an **application or service** on a machine in a TCP/IP network. On a TCP/IP network, every device must have an IP address that identifies the device which can run **multiple** applications/services.The **port** identifies the **application/service** running on the machine. The use of ports allows computers/devices to run multiple services/applications.

## Firewall configuration

#### Logs show client attempts, but it does not fully connect

There might be many things, but the most frequent is a firewall. If You run node via docker image, check that *ip_forwarding* is enabled on a host and that UDP service port (specified by `--openvpn.port` flag) is allowed from outside.

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

To reset your Node UI password, run the following commands via the node CLI:

```bash
myst reset --tequilapi
```
or
```bash
myst reset
```
