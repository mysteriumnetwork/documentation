---
title: Node security for Docker
weight: 10
---

If You use docker image, it is strongly recommended **not** to store identity inside docker container (since You might need to remove container in order to upgrade), but to mount Your keystore from Your host to container using `-v host_volume:container_volume` option as follows:

```
# docker run --cap-add NET_ADMIN --net host -v /home/mysterium-node:/var/lib/mysterium-node --name myst -d mysteriumnetwork/myst service --identity.passphrase=your_passphrase_here
```

Now You can copy and safely store `/home/mysterium-node/keystore` directory to backup all Your identities. Don't forget to save your passphrase that was used with generated identity, otherwise You will not be able to use that identity or access its wallet.
