---
title: Node Security
weight: 10
---

## I want to backup / restore my identity, how should I do that?

On the first run node generates its identity automatically. Later this identity is reused each time node is started. If You run Mysterium Network node from sources, binaries or deb packages You can find Your identity in keystore directory in Your home directory (i.e. `~/.keystore`).

If You use docker image, it is strongly recommended **not** to store identity inside docker container (since You might need to remove container in order to upgrade), but to mount Your keystore from Your host to container using `-v host_volume:container_volume` option as follows:

```
# docker run --cap-add NET_ADMIN --net host -v /home/mysterium-node:/var/lib/mysterium-node --name myst -d mysteriumnetwork/myst service --identity.passphrase=your_passphrase_here
```

Now You can copy and safely store `/home/mysterium-node/keystore` directory to backup all Your identities. Don't forget to save your passphrase that was used with generated identity, otherwise You will not be able to use that identity or access its wallet.

## How should I set a passphrase for node identity?

By default, generated identity is not protected with any password, that is password is an empty string. If You want to generate a password protected identity You can add `--identity.passphrase` to running command:

```
# docker run --cap-add NET_ADMIN --net host --name myst -d mysteriumnetwork/myst service --identity.passphrase=your_passphrase_here
```

If You have multiple identities, You can choose exact identity using `--identity` option. If no identity exists, new one will be created automatically.

After node restart, if no `--identity` option is present, last one used will be reused.
