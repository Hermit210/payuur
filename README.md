#  payuur: The  Event planning  Platform for web3

A **real-time, decentralized event platform** built for the  of the  Combining cutting-edge real-time analytics with cypherpunk privacy principles on Solana.


## LIVE DEPLOYMENT

**Program ID:** `CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr`  
** Network:** Solana Devnet  
** Status:** Live and Ready for Testing

## Quick Start:
```bash
# Install dependencies (fixed for deployment)
scripts/install-dependencies.bat  # Windows
# OR
./scripts/install-dependencies.sh # Linux/Mac

# Start the demo
npm run dev:frontend
# Then open http://localhost:5173
```

- Step-by-step setup instructions

##  Test the Integration:
1. **Connect Wallet** - Use Phantom or any Solana wallet
2. **Create Event** - Experience zero-fee creation via MagicBlock
3. **Buy Tickets** - Instant purchases with <1ms latency
4. **Real-time Updates** - See live changes across all users


##  Ephemeral Program Structure
```rust
#[ephemeral]
#[program]
pub mod soluma {
    pub fn delegate_event(...)           // → ER
    pub fn purchase_ticket_and_commit(...) // ER processing
    pub fn undelegate_event(...)         // ER → Base
}


##  **Complete Delegation Lifecycle**
1. **Delegate** → Move accounts to MagicBlock ER
2. **Process** → Ultra-fast operations (<1ms, $0 fees)
3. **Commit** → Automatic sync to Solana base layer
4. **Undelegate** → Return to standard Solana operations




1. *Real-Time Analytics**: Live ticket sales, attendee tracking, revenue monitoring with zero-latency updates
2. *Cypherpunk Security**: Privacy-first design, censorship-resistant, decentralized architecture
3. *Solana Native**: Fast transactions, low fees, native wallet integration with elastic scalability
4. *Full-Stack Excellence**: React frontend, Node.js backend, Solana blockchain, MagicBlock real-time engine



We are primarily competing for the following tracks where Soluma excels:

 ** Solana Everyday Impact: Consumer & Community App**
    * **Why?** Soluma is a practical consumer application that makes a common activity—event ticketing—more democratic, secure, and user-empowering on Solana. It's designed for mainstream adoption.

 ** Best Use of Solana Pay**
    * **Why?** Solana Pay is the core of our payment and ticketing mechanism. We use it not just for payments but as the foundation for generating verifiable, on-chain tickets via QR codes.

---

##  The Problem

Event ticketing is centralized, expensive for organizers, and insecure for attendees. Traditional platforms control user data, charge high fees, and suffer from fraud. Existing Web3 solutions are often too complex for everyday users, requiring browser extensions and seed phrase management.

##  Our Solution: payuur

payuur solves this by offering a hybrid Web2 + Web3 platform. We use **MetaMask Embedded Wallets (via the Web3Auth SDK)** to provide a frictionless, "seedless" onboarding experience. Users sign up with an email or social account and get a non-custodial Solana wallet without even knowing it.

-   **For Organizers:** Create events and receive payments directly to your wallet in seconds with near-zero fees.
-   **For Attendees:** Buy tickets with a simple QR scan using **Solana Pay**. Your ticket is a secure, on-chain asset you truly own.


## 🛠️ Technical Architecture & Key Features

payuur's hybrid architecture uses Firebase for non-critical metadata and the **Solana blockchain as the single source of truth** for payments and ticket ownership.

## User Flow
1.  **Onboarding (Web3Auth):** A user signs up with their email. Web3Auth instantly generates a non-custodial Solana wallet in the background.
2.  **Event Creation (React/Firebase):** An organizer creates an event. The details are stored in Firestore.
3.  **Payment URL (Node.js/Solana Pay):** Our backend generates a unique Solana Pay URL for the ticket price, pointing to the organizer's wallet.
4.  **Purchase (Solana Pay):** An attendee scans the QR code and approves the transaction from any Solana wallet.
5.  **Verification (Node.js/Solana):** At the venue, an organizer scans the attendee's QR ticket. Our backend verifies the transaction signature on the Solana blockchain in real-time to grant entry. This prevents fraud and double-spending.

## Code Highlights

## 1. Frictionless Onboarding with Web3Auth
We configured the Web3Auth modal to create a Solana-native wallet and hide all complex/irrelevant options, ensuring a pure Web2-like experience.

```typescript
// src/config/web3auth.ts
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";

