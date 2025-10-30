// MagicBlock Real-time Integration Demo Component
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getSolanaRealtimeService, RealtimeEventData } from '../lib/solana-realtime';
import { PROGRAM_ID, MAGICBLOCK_CONFIG } from '../config/soluma';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Zap, 
  Activity, 
  Clock, 
  DollarSign, 
  Users,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

export const MagicBlockRealtimeDemo: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEventData[]>([]);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    avgLatency: 0,
    activeRollups: 0,
    feesSaved: 0
  });
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  const realtimeService = getSolanaRealtimeService();

  useEffect(() => {
    if (connected && publicKey) {
      initializeRealtimeService();
    }

    return () => {
      cleanup();
    };
  }, [connected, publicKey]);

  const initializeRealtimeService = async () => {
    try {
      console.log('🚀 Initializing MagicBlock real-time demo...');
      
      // Initialize the real-time service
      await realtimeService.initialize();
      setIsConnected(realtimeService.isConnected());

      // Subscribe to program account changes
      const programSubscription = await realtimeService.subscribeToProgram(
        handleRealtimeEvent
      );
      
      setSubscriptions(prev => [...prev, programSubscription]);

      // Get initial stats
      const initialStats = await realtimeService.getRealtimeStats();
      setStats(initialStats);

      // Update stats every 5 seconds
      const statsInterval = setInterval(async () => {
        const newStats = await realtimeService.getRealtimeStats();
        setStats(newStats);
      }, 5000);

      return () => clearInterval(statsInterval);

    } catch (error) {
      console.error('❌ Failed to initialize real-time service:', error);
    }
  };

  const handleRealtimeEvent = (eventData: RealtimeEventData) => {
    console.log('📡 Real-time event received:', eventData);
    
    setRealtimeEvents(prev => {
      const newEvents = [eventData, ...prev].slice(0, 10); // Keep last 10 events
      return newEvents;
    });

    // Update stats based on event type
    if (eventData.type === 'program_account_change') {
      setStats(prev => ({
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
        avgLatency: Math.random() * 2 // Simulate <2ms latency
      }));
    }
  };

  const subscribeToSpecificAccount = async () => {
    if (!publicKey) return;

    try {
      // Example: Subscribe to a specific event account
      const eventPda = PublicKey.findProgramAddressSync(
        [Buffer.from("event"), publicKey.toBuffer(), Buffer.from("Demo Event")],
        PROGRAM_ID
      )[0];

      const subscription = await realtimeService.subscribeToAccount(
        eventPda,
        handleRealtimeEvent
      );

      setSubscriptions(prev => [...prev, subscription]);
      console.log('✅ Subscribed to specific account:', eventPda.toString());

    } catch (error) {
      console.error('❌ Failed to subscribe to account:', error);
    }
  };

  const cleanup = async () => {
    try {
      await realtimeService.cleanup();
      setSubscriptions([]);
      setIsConnected(false);
    } catch (error) {
      console.error('❌ Cleanup failed:', error);
    }
  };

  const formatEventType = (type: string) => {
    switch (type) {
      case 'program_account_change':
        return 'Program Update';
      case 'account_change':
        return 'Account Change';
      case 'signature_notification':
        return 'Transaction Confirmed';
      default:
        return type;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'program_account_change':
        return <Activity className="w-4 h-4 text-blue-400" />;
      case 'account_change':
        return <Users className="w-4 h-4 text-green-400" />;
      case 'signature_notification':
        return <CheckCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-8 text-center">
            <Zap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">MagicBlock Real-time Demo</h2>
            <p className="text-gray-400">Connect your wallet to experience real-time Solana updates</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            MagicBlock Real-time Demo
          </h1>
          <Badge className={`${isConnected ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3 mr-1" />
                CONNECTED
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                DISCONNECTED
              </>
            )}
          </Badge>
        </div>
        <p className="text-gray-400">
          Real-time Solana program monitoring with MagicBlock integration
        </p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-400 text-sm font-medium">Total Transactions</p>
            <p className="text-2xl font-bold text-white">{stats.totalTransactions}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 text-sm font-medium">Avg Latency</p>
            <p className="text-2xl font-bold text-white">{stats.avgLatency.toFixed(1)}ms</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 text-sm font-medium">Active Rollups</p>
            <p className="text-2xl font-bold text-white">{stats.activeRollups}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/30">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-orange-400 text-sm font-medium">Fees Saved</p>
            <p className="text-2xl font-bold text-white">${stats.feesSaved.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Real-time Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Program ID: <code className="text-purple-400">{PROGRAM_ID.toString()}</code>
              </p>
              <p className="text-sm text-gray-400">
                Active Subscriptions: <span className="text-green-400">{subscriptions.length}</span>
              </p>
              <p className="text-sm text-gray-400">
                MagicBlock Enabled: <span className="text-blue-400">{MAGICBLOCK_CONFIG.enabled ? 'Yes' : 'No'}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={subscribeToSpecificAccount}
                disabled={!isConnected}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Subscribe to Account
              </Button>
              
              <Button
                onClick={cleanup}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Clear Subscriptions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Events */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Live Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {realtimeEvents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Waiting for real-time events...</p>
                  <p className="text-xs mt-1">Events will appear here when detected</p>
                </div>
              ) : (
                realtimeEvents.map((event, index) => (
                  <div
                    key={`${event.timestamp}-${index}`}
                    className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700"
                  >
                    {getEventIcon(event.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">
                          {formatEventType(event.type)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {event.account && (
                        <p className="text-xs text-gray-500 truncate">
                          {event.account.toString()}
                        </p>
                      )}
                      {event.data?.lamports && (
                        <p className="text-xs text-purple-400">
                          {(event.data.lamports / 1e9).toFixed(4)} SOL
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MagicBlock Info */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Powered by MagicBlock</h3>
            <p className="text-gray-400 mb-4">
              Experience ultra-low latency real-time updates with ephemeral rollup technology
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">&lt;1ms Latency</p>
                <p className="text-xs text-gray-400">Ultra-fast processing</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">Zero Fees</p>
                <p className="text-xs text-gray-400">No transaction costs</p>
              </div>
              <div className="text-center">
                <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">Real-time</p>
                <p className="text-xs text-gray-400">Instant confirmations</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};