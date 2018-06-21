- Can Loopring do cross-chain token trading?

> Loopring is blockchain agnostic, meaning it can facilitate the trading of tokens on any smart contract capable public blockchains. But Loopring is not a cross-chain protocol. In order to perform cross-chain trading, tokenization services have to get involved to help issue asset-backed tokens on the target blockchain.

- Loopring has issued LRC, LRN, and will probably issue LRQ. Will you issue a lot more LRx protocol tokens and will that dilute the value and lower the price of LRC?

> We have deployed Loopring on top of Ethereum and Qtum mainnet, and will deploy a version on top of NEO. In order to make Loopring's matching-as-a-service work, there has to be a token for each target blockchain to incentive different ecosystem roles.

> Going forward, we'll be even pickier in selecting target blockchains and will only deploy Loopring protocol on blockchains that have great potential and massive dApp adoptions. We are also working with selected public blockchain teams to integrate Loopring into their native codebase to avoid issuing a new token.

> Issuing new LRx tokens, however, will not dilute the value of LRC or any other LRx tokens, as each LRx token is unique to its underlying blockchain system and cannot be substituted by other LRx tokens. The value and price of a LRx token mostly depend on the value of its underlying blockchain ecosystem.

- When will LRC/LRN hit $XYZ?
> Here at Loopring, we restrain ourselves from talking about the price of our tokens in public. We also pledge that we will not manipulate the price of our tokens.

- How do you protect yourselves from copycats?

> We have filed multiple patents globally (including the US, EU, China, etc.) and will submit more patents soon. We will leverage these patents to fight against copycats and other copyright/patent infringements to protect ourselves and the interest of our token holders.

> Specifically, integrating Loopring into public blockchain will require formal patent authentication in writing from the Loopring Foundation.

- What are the differences between Loopring, 0x, and Kyber?
            
> Loopring and 0x are protocols designed for order-based token trading, while Kyber is more of a market-making protocol. Both Loopring and 0x features off-chain order-management and on-chain settlement with atomic token swap. Loopring offers some unique features: 1) Loopring's Unidirectional Order Model doesn't differentiate takes and makers and makes its data modeling more generalized. 2) Loopring is designed with matching-as-a-service (MAAS) in mind, which lowers relayer's entrance barrier and enables trades to submit-and-forget their orders. 3) Loopring features ring-matching which provides better liquidity and optimized trading price. 4) Loopring's patented anti front-running technology protects relayers matching work. 5) Loopring Foundation offers more open-sourced software for potential ecosystem partners to adopt our solution with minimum cost. 6) We advocate relayers to share liquidities by joining in an order sharing mesh network instead of running isolated backends.

> 0x and Kyber are solid projects, and we believe the DEX market is big enough for all of us and even more protocols.
             
- Are you working with any centralized exchanges?
> We are not actively talking to centralized exchanges because they are not incentivized to adopt DEX and what Loopring offers indeed conflicts the way they make money.

> One of our objectives is to transform non-custodial wallets into DEX'es. Therefore our priority is to work with wallets.
           
- Will you consider working with companies listed on stock exchanges?
           
> We are open to partner with any organizations globally as long as their involvement can accelerate the adoption of the Loopring Protocol and increase the demand for our LRx tokens.
            
- When will Loopring launch its own mainnet?
           
> Loopring is a protocol thus does not have a mainnet to launch. We have deployed Loopring on Ethereum and Qtum.

- Are there any major partnerships lined up with decentralized exchanges and if not, what is the future of LRC? To clarify, with "partnerships" I mean Exchanges who will use the protocol, not listing the LRx coins for trade.

> If you limit partners to exsiting centralized exchanges, then there is none. And if there were some potential partnerships, I will still not dislose the information before we can assure the partnership is indeed going to happen.
> It is NOT our stragety to sell Loopring protocol to centralized exchanges. We provide opensourced wallet (web, ios, android), and relay reference implementation, so that DEX can be built by entrepreneurs who want to disrupt the way people trade cryptoassets.
> We do have several teams who are now integrating with Loopring into their web-based or Android/iOS apps. Hopefully they will release something soon (in 2 or 3 months).

