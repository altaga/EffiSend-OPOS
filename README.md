# EffiSend-OPOS
 
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE) [<img src="https://img.shields.io/badge/View-Video-red">](pending)

<img src="https://i.ibb.co/52MCK0x/logo-Splash.png">

Welcome, this is our project for Solana OPOS Hackathon.

## Applications:

Main App APK: [LINK](./EffiSend_APK/app-release.apk)

POS App APK: [LINK](./EffiSendPOS_APK/app-release.apk)

## Here is our main demo video: 

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](pending)

# Introduction and Problem

This application is a completely new code and application rebuild and idea we have had using previous designs and name. This, incorporating Jupiter and a new take on NFTs through Crossmint as discount coupons for retail payments.

The concept for this project is "Only Possible on Solana".

Banking the unbanked has always been a paradigm in the Web3 world.

Our team is based in Mexico, within a region with several challenges, an estimated 70% of economic transactions in Latin America are all cash. And just 50% have bank accounts. But, in contrast 78% has a cell phone with an internet connection.

<img src="https://i.ibb.co/tcxQWP3/inclusion-in-LATAM.jpg" width="90%">

These numbers are close and very similar to the APAC region. In Asia Pacific cash accounts for 57% of the transactions and just 76% has bank accounts. Of course in terms of mobile connections they boast much higher numbers reaching 98%! 

<img src="https://i.ibb.co/cYQYBdR/stats.png" width="90%">

Traditional Finance has proven itself unable to solve the great Chasm in both regions that comes from not having any kind of banking, and overusing cash not to mention a digital one.
We think that both regions are set to jump this chasm and generate new economies based on these technologies, which they already are doing. Despite this the crypto world has seldom focused on these regions and not really reached the retail or final consumer, until now.

<img src="https://i.ibb.co/cc0HFZc/fintech.png" width="90%">

<img src="https://i.ibb.co/86VHBv9/globalfintech.png" width="90%">

Of course, as the numbers show us that Digital Wallets are projected to overtake credit cards by 2024, we want to capitalize on that opportunity with Fintech and Web3 tools.

### Our goal for this project is to actually enable and get crypto at the point of sale.


# Solution

Effisend is a Mobile-First wallet, cash out ramp and Point of Sale Superapp. We combine TradFi through Stripe with Web3 to improve Financial Inclusion in Mexico and LATAM

### System's Architecture:

<img src="https://i.ibb.co/NZCvKcY/scheme-4-drawio.png">

