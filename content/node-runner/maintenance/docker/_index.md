---
title: Docker
weight: 10
---

[Docker](https://www.docker.com/) is a tool that enables developers to ship and run applications such as a Mysterium Node by the use of containers. A container holds all the required libraries, services and other application dependencies and ships it as a single package.

The advantage of docker is that it requires a lot less computing power when compared to virtual machines as it reuses the kernel of the operating system on the host machine and isolates the containerized application from global system settings and environmental factors. This makes it easy to run applications without worrying about the operating system compatibility issues, as well as collisions with other installed software or system configuration.

### How to update your Docker node

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
mysteriumnetwork/myst:latest
```

if Docker will be unable to find the required image locally, it will pull from `mysteriumnetwork/myst` repository.
