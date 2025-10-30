// Soluma Program Configuration
import { PublicKey } from '@solana/web3.js';
import magicblockConfig from '../../../magicblock.json';

// Program ID for deployed Soluma contract
export const PROGRAM_ID = new PublicKey(magicblockConfig.programId);

// IDL Account for program metadata
export const IDL_ACCOUNT = new PublicKey("HNKxFS4ZdQgW7Rud7hvuUK7HyRzhU76V6nKQnu1w1QME");

// Solana Network Configuration from MagicBlock config
export const SOLANA_CONFIG = {
  cluster: magicblockConfig.network,
  programId: magicblockConfig.programId,
  wsEndpoint: magicblockConfig.websocket,
  rpcUrl: magicblockConfig.solana.rpcUrl,
  commitment: magicblockConfig.solana.commitment as 'processed' | 'confirmed' | 'finalized'
};

// MagicBlock Configuration
export const MAGICBLOCK_CONFIG = {
  enabled: magicblockConfig.magicblock.enabled,
  endpoint: magicblockConfig.magicblock.apiEndpoint,
  websocketUrl: magicblockConfig.magicblock.realtimeEndpoint,
  features: magicblockConfig.magicblock.features,
  
  // Ephemeral Rollup settings
  rollupConfig: {
    maxTransactionsPerBatch: 100,
    batchTimeoutMs: 1000,
    enableZeroFees: magicblockConfig.magicblock.features.zeroFees,
    enableInstantFinality: magicblockConfig.magicblock.features.instantFinality
  }
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