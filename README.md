# `web3-social-network-boilerplate`

This Project is a fork of [Ethereum Boilerplate](https://github.com/ethereum-boilerplate/ethereum-boilerplate) and demostrates how you can build your own Web3 Ethereum Social Network. This project of course work on any EVM-compatible blockchain such as Polygon, Avalanche, Binance Smart Chain and other such chains. 

<img width="1184" alt="Screenshot 2021-11-21 at 15 59 25" src="https://user-images.githubusercontent.com/78314301/142767631-7d07a617-39e0-4371-a509-acac45a18cf5.png">

# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🤝 `How to get help`
If you have any questions or need help running this project please don't hesitate to ask in [our forum](https://forum.moralis.io/t/ethereum-social-media-boilerplate/4655). We are monitoring it 24/7 and are here to help you get up to speed.

# 🚀 Quick Start

📄 Clone or fork `web3-social-network-boilerplate`:
```sh
git clone https://github.com/ethereum-boilerplate/web3-social-network-boilerplate
```
💿 Install all dependencies:
```sh
cd web3-social-network-boilerplate
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```
📄  Set your Contract
```sh
- Deploy smart contracts from this folder https://github.com/ethereum-boilerplate/web3-social-network-boilerplate/tree/main/smart%20contracts
- Add some categories through the addCategory function.
- Set listeners in the Moralis Server to sync all your contracts events.
- Add your contract address in MoralisDappProvider.js contract address as the default value of the state
```
🚴‍♂️ Run your App:
```sh
yarn start
```
