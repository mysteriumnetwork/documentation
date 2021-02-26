---
title: Service management
description: How to change service price and settings
---

You can change the beneficiary (wallet) address once you earn at least a little bit of MYST.
The amount varies, but it's somewhere between 1 and 2 MYST. 
This is because a blockchain transaction will be made and you need to cover its fees.

You can change it through the Node UI during the onboarding process or through the settings page.

To change the beneficiary address of Linux or RaspberryPi nodes via CLI, run:
```bash
myst cli
```

```bash
identities beneficiary <identity> <beneficiary>
```

If you run a node on a Docker container, run:
```bash
docker exec -ti myst myst cli
```

```bash
identities beneficiary <identity> <beneficiary>
```