- 1. Technical advantages over 0x? 2. Price predictions in 2018 & 2019? 3. Recent new partnerships with exchanges/wallets/etc.?

> I do believe we have some technical advantages over our competitors, including: 1) We provide more than a set of smart contracts and a JS library. Our web-based wallet (loopr and circulr) and ios/android apps are all open-sourced, our relay implementation is open-sourced, and we'll also provide an enhanced implementation of the relay service using server clusters, meaning that there will be no single point of failure, it is fault tolerant, and has high performance. In the future, we'll also provide a liquidity/order sharing reference implementation. With these different pieces of open-sourced software, we are offering a complete DEX solution. It will make using Loopring much more accessible than other DEX protocols. 2) We have our ring-matching technology and our anti-front-running solution called "dual-authoring" patented to provide our LRC token holders. 3) We are more focused on ERC20 token exchanges and will stay away from ERC721 4) We designed the Loopring protocol to enable 3rd-party order-matching as a service, while 0x is still migrating to this direction, and Kyber is an asymmetric market making protocol which is not as fundamental. 5) We are more aggressive on implementing the protocol on multiple public blockchains, as we believe the best blockchains are yet to come and protocols need to be implementable on various blockchains with different programming paradigms.
That said, I respect the teams behind the Kyber and 0x project. We have a lot to learn from each other. Together we'll push DEX forward.
I don't predict price. Most existing projects will vanish regardless their tokens' current prices.

- Does your software offer exchanges or various cryptocurrencies that haven't yet used your technology the incentive to implement your approach?

> Loopring enables "Order-Matching-As-A-Service". A Loopring relayer will make money by finding matchable orders and submitting them in the form of rings to the blockchain. Relayers don't provide custodial services so they will not be a target of hacking, and lower risks mean smaller operational costs, which means more revenue (given that volume goes up in the future).

> Public blockchains can also integrate the Loopring protocol to provide an even better user experience for tokens issued on their platform. VITE is the first project that will incorporate Loopring protocol, as part of the patent licensing agreement, a small percentage of VITE cryptocurrency will be airdropped to LRC token holders.

> In the future, we will consider approving more public blockchains to integrate Loopring this way so that token holders can use the target blockchain's cryptocurrency as the trading fee, and we don't have to issue a new LRx token.

- Will mining be available for each LR(X), or just Lrc? -Will Mobile versions have the same properties as the online wallet? -Are there any other projects in the crypto economy that are aiming to integrate with the Lrx protocol?

> We consider the core order-matching (aka 'ring-mining') logic almost the same across multiple blockchains. What makes mining rings on Ethereum and NEO different is the integration part of the relay implementation with the Ethereum and NEO nodes. Our team will focus on improving the efficiency and scalability of the core relay logic instead of integrating with nodes of the different blockchains.

> The mobile version https://github.com/Loopring/loopr-ios will have the same functionalities as our web-version https://github.com/Loopring/loopr. And it will also enable peer-to-peer trading without 3rd-party-matching by scanning order QR codes.

> Again, our iOS app is NOT designed as a final user-facing product BUT is a reference implementation so YOU can enhance its design, add more features, and make a DEX app of your own.

- 1.I see that the Loopring Foundation is an Angel Investor or supporters in a few projects. Is there anything the Foundation looks for in particular before deciding to invest? (i.e. hoping they will utilize the protocol,work on technology that will enrich Loopring, etc.)
- 2.If High Performance Blockchain can run the Ethereum and NEO VM, does that open the door for any cross-chain transactions utilizing Loopring?
- 3.Is VITE have the Loopring Protocol built in and does it allow transactions between its own native tokens and those on Ethereum?

> 1.Our foundation rarely invests in the project directly. We are an LP of UniValues and ZSquared, two crypto-funds in China. We invest through them. Investment is not something we excel in, and I want our team stays focus in R&D. I have invested in some projects because 1) I know one of the founders and it's hard to say no to maintain the connections, 2) the projects have solid developer teams and exciting ideas, 3) the projects are more or less related to Loopring, or liquidity in general, 4) there was a considerable discount.