- All Solana transactions are controlled through [Solana web3.js](https://solana-labs.github.io/solana-web3.js/), [Solana Pay](https://www.npmjs.com/package/@solana/pay) and [MobileWalletAdapter via SeedVault](https://github.com/solana-mobile/mobile-wallet-adapter) on mainnet.

- All EVMs transactions are controlled through [Ethers.js](https://docs.ethers.org/v5/) and [WalletConnect](https://docs.walletconnect.com/2.0/) on mainnet.

- Swaps over the solana network are done using the [Jupiter Swap API](https://station.jup.ag/docs/apis/swap-api) to get the best trade.

- The NFTs for the coupons were created and distributed through the [Crossmint](https://www.crossmint.com/) platform.

- [Chainlink](https://data.chain.link/) is used to check all the market prices that are displayed on the main screen.

- Thanks to the [Stripe APIs](https://stripe.com/docs/api) we can manage users, checkout, swap and KYC of our app.

# Crossmint:

All the NFTs used in the project were minted and delivered through Crossmint, this platform was used since it allows the massive mint of NFTs, which allows large companies to carry out this type of campaign. This process is much easier than using a project such as [CandyMachine](https://docs.metaplex.com/programs/candy-machine).

<img src="https://i.ibb.co/MVgjS6y/image.png">

The process to mint an NFT collection only requires 3 easy steps.

  - Filling the NFT metadata.
      <img src="https://i.ibb.co/4fvq751/Screenshot-2023-08-19-174150.png">

  -  Lying and commanding the NFT.
      <img src="https://i.ibb.co/WDFjBHk/Screenshot-2023-08-19-174137.png">

  -  The complete collection of the nfts is the following:
      <img src="https://i.ibb.co/bRdF30R/Screenshot-2023-08-19-174314.png">

- Since it is a collection on Mainnet it can be seen from OpenSea.

  https://opensea.io/collection/effisend-coupons-1

# Jupiter:

The entire swap process in our app is carried out by Jupiter and it is essential that users are able to make these changes from SOL to USD (stablecoins) quickly since traditional businesses still need to make payments in stablecoins attached to the dollar as they are USDC.

<img src="https://i.ibb.co/Kxnjhn4/image.png">

- Swapping through Jupiter Swap (Solana) is very easy thanks to its APIs and a simple and intuitive UI.

  <img src="https://i.ibb.co/xMqbTkt/vlcsnap-2023-08-20-19h51m20s255.png" width="32%"> <img src="https://i.ibb.co/YddWM1h/vlcsnap-2023-08-20-19h49m23s883.png" width="32%"> <img src="https://i.ibb.co/B3SmF7y/vlcsnap-2023-08-20-19h49m36s188.png" width="32%"> 

- Swaps can be done natively from the app or using the seedvault if you have one.
  
  <img src="https://i.ibb.co/vsHg9Vp/vlcsnap-2023-08-20-19h49m42s994.png" width="32%"> <img src="https://i.ibb.co/gZ5HgqB/vlcsnap-2023-08-20-19h49m50s141.png" width="32%"> <img src="https://i.ibb.co/R9yZzV8/vlcsnap-2023-08-20-19h52m26s268.png" width="32%"> 

- All the code to generate the quote and obtain the transaction for the swap is the following and its implementation in code is the following [LINK](./EffiSend_RN/src/screens/swapSimple/swapSimple.js).

  - Quote: 

        const myHeaders = new Headers();
        const params = new URLSearchParams();
        const solContract = "So11111111111111111111111111111111111111112";
        const inputMint =
          tokenFrom.contract === "" ? solContract : tokenFrom.contract;
        const outputMint =
          tokenTo.contract === "" ? solContract : tokenTo.contract;
        const mult =
          tokenFrom.contract === ""
            ? LAMPORTS_PER_SOL
            : Math.pow(10, tokenFrom.decimals);
        const amountIn = parseFloat(amount) * mult;
        myHeaders.append("accept", "application/json");
        params.set("inputMint", inputMint);
        params.set("outputMint", outputMint);
        params.set("amount", `${amountIn}`);  
        params.set("swapMode", "ExactIn");  // Exact In Mode
        params.set("slippageBps", "50");    // Set slippage 0.5%
        params.set("feeBps", "30");         // Set 0.3% effisend extra commision fee
        //params.set("onlyDirectRoutes", "false");
        //params.set("asLegacyTransaction", "false");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        fetch(`https://quote-api.jup.ag/v4/quote?${params}`, requestOptions)
          .then((response) => response.json())

  - Get Transaction:

        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          route: data,
          userPublicKey: this.context.value.publicKey.toString(),
          wrapUnwrapSOL: true,
          feeAccount: tokenTo.feePubKey, 
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("https://quote-api.jup.ag/v4/swap", requestOptions)
          .then((response) => response.json())

# Main App Screens:

Our application is made in order to be a simple wallet for new users in crypto and to be able to offer even complex services such as swap and payments through solana pay, just with a couple of clicks, some main functions that we have are the following.

- Management of crypto assets on the solana network or some of the most important EVMs.

  <img src="https://i.ibb.co/6PRpyBm/vlcsnap-2023-08-20-18h04m29s143.png" width="32%"> <img src="https://i.ibb.co/mRt3vr8/Image.png" width="32%"> <img src="https://i.ibb.co/Zzs94JH/vlcsnap-2023-08-20-19h11m34s137.png" width="32%"> 

- Easy receipt of payments through QR, either direct transfer or through services such as SolanaPay and Wallet Connect.

  <img src="https://i.ibb.co/v3W4QVP/Screenshot-20230820-191642.png" width="32%"> <img src="https://i.ibb.co/sQ7zJFX/Screenshot-20230820-191646.png" width="32%"> <img src="https://i.ibb.co/hMDnjR7/Screenshot-20230820-191651.png" width="32%"> 

- Connectivity to Dapps (EVM) and payments with Solana Pay either natively with the wallet or using the wallet mobile adapter and seedvault.
  
  <img src="https://i.ibb.co/wLKb6sX/vlcsnap-2023-08-20-19h25m59s606.png" width="32%"> <img src="https://i.ibb.co/bPfXM6X/vlcsnap-2023-08-20-19h26m08s054.png" width="32%"> <img src="https://i.ibb.co/1rYChh3/vlcsnap-2023-08-20-19h25m08s452.png" width="32%"> 

- The Swap section of our app uses the DeFi services of Jupiter Swap (Solana) and Uniswap (EVMs).

  <img src="https://i.ibb.co/xMqbTkt/vlcsnap-2023-08-20-19h51m20s255.png" width="32%"> <img src="https://i.ibb.co/YddWM1h/vlcsnap-2023-08-20-19h49m23s883.png" width="32%"> <img src="https://i.ibb.co/B3SmF7y/vlcsnap-2023-08-20-19h49m36s188.png" width="32%"> 

- Management of NFTs and in this case coupons to obtain great discounts with companies.

  <img src="https://i.ibb.co/KbNXcwk/vlcsnap-2023-08-20-19h36m01s095.png" width="32%"> <img src="https://i.ibb.co/CsqRWNq/vlcsnap-2023-08-20-19h36m10s036.png" width="32%"> <img src="https://i.ibb.co/vJbWVBH/vlcsnap-2023-08-20-19h36m26s330.png" width="32%">

# Point of Sale application:

- The Point of Sale application is more focused on the simple reception of payments and an interface focused on generating payment orders through QR or NFC.
  
  <img src="https://i.ibb.co/j6kYRWK/Screenshot-2022-08-12-153401.png" width="32%">
  <img src="https://i.ibb.co/bHxqD2N/Screenshot-2022-08-12-153442.png" width="32%">

- The POS allows us to see the Crypto and Fiat balances received along with the list of transactions just like the Main App.

  <img src="https://i.ibb.co/wQ9jNnW/Screenshot-2022-08-12-153506.png" width="32%">
  <img src="https://i.ibb.co/bvJksb5/Screenshot-2022-08-12-153521.png" width="32%">

- One of the most important processes is being able to make payments at the POS through Solana Pay and get a discount if you own an NFT coupon. Being this the pillar of our device. (At this point the data at Label, Message and Memo are fillable fields, although you can scan the information using the POS Barcode Scanner and fill in any field with it, in the future these will be with data of the establishment or person receiving the payment)

  <img src="https://i.ibb.co/MRW1VCn/vlcsnap-2023-08-20-20h05m47s028.png" width="32%">
  <img src="https://i.ibb.co/s30hpvt/vlcsnap-2023-08-20-20h02m22s533.png" width="32%">
  <img src="https://i.ibb.co/xYxC0B8/vlcsnap-2023-08-20-20h02m31s300.png" width="32%">

- Automatically if the wallet that makes the payment has the NFT corresponding to the discount, the POS will automatically discount the percentage.

  <img src="https://i.ibb.co/CsqRWNq/vlcsnap-2023-08-20-19h36m10s036.png" width="32%">
  <img src="https://i.ibb.co/vJbWVBH/vlcsnap-2023-08-20-19h36m26s330.png" width="32%">
  <img src="https://i.ibb.co/NCc0cbb/vlcsnap-2023-08-20-20h05m09s417.png" width="32%">

- Once the reference payment has been made, we will be able to see the confirmed and verified messages.

  <img src="https://i.ibb.co/ypdxGgZ/vlcsnap-2023-08-20-20h12m15s009.png" width="32%"> <img src="https://i.ibb.co/TKC10Hv/vlcsnap-2023-08-20-20h12m23s554.png" width="32%"> 

- In addition, we provide a printed receipt with the URL where you can check your transaction.

  <img src="https://i.ibb.co/YpqFrhk/vlcsnap-2023-08-20-20h13m51s369.png" width="32%"> <img src="https://i.ibb.co/Sf2Zs9q/vlcsnap-2023-08-20-20h13m55s909.png" width="32%">

- Let's print!

  <img src="./Images/gifimg.gif">

# Current state and what's next

This application is directed at those who cannot benefit directly from cryptocurrency. It has the usual, both crypto and fiat wallets, transfers between crypto and fiat, transfers between crypto accounts and it gives a spin on the cash in - cash out portion of the equation as no other project provides it. It is very important if this application is going to benefit and bank people to be very agile and compatible with FIAT at least until crypto reaches mass market. Most of the developed world has not even incorporated to legacy electronic systems. In addition to that the incorporation of a Point of Sale thought mainly for SMEs is something that can be key in augmenting the change for further adoption. 

I think we can make the jump from those systems almost directly to self-banking, such as the jump that was made in some parts of Africa and even here in Latin America from skipping telephone landlines directly to Mobile phones. If that jump was made from that type of technology this one can be analogous and possible. 

Thus, the need for Decentralized solutions.

Security and identity verification of the clients who use the app is paramount for us, and to thrive in this market we need this to emulate incumbents such as Bitso. We think our technology is mature enough if we compare with these incumbents and much safer. 

Regarding the application we are launching in amonth approximatelly and raising Capital perhaps in Q1-Q2 2024.

Hopefully you liked the Mobile DApp and Point of Sale.


# Team

#### 3 Engineers with experience developing IoT and hardware solutions. We have been working together now for 5 years since University.

[<img src="https://img.shields.io/badge/Luis%20Eduardo-Arevalo%20Oliver-blue">](https://www.linkedin.com/in/luis-eduardo-arevalo-oliver-989703122/)

[<img src="https://img.shields.io/badge/Victor%20Alonso-Altamirano%20Izquierdo-lightgrey">](https://www.linkedin.com/in/alejandro-s%C3%A1nchez-guti%C3%A9rrez-11105a157/)

[<img src="https://img.shields.io/badge/Alejandro-Sanchez%20Gutierrez-red">](https://www.linkedin.com/in/victor-alonso-altamirano-izquierdo-311437137/)


## References:

https://egade.tec.mx/es/egade-ideas/opinion/la-inclusion-financiera-en-mexico-retos-y-oportunidades

https://www.cnbv.gob.mx/Inclusi%C3%B3n/Anexos%20Inclusin%20Financiera/Panorama_IF_2021.pdf?utm_source=Panorama&utm_medium=email

https://www.inegi.org.mx/contenidos/saladeprensa/boletines/2021/OtrTemEcon/ENDUTIH_2020.pdf

https://www.cnbv.gob.mx/Inclusi%C3%B3n/Anexos%20Inclusin%20Financiera/Panorama_IF_2021.pdf?utm_source=Panorama&utm_medium=email

https://www.rappi.com

https://www.rapyd.net/

https://www.pointer.gg/tutorials/solana-pay-irl-payments/944eba7e-82c6-4527-b55c-5411cdf63b23#heads-up:-you're-super-early

https://worldpay.globalpaymentsreport.com/en/market-guides/mexico

https://www.sipa.columbia.edu/academics/capstone-projects/cryptocurrency-and-unbankedunderbanked-world
