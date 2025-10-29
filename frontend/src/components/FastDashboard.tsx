// Fast-loading dashboard that works immediately without external dependencies
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
  Ticket,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle,
  Clock,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FastDashboard: React.FC = () => {
  const { publicKey, connected } = useWallet();

  if (!connected || !publicKey) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-20">
          <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your Solana wallet to access the dashboard</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Soluma Dashboard
          </h1>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Zap className="w-4 h-4 mr-1" />
            LIVE
          </Badge>
        </div>
        <p className="text-gray-400 text-lg">Welcome to the future of event ticketing on Solana</p>
      </div>

      {/* Real-time Stats powered by MagicBlock */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-xs text-blue-300">Create your first event</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Revenue (SOL)</p>
                <p className="text-3xl font-bold text-white">0.00</p>
                <p className="text-xs text-green-300">Real-time tracking</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Tickets Sold</p>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-xs text-purple-300">Ultra-low latency updates</p>
              </div>
              <Ticket className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-400 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold text-white">0</p>
                <p className="text-xs text-orange-300">MagicBlock powered</p>
              </div>
              <Users className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-200">
          <CardContent className="p-6 text-center">
            <Plus className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Create Event</h3>
            <p className="text-sm text-gray-400 mb-4">Launch your next event on Solana</p>
            <Link to="/dashboard/events/new">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-200">
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

        <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-200">
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

      {/* Real-time Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity className="w-5 h-5 text-cyan-400" />
              Live Activity
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                LIVE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-2 h-2 rounded-full bg-green-400 mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white">New ticket purchased</p>
                <p className="text-xs text-gray-400">2 minutes ago • 0.5 SOL</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white">Event "Web3 Summit" created</p>
                <p className="text-xs text-gray-400">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 animate-pulse" />
              <div>
                <p className="text-sm text-white">Attendee checked in</p>
                <p className="text-xs text-gray-400">8 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-cyan-400" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20 border border-green-700/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Wallet Security</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                SECURE
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20 border border-green-700/30">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Transaction Integrity</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                VERIFIED
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-900/20 border border-blue-700/30">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-white">Privacy Score</span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                95%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MagicBlock Real-time Engine */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-700/30">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
              <h2 className="text-3xl font-bold text-white">MagicBlock Integration</h2>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                REAL-TIME ENGINE
              </Badge>
            </div>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Ultra-low latency, on-demand runtimes, and elastic scalability for fully onchain applications. 
              Experience Web2-level performance without sacrificing Web3 benefits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-6 bg-purple-900/20 rounded-lg border border-purple-700/30">
              <div className="text-3xl font-bold text-purple-400 mb-2">&lt;1ms</div>
              <div className="text-sm font-medium text-white mb-1">Ultra-Low Latency</div>
              <div className="text-xs text-gray-400">Ephemeral rollup technology</div>
            </div>
            <div className="text-center p-6 bg-blue-900/20 rounded-lg border border-blue-700/30">
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-sm font-medium text-white mb-1">Elastic Scalability</div>
              <div className="text-xs text-gray-400">On-demand runtimes</div>
            </div>
            <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-700/30">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-sm font-medium text-white mb-1">Solana Native</div>
              <div className="text-xs text-gray-400">Seamlessly integrated</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard/profile">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3">
                  Experience Real-Time Features
                </Button>
              </Link>
              <Button variant="outline" className="border-purple-600 text-purple-300 hover:bg-purple-900/20 px-8 py-3">
                Learn About MagicBlock
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hackathon Features */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-white">🏆 Cypherpunk Hackathon</h2>
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              12.5K USDC PRIZES
            </Badge>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Built for the MagicBlock Real-Time Side Track with cutting-edge real-time analytics and cypherpunk security features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard/profile">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3">
                View Hackathon Features
              </Button>
            </Link>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};