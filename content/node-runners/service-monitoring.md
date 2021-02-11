---
title: Service monitoring
description: How we monitor your nodes
---

Mysterium network nodes are periodically monitored by our monitoring platform.

Create a [My Mysterium Network](https://testnet2.mysterium.network/) account to get service health alerts, node reports and participate in the bounty program.
### How the monitoring agent connects to your nodes

- Every 24 hours we send 1GB of data to check your speed and connection health.
- Every 6 hours we attempt to connect to make sure your node is accessible.

### How to trigger a connection check

To trigger a monitoring check manually, log in to your [My Mysterium Network](https://testnet2.mysterium.network/) account,
go to your node's dashboard where you will find a "Check connection" button.

<div style="text-align:center">
  <img src="../images/node-ui/check-connection-button.png" alt="Check connection button" class="screenshot" />
</div>

This manual connection check will attempt to connect to your OpenVPN and Wireguard services.

*There are no limits for how many times you can perform this check, however manually triggered connection checks do not perform data transfers.*
