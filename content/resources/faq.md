---
title: Frequently Asked Questions
description: Common questions asked by our community
---

Everyone has questions about how to properly run a Mysterium node, but not all questions are alike. In different stages of setup, different things matter. This guide answers questions that people commonly have at many step along the journey to Mysterium node run.

## What is Mysterium Network?
We are building a permissionless VPN Node Network to help rewire the fabric of the internet.

Our node software is available on Linux (including Raspberry Pi) and Mac. We are currently running an incentivised research and development initiative.
Live in the UK, US, Italy, Germany, Australia or the Netherlands? [Find out more](https://mysterium.network/node/).

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
```bash
# docker ps -a
# docker logs -f myst
```
You should see `myst` container running. If not, check the logs. You should see something like this:
```bash
...
[Mysterium.api] Identity registered: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
[Mysterium.api] Proposal pinged for node: 0x4cd126119cd14e38c90e34dd8b6e0e2174b71123
...
```
It means that node successfully registered to discovery and its service proposal is available for mysterium network clients.

If you are running it as a service, you can do a service status check:

```bash
sudo systemctl status mysterium-node.service
```

## I want to backup / restore my identity, how should I do that?
On the first run node generates its identity automatically. Later this identity is reused each time node is started. If You run Mysterium Network node from sources, binaries or deb packages You can find Your identity in `keystore` directory in Your data directory (i.e. `--data-dir=/var/lib/mysterium-node`).

If You use docker image, it is strongly recommended **not** to store identity inside docker container (since You might need to remove container in order to upgrade), but to mount Your keystore from Your host to container using `-v host_volume:container_volume` option  as follows:
```bash
docker run --cap-add NET_ADMIN --net host -v /home/mysterium-node:/var/lib/mysterium-node --name myst -d mysteriumnetwork/myst service --agreed-terms-and-conditions
```

## How should I set a passphrase for node identity?
By default, generated identity is not protected with any password, that is password is an empty string. If You want to generate a password protected identity You can add `--identity.passphrase` to running command:
```bash
docker run --cap-add NET_ADMIN --net host --name myst -d mysteriumnetwork/myst service --identity.passphrase=your_passphrase_here
```

If You have multiple identities, You can choose exact identity using `--identity` option. If no identity exists, new one will be created automatically.

After node restart, if no `--identity` option is present, last one used will be reused.

## My node is reporting it's country incorrectly

The nodes location is detected automatically when the node is started. However, any location detection is always an estimate. We're using MaxMind for these estimates. If your node is showing an incorrect country, you can fill out the [MaxMind GeoIP correction form](https://support.maxmind.com/geoip-data-correction-request/correct-a-geoip-location/). After your correction is accepted your node location should start showing the correct country. To reload the location, please restart your node. Take note that it could take up to a week for the changes to be visible on our end.

## VPN speed through my node is really low, what can I do?

Speed is affected by many things. What to check:
* What is the speed between Your desktop and server host without VPN?
* What is delay from Your desktop to host?
* Does Your hosting provider guarantees You a certain minimal throughput?
* Does the speed depends on the time of day?
* Do You have free resources on Your host? (idle CPU / free memory)

To achieve best results, client (desktop computer) has to be as close (low delay) as possible.
Try a different node if speed is constantly low.

## Set a payout ETH address

To add a payout ETH address to the identity use the following commands:

```bash
curl -X PUT -d '{"ethAddress":"0x000000000000000000000000000000000000000a"}' http://localhost:4050/identities/0x041e42becaa3a6f92e155a7a5cab62c49dcdc578/payout
```

```bash
myst cli payout set 0x041e42becaa3a6f92e155a7a5cab62c49dcdc578 0x000000000000000000000000000000000000000a
```

## Supported node runner platforms

You can find the list [here](/#you-can-run-a-mysterium-node-on).

## Multiple nodes on a single network

We do not support multiple devices under a single internet line. Having multiple nodes will likely to affect your internet connection quality as well as reduce service stability.

Each node must be linked to a different residential IP address, so unless you have multiple routers, each with their own IP and node linked to it, it's not possible.

**Bounties will not be paid to node runners running multiple nodes under the same IP address.**

## How does Mysterium Network use whitelisting to protect users?

A whitelist is a list of items which is given permission to access certain systems or protocols. Programs, computers and companies use these lists to know who their trusted users or sources are. When a whitelist is used, every other participant is denied access until the network approves them.

**In the case of Mysterium Network, we have a whitelist that we use to protect our nodes from malicious incoming traffic. It’s an in-built security feature that allows us to protect node runners like you so that you only receive “clean” traffic.**

This is the default setting of our node runner software. In the future, this whitelist will include partners who have met our KYC rules. Right now, the only traffic that passes through your node is the test traffic sent from Mysterium Team.

**In the future, we will identify and block bad actors from our network through the use of registered identities (Mysterium ID) and a network-wide reputation system.**

You can read more about this and our whitelisting policy [in our blog](https://mysterium.network/2019/08/21/mysteriums-whitelisting-policy-and-what-it-means-for-you/)!

## How will running a node affect my home internet?

Running a node should have very little impact on your home internet.

While you may notice from time to time that your internet is slower, it’s unlikely that any speed downgrade will be noticeable.

If it is, you can always check [my.mysterium.network](https://my.mysterium.network/) dashboard, or your local RPI user interface, to see if there are any active sessions that may be affecting your connection.

## Do dynamic IP addresses affect my node?

Dynamic IP addresses should not affect your node since the IP changes usually happen during router reboot or during ISP maintenance windows.

If you restarted the router or for any reason the IP changed, current ongoing sessions would be interrupted/dropped. The clients would have to reconnect, but otherwise you wouldn't need to do anything.

## Where I can get the Mysterium Network node software?

### Docker image

You can download Mysterium image from [DockerHub](https://hub.docker.com/r/mysteriumnetwork/mysterium-node/) directly:
```bash
docker pull mysteriumnetwork/myst
```
It will download the latest version of node.

### Packages and binaries

Latest stable versions can be found in [releases](https://github.com/mysteriumnetwork/node/releases) section of Github.

### Sources

If you are willing to try latest and greatest, you can fetch sources:

```bash
git clone https://github.com/mysteriumnetwork/node.git
```

## Routers without UPnP capability

For routers without UPnP you do not need to do anything. Connectivity issues are solved through built-in NAT hole punching capabilities, therefore you should not configure port forwarding to any ports manually.

If this approach does not work for you and you want to manually forward some port, you will also need to configure your node to run the service on that port.

[How to configure OpenVPN & WireGuard services port.](https://help.mysterium.network/en/articles/3439738-openvpn-service-port-configuration)

## Every time I reboot a host, I see unneeded firewall rules

Depending on Linux distribution You run, there might be different default firewall policies. Sometimes You might need to change / disable certain default policies. See respective firewall documentation of Your OS.

In some cases, firewall rules that are being introduced by docker package might interfere with Mysterium Network node rules (such as in Centos7 for example). In that case try changing conflicting rules or disable extended firewall rules by docker altogether. This might be achieved passing `--iptables=false` option before starting docker service.

## I suspect that my firewall blocks access, what to do?

You can check all firewall rules with these commands:

```bash
# iptables -L -n # iptables -L -n -t nat
```

To completely strip host of firewall rules and chains You can do:

```bash
# iptables -F # iptables -t nat -F # iptables -X
```

## OpenVPN & WireGuard services port configuration

**Warning**: Your node should be accessible through built-in NAT hole punching capabilities. If that doesn't work, you can try the following.

For Raspberry PI nodes, the OpenVPN service port can be set directly under Settings page in the Node UI (http://[node_ip]:4449). Once that is done, hit save and it will be automatically adjusted in the configuration file.

**For all other types of configuration, you will need to modify the `/etc/default/mysterium-node` configuration file and change the service options (OpenVPN and WireGuard) there.**

If you run a command line node, use the `service` command options.

For example, if you'd like your OpenVPN service to run on port `1194` and WireGuard service to listen on `52820:53075` range of ports, then use the following flags:  
```bash
--openvpn.port=1194
```

```bash
--wireguard.listen.ports=52820:53705
```

**Note!** It is required to set ports needed for P2P communication too (range of P2P listen ports (e.g. 51820:52075)):

```bash
--p2p.listen.ports=51820:52075
```

In the end it would look like this:

```bash
DAEMON_OPTS="--p2p.listen.ports=51820:52075 --keystore.lightweight"
SERVICE_OPTS="--openvpn.port=1194 --wireguard.listen.ports=52820:53705 openvpn,wireguard"
```


**IMPORTANT**: Don't forget to set selected port forwarding on your router.

## Installing a Mysterium node using prebuilt DEB package

Prebuilt DEB packages are available for downloading from the Mysterium node repository release page: [https://github.com/mysteriumnetwork/node/releases](https://github.com/mysteriumnetwork/node/releases)

1) Download `myst_linux_amd46.deb` or any other available package (depending on your OS);
2) Install the downloaded package:

```bash
sudo dpkg -i myst_linux_amd64.debsudo apt-get -f install
```

After the installation, the mysterium-node service be running automatically.

You can use a `sudo systemctl status mysterium-node` command to make sure a service is running correctly.

If you want to change configuration parameters of the running service you can change a `/etc/default/mysterium-node` file and restart a service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart mysterium-node
```
