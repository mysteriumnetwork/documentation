---
title: Introduction
description: What is a Mysterium Node runner; core concepts.
---

### What is a Mysterium Node?

Mysterium Node is a piece of software which represents Mysterium Network's element responsible for either providing or
 consuming a network service. Such node can be run on your Raspberry PI, Docker or any Debian based
  distribution. The current mobile version does not support service running. 

### Mysterium node runner/provider

A node that's providing a service within Mysterium Network is called a Provider. Our node software can
 operate as a
 Provider or as a Consumer, but in this section lets focus on the provider side of things.

## Why Run a Mysterium Node?

##### Earn cryptocurrency while you sleep

Most of the internet you pay for goes to waste, sitting idle or completely unused. Sell this spare bandwidth whenever it suits you.

##### Fight censorship with a click

Help us re-engineer the web so it’s censorship and surveillance-free. A residential IP network will rewire it to be
 safe and private by default.

##### Fire up your Raspberry Pi

Run out of ideas for putting your Pi to work? Make cash while kickstarting the new online era.

## How does it work?

When you become a node you share your IP address (anonymously) and spare bandwidth to help power our network. Any
 Mysterium network node can become a service provider and provide VPN services using its own infrastructure. To
  become a service provider, the following steps should be performed (some of them are automated):

- Create a personal user identity.
- Register the user identity.
- Create a service proposal.
- Register the service proposal with the Discovery service.

All Mysterium network nodes should have a valid identity to interact with other systems.
The `myst` binary provides a way to create the required identity.
After creating the identity, the user should finish the identity registration process to be able to provide services in the Mysterium network.
The registered identity is used as one of the components for creating a service proposal, that acts as a complete description of the service that the service provider will provide.
The created proposal should be registered with the service discovery component to allow other network participants to search through all available services and consume them.

After successfully registering a proposal, the service provider waits for an incoming request. It handles all valid requests and establishes a new VPN session for the consumer.

The service provider then sends all the required information for establishing a VPN session to the consumer.

## Which platforms are supported by Mysterium Network?

1. Raspbian 9/10
2. Debian 9/10
3. Ubuntu
4. RaspberryPi
5. Docker
6. Avado
