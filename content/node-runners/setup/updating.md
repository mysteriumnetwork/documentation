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

Check the Repository, Tag, Image ID, Creation date and size of the current build.

```bash
docker images
```

Delete the image that is already being used by your Docker container:

```bash
docker rmi -f ImageID
```

Use the latest docker image:

```bash
mysteriumnetwork/myst:testnet2
```

If Docker is unable to find the required image locally, it will pull it from `mysteriumnetwork/myst` repository.
