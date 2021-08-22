---
title: Mysterium CLI
description: Myst CLI is a command line interface that allows you to manipulate a Mysterium node using just your terminal. 
---


To get familiar with `myst cli` usage follow the below guide which explains initial set up
and available commands for node operators. Mysterium CLI allows you to create, unlock & register node identity, claim your node into my.mysterium.network, set bounty payout address, view NAT Traversal status & NAT type, manually start/stop WireGuard service and more.

### How to use the CLI

To start open your terminal and execute:
```bash
myst cli
```

Once started your terminal window should change to the `myst cli` interface.
To get help and see a full list of possible commands execute:
```bash
help 
```

Each command has an output, if the output does not start with `[ERROR]` or `[WARNING]` consider that command a success.

Commands can be autocompleted using the `tab` key on your keyboard.

### Initial setup 

If you have already installed a Mysterium node but have no access to the NodeUI to complete the onboarding process, you'll have to unlock and register your identity with Mysterium CLI.
Go ahead and fire up the cli application and follow the steps below. 

#### Check your identity 

In order to identify yourself in the network you must have an identity which was created during the installation process. Use the command below to print your node identity address to your terminal.

```bash
identities list
```

#### Unlock the new identity 
```bash
identities unlock <providerIdentity>
```

In order to use the created identity it has to be unlocked first.

**Unlocking has to be done every time we launch the `myst cli` and want to use the created identity.**

For the sake of simplicity let's say we've received an identity: `0x4570fe47a49af9ae9bd76f029818413ea18620000`,
which we'll use in all later steps.

To unlock it we'd have to execute:
```bash
identities unlock 0x4570fe47a49af9ae9bd76f029818413ea18620000
```

#### Register your identity

After creating and unlocking the identity it must be registered so that Mysterium services are aware
about it and it's balance, to do that execute the `identities register` command.

```bash
identities register <providerIdentity>
```

#### Claim your node into my.mysterium.network
```bash
mmn <your-api-key>
```
**Note**: You can find and copy your MMN API key in your [MMN profile](https://my.mysterium.network/user/profile).


#### Set payout wallet address

```bash
identities set-payout-address <providerIdentity> <beneficiary>
```

There are two types of wallets that you can use: 


>  Exchange wallets (HitBTC and Bittrex deposit addresses are supported only); 

>  Direct Blockchain wallets (Metamask, Trust wallet, Atomic, MEW, MyCrypto, Trezor, Ledger ...). 

 
MYST is a standard ERC20 token, if wallet supports ERC-20 tokens (has possibility to add any custom ERC-20 token), then MYST can be added there.

#### MYST token details: 

> Contract: 0x4Cf89ca06ad997bC732Dc876ed2A7F26a9E7f361

> Symbol: MYST

> Decimals: 18

#### Get payout wallet address

Ensure that beneficiary wallet address has been successfully changed:

```bash
identities get-payout-address <providerIdentity>
```

### Managing node service

#### To start WireGuard service we'd have to execute (note that WireGuard service is started automatically upon installation, therefore you don't need to start it manually):
```bash
service start <your-identity> wireguard
```

#### To stop WireGuard service:
```bash
service stop <your-identity> wireguard
```

#### To get ID and status of your currently active service:
```bash
service list
```
If you are seeing the similar output to the one below - your service is up and running!

`[Running] ID: 7b4652a8-2021-4b9d-aeea-da7a60709678 ProviderID: 0x00f735d4ad380b56b92cd6c9f078763bbfeab3e8 Type: wireguard`

#### To get a list of sessions:
```bash
service sessions
```

#### To get NAT Traversal status and NAT type:
```bash
nat
```

#### To view your current node version and uptime execute:
```bash
healthcheck
```
