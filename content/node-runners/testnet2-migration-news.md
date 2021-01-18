---
title: Testnet 2.0 news 
description: Why we're migrating the network to Testnet 2.0
---
  
### Why we’re migrating into Testnet 2.0

We’ve deployed the newest version of our smart contracts onto the Goerli testnet blockchain. 
With this network upgrade, node registration flow has changed. Providers will get free registration with zero stake (while still on Testnet 2.0) and will retain the same Testnet 1.0 identity.
These new smart contracts are also using a new version of MYSTT token.
It’s essentially the same as our real MYST token, but on Goerli testnet. 
It has 18 zeros after a comma (instead of 8 ), which required us to refactor all payments-related code to account for micropayments as we transition to Ethereum Mainnet.

### Top up with your crypto of choice

Top up Mysterium VPN balance using various cryptocurrencies (other than MYST), such as BTC, LTC, ETH, Dai and more! This functionality is supported by an upgraded Hermes protocol, with our micropayments hub now supporting multiple chains.

Interested in finding out more? Deep dive into [how we evaluated and chose the right L2 scaling partner for Mysterium Network](https://mysterium.network/blog/layer-2-the-search-for-the-cheapest-and-fastest-microtransactions/).

### Mysterium is now unblocked in China!

We’ve been working hard to reverse [the ban of Mysterium VPN in China](https://medium.com/mysterium-network/china-where-is-your-internet-e03824fea13c). The first iteration of our unblocking is done. Start using Testnet 2.0 apps (node v0.40+) to access Mysterium Network from China!

### Cleaner UI

We’ve updated the Node UI so it is far more stable, with fewer glitches.

We found and fixed lots of bugs found during ALPHA testing in preparation of our upcoming node release.

We also created user-friendly consumer CLI commands.
Now it’s much easier to use [Mysterium VPN for advanced Linux users](/user-guide/) and on servers.

### Matic x Mysterium

We started working on our [integration with Matic Network](https://mysterium.network/blog/matic-network-powers-mysterium-p2p-payments/). Most of our infrastructure components are ready for Matic, so now we’re working on building the Matic<>Ethereum bridges needed before it’s public release.

### My.Mysterium.Network (MMN) updates

For a short period of time, the Testnet 2.0 MMN will be hosted on https://testnet2.mysterium.network.
Once we migrate the majority of nodes, the old https://my.mysterium.network will be replaced with the Testnet 2.0 version.

**On 2020-01-08** - All of the accounts from https://my.mysterium.network are migrated to https://testnet2.mysterium.network.

The Testnet 2.0 version of MMN will look a little different than the current version, and we hope it will solve a couple of usability problems we had before.

Nodes can also store beneficiary (payout) wallet addresses on the Ethereum blockchain, instead of a database. The new MMN has been adapted so it can be used for bounty payments.

We also discovered some node runners who were cheating the system. We therefore started a blacklist so they could not participate in any future bounty program.
