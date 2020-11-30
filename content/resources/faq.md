---
title: Frequently Asked Questions
description: Common questions asked by our community
---

Everyone has questions about how to properly set up a GraphQL schema, but not all questions are alike. In different stages of development, different things matter. This guide answers questions that people commonly have at every step along the journey to GraphQL in production.

## What is Mysterium Network?
We are building a permissionless VPN Node Network to help rewire the fabric of the internet.

Our node software is available on Linux (including Raspberry Pi) and Mac. We are currently running an incentivised research and development initiative.
Live in the UK, US, Germany or Italy? [Find out more](https://mysterium.network/node/).

## What is the Mysterium Node Pilot?
The Mysterium Node Pilot is an R&D initiative to help us with rigorous feedback loops while we build a global permissionless VPN network.

For details on our node bounty, click here.

Find out more about how you can turn your wifi into a business here.

## I suspect that my hosting provider blocks ports, what to do?

For some hosting providers it is common to open just some pre-defined ports that are commonly used. Try setting any random service to test if incoming UDP port (i.e. 1194) is open. You can try using custom port using `openvpn.port=1234` option.

Sometimes hosting providers block most UDP ports altogether, even outgoing ones. In that case You can still run a node using TCP protocol. You can do that using `-openvpn.proto=TCP` option.

## I launched a node, how to know if it is working?
Best is to test with a client. Still there are other ways to be reasonably sure.
If you run your node via docker, check its status and logs:
```shell
# docker ps -a
# docker logs -f myst
```
You should see `myst` container running. If not, check the logs. You should see something like this:
```
...
[Mysterium.api] Identity registered: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
[Mysterium.api] Proposal pinged for node: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
...
```
It means that node successfully registered to discovery and its service proposal is available for mysterium network clients.

If you are running it as a service, you can do a service status check:

```shell
sudo systemctl status mysterium-node.service
```

## I want to backup / restore my identity, how should I do that?
On the first run node generates its identity automatically. Later this identity is reused each time node is started. If You run Mysterium Network node from sources, binaries or deb packages You can find Your identity in `keystore` directory in Your data directory (i.e. `--data-dir=/var/lib/mysterium-node`).

If You use docker image, it is strongly recommended **not** to store identity inside docker container (since You might need to remove container in order to upgrade), but to mount Your keystore from Your host to container using `-v host_volume:container_volume` option  as follows:
```shell
docker run --cap-add NET_ADMIN --net host -v /home/mysterium-node:/var/lib/mysterium-node --name myst -d mysteriumnetwork/myst service --agreed-terms-and-conditions
```

## How should I set a passphrase for node identity?
By default, generated identity is not protected with any password, that is password is an empty string. If You want to generate a password protected identity You can add `--identity.passphrase` to running command:
```shell
docker run --cap-add NET_ADMIN --net host --name myst -d mysteriumnetwork/myst service --identity.passphrase=your_passphrase_here
```

If You have multiple identities, You can choose exact identity using `--identity` option. If no identity exists, new one will be created automatically.

After node restart, if no `--identity` option is present, last one used will be reused.

## VPN speed through my node is really low, what can I do?

Speed is affected by many things. What to check:
* What is the speed between Your desktop and server host without VPN?
* What is delay from Your desktop to host?
* Does Your hosting provider guarantees You a certain minimal throughput?
* Does the speed depends on the time of day?
* Do You have free resources on Your host? (idle CPU / free memory)

To achieve best results, client (desktop computer) has to be as close (low delay) as possible.
Try a different node if speed is constantly low.
