---
title: NAT traversal
weight: 10
---

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
