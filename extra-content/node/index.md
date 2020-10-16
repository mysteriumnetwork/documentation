---
title: Node troubleshooting
weight: 10
---

## I am getting "403 Forbidden" error

If you see the message "identity is not registered" for the 403 error, that means that you are trying to connect with an unregistered identity.

You need to finish registration process for your identity to be accepted.

This error might also mean that you are connecting to discovery service which is closed for Your IP, either because someone from your IP was abusing the service or due to load issues.


## What client software to use with Mysterium Network node?

Mysterium team created client software called **Mysterium VPN** and it is available [here](https://github.com/mysteriumnetwork/mysterium-vpn/releases). 

You can also use lightweight CLI client available from Mysterium Node repository. If you have node sources you can try running:

```
# cd github.com/mysterium/node
# ./bin/client_build; ./bin/client_run_cli
```

### How to launch a Mysterium CLI:

1. Download binary or .deb package directly from Mysterium Github repository [Releases · mysteriumnetwork/node · GitHub](https://github.com/mysteriumnetwork/node/releases "https://github.com/mysteriumnetwork/node/releases") 
2. Locate the correct path and launch a Mysterium CLI: `./myst cli` 
3. Create new identity: `identities new` 
4. Unlock your newly created identity: `identities unlock {IDENTITY_ID}`
5. Register your newly created identity: `identities register {IDENTITY_ID}` 
6. Connect to the remote node: `connect <consumer-identity> <provider-identity> <service-type>`

Currently, there are two types of services: OpenVPN and WireGuard.

## I launched a node, how to know if it is working?

Best is to test with a client. Still there are other ways to be reasonably sure. If you run your node via docker, check its status and logs:

```
# docker ps
# docker logs -f myst
```

You should see `myst` container running. If not, check the logs. You should see something like this:

```
...
[Mysterium.api] Identity registered: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
[Mysterium.api] Proposal pinged for node: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
...
```

It means that node successfully registered to discovery and its service proposal is available for mysterium network clients.

## Node installed with a DEB package

The installed DEB package will be starting a node service automatically.

You can check details using the following command:

```
sudo systemctl status mysterium-node.service
```



### Logs

To get a detailed log for Mysterium node service, you can use the following command:

```
sudo journalctl -u mysterium-node.service
```
