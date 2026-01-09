// Payuur Program Configuration
import { PublicKey } from '@solana/web3.js';

// Program ID for deployed Payuur contract
export const PROGRAM_ID = new PublicKey("CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr");

// IDL Account for program metadata
export const IDL_ACCOUNT = new PublicKey("HNKxFS4ZdQgW7Rud7hvuUK7HyRzhU76V6nKQnu1w1QME");

// Solana Network Configuration
export const SOLANA_CONFIG = {
  cluster: 'devnet',
  programId: "CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr",
  wsEndpoint: 'wss://api.devnet.solana.com',
  rpcUrl: 'https://api.devnet.solana.com',
  commitment: 'confirmed' as 'processed' | 'confirmed' | 'finalized'
};

// Event Management Constants
export const EVENT_CONSTANTS = {
  MAX_TITLE_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_TICKET_PRICE: 0.001, // SOL
  MAX_TICKET_PRICE: 100,   // SOL
  MAX_CAPACITY: 10000
};

// PDA Seeds for account derivation
export const PDA_SEEDS = {
  EVENT: "event",
  TICKET: "ticket"
} as const;
