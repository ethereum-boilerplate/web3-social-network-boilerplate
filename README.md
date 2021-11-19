# `web3-social-network-boilerplate`

This Project is a fork of [Ethereum Boilerplate](https://github.com/ethereum-boilerplate/ethereum-boilerplate)

# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

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
- Deploy a copy of https://github.com/DanielMoralisSamples/Video_Tutorials/tree/main/26B_Decentralized_SN
- Add some categories through the addCategory function.
- Set listeners in the Moralis Server to sync all your contracts events.
- Add your contract address in MoralisDappProvider.js contract address as the default value of the state
```
🚴‍♂️ Run your App:
```sh
yarn start
```