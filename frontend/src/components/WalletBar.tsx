import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const WalletBar: React.FC = () => {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const addressAvailable = connected && publicKey;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: 16,
        borderBottom: "1px solid #eef",
        padding: "8px 24px",
        fontFamily: "monospace",
        background: "#f6f8fa",
      }}
    >
      {addressAvailable && (
        <span style={{ fontWeight: 500 }}>
          {publicKey.toString().slice(0, 6)}...{publicKey.toString().slice(-4)}
        </span>
      )}
      {!connected ? (
        <WalletMultiButton style={{
          padding: "7px 22px",
          borderRadius: 8,
          fontWeight: 600,
          cursor: "pointer",
          background: "#206bc4",
          color: "#fff",
          border: "none",
        }} />
      ) : (
        <button
          style={{
            padding: "7px 22px",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            background: "#fee",
            color: "#b00",
            border: "none",
          }}
          disabled={connecting}
          onClick={() => disconnect()}
        >
          {connecting ? "Disconnecting..." : "Disconnect"}
        </button>
      )}
    </div>
  );
};

export default WalletBar;