> 2.Scalability and security are two separate issues and challenges. Cross-chain is more related to security in my option, and scalability sometimes will even weaken security properties in many cases. Again, Loopring is not cross-chain.

> 3.No

- What are the key technical advantages of Loopring? What problems is Loopring trying to solve?

> https://github.com/Loopring/whitepaper/raw/master/en_whitepaper.pdf
Loopring is a fundamental protocol for crypto-trading. It uses blockchain and smart-contract to trade tokens securely, anonymously, and in a decentralized way. It enables people to trade from non-custodial wallets (some people call this type of wallets "wallex") so there are no deposit or withdrawal operations at all. It also allows people to submit-and-forget their orders which means traders don't have to stay online for their orders to be fulfilled and they don't have to find a counterparty to trade at all. Loopring introduced a role called ring-miner who will maintain order books and performance trading verification and settlement.

- Hi Daniel, you mentioned in a recent interview that NEX will be using LRN. If possible, could you share anymore details about this? Thanks.

> Months ago this was the case, but since Loopring on NEO is still in developent, I don't know if NEX is willing to wait :) We are making good progress though. If any DEX protocol goes live on NEO, Loopring is very likely to be the first one.

- Could you please clarity LRC, LRN,LEQ and VITE? What are the differences?

> LRC to Ethereum is what LRN to NEO and LRQ to Qtum. Different ecosystem has different protocol tokens to pay for 3rd-party matching fees.

- As more dapps develop dependencies on each other in this digitized economy, Do you envision loopring being the go to protocol That on the backend facilitates the transfer of various tokens from one service to another.
- Whether it be a payment dapp, loyalty exchange,DEX, IOT device, or tokenized ETF, I see looprings potential to dramatically improve liquidity constraints , cost and facilitate a transfer of value without the need for costly trusted intermediaries. The biggest benefit I can see is in looprings ring orders and the elimination of front running.
- That being said since it is open source what prevents the best pieces being used by large institutions and competitors,how will you nurture an ecosystem that cultivates collaboration?

> We have multiple patents in US/China/EU. We'll leverage these patents to protect the interests of LRC token holders. We'll authorize more public blockchain projects to use these patents and integrate Loopring into their native code, but they shall airdrop their cryptocurrency to LRC/LRN token holders.
> We strive to make Loopring as generic and fundamental as possible. You'll get a clearer picture of what's coming next once we release our plan and an initial version for Loopring 2.0 in August.

- 1.How the airdrops will continue to benefit LRC token holders?
- 2.What is Loopring’s strategy to differentiate from its competitors? What is the biggest advantage of Loopring?

> 1.Imagine the scenario where NEO is the top 1 blockchain and ecosystem, and you hold LRN which has a more significant market cap than LRC. Alright, maybe it is not NEO, it may be among EOS, COSMOS, RCHAIN, etc. We will implement loopring on other blockchains and issue new tokens so that even if Ethereum is no longer the best one, our token holders still get the most out of their investment. The benefit is not so obvious when Ethereum is still the largest smart contract ecosystem though. The value of a Loopring protocol token (LRC/LRN/LRQ...) indeed depends on the value of the target blockchain.

> 2.a) 100% open sourced, 2) provide better reference implementations, 3) stay non-competitive with our ecosystem partners, 4)keep enhancing the design and implementation of the protocol, 5) stay focus.

- 1) Is there a way for the Loopr wallet and Circulr to be combined into one application? I think this is not only possible but the most user friendly way of using a dex. Basically an Etherdelta/radar relay with balances being the wallet - thoughts? 
- 2) Is there a way for users to track the volume and token velocity of the loopring protocol?
- 3) There are many projects building on zrx and kyber, e.g. District0x, 0cean, MEW . Does Loopring have official partners/projects that are building upon the loopring protocol as well?
- 4) When will the new website be completed?
- 5) Many of the more successful projects have a material design for their reddit, this should take no longer than a couple hours of work - is this something the team is considering?

