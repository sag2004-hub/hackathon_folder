# 🟣 BartaOne: The Future of Decentralized Media on Aptos

<p align="center">
  <img src="../../Desktop/Aptos_Hackathon/BartaOne/src/assets/logo.png" alt="BartaOne Logo" width="200"/>
</p>

---

## 🚀 Overview
**BartaOne** is a next-generation decentralized media platform built on the blazing-fast Aptos blockchain. With a custom Move smart contract powering the innovative **NICE** token and a sleek React frontend, BartaOne empowers creators and viewers with:
- 🔑 **Wallet-based onboarding** for frictionless access
- 🏆 **Tiered broadcaster bonuses** to fuel quality content
- ⚡ **Real-time token rewards & subscriptions**
- 📰 **Modern dashboards, news, and subscription management**

---

## 🌟 Why BartaOne Stands Out
- 🛡️ **End-to-End Decentralization:** All logic—registration, rewards, transfers—is on-chain for full transparency.
- 🧑‍💻 **Frictionless UX:** Intuitive React flows for both viewers and broadcasters.
- 📈 **Scalable Incentives:** Tiered bonuses and admin rewards drive sustainable growth.
- 🔒 **Security First:** Built on Aptos & Move for robust, auditable contracts.

---

## 🛠️ Workflow
### 1. Smart Contract (Move)
- Defines the **NICE** token, manages minting, registration, and rewards.
- Users connect wallets and register as viewers or broadcasters.
- Broadcasters get automatic, tier-based bonuses.
- Admin can reward any user with NICE tokens.
- Users can transfer NICE tokens peer-to-peer.

### 2. Frontend (React)
- Dedicated sign-up/sign-in for users and broadcasters.
- Dynamic dashboards with real-time data.
- News, subscription, and upload modules for rich content.
- Direct integration with the Move contract for all blockchain actions.

---

## 🖇️ UML-like Workflow Diagram
```
+-------------------+         +-------------------+         +-------------------------+
|    User Wallet    | <-----> |     Frontend      | <-----> |    Move Smart Contract  |
+-------------------+         +-------------------+         +-------------------------+
        |                           |                                 |
        | 1. Connect/Sign Up        |                                 |
        |-------------------------->|                                 |
        |                           | 2. Register user/broadcaster    |
        |                           |-------------------------------->|
        |                           |                                 |
        |                           |<--------------------------------|
        |                           | 3. Receive registration result  |
        |<--------------------------|                                 |
        |                           |                                 |
        | 4. Interact (news,        |                                 |
        |    subscribe, transfer)   |                                 |
        |-------------------------->|                                 |
        |                           | 5. Call contract functions      |
        |                           |-------------------------------->|
        |                           |                                 |
        |                           |<--------------------------------|
        |                           | 6. Update UI with results       |
        |<--------------------------|                                 |
```

---

## 🗂️ File Structure
```
Aptos_Hackathon/
│
├── my_contract/
│   └── sources/
│       └── contract.move         # Move smart contract for NICE token logic
│
├── BartaOne/
│   └── src/
│       ├── App.jsx              # Main React app, route definitions
│       ├── auth/
│       │   ├── broadCasterSignUp.jsx
│       │   ├── BroadCasterSignIn.jsx
│       │   └── UserSignIn.jsx
│       ├── components/
│       │   ├── SplachScreen.jsx
│       │   ├── promo1.jsx
│       │   ├── promo2.jsx
│       │   ├── promo3.jsx
│       │   ├── BroadcasterUpload.jsx
│       │   ├── Subscription.jsx
│       │   └── UserSubscription.jsx
│       └── pages/
│           ├── viewers/
│           │   ├── Dashboard.jsx
│           │   └── News.jsx
│           └── broadcasster/
│               └── BroadCasterDashboad.jsx
│
└── README.md                    # Project documentation (this file)
```

---

## ⚡ Setup Instructions
1. **Smart Contract:**
   - `cd my_contract` and build/deploy the Move contract using Aptos CLI.
2. **Frontend:**
   - `cd BartaOne` and run `npm install` to install dependencies.
   - Start the React app with `npm start`.

---

## 💡 Key Features
- 🏅 **Tiered Broadcaster Rewards:** On-chain, automatic bonuses for new broadcasters.
- 🎁 **Admin Rewards:** Admin can instantly reward any user with NICE tokens.
- 🖥️ **User-Friendly Dashboards:** Separate, intuitive dashboards for viewers and broadcasters.
- 🔄 **Secure Token Transfers:** Peer-to-peer NICE token transfers, fully on-chain.
- 🧩 **Modular, Scalable Codebase:** Easily extendable for new features or token utilities.

---

## 🏆 Why Choose BartaOne?
- 🚀 **Innovative Incentive Model:** Tiered rewards and admin controls for a healthy, growing ecosystem.
- ✨ **Seamless UX:** Modern, frictionless experience for all users.
- 🛡️ **Battle-Tested Security:** Built on Aptos and Move, with clear, auditable logic.
- 🌍 **Ready for Growth:** Designed for hackathons and real-world adoption alike.

---

## 📢 Notes
- Ensure your Aptos node and wallet are configured for contract interaction.
- Update addresses and endpoints as needed for your deployment.
