import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { BrowserRouter } from "react-router-dom";

// Convex client
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

// Clerk configuration
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Petra Wallet configuration
const wallets = [
  new PetraWallet(),
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ConvexProvider client={convex}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={true}
            dappConfig={{
              network: import.meta.env.VITE_APTOS_NETWORK || 'devnet',
            }}
          >
            <App />
          </AptosWalletAdapterProvider>
        </ClerkProvider>
      </ConvexProvider>
    </BrowserRouter>
  </StrictMode>
);