---
title: Installation & Configuration
weight: 10
---

## Node system requirements

Current node binaries should run on x86-64 linux architecture. Other architectures might work, but are not being tested. We test our docker images on Ubuntu, Debian 9/10 and CentOS.

To be able to run docker image, Your OS should support docker. This usually means that Your OS should have linux kernel version >= 3.10

Since Mysterium Network node is written in `go` its memory footprint is quite small. Most of the resources will be consumed by OpenVPN, WireGuard, Ethereum wallet (integrated into our binary) and system itself.

Minimum resources we tested with was 1GB of RAM.

It is suggested to run a node on a decent network connection to give VPN users best experience.
