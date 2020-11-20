---
title: Linux guide
description: How to use mysterium dvpn on linux 
---

## Introduction 

Mysterium node comes with a built in command line tool `myst cli`
which can be used to connect to other nodes and use our `dvpn` service.

It has been tested on:
- Raspbian 9/10
- Debian 9/10
- Ubuntu 18.04/20.04
- Pop_os 20.04

Don't get scared if you're running a different linux distribution, you can still
download the tool and try to configure it, it should work without any issues.

## Installation 

### Install Mysterium Node

For installing Mysterium Node we provide a `bash` script which can be executed in your terminal.
In addition to downloading and installing our Node it will also install additional required dependencies (WireGuard and OpenVPN)
if you dont have them already.

Open up your terminal and run this script:

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

### Check service health 

After installation you can check the status of the Mysterium node

```bash
sudo systemctl status mysterium-node.service
```

If everything is working you should see similar output to this:

```sh
mysterium@pop-os:~$ sudo systemctl status mysterium-node.service 
● mysterium-node.service - Server for Mysterium - decentralised VPN Network
     Loaded: loaded (/lib/systemd/system/mysterium-node.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2020-11-20 00:00:00 GMT;
       Docs: https://mysterium.network/
   Main PID: 1920 (myst)
      Tasks: 30 (limit: 19009)
     Memory: 73.0M
```

If thats not the case, you can try and restart the mysterium service by running:

```bash
sudo systemctl restart mysterium-node.service
```

If you still seem to not be able to use our 


## Basic myst CLI guide 

In order to start using our dVPN you will have to get familiar with our
`myst cli` console application.

Initial setup shouldn't take more than a few minutes and after that you'll only need to execute
a few commands whenever you want to use mysterium dVPN.

### How to use the CLI

To start open your terminal and execute:
```bash
myst cli
```

Once started your terminal window should change to the `myst cli` interface.
To get help and see a list of possible commands execute:
```bash
» help 
```

Each command has an output, if the output does not start with `[ERROR]` consider that command a success.

### Initial setup 

If you've never used mysterium dVPN you'll have to create, unlock and register your identity.
Go ahead and fire up the cli application and follow the steps below. 

#### Create a new identity 
> Command: identities new

In order to identify yourself in the network you must have an identity, to create it
execute the following command in the `cli`:

```bash
» identities new
```

This command will create you a new identity which you can use.
It will be printed to your terminal, but in case you want to check it out later you can do that
will the following command:

```bash
» identities list 
```

#### Unlock the new identity 
> Command: identities unclock [identity] 

In order to use the created identity it has to be unclocked first.

**Unlocking has to be done every time we launch the `myst cli` and want to use the created identity.**

For the sake of simplicity let's say we've received an identity: `0x4570fe47a49af9ae9bd76f029818413ea18620000`,
which we'll use in all later steps.

To unlock it we'd have to execute:
```bash
» identities unlock 0x4570fe47a49af9ae9bd76f029818413ea18620000
```

#### Register your identity
> Command: identities register [identity] [stake]

After creating and unlocking the identity it must be registered so that Mysterium services are aware
about it and it's balance, to do that execute the `identities register` command.

```bash
» identities register 0x4570fe47a49af9ae9bd76f029818413ea18620000 0
```

### Managing your balance 

Managing your balance can be done using the `order` commands in the `myst cli`.
You must have some amount of `MYST` in your balance in order to use the dVPN.

#### Check balance information 
> Command: identities get [identity] 

In order to get information about your identity you can execute:
```bash
» identities get 0x4570fe47a49af9ae9bd76f029818413ea18620000
```

It should output a few lines of text among them you should be able to find your balance: 
```bash
[INFO] Balance: 6.900000MYST
```

If your balance is not `0` and don't want to top up you can skip furhter to the `Connecting to other nodes`.

#### Adding balance 
> Command: order create [identity] [amount] [pay currency]

