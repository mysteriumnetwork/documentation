---
title: Firewall
weight: 10
---

## In logs I see client's attempts, but it does not fully connect

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
