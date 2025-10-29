// Quick dashboard component that loads immediately after wallet connection
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Wallet, 
  Zap, 
  Shield, 
  Activity,
  Plus,
  Calendar,
  Ticket
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuickDashboard: React.FC = () => {
  const { publicKey, connected } = useWallet();

  if (!connected || !publicKey) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-8 h-8 text-yellow-400" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Welcome to Soluma!
          </h1>
          <Shield className="w-8 h-8 text-green-400" />
        </div>
        <p className="text-gray-400 text-lg">Your wallet is connected and ready to go!</p>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          <Activity className="w-4 h-4 mr-1" />
          WALLET CONNECTED
        </Badge>
      </div>

      {/* Wallet Info */}
      <Card className="bg-gray-900/50 border-gray-800 max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wallet className="w-5 h-5 text-cyan-400" />
            Connected Wallet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <p className="font-mono text-sm text-white break-all">
              {publicKey.toString()}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Network</span>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Solana Devnet
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30 hover:border-blue-500/50 transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Plus className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Create Event</h3>
            <p className="text-sm text-gray-400 mb-4">Start selling tickets on Solana</p>
            <Link to="/dashboard/events/new">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30 hover:border-green-500/50 transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Explore Events</h3>
            <p className="text-sm text-gray-400 mb-4">Discover amazing events</p>
            <Link to="/dashboard/explore">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Explore
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30 hover:border-purple-500/50 transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Ticket className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">My Tickets</h3>
            <p className="text-sm text-gray-400 mb-4">View your purchased tickets</p>
            <Link to="/dashboard/tickets">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                View Tickets
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Hackathon Features Preview */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h2 className="text-xl font-bold text-white">🏆 Hackathon Features</h2>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                CYPHERPUNK TRACK
              </Badge>
            </div>
            <p className="text-gray-400 mb-4">
              Experience real-time analytics and cypherpunk security features
            </p>
            <Link to="/dashboard/profile">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                View Full Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};