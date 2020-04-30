---
title: Introduction
weight: 20
---

# What is a Mysterium Node?

Software which represents Mysterium Network element responsible for either providing or consuming network service. Such node can be run on your raspberry, desktop, mobile, docker or on any debian server using debian package. On mobile only service consumption is possible. 

## Mysterium node runner/provider

Node providing service inside Mysterium Network is called a Provider. Currently node can operate either as a Provider or as a Consumer at the same time.

## Why Run a Mysterium Node?

##### Earn cryptocurrency while you sleep

Most of the internet you pay for goes to waste, sitting idle or completely unused. Sell this spare bandwidth whenever it suits you.

##### Fight censorship with a click

Help us reengineer the web so it’s censorship and surveillance-free. A residential IP network will rewire it to be safe and private by default.

##### No technical skills required

Our node application is easy – just a few clicks to get you up and running. Your personal dashboard tracks your earnings and contributions.

##### Connect to your home from anywhere

Want to access television shows from your home when you’re on the road? Set up a node and connect to it when you’re away.

##### Try the real killer dApp

Looking for *that project* that will take blockchain into the mainstream stratosphere? Pack your bags.

##### Fire up your Raspberry Pi

Run out of ideas for putting your Pi to work? Make cash while kickstarting the new online era.

## How does it work?

When you become a node you share your IP address (anonymously) and spare bandwidth to help power our dVPN. Any Mysterium network node can become a service provider and provide VPN services using its own infrastructure. To become a service provider, the following steps should be performed:

- Create a personal user identity.
- Register the user identity.
- Create a service proposal.
- Register the service proposal with the Discovery service.

All Mysterium network nodes should have a valid identity to interact with other systems. The `myst` binary provides a way to create the required identity. After creating the identity, the user should finish the identity registration process to be able to provide services in the Mysterium network. The registered identity is used as one of the components for creating a service proposal, that acts as a complete description of the service that the service provider will provide. The created proposal should be registered with the service discovery component to allow other network participants to search through all available services and consume them.

After successfully registering a proposal, the service provider waits for an incoming request. It handles all valid requests and establishes a new VPN session for the consumer.

The service provider then sends all the required information for establishing a VPN session to the consumer.

## Which platforms are supported by Mysterium Network?

1. Raspbian 9/10
2. Debian 9/10
3. Ubuntu
4. RaspberryPi
5. Docker
6. Avado
7. MacOS

## Mysterium Node Pilot

###### The Mysterium Node Pilot is a Research and Development initiative to help the core development team understand various network factors in a live environment. Here are important factors to consider before signing up for the Mysterium Node Pilot:

- [ ] There are regular changes to bounty rules to accommodate network requirements
- [ ] There are no guaranteed earnings. Successful bounties will receive ETH each month
- [ ] You must run a node almost full-time to increase your chances
- [ ] You’ll receive great digital karma and play a pivotal role in rewiring the internet for good
