---
title: Raspberry consumer guide
description: How to run Mysterium dVPN on Raspberry Pi 
---

## Spin-off Raspberry Pi node in consumer mode

1.  SSH into your RaspberryPi. 
2.  If node is already installed, replace node service with consumer:
```bash
sudo systemctl stop mysterium-node.service # stop current node service
sudo systemctl disable mysterium-node.service # disable node service so it doesn't start again automatically
sudo systemctl enable mysterium-consumer.service # enable consumer service
sudo systemctl start mysterium-consumer.service # start consumer service
```

If node is not installed consider following our guides on how to setup node on linux or raspberry.

After thats done follow our linux guide on `Basic` or `Advanced` consumer node operation using our provided `cli` applications.
