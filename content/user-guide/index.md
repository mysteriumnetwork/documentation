---
title: Linux guide
description: How to run Mysterium dVPN on Linux 
---

## Introduction 

Mysterium node comes with a built-in command line tool `myst cli`
which can be used to connect to other nodes and use our `dvpn` service.

It has been tested on:
- Raspbian 9/10
- Debian 9/10
- Ubuntu 18.04/20.04
- Pop_os 20.04

If you're running a different linux distribution, you can still
download the tool and try to configure the `dVPN`. 

## Installation 

### Install Mysterium Node

There are two ways to install Mysterium node.

On `Debian`/`Ubuntu` systems you can use `Aptitude` and execute:

```bash
sudo add-apt-repository ppa:mysteriumnetwork/node
sudo apt-get update
sudo apt install myst
```

If for some reason that fails or you can't do that we also provide an install script written in `bash`
which can be downloaded and executed using this command:

```bash
sudo -E bash -c "$(curl -s https://raw.githubusercontent.com/mysteriumnetwork/node/master/install.sh)"
```

In addition to downloading and installing our Node using either of these commands will also
install additional required dependencies like WireGuard and OpenVPN if you dont have them already.

### Check service health 

After installation you can check the status of the Mysterium node

```bash
sudo systemctl status mysterium-node.service
```

If everything is working you should see similar output to this:

```shell
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

If your `mysterium.node` service is still refusing to start you can report an issue to our support team
which will help you figure it out as best as they can. 

## Basic: Connect using myst commands

After getting your node up and running you should be almost ready to connect. In this section
we'll go through the steps required to do that.

This section will touch on two commands `myst account` and `myst connection` together with
their subcommands.

These two commands expose the most basic and user friendly way to use your terminal in order
to connect to the dVPN. For more advanced user guide please follow the section below
which explains how to use `myst cli`.

### How to use the commands 

As mentioned above we'll use two commands and their subcommands:
- `myst account`
- `myst connection`

In order to read more about them you can execute them with a help flag like this:

```bash
myst account --help
myst connection --help
```
This also works for any sub-commands.

Each command has an output, if the output does not start with `[ERROR]` or `[WARNING]` consider that command a success.

### Initial setup 

#### Register a new identity
> Command: myst account register 

First of all we will need to create and register and identity which is required 
in order to identify yourself in the network.

This can be done by executing:

```bash
myst account register
```

Depending on the network you're using, you might need to top up your balance to finish your registration,
if that is the case after executing the above command you'll get an output which asks you to do so.
For that just follow the below instructions on managing your balance.

#### Inspect your identity 
> Command: myst account info 

If the above command passed without any errors, you can now view your account information using:
```bash
myst account info 
```

This will display the identity you're using, it's balance and other important information like your registration status.

### Managing your balance 

Managing your balance is essential as you must have some amount of `MYST` (`MYSTT` while in Testnet) tokens in order to use the dVPN.

#### Creating a topup request 
> Command: myst account topup

Topping up is done using the `topup` sub-command. It expects a few flags to be passed
together with your request:
- amount ( Amount of tokens you want to top up in to your account )
- currency ( Currency you want to use when paying for your top up )

For the example lets say we'll top up 100 `MYST` while paying in `BTC`
in that case we'd execute the command like this:

```bash
myst account topup --amount 100 --currency BTC 
```

If everything is completed without errors, the output should be similar to this:
```bash
[INFO] Order ID 'XXXX' is in state: 'pending'
[INFO] Price: 0.000584 BTC
[INFO] Pay: unknown unknown
[INFO] Receive: 0.000578 BTC
[INFO] Myst amount: 100.000000
[INFO] PaymentURL: https://pay-sandbox.coingate.com/invoice/c60cd410-99bb-4430-9d7a-ea7a01fXXXXX
```

You will now need to follow the `PaymentURL` in order to complete your top up request.

#### Inspecting your last topup
> Command: myst account info 

To inspect your last top up, see it's state and `PaymentURL` you can execute:
```bash
myst account info --last-topup
```

### Connecting to other nodes

Connecting to other nodes will require us to use the `connection` command and it's subcommands.

#### Listing available exit nodes 
> Command: myst connection proposals 

To list the available exit nodes, you have to view proposals which can be done
by executing:
```bash
myst connection proposals
```

The output should be similar to this:
```bash
[INFO] Found proposals:
| Identity: 0x6b3dfae79ef37495c84f8de590503f54d8a597ce | Type: hosting | Country: CA | Price: 0.000698MYST/min   3.000016MYST/GB |
| Identity: 0x95216857fe5575e033c143ad2d02e95b726f30df | Type: residential | Country: LT | Price: 0.000020MYST/min   0.650000MYST/GB |
| Identity: 0xab0d493e23f4d9b568aa533db87d09fc8f836efb | Type: hosting | Country: NL | Price: 0.000007MYST/min   0.300000MYST/GB |
| Identity: 0xb022800e11233a963040a48f456de922f2d0cc5d | Type: hosting | Country: GB | Price: 0.000010MYST/min   0.100000MYST/GB |
```

Now all you have to do is pick a node from this list, copy it's `Identity` field and continue to
the next step.

**Note:** This command also comes with a few flags which can act as filters. To view them
use the `--help` flag at the end of the command.

#### Connecting to a proposal 
> Command: myst connection up 

For simplicity lets say we picked `Identity: 0x6b3dfae79ef37495c84f8de590503f54d8a597ce` and will now
connect to it using the `up` sub-command.

That can be done by executing:
```bash
myst connection 0x6b3dfae79ef37495c84f8de590503f54d8a597ce
```

This might take a few seconds and after that you should see a message `[CONNECTED]`.

There is a possibility that the proposal you picked, cannot accept your connection
in that case you should try and look for other proposals you can use.

### Managing your connection 

#### Disconnecting 

To disconnect you can execute:
```bash
myst connection down
```

#### See connection information 

To see your connection information you can execute:
```bash
myst connection info 
```

## Advanced: connect using myst CLI

`myst cli` is a tool that is more advanced than the basic `myst` commands
used for connecting. While in some ways it's similar to `connection`
and `account` commands gives greater control for an end user alongside some additional
features inturn sacrificing some convenience.

To get familiar with `myst cli` follow the below steps which detail initial set up
and use of the Mysterium dVPN using the `cli`.

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

Each command has an output, if the output does not start with `[ERROR]` or `[WARNING]` consider that command a success.

Commands can be autocompleted using the `tab` key on your keyboard.

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

To add additional `MYST` to the balance a payment order has to be created.

To get the full list of currencies which can be used to pay execute:

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
