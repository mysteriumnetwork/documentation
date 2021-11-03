---
title: Raspberry Pi guide
description: How install and run a node on a Raspberry Pi device
---

The Raspberry Pi is a low cost, mini-computer used by our node runners to help power Mysterium Network.
It provides a stable, 24/7 network connection, and most importantly, it enables you to earn with minimal effort on your part.
While there are other options for running a node, with an RPI you no longer need to worry about closing your laptop lid or keeping your PC on.
Once it's plugged in and set up you can forget all about it.

You can get a <a href="https://raspberrypi.dk/en/product/mysterium-network-node-raspberry-pi-starter-kit/">Mysterium Node preloaded on a Raspberry Pi delivered to your door</a>, but we honestly recommend you get one at a store nearby and follow our guide below.

## Supported Raspberry Pi models
- RPI 3B
- RPI 3B+
- RPI 4B

## How to get a Raspberry Pi
Our partner [raspberrypi.dk](https://raspberrypi.dk/en/product/mysterium-network-node-raspberry-pi-starter-kit/) sells pre-configured Raspberry Pi devices (installed with Mysterium Network node software).
All you need to do is plug it in, claim your node and link your wallet to start earning.

## Flash an existing Raspberry Pi

> **Warning! This will erase any existing software on your Raspberry PI device!**

- Download the Mysterium Node RPI image: [mystberry.zip](https://github.com/mysteriumnetwork/node/releases/latest/download/mystberry.zip)
- Download Balena Etcher if you haven’t already got it: https://www.balena.io/etcher/
- Insert the microSD into the provided SD card reader and connect it to your computer.
- Open BalenaEtcher and select mystberry.zip as the image. Select the SD card file as the target.
- Make yourself a tea. Wait until your Flash! is complete.
- Insert the microSD card into your Raspberry Pi.
- Plug in the network cable into your router and then the power cord. It may take a few minutes before the Pi is fully up.

## Complete installation

Once the service is installed and running to finish the node installation continue to the [NodeUI](https://docs.mysterium.network/node-runners/node-ui/), where you'll be able to set payout address, manage service settings and check node stats and connections. Instructions on how to find and use it can be found: [here](https://docs.mysterium.network/node-runners/node-ui/).

Also make sure to claim your node in MMN to receive bounties. It can be found [here](https://my.mysterium.network). To receive your key, you'll have to create an account when following the NodeUI onboarding process or add it later in the node settings.

If you can't access NodeUI or service is not working as expected, follow the below instructions on how to check service health, diagnose issues or add extra configuration.

## Raspberry Pi device security

We recommend that you change your SSH login credentials, especially if your RPI is not connected to your home router and has a public IP address.

### Default SSH credentials

|           | credential
|-----------|-----------|
| Username  | myst
| Password  | mystberry

### SSH into your Raspberry Pi
Generally you can avoid logging into the device, but in cases you do - here's how.
```bash
ssh myst@ip-of-your-raspberry
```

If this gives you _Permission denied (publickey,password)_ try this:
```bash
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no myst@ip-of-your-raspberry
```

If you don't know what's the IP that your Raspberry Pi device obtained from the DHCP service running in your router, login into your router (usually [https://192.168.0.1](https://192.168.0.1)) and look for the _LAN Settings_ section.
From there you should be able to find the _Clients list_ section where the IPs given to all the devices connected to your router are listed. Look for _raspberrypi_ among the listed devices: usually its IP will be something like _192.168.0.XY_

### Change your SSH password (recommended)
Make sure to remember your new password.
```bash
passwd
```

### Reset your lost SSH password
- Power down your Pi, pull out the SD card out of the device and insert it into your computer.
- Open the file `cmdline.txt` and add `init=/bin/sh` to the end. This will cause the machine to boot in a single user mode.
- Place the SD card back into the Pi and boot.
- A command prompt will come up, type in `su` to log in as root (no password needed).
- Type in `passwd myst` and then follow the prompt to enter a new password.
- Shut the machine down, pull the card out and put the `cmdline.txt` file back the way it was by removing the `init=/bin/sh` line.

## Install latest stable version of the node on your own Raspberry Pi device

### SSH into your Raspberry Pi

```bash
ssh myst@ip-of-your-raspberry
```
Note: To find out the IP address of your Raspberry Pi - you may try the following commands:
```bash
ping raspberrypi.local
```
or
```bash
ping raspi
```

### Install a Mysterium node

We do provide an installation script written in `bash` which can be downloaded and executed using this command:

```bash
sudo apt-get install curl
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

In addition to downloading and installing our Node on your Raspberry Pi, this command will also install additional required dependencies like WireGuard if you don't have it already.


## Install pre-release version of the node

Add pre-release repository:

```bash
grep -qxF 'deb http://ppa.launchpad.net/mysteriumnetwork/node-pre/ubuntu focal main' /etc/apt/sources.list || echo 'deb http://ppa.launchpad.net/mysteriumnetwork/node-pre/ubuntu focal main' | sudo tee -a /etc/apt/sources.list > /dev/null
```

Download package information from the sources and update local cache with available versions:

```bash
sudo apt-get update
sudo apt-cache policy myst
```

You'll see similar output to the following:

```bash
myst:
  Installed: 0.46.2~rc0+build295039394+focal
  Candidate: 0.47.0~rc0+build301789769+focal
  Version table:
     0.47.0~rc0+build301789769+focal 500
        500 http://ppa.launchpad.net/mysteriumnetwork/node-pre/ubuntu focal/main armhf Packages
 *** 0.46.2~rc0+build295039394+focal 500
        500 http://ppa.launchpad.net/mysteriumnetwork/node/ubuntu focal/main armhf Packages
        100 /var/lib/dpkg/status
```

Look for the "Candidate" newer version:
`0.47.0~rc0+build301789769+focal`

Copy that name and run:
```bash
sudo apt install myst=<snapshot_name>
```

Your node should be running the pre-released version.

If you want to return to the latest released version, check the output of `apt-cache` command and take the "Installed" name:
`0.42.1+1snapshot+20210209T0736+c7e732d6+build253474985+focal`

Please run

```bash
sudo apt install myst=<previously_installed_name>
```