> 1). It is very challenging to design a DEX wallet as it requires users to realize the differences between custodial and no custodial wallets, and all other new concepts (WETH, ERC20 authorization, etc). Loopr and Circulr are two frontend UX design options that our potential wallet partners can choose. They will stay separate and in the long run, I believe one of them will become more popular than the other. 
> 2) Yes, all Loopring trades are settled on-chain; therefore the trading records are all open to the public. Just remember that Loopring's reference relay implementation adopts the OTC model so you can trade with yourself using any price you want and as many tokens as you want. It means trading statistics need to filter out spamming trades which would be challenging. 
> 3) Yes, we do. You will see more wallets coming out with Loopring protocol implemented. 
> 4) We get the initial implementation from our design company. We expect to launch the website in July. 
> 5) I like the material design, but we don't have to follow the trend to be just like the others.

- Can you give more information into your partnership with the Jibrel Network?

> In our big picture, tokenization services will be popular and critical in the near future, and more security tokens will be issued by these services. We want to work with them, Jibrel included, to make sure Loopring can be used to trade these tokens. We want to make it easier, in our protocol 2.0 for companies like Jibrel to issue as many tokens as they want and these tokens will by default tradable with Loopring protocol without the team talking to us case by case.

- 1.What are the key milestones (on or off the roadmap) that you are most excited about? 
- 2.0x's vision is manifesting rapidly through protocol adoption. What is the loopring team doing to drive adoption of the protocol, and when will this bear fruit? 
- 3.When can we watch your interview on CCTV?
- 4.Can you share upcoming plans for the LRN protocol and strategies to drive usage/value?
- 5.When can we expect LRQ airdrop?

> 1.In Q2, we'll release better wallet (web and iOS), Q3 we'll release a new website, developer portal, iOS and JS libraries, an Android wallet App, and the first version of our protocol 2.0 release which is the most exciting thing I look forward to.
> 2.Protocol adoption is also something we will focus in Q3 and onward, but we are not in a rush. Loopring's matching design is unique and patent-protected, protocols that want to provide the same functionalities will either be clumsy or run into our patents.
> 3.Soon. We are currently reviewing the scripts.
> 4.We want to deploy Loopring on NEO asap, then integrate our backend (relay) and frontend with NEO nodes or work with partners on these tasks.
> 5.It depends on the progress of other projects on top of Qtum. If they do well, we'll give LRQ a higher priority. If they don't do well, we will consider switching to EOS or other blockchains.

- How is Loopring(LRC) connected to Nebulas(NAS)?

> I'm a private investor to Nebulas and I know Nebulas's founding team pretty well. Both of our teams are interested in integrating Loopring into Nebulas, but we haven't come up with any details yet.

- What are the procedures to take part of the airdrop?

> Check out links on this page please: https://medium.com/loopring-protocol/airdrops/home

- From the view over on this side of the Pacific, it appears there is quite a coordinated crypto buildout in China despite the "official" protests to the contrary. Between the NEO/ONT/TKY efforts, the supply chain efforts involving WTC and VEN, the development of ELA, etc., there is a lot going on, and you personally are tied in with a number of the big players. Do you see LRC/LRN/LRQ playing a major role in tying the infrastructure together to allow smoother transactions going forward as part of this buildout?

> I believe in near term, China’s internet market and financial sector will remain highly regulated and local companies and soliton providers will have a much higher chance of being supported by local governments. China’s research and development in public blockchain technology is still behind US but as blockchain codebase is publicly accessible, compliance and massive user adoption will become key advantage for projects origin from China. Therefore, we invest a big portion of our capital and time into these projects.

> We want to build Looping to be THE protocol for trading tokens, that means we need to generalize the protocol and make sure it can be deployed on multiple chains regardless of their internal designs. In the future, there will be even more loopring protocol tokens, but many, if not most, of them will lose their value if the underlying blockchain platforms fail to attract developers. But all these tokens compiled represents loopring’s ecosystem and value, and we believe the total value will increase and our investors will benefit the most through airdrops.

