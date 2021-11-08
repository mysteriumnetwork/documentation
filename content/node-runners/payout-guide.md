---
title: Payout guide
description: How to change beneficiary (wallet) address
---

You can change the beneficiary at any time via cli or the UI.

To change the beneficiary address of Linux or RaspberryPi nodes via CLI, run:
```bash
myst cli
```

```bash
identities set-payout-address <identity> <beneficiary>
```

If you run a node on a Docker container, run:
```bash
docker exec -ti myst myst cli
```

```bash
identities set-payout-address <identity> <beneficiary>
```

## Supported wallets

There are two "types" of wallets that you can use: 

 
a) Crypto exchange wallets. A user-specific deposit wallet address to facilitate transfers to the exchange (**we currently support HitBTC and Bittrex deposit addresses only**). Always use the exchange's dedicated deposit workflow! If you think you sent assets to the wrong exchange account, please reach out to the exchange's customer support team.

b) Direct Blockchain wallets (such as Metamask, Trust wallet, Atomic, MEW, MyCrypto, Trezor, Ledger ...). 


MYST is a standard ERC-20 token, if wallet supports ERC-20 tokens (has possibility to add any custom ERC-20 token), then MYST can be added there.

**Important Notice**

Always do your own due diligence and research when dealing with exchanges or wallets. 
Most wallets do not support MYST token. We encourage providers to create a wallet mainly with the suggestions listed above. 

If you wish to add a wallet that was not listed above, we suggest that you first confirm with their respective support team if their wallet is capable of supporting MYST token. 
If you input a beneficiary address that is not supported, your funds will be lost forever.

We take no responsibility for the results and outcomes of using third-party software or platforms. 
We only recommend to hold/trade our tokens for the future purpose of using the Mysterium platform.


## Adding MYST token to MetaMask on the Ethereum Mainnet


Ether (ETH) is already added to your MetaMask by default. You won’t need to go through this process to start depositing and withdrawing ETH. For other ERC-20 based tokens, you need to add them to your MetaMask asset tab.

To add tokens to your MetaMask, go to the main MetaMask account page. Click on the assets tab, where you’ll see Add Token at the bottom.

<div style="text-align:center">
  <img src="../images/platforms/metamask.png" alt="Check connection button" class="screenshot"/>
</div>


After you click Add Token, navigate to the Custom Token tab and manually enter the MYST token details. Copy the Token Contract Address (please find below) and paste that onto the Custom Token tab on MetaMask. 
After this, you will be able to view your earned MYST tokens on the Assets tab. You will also have the option of swapping your chosen token for ETH or other ERC-20 tokens on the blockchain or sending them to Bittrex or HitBTC exchanges!

**MYST token details:**

**Contract : 0x4Cf89ca06ad997bC732Dc876ed2A7F26a9E7f361**

**Symbol: MYST**

**Decimals: 18**


On mobile, the process is exactly the same. However, you might find it a bit harder to copy and paste the Contract Token Address on the mobile app.

And that’s it. You’ve learned how to add your tokens and are a step closer to plunging into the decentralized ecosystem!


## Using MetaMask with Polygon MYST

Polygon MYST can be added to your MetaMask with a few simple clicks.

### Link MetaMask to the Polygon Network

1. Open MetaMask console and switch the connected blockchain (network) by clicking on the tab saying Ethereum Mainnet, we need to add the Matic network.
2. Scroll down until you find Custom RPC.
3. Enter in the Matic Mainnet settings as follows:

> Network Name: Matic Mainnet

> New RPC URL: https://rpc-mainnet.maticvigil.com/

> Chain ID: 137

> Currency Symbol (optional): MATIC

> Block Explorer URL (optional): https://explorer.matic.network/

You have now connected to the Matic mainnet with your Metamask Wallet! You can now interact with Polygon tokens like $MYST while connected to Polygon. Note that transactions on the Polygon network requires its native token MATIC which will be used as gas fee. You can get Matic tokens from most exchanges.

### Adding MYST token to MetaMask on the Polygon Mainnet

To add MYST token to your MetaMask, go to the main MetaMask account page. Click on the assets tab, where you’ll see Add Token at the bottom.

After you click Add Token, navigate to the Custom Token tab and manually enter the MYST token details. Copy the Token Contract Address (please find below) and paste that onto the Custom Token tab on MetaMask. 

**MYST token details:**

**Token Address : https://polygonscan.com/token/0x1379e8886a944d2d9d440b3d88df536aea08d9f3**

**Symbol: MYST**

**Decimals: 18**


### Bridge your MYST tokens from Ethereum mainnet to Polygon

To use the Polygon Network, you´ll also need some MATIC tokens to pay for the gas fees. This is in the same way that you need ETH for Ethereum and BNB for the Binance Smart Chain. If you already hold some MATIC tokens in a Polygon based wallet (such as Metamask), you can move forward and bridge MYST tokens from Ethereum to the Polygon Network.

1. Navigate to the Matic Wallet v2 where you’ll be prompted to connect a wallet.
2. “Connect” your Metamask Wallet, “Sign the Transaction” and ensure that Metamask is connected to the Ethereum Mainnet. This where you’re MYST tokens should currently be to perform the bridge.
3. From the top of the screen click “Apps” and choose “Polygon Bridge“. Here is where you can swap your tokens from ERC20 tokens to the Polygon network.
4. Choose “MYST” from the dropdown list and enter the “Amount” you’d like to bridge.
5. Click on “Transfer“ and "Continue". You will get a transfer overview including all the estimated fees.
6. Click “Continue” and “Confirm” then “Approve the transaction” inside your MetaMask Wallet.

When the bridge has completed its transfer, your MYST tokens will then appear in your MetaMask wallet under the Polygon Network.