export const web3AuthContextConfig = {
  web3AuthOptions: {
    clientId: VITE_WEB3AUTH_CLIENT_ID,
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.SOLANA,
      chainId: "0x3", // Solana Devnet
      rpcTarget: "[https://api.devnet.solana.com](https://api.devnet.solana.com)",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  },
  // Hide all external wallet options to create a seamless embedded experience
  modalConfig: {
    openlogin: { label: "email", showOnModal: true },
    metamask: { showOnModal: false },
    phantom: { showOnModal: false },
    // ... other wallets hidden
  },
};

```
## 2. Dynamic Solana Pay URL Generation
We create transaction requests on the fly, embedding event and payment details directly into the QR code. This is central to our "Best Use of Solana Pay" claim.

```typescript
// src/lib/solanapay.ts (simplified)
import { encodeURL } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import BigNumber from "bignumber.js";

function makePayURL({ recipient, amount, reference, splToken }) {
  const recipientPk = new PublicKey(recipient);
  const refPk = new PublicKey(reference); // Reference links the payment to the order
  const tokenPk = splToken ? new PublicKey(splToken) : undefined;
  
  const url = encodeURL({
    recipient: recipientPk,
    amount: new BigNumber(amount),
    splToken: tokenPk,
    reference: refPk,
    label: "Soluma Event Ticket",
  });
  return url;
}
```
---

##  Getting Started

## Prerequisites
-   Node.js & npm
-   A Firebase project with Firestore enabled
-   A Web3Auth project Client ID
-   A Cloudinary account for image hosting

## Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Hermit210/payuur.git](https://github.com/Hermit210/payuur.git)
    cd payuur
    ```
2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```
4.  **Set up environment variables:**
    -   Create a `.env` file in the frontend root and populate it with your keys (Firebase, Web3Auth, etc.).
    - Create a `.env` file in the backend root and populate it.
  frontend env
```bash
VITE_WEB3AUTH_CLIENT_ID="<YOUR_WEB3AUTH_CLIENT_ID>"
VITE_RPC="<YOUR_ALCHEMY_RPC_URL>"

VITE_FIREBASE_API_KEY="<YOUR_FIREBASE_API_KEY>"
VITE_FIREBASE_AUTH_DOMAIN="<YOUR_FIREBASE_AUTH_DOMAIN>"
VITE_FIREBASE_PROJECT_ID="<YOUR_FIREBASE_PROJECT_ID>"
VITE_FIREBASE_STORAGE_BUCKET="<YOUR_FIREBASE_STORAGE_BUCKET>"
VITE_FIREBASE_MESSAGING_SENDER_ID="<YOUR_FIREBASE_MESSAGING_SENDER_ID>"
VITE_FIREBASE_APP_ID="<YOUR_FIREBASE_APP_ID>"

VITE_CLUSTER="<YOUR_SOLANA_CLUSTER>"
VITE_CLOUD_NAME="<YOUR_CLOUDINARY_CLOUD_NAME>"
VITE_API_BASE_URL="<YOUR_BACKEND_API_BASE_URL>"
CLOUDINARY_API_KEY="<YOUR_CLOUDINARY_API_KEY>"
CLOUDINARY_API_SECRET="<YOUR_CLOUDINARY_API_SECRET>"
```
Backend env
```bash
ALLOWED_ORIGINS="<YOUR_FRONTEND_URL>"
FIREBASE_SERVICE_ACCOUNT_KEY='<YOUR_FIREBASE_SERVICE_ACCOUNT_KEY_JSON>'
```
5.  **Run the development servers:**
    -  In the frontend directory: `npm run dev`
      -     In the backend directory: `node server.js`



