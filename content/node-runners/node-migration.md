---
title: Migrating your node
description: Node migration from one device to another
---

Migrating a currently running node to a different machine is a fairly straightforward process which consists of two steps:
* Installing a node in your new machine
* Copying your previuos node `data-dir` in to your new node.

To install a node on a new machine please follow our initial set up tutorials for linux, raspberry or docker.

## Finding `data-dir` in docker node (Linux host)

When creating a docker node we recommend you create one using a volume flag for the `data-dir` for example: `-v myst-data:/var/lib/mysterium-node`.
If you followed our docker instructions then your `data-dir` is the directory given when creating the volume (in the example case its `myst-data`).

You can also find it by executing:
```bash
docker inspect myst
```

And locating the `Binds`:
```bash
...
        "HostConfig": {
            "Binds": [
                "myst-data:/var/lib/mysterium-node" # "myst-data" is our data-dir
            ],
            "ContainerIDFile": "",
             "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "default",
            "PortBindings": {
                "4449/tcp": [
                    {
...
```

If you cannot find it or you didn't create a volume for the data dir, you will have to [exec](https://docs.docker.com/engine/reference/commandline/exec/) in to the
docker container and follow our linux/raspberry instructions on how to retrieve it.

## Finding `data-dir` in docker node (MacOS host)

When using Docker Desktop for MacOS, the containers and all data are stored within the Linux VM. Since the new version of Docker (mine is 20.10.7) uses socket instead of TTY to communicate with the VM, we will use the NC command and open the debug shell socket to interact with the virtual machine:

```bash
nc -U ~/Library/Containers/com.docker.docker/Data/debug-shell.sock
```

Find your data directory (keystore, testnet2 folders & nodeui-pass file):

```bash
/ # ^[[34;5Rls /var/lib/docker/volumes/myst-data/_data/
```

**Note!** As of July 2021, Docker Desktop for Mac has announced that users will be able to access volumes directly from the GUI, but only with Pro and Team accounts.


## Finding `data-dir` in docker node (Windows host)

To be updated..

## Finding `data-dir` in linux/raspberry node 

With the `node` service running you can execute:
```bash
myst config show | grep data-dir
```

Output should be similar to `data-dir: DIR` where `DIR` is actual directory on your machine where `node` holds files and directories we need to move.

## Migrating to a docker node 

Simply copy your previuos `data-dir` directory somewhere on your new machine and follow our docker set up guide replacing the `-v` flag in the guide with: `-v YOUR_COPIED_DATA_DIR_PATH:/var/lib/mysterium-node`.

## Migrating to a linux/raspberry node 

After installing a new node on `linux` or `raspberry` locate the directory where
it's trying to read required data from by running:
```bash
myst config show | grep data-dir
```

Stop the currently running node by executing:
```bash
systemctl stop mysterium-node.service 
```

And replace the current `data-dir` together with its innards with the one you copied from the past node setup. After that restart the node:
```bash
systemctl restart mysterium-node.service 
```

In case you're migrating from a non linux node you'll have to transfer the ownership of files and folders inside the `data-dir` by running:
```bash
sudo chown -R mysterium-node YOUR_DATA_DIR_FOLDER_HERE 
```