- Do you see Loopring creating a cross chain value transfers protocol or partnering with a cross chain partner so that token trades can occur across platforms?

> we still don't have a trustless crosschain solution.

- What is the best cryptocurrency to invest in? long term?

> I don't know. I like Ethereum :)

- Are there any new movement investors should pay attention to? Where can we get the quickest reply? Reddit or Telegram?

> Investments require professionalism. I'm not a professional :) email: daniel@loopring.org

- Hi Daniel, thx for all the great work. I would like to know how you and your team are going about building liquidity and volume on Loopr? Does LRC have partnerships with centralized exchanges and of course, decentralized exchanges?

> We are providing reference implemnetations of wallets and relayer software, ideally we don't want to operate a DEX. But we'll try to set up a liquidity sharing network so our future wallet partners will all share orders with each other to provide better liqudity and price. We have some partners, we will help them do some marketing once their wallets are ready. We are not working with any CEX.


- I remember that Daniel mentioned blockchian tech will link with AI and other techs closer in the future. Could be more specify about that? Will Loopring's protocol cooperate with other technologies?

> I do envision AI and blockchain will fuse into profound solutions for various issues we have. Blockchain will be used to govern AI and enable AI to interact with each other and humans via blockchain’s value network to conduct businesses. I also believe AI will own and trade crypto assets to evolve.

- Please inform the community of the 1) similarities/differences 2) main technical advantages/disadvantages between Loopring and the 0x protocol by the 0xProject (ZRX)?

> It can take more than one dedicated article to do a thorough comparison. 0x team is solid and I like their project as well. But we are very different in protocol design.

- Are you in contact with switcheo for them to use your tech (and not just list the token) ? Or other Dex ?

> We had a conversation with Jack, co-founder of switcheo, and we are very interested in a partnership once our protocol is deployed on NEO.

- Hows the mobile wallet app coming along? I was also wondering, what the implications would be for the Loopr wallet being used as a DEX. Will there be any legal issues with the IOS app store, google play store etc, as crypto currencies will be changing hands without AML and KYC?

> We are working hard on our iOS app. You can checkout the code on GitHub.

> We want to add the app to AppStore in June, there is certain possibilities that it will be rejected and we have to do some modifications.

. Loopring can provide anonymous tradings, but if the tokens are security tokens, DEXes will need to do KYC/AML and restrict token only happen among whitelisted addresses. This can be done in a centralized way or though a smart contact placed in front of our protocol or injected into our protocol 2.0 as a “interceptor”.

- I recall news about an airdrop for two tokens on two different blockchains atleast 2 months ago. It seems the airdrop still hasn’t occured? What’s the issues here?

> The first LRN airpdrop was scheduled to occur after July 15th and we have managed to move it to July 5th. This has been clearly stated in our medium posts. There is no issue at all.

- What is VITE? What's the relationship between VITE and Loopring?

> It's a DAG based public legder project which will try to integrate Loopring protocol as part of the native code base. In return, LRC token holders will receive some VITE airdrop in the future.

> How do you and your team differentiate yourselves from other decentralized exchange protocol? / any fundamental weakness your team is trying to solve? I can see many decentralized exchanges/wallet app will enter the market, what are some key values that could set one apart from the rest?

> There aren't many DEX protocols, and for a lot of DEX projects, if you dig into the whitepaper and code base, you'll find little technical innovation. Give us (and them) some time, and you'll see how we play and who is going to prevail and who will fade away.
Please don't position us as a DEX, we are a DEX solution provider, our team offer a set of opensourced tools for people to clone and modifiy to build their own DEXes. DEX operation is not something we are good at and we don't plan to launch the best Loopring-based DEX ourselves.

- Do you see the Loopring protocol as an effective solution for stores that want to accept multiple cryptocurrencies as payment? - where the stores could just hold one cryptocurrency.

> If the trading volume is high enough, yes.
