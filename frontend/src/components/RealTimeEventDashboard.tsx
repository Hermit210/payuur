// Real-time event dashboard component for MagicBlock track
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Zap,
  Activity,
  DollarSign
} from 'lucide-react';

interface RealTimeStats {
  totalTicketsSold: number;
  currentAttendees: number;
  revenueGenerated: number;
  averageTicketPrice: number;
  salesVelocity: number;
  peakSalesTime: string;
}

interface LiveActivity {
  id: string;
  type: 'ticket_purchase' | 'check_in' | 'event_update';
  message: string;
  timestamp: Date;
  amount?: number;
}

export const RealTimeEventDashboard: React.FC<{ eventId: string }> = ({ eventId }) => {
  const { connected } = useWallet();
  const [stats, setStats] = useState<RealTimeStats>({
    totalTicketsSold: 0,
    currentAttendees: 0,
    revenueGenerated: 0,
    averageTicketPrice: 0,
    salesVelocity: 0,
    peakSalesTime: 'N/A'
  });
  
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([]);
  const [isLive, setIsLive] = useState(false);

  // Simulate real-time updates for demo
  useEffect(() => {
    if (!connected) return;

    const interval = setInterval(() => {
      // Simulate real-time ticket sales
      setStats(prev => ({
        ...prev,
        totalTicketsSold: prev.totalTicketsSold + Math.floor(Math.random() * 3),
        currentAttendees: prev.currentAttendees + Math.floor(Math.random() * 2),
        revenueGenerated: prev.revenueGenerated + (Math.random() * 50),
        salesVelocity: Math.floor(Math.random() * 10) + 1
      }));

      // Add new live activity
      const activities = [
        'New ticket purchased by 7x8k...9mNp',
        'Attendee checked in at venue',
        'Event capacity updated',
        'Payment confirmed on Solana'
      ];
      
      const newActivity: LiveActivity = {
        id: Date.now().toString(),
        type: 'ticket_purchase',
        message: activities[Math.floor(Math.random() * activities.length)],
        timestamp: new Date(),
        amount: Math.random() * 100
      };

      setLiveActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      setIsLive(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [connected, eventId]);

  if (!connected) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Connect your wallet to view real-time analytics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Live Status Indicator */}
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
        <span className="text-sm font-medium text-white">
          {isLive ? 'Live Analytics' : 'Connecting...'}
        </span>
        <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
          REAL-TIME
        </Badge>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Tickets Sold</p>
                <p className="text-2xl font-bold text-white">{stats.totalTicketsSold}</p>
                <p className="text-xs text-blue-300">+{stats.salesVelocity}/min</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Revenue (SOL)</p>
                <p className="text-2xl font-bold text-white">{stats.revenueGenerated.toFixed(2)}</p>
                <p className="text-xs text-green-300">Live tracking</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-white">{stats.currentAttendees}</p>
                <p className="text-xs text-purple-300">Online now</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Activity className="w-5 h-5 text-cyan-400" />
            Live Activity Feed
            <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {liveActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 border border-gray-700/50">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse" />
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {activity.timestamp.toLocaleTimeString()}
                    </span>
                    {activity.amount && (
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        +{activity.amount.toFixed(2)} SOL
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sales Velocity Chart Placeholder */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Sales Velocity (Real-time)</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Current Rate</span>
              <span className="text-sm font-medium text-white">{stats.salesVelocity} tickets/min</span>
            </div>
            <Progress value={(stats.salesVelocity / 10) * 100} className="h-2" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400">Peak Time</p>
                <p className="text-sm font-medium text-white">{stats.peakSalesTime}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Avg Price</p>
                <p className="text-sm font-medium text-white">{stats.averageTicketPrice.toFixed(2)} SOL</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Conversion</p>
                <p className="text-sm font-medium text-white">87.3%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};