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

Almost 4 years ago Vitalik Buterin, co founder of Ethereum posted in twitter this message:

<img src="https://i.ibb.co/ggfZWPD/vitalik.png">

At that time it grabbed the attention of almost the entire crypto space and the answers regarding that question were mostly a big “Not many if at all”. Of course, there have been isolated projects that try to work with the developed world with several big names attached, but not to much avail. Cryptocurrencies and blockchain technology from that time onwards has mostly been used by a few early adopters and some others, but were mostly already banked, educated people, even in the developing world. 

Now, let’s ask that same question today; How many unbanked have we banked by the year 2021? Despite having made great progress and having outliers like the country of El Salvador, outside of that, the progress is almost null. Most of the same people that are into crypto today have been in for years and are the same elite, educated, previously banked ones, it has not reached those who are not.   

We can say that because our team lives in one of those developing countries that countless projects try to portray as a target for financial inclusion, which is Mexico. 

And yes, Mexico is the perfect target as it is the largest issuer of remittances from the US and it will break $42Billion this year alone.  

<img src="https://cdn.howmuch.net/articles/outgoing-remittances-usa-final-8374.jpg" width="400">


Of course, remembering that the US is the biggest sender of remittances in the world.

It is important to mention that, according to the World Bank, 65% of Mexican adults do not have any type of bank account and only 10% save through a financial institution, in addition to the fact that 83% of Mexican adults do not have access to electronic payment systems. These circumstances limit the potential of the sector to place the resources of savers in productive projects that generate economic development and well-being for the population. And crypto is not doing better than the legacy system, most of the users are people like our team, tech savvy with a certain degree of education and already banked.


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

Todos los NFTs usados en el proyecto se realizaron mediante Crossmint, se utilizo esta plataforma ya que permite el mint masivo de NFTs, lo cual permite a grandes empresas poder realizar este tipo de campañas, este proceso es mucho mas sencillo que relizar que usar un proyecto como [CandyMachine](https://docs.metaplex.com/programs/candy-machine).

<img src="https://i.ibb.co/MVgjS6y/image.png">

El proceso para realizar el mint de una coleccion NFT solo requiere 3 sencillos pasos.

  - Llenando la metadata del NFT.
      <img src="https://i.ibb.co/4fvq751/Screenshot-2023-08-19-174150.png">

  -  Mintando y mandando el NFT.
      <img src="https://i.ibb.co/WDFjBHk/Screenshot-2023-08-19-174137.png">

  -  La coleccion completa de los nfts es la siguiente.
      <img src="https://i.ibb.co/bRdF30R/Screenshot-2023-08-19-174314.png">

- Ya que es una coleccion en Mainnet esta puede verse desde OpenSea.

  https://opensea.io/collection/effisend-coupons-1

# Jupiter:

Todo el proceso de swap en nuestra app es realizado por Jupiter y es indispensable que los usuarios sean capaces que realizar estos cambios de SOL a USD (stablecoins) rapidamente ya que los negocios tradicionales aun ocupan que se realicen los pagos en stablecoins pegadas al dolar como lo son USDC.

<img src="https://i.ibb.co/Kxnjhn4/image.png">

- El swap mediante Jupiter Swap (Solana) es muy sencillo gracias a sus API y una UI sencilla e intuitiva.

  <img src="https://i.ibb.co/xMqbTkt/vlcsnap-2023-08-20-19h51m20s255.png" width="32%"> <img src="https://i.ibb.co/YddWM1h/vlcsnap-2023-08-20-19h49m23s883.png" width="32%"> <img src="https://i.ibb.co/B3SmF7y/vlcsnap-2023-08-20-19h49m36s188.png" width="32%"> 

- Los Swaps pueden realizarse nativamente desde la app o usando el seedvault en caso de tenerlo.

  <img src="https://i.ibb.co/vsHg9Vp/vlcsnap-2023-08-20-19h49m42s994.png" width="32%"> <img src="https://i.ibb.co/gZ5HgqB/vlcsnap-2023-08-20-19h49m50s141.png" width="32%"> <img src="https://i.ibb.co/R9yZzV8/vlcsnap-2023-08-20-19h52m26s268.png" width="32%"> 

- Todo el codigo para generar el quote y obtener la transaccion para el swap es la siguiente y su implementacion en codigo es el siguiente [LINK](./EffiSend_RN/src/screens/swapSimple/swapSimple.js).

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

Nuestra aplicacion esta echa con el fin de ser una wallet sencilla para usuarios nuevos en crypto y poder ofrecer incluso servicios complejos como lo son el swap y pagos mediante solana pay, solo con un par de clics, algunas funciones principales que tenemos son las siguientes.

- Management de crypto assets sobre la red de solana o algunas de las EVMs mas importantes.

  <img src="https://i.ibb.co/6PRpyBm/vlcsnap-2023-08-20-18h04m29s143.png" width="32%"> <img src="https://i.ibb.co/mRt3vr8/Image.png" width="32%"> <img src="https://i.ibb.co/Zzs94JH/vlcsnap-2023-08-20-19h11m34s137.png" width="32%"> 

- Recepcion sencilla de pagos mediante QR, ya sea transferencia directa o mediante servicios como SolanaPay y Wallet Connect.

  <img src="https://i.ibb.co/v3W4QVP/Screenshot-20230820-191642.png" width="32%"> <img src="https://i.ibb.co/sQ7zJFX/Screenshot-20230820-191646.png" width="32%"> <img src="https://i.ibb.co/hMDnjR7/Screenshot-20230820-191651.png" width="32%"> 

- Conectividad a Dapps (EVM) y pagos con Solana Pay ya sea nativamente con la wallet o usando el wallet mobile adapter y seedvault.

  <img src="https://i.ibb.co/wLKb6sX/vlcsnap-2023-08-20-19h25m59s606.png" width="32%"> <img src="https://i.ibb.co/bPfXM6X/vlcsnap-2023-08-20-19h26m08s054.png" width="32%"> <img src="https://i.ibb.co/1rYChh3/vlcsnap-2023-08-20-19h25m08s452.png" width="32%"> 

- La seccion de Swap de nuestra aplicacion utiliza los servicios de DeFi de Jupiter Swap (Solana) y Uniswap (EVMs).

  <img src="https://i.ibb.co/xMqbTkt/vlcsnap-2023-08-20-19h51m20s255.png" width="32%"> <img src="https://i.ibb.co/YddWM1h/vlcsnap-2023-08-20-19h49m23s883.png" width="32%"> <img src="https://i.ibb.co/B3SmF7y/vlcsnap-2023-08-20-19h49m36s188.png" width="32%"> 

- Management de NFTs y en este caso cupones para obtener grandes descuentos con empresas.

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

- Automaticamente si la wallet que realiza el pago tiene el NFT correpondiente a el descuento, automaticamente el POS descontara el porcentaje.

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

Perhaps the most important feedback we have obtained is that we have to show how our application will ensure the enforcement of anti-laundering laws. 

We will do that will strong KYC. And at the same time Mexico has published since 2018 strong laws to manage that including its fintech law.

https://en.legalparadox.com/post/the-definitive-guide-mexican-fintech-law-a-look-3-years-after-its-publication#:~:text=The%20Mexican%20FinTech%20Law%20was,as%20Artificial%20Intelligence%2C%20Blockchain%2C%20collaborative

Quoting: " The Mexican FinTech Law was one of the first regulatory bodies created specifically to promote innovation, the transformation of traditional banking and credit financial services that would even allow the possibility of incorporating exponential technology such as Artificial Intelligence, Blockchain, collaborative economies and peer-to-peer financial services in secure regulatory spaces. "

All of this was a silent revolution that happened in this jurisdiction after the HSBC money-laundering scandal that included cartels and some other nefarious individuals. 
https://www.investopedia.com/stock-analysis/2013/investing-news-for-jan-29-hsbcs-money-laundering-scandal-hbc-scbff-ing-cs-rbs0129.aspx

Thus, the need for Decentralized solutions.

Security and identity verification of the clients who use the app is paramount for us, and to thrive in this market we need this to emulate incumbents such as Bitso. We think our technology is mature enough if we compare with these incumbents and much safer. 

Regarding the application we would like to test it with real Capital perhaps in Q4 2022.

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