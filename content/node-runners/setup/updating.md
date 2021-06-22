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
