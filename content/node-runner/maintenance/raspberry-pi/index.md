---
title: Raspberry Pi
weight: 1
---

### Getting started with a Raspberry Pi

The Raspberry Pi is a low cost, mini-computer used by our node runners to help power Mysterium Network. It provides a stable, 24/7 network connection, and most importantly, it enables you to earn with minimal effort on your part. While there are other options for running a node, with an RPI you no longer need to worry about closing your laptop lid or keeping your PC on. Once it's plugged in and set up you can forget all about it.

###### Supported Raspberry Pi models:

- [ ] RPI 3B
- [ ] RPI 3B+
- [ ] RPI 4B

### How to get a Raspberry Pi

Our partner [raspberrypi.dk](https://raspberrypi.dk/en/product/mysterium-network-node-raspberry-pi-starter-kit/) sells pre-configured Raspberry Pi devices (installed with Mysterium Network node software). All you need to do is plug it in, claim your node and link your wallet to start earning.

### Flash an existing Raspberry Pi

**Warning! This will erase any existing software on your Raspberry PI device!**

1. Download the Mysterium Node RPI image: [mystberry.zip](https://github.com/mysteriumnetwork/node/releases/download/0.22.5/mystberry.zip)
2. Download Balena Etcher if you haven’t already got it: https://www.balena.io/etcher/
3. Insert the microSD into the provided SD card reader and connect it to your computer.
4. Open BalenaEtcher and select mystberry.zip as the image. Select the SD card file as the target.
5. Make yourself a tea. Wait until your Flash! is complete.
6. Insert the microSD card into your Raspberry Pi.
7. Plug in the network cable into your router and then the power cord. It may take a few minutes before the Pi is fully up. 

### Installing a Mysterium node using install script

Ubuntu / Debian / Raspbian distributions can use the installation command below. It installs the latest stable node release.

Firstly, you will need to SSH into your Raspberry PI device.

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

#### Installing a Mysterium node using prebuilt DEB package

Prebuilt DEP packages available for downloading from the Mysterium node repository release page [Releases · mysteriumnetwork/node · GitHub](https://github.com/mysteriumnetwork/node/releases)

1) Download `myst_linux_armhf.deb` package to the Raspberry Pi.
2) Install the downloaded package:  

```
sudo dpkg -i myst_linux_armhf.deb
sudo apt-get -f install
```

After the installation, the `mysterium-node` service be running automatically.



Once the installation is complete, you can check your service status.

```bash
sudo systemctl status mysterium-node.service
```

To view the daemon logs.

```bash
sudo journalctl -u mysterium-node.service
```

### If you want to change configuration parameters of the running service you can change a `/etc/default/mysterium-node`  file and restart a service:

```
sudo systemctl daemon-reload
sudo systemctl restart mysterium-node
```

### Securing your Raspberry Pi Important

We recommend that you change your SSH login credentials, especially if your RPI is not connected to your home router and has a public IP address.

The default credentials are:

Username: `myst`  
Password: `mystberry`

SSH into the Raspberry Pi:

```bash
ssh myst@ip-of-your-raspberry
```

Once logged in, change the default password:

```bash
passwd
```

### Updating your Node

SSH into your PI using the following command:

```bash
ssh myst@ip-of-your-raspberry
```

The default password is `mystberry`.

Then to update your RPI, run:

```bash
sudo apt-get update && sudo apt-get upgrade myst
```

##### Configuration of your RaspberryPi node:

##### You can change the configuration of the service via `/etc/default/mysterium-node` file:

```
root@raspberrypi:~# cat /etc/default/mysterium-node
# Define additional args for `myst` service (see `myst --help` for full list)
CONF_DIR="--config-dir=/etc/mysterium-node"
RUN_DIR="--runtime-dir=/var/run/mysterium-node"
DATA_DIR="--data-dir=/var/lib/mysterium-node"
DAEMON_OPTS="--tequilapi.address=0.0.0.0"
SERVICE_OPTS="openvpn"
```

List of available options can be found using a help commands: `myst --help` or `myst service --help`.

For example, if you want to start only OpenVPN service on 1190 port and serve Mysterium verified consumer only, change the `SERVICE_OPTS=` line to the following:

```
SERVICE_OPTS="openvpn --openvpn.port=1190 --access-policy.list mysterium"
```

To apply the changed service configuration you will need to re-read configuration and restart it.

```
sudo systemctl daemon-reload
```

```
sudo systemctl restart mysterium-node
```

#### Identities

To get a list of Mysterium node identities you can use the following commands:

```
curl http://localhost:4050/identities

{
    "identities": [
        {
            "id": "0x041e42becaa3a6f92e155a7a5cab62c49dcdc578"
        }
    ]
}
```

```
myst@raspberrypi:~ $ myst cli
...
» identities list
[+] 0x041e42becaa3a6f92e155a7a5cab62c49dcdc578
»
```

##### To add a payout ETH address to the identity use the following commands:

```
curl -X PUT -d '{"ethAddress":"0x000000000000000000000000000000000000000a"}' http://localhost:4050/identities/0x041e42becaa3a6f92e155a7a5cab62c49dcdc578/payout
```

```
myst@raspberrypi:~ $ myst cli
...
» payout set 0x041e42becaa3a6f92e155a7a5cab62c49dcdc578 0x000000000000000000000000000000000000000a
[SUCCESS] Payout address 0x000000000000000000000000000000000000000a registered.
»
```