To add additional `MYST` to the balance an order has to be created.
An order is basically a balance top up request, for which you pay using other crypto currencies.

To get the full list of currencies which can be used to pay, use execute:

```bash
» order currencies
```

Let's say that for example for our identity: `0x4570fe47a49af9ae9bd76f029818413ea18620000`
we would like to add `100 MYST` paying with `BTC`.

We would execute the order command like this:

```bash
»  order create 0x4570fe47a49af9ae9bd76f029818413ea18620000 100 BTC
```

It's output should be similar to this:

```bash
[INFO] Order ID '6984004' is in state: 'pending'
[INFO] Price: 0.000614 BTC
[INFO] Pay: unknown unknown
[INFO] Receive: 0.000608 BTC
[INFO] Myst amount: 100.000000
[INFO] PaymentURL: https://pay.coingate.com/invoice/76cd2bfa-e1f2-42c6-ae7c-0972b15601ab
```

To finish your order and receive the requested `MYST` navigate to the
provided `PaymentURL` and complete your order.

#### Checking order history 

To check your whole order history execute:
```bash
» order get-all 
```

To inspect each order in more detail execute:
```bash
» order get [ORDER_ID] 
```

### Connecting to other nodes

Connecting to other nodes on the network is easy using the `cli`.

#### Listing possible exit nodes 
> Command: proposals 

To list all possible exit nodes can be done using the proposals command

```bash
» proposals 
```

This commmand will output a list which is similar to this:

```bash
» proposals 
Found proposals 
provider id: 0x773783463adb681ad67052213ae1ae204e32dab1	type: wireguard	country: DE	access policies: 
provider id: 0x80ec29bb58365aceb06be7558b05a789b9e6458a	type: wireguard	country: GB	access policies: 
provider id: 0xfa7855e183c3474eddd9d3a0088d2b1abddde837	type: wireguard	country: GB	access policies: 
provider id: 0x043107c1ec68ef73cb4a184fe19fdff836eebbe6	type: openvpn	country: NL	access policies: 
provider id: 0x09b3c5f0ecc61a28ea5cd91ac2b6edd4cd90f50c	type: wireguard	country: AU	access policies: 
provider id: 0x0da444370166e0c2decb744122fcc2d07b8be4ce	type: wireguard	country: MD	access policies: 
provider id: 0xbb3dd5828ecb040c23e80ec7ccda16066bc1bc9f	type: openvpn	country: EE	access policies: 
provider id: 0x2f4ec475c42677b2b37a8831de456c43cadda89b	type: wireguard	country: GB	access policies: 
provider id: 0x770c9ad96fe1843068e6100451d3282ce67c3596	type: wireguard	country: US	access policies: 
```

#### Connecting to a proposal 
> Command: connect [consumer-identity] [provider-identity] [service-type]

The last step that is left is to actually connect. First make sure you're identity is `unlocked`,
intructions on how to do that are in the `Initial setup` section.

First lets explore the connect command. It accepts three arguments which are required.

* "consumer-identity" which is your identity that you created using the `identities new`
* "provider-identity" which you can get from the `proposals` command 
* "service-type" which is either `wireguard` or `openvpn` which you also get from the `proposals` command

So lets say our identity is `0x4570fe47a49af9ae9bd76f029818413ea18620000` and we'll connect to proposal:

```bash
provider id: 0x773783463adb681ad67052213ae1ae204e32dab1 type: wireguard country: DE access policies:
```

So we'll execute the connect command like this:
```bash
» connect 0x4570fe47a49af9ae9bd76f029818413ea18620000 0x773783463adb681ad67052213ae1ae204e32dab1 wireguard
```

It should take a few seconds seconds to connect and once it finishes
you're done, you can now use the internet as if you're in a different location. 

### Managing your connection 

#### Disconnecting 

To disconnect from a node you can execute:
```bash
» disconnect
```

#### Check your connection status 

To check your connection status you can execute:
```bash
» status 
```
