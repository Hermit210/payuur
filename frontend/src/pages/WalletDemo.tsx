// src/pages/WalletDemo.tsx
import React, { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function WalletDemo() {
  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const addressAvailable = connected && publicKey;

  const copyToClipboard = async () => {
    try {
      if (publicKey) {
        await navigator.clipboard.writeText(publicKey.toString());
        alert("Address copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const fetchBalance = async () => {
    if (!connection || !publicKey) return;
    setLoadingBalance(true);
    try {
      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoadingBalance(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [connection, publicKey]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Solana Wallet Demo</h1>
      
      <div style={{ marginBottom: "20px" }}>
        <WalletMultiButton />
      </div>

      {addressAvailable && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Wallet Address:</h3>
          <span title={publicKey.toString()} style={{ overflowWrap: "anywhere" }}>
            {publicKey.toString()}
          </span>
          <button onClick={copyToClipboard} style={{ marginLeft: "10px" }}>
            Copy
          </button>
        </div>
      )} 
     {connected && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Status:</h3>
          <span style={{ color: "green" }}>Connected</span>
        </div>
      )}

      {addressAvailable && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Balance:</h3>
          {loadingBalance ? (
            <span>Loading...</span>
          ) : (
            <span>{balance !== null ? `${balance.toFixed(4)} SOL` : "Unable to fetch"}</span>
          )}
          <button onClick={fetchBalance} style={{ marginLeft: "10px" }}>
            Refresh
          </button>
        </div>
      )}

      {connected && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => disconnect()}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}