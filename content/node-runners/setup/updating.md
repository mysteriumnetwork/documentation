---
title: Updating your node
description: How to update your node to the latest version
---

## How to update your Raspberry Pi node

SSH into your Raspberry Pi using the following command:

```bash
ssh myst@ip-of-your-raspberry
```

The default password is  `mystberry`.

Then to update your RPI, run:

```bash
sudo apt update; sudo apt install myst
```

## How to update your Linux node

To update your Linux node, run:
```bash
sudo apt update; sudo apt install myst
```

## How to update your Docker node

In order to update your Docker node, run the following commands.

**_Note 1:_** Make sure that you have your data in the persistent storage like `myst-data`.

**_Note 2:_** You can backup your keys before trying to update node version [FAQ](https://docs.mysterium.network/resources/faq/).

Pull the latest node image.

```bash
docker pull mysteriumnetwork/myst
```

Delete the container that is already being used for running node:

```bash
docker rm -f myst
```

Follow the running a docker node [guide](https://docs.mysterium.network/node-runners/setup/docker/) to start a new container.

## How to setup automatic node updates on Ubuntu/Debian/RaspberryPi

### Install the unattended-upgrades package

The unattended-upgrades package can be configured to perform unattended upgrades to install updated packages and security updates automatically. To install the unattended-upgrades package along with a package to identify the changes, enter the following in your terminal:

```bash
sudo apt -y install unattended-upgrades apt-listchanges
```
### Configure unattended-upgrades

<a href="https://ibb.co/tH5n818"><img src="https://i.ibb.co/nwS4zKz/Screenshot-2021-11-10-at-08-11-55.png" alt="Unattended-upgrades" border="0"></a>

The unattended-upgrades config file location is `/etc/apt/apt.conf.d/50unattended-upgrades`. Lines starting with a double slash `//` have no effect. Therefore, to “enable” a line, remove the double slash `//`.

### Allowing automatic node updates on RaspberryPi

Edit the `20unattended-upgrades` configuration file:

```bash
sudo nano /etc/apt/apt.conf.d/20auto-upgrades
```

and your configuration file should look like this:

```bash
APT::Periodic::Update-Package-Lists "1h";
APT::Periodic::Download-Upgradeable-Packages "1h";
APT::Periodic::AutocleanInterval "7";
APT::Periodic::Unattended-Upgrade "1h";
```

Edit the `50unattended-upgrades` configuration:

```bash
sudo nano /etc/apt/apt.conf.d/50auto-upgrades
```

and your configuration file should look like this:


```bash 
Unattended-Upgrade::Origins-Pattern {
        "origin=Raspbian,codename=${distro_codename},label=Raspbian";
        "origin=Raspbian,codename=${distro_codename},label=Raspbian-Security";
        "o=LP-PPA-mysteriumnetwork-node";
};

Unattended-Upgrade::AutoFixInterruptedDpkg "true";
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
// Automatically reboot *WITHOUT CONFIRMATION* if
//  the file /var/run/reboot-required is found after the upgrade
Unattended-Upgrade::Automatic-Reboot "true";
// Automatically reboot even if there are users currently logged in
// when Unattended-Upgrade::Automatic-Reboot is set to true
Unattended-Upgrade::Automatic-Reboot-WithUsers "true";
```

### Allowing automatic node updates on Ubuntu/Debian

The section that controls what packages are updated automatically starts with `Unattended-Upgrade::Allowed-Origins {`. You can enable all packages or security updates only. For software that is not on the Ubuntu repos that you would like to update, you need to add an origin and archive to the file. To find what those are for your PPAs, open the folder `/var/lib/apt/lists/`, that is the storage area for state information for each package resource and look for the file that end with Release in the name. Navigate to this file.

Inside you will see something like the following:

<a href="https://ibb.co/vDJbwYR"><img src="https://i.ibb.co/b7rxWJD/ppa.png" alt="ppa" border="0"></a>

The origin is (Origin: LP-PPA-mysteriumnetwork-node-mainnet) and the archive will be whatever is under the line Suite (Suite: focal).

Now edit `/etc/apt/apt.conf.d/50unattended-upgrades` to include it:

```bash
// Automatically upgrade packages from these (origin:archive) pairs
//
// Note that in Ubuntu security updates may pull in new dependencies
// from non-security sources (e.g. chromium). By allowing the release
// pocket these get automatically pulled in.
Unattended-Upgrade::Allowed-Origins {
        "${distro_id}:${distro_codename}";
        "${distro_id}:${distro_codename}-security";
        // Extended Security Maintenance; doesn't necessarily exist for
        // every release and this system may not have it installed, but if
        // available, the policy for updates is such that unattended-upgrades
        // should also install from here by default.
        "${distro_id}ESMApps:${distro_codename}-apps-security";
        "${distro_id}ESM:${distro_codename}-infra-security";
//      "${distro_id}:${distro_codename}-updates";
//      "${distro_id}:${distro_codename}-proposed";
//      "${distro_id}:${distro_codename}-backports";
        "LP-PPA-mysteriumnetwork-node-mainnet:focal";
};
```

`unattended-ugprades` is running automatically and is called via `cronjob`. If you want to debug it, you can easily run it with parameter: 

```bash 
sudo unattended-upgrades -d
```

All logs can be found here: `/var/log/unattended-upgrades/unattended-upgrades.log`
