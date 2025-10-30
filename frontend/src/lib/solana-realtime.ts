// Real-time Solana connection with MagicBlock integration
import { Connection, PublicKey, AccountChangeCallback } from '@solana/web3.js';
import { SOLANA_CONFIG, MAGICBLOCK_CONFIG, PROGRAM_ID } from '../config/soluma';
import { getMagicBlockService } from './magicblock';

export interface RealtimeEventData {
  type: 'account_change' | 'program_account_change' | 'signature_notification';
  account?: PublicKey;
  data?: any;
  timestamp: number;
}

export class SolanaRealtimeService {
  private connection: Connection;
  private magicBlockService: any;
  private subscriptions: Map<string, number> = new Map();
  private eventListeners: Map<string, ((data: RealtimeEventData) => void)[]> = new Map();

  constructor() {
    // Create connection with WebSocket support
    this.connection = new Connection(
      SOLANA_CONFIG.rpcUrl,
      {
        commitment: SOLANA_CONFIG.commitment,
        wsEndpoint: SOLANA_CONFIG.wsEndpoint
      }
    );

    // Initialize MagicBlock service for enhanced real-time features
    this.magicBlockService = getMagicBlockService(this.connection);
  }

  /**
   * Initialize the real-time service
   */
  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing Solana real-time service...');
      
      // Connect to MagicBlock for enhanced real-time features
      if (MAGICBLOCK_CONFIG.enabled) {
        await this.magicBlockService.connect();
        console.log('✅ MagicBlock real-time service connected');
      }

      console.log('✅ Solana real-time service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize real-time service:', error);
      throw error;
    }
  }

  /**
   * Subscribe to program account changes (events, tickets)
   */
  async subscribeToProgram(callback: (data: RealtimeEventData) => void): Promise<string> {
    const subscriptionId = `program_${Date.now()}`;
    
    try {
      // Subscribe to all program account changes
      const solanaSubscriptionId = this.connection.onProgramAccountChange(
        PROGRAM_ID,
        (accountInfo, context) => {
          const eventData: RealtimeEventData = {
            type: 'program_account_change',
            account: context.accountId,
            data: {
              accountInfo,
              context,
              lamports: accountInfo.lamports,
              owner: accountInfo.owner.toString(),
              executable: accountInfo.executable,
              rentEpoch: accountInfo.rentEpoch
            },
            timestamp: Date.now()
          };

          console.log('📡 Program account change detected:', eventData);
          callback(eventData);
        },
        SOLANA_CONFIG.commitment
      );

      this.subscriptions.set(subscriptionId, solanaSubscriptionId);
      
      // Add to event listeners
      if (!this.eventListeners.has('program_account_change')) {
        this.eventListeners.set('program_account_change', []);
      }
      this.eventListeners.get('program_account_change')!.push(callback);

      console.log(`✅ Subscribed to program account changes: ${subscriptionId}`);
      return subscriptionId;

    } catch (error) {
      console.error('❌ Failed to subscribe to program changes:', error);
      throw error;
    }
  }

  /**
   * Subscribe to specific account changes (individual events or tickets)
   */
  async subscribeToAccount(
    accountPubkey: PublicKey, 
    callback: (data: RealtimeEventData) => void
  ): Promise<string> {
    const subscriptionId = `account_${accountPubkey.toString()}_${Date.now()}`;
    
    try {
      const solanaSubscriptionId = this.connection.onAccountChange(
        accountPubkey,
        (accountInfo, context) => {
          const eventData: RealtimeEventData = {
            type: 'account_change',
            account: accountPubkey,
            data: {
              accountInfo,
              context,
              lamports: accountInfo.lamports,
              owner: accountInfo.owner.toString()
            },
            timestamp: Date.now()
          };

          console.log('📡 Account change detected:', eventData);
          callback(eventData);
        },
        SOLANA_CONFIG.commitment
      );

      this.subscriptions.set(subscriptionId, solanaSubscriptionId);
      
      console.log(`✅ Subscribed to account changes: ${accountPubkey.toString()}`);
      return subscriptionId;

    } catch (error) {
      console.error('❌ Failed to subscribe to account changes:', error);
      throw error;
    }
  }

  /**
   * Subscribe to transaction signatures for real-time confirmation
   */
  async subscribeToSignature(
    signature: string,
    callback: (data: RealtimeEventData) => void
  ): Promise<string> {
    const subscriptionId = `signature_${signature}_${Date.now()}`;
    
    try {
      const solanaSubscriptionId = this.connection.onSignature(
        signature,
        (result, context) => {
          const eventData: RealtimeEventData = {
            type: 'signature_notification',
            data: {
              signature,
              result,
              context,
              confirmed: !result.err
            },
            timestamp: Date.now()
          };

          console.log('📡 Transaction confirmed:', eventData);
          callback(eventData);
        },
        SOLANA_CONFIG.commitment
      );

      this.subscriptions.set(subscriptionId, solanaSubscriptionId);
      
      console.log(`✅ Subscribed to signature: ${signature}`);
      return subscriptionId;

    } catch (error) {
      console.error('❌ Failed to subscribe to signature:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from a specific subscription
   */
  async unsubscribe(subscriptionId: string): Promise<void> {
    const solanaSubscriptionId = this.subscriptions.get(subscriptionId);
    
    if (solanaSubscriptionId !== undefined) {
      try {
        await this.connection.removeAccountChangeListener(solanaSubscriptionId);
        this.subscriptions.delete(subscriptionId);
        console.log(`✅ Unsubscribed: ${subscriptionId}`);
      } catch (error) {
        console.error('❌ Failed to unsubscribe:', error);
      }
    }
  }

  /**
   * Unsubscribe from all subscriptions
   */
  async unsubscribeAll(): Promise<void> {
    const unsubscribePromises = Array.from(this.subscriptions.keys()).map(
      subscriptionId => this.unsubscribe(subscriptionId)
    );
    
    await Promise.all(unsubscribePromises);
    console.log('✅ All subscriptions removed');
  }

  /**
   * Get the Solana connection instance
   */
  getConnection(): Connection {
    return this.connection;
  }

  /**
   * Get MagicBlock service instance
   */
  getMagicBlockService() {
    return this.magicBlockService;
  }

  /**
   * Check if real-time service is connected
   */
  isConnected(): boolean {
    return this.magicBlockService?.isConnected() || false;
  }

  /**
   * Get real-time statistics
   */
  async getRealtimeStats() {
    if (MAGICBLOCK_CONFIG.enabled && this.magicBlockService) {
      return await this.magicBlockService.getRealtimeStats();
    }
    
    return {
      totalTransactions: 0,
      avgLatency: 0,
      activeRollups: 0,
      feesSaved: 0
    };
  }

  /**
   * Cleanup resources
   */
  async cleanup(): Promise<void> {
    await this.unsubscribeAll();
    
    if (this.magicBlockService) {
      this.magicBlockService.disconnect();
    }
    
    console.log('✅ Real-time service cleaned up');
  }
}

// Singleton instance
let realtimeService: SolanaRealtimeService | null = null;

export const getSolanaRealtimeService = (): SolanaRealtimeService => {
  if (!realtimeService) {
    realtimeService = new SolanaRealtimeService();
  }
  return realtimeService;
};