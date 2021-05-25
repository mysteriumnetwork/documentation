---
title: Payout guide
description: How to change beneficiary (wallet) address
---

You can change the beneficiary (wallet) address once you earn at least a little bit of MYST.

Because the beneficiary is stored on the blockchain, in order to change it a transaction has to be made for which fees are paid.
Check a rought estimate of the fee in MYST [here](https://testnet2-transactor.mysterium.network/api/v1/fee/5/settle). Keep in mind that to get a human readable number you have to devide the "fee" by 1000000000000000000 or use a [converter](https://eth-converter.com/).

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
