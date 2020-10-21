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

## Install and start Mysterium Node service 

Follow [Linux](/node-runners/setup/linux/) installation instructions.

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
