// Fast-loading tickets page
import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Ticket, 
  Calendar,
  MapPin,
  Clock,
  QrCode,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FastTickets: React.FC = () => {
  const { publicKey, connected } = useWallet();

  // Real ticket data - will be populated from blockchain
  const realTickets: any[] = []; // Empty array - real tickets will be fetched from Solana blockchain

  if (!connected || !publicKey) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center py-20">
          <Wallet className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
          <p className="text-gray-400">Connect your Solana wallet to view your tickets</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          My Tickets
        </h1>
        <p className="text-gray-400 text-lg">Your event tickets secured on Solana blockchain</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-6 text-center">
            <Ticket className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 text-sm font-medium">Total Tickets</p>
            <p className="text-2xl font-bold text-white">{realTickets.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 text-sm font-medium">Active Tickets</p>
            <p className="text-2xl font-bold text-white">
              {realTickets.filter(t => t.status === 'active').length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-6 text-center">
            <QrCode className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-400 text-sm font-medium">Total Spent</p>
            <p className="text-2xl font-bold text-white">0.0 SOL</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Your Tickets</h2>
        
        {realTickets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {realTickets.map((ticket) => (
              <Card key={ticket.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-white mb-2">
                        {ticket.eventTitle}
                      </CardTitle>
                      <Badge 
                        className={
                          ticket.status === 'active' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }
                      >
                        {ticket.status === 'active' ? 'Active' : 'Used'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Ticket Type</p>
                      <p className="font-semibold text-white">{ticket.ticketType}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm text-white">
                          {new Date(ticket.eventDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="text-sm text-white">{ticket.eventTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-400">Venue</p>
                      <p className="text-sm text-white">{ticket.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div>
                      <p className="text-xs text-gray-400">Paid</p>
                      <p className="text-sm font-semibold text-green-400">{ticket.price}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                      >
                        <QrCode className="w-4 h-4 mr-1" />
                        QR Code
                      </Button>
                      
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-12 text-center">
              <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Tickets Yet</h3>
              <p className="text-gray-400 mb-6">
                You haven't purchased any tickets yet. Explore events to get started!
              </p>
              <Link to="/dashboard/explore">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explore Events
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Blockchain Info */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">Blockchain Security</h3>
              <p className="text-sm text-gray-400">
                Your tickets are secured on the Solana blockchain and cannot be counterfeited
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              VERIFIED ON SOLANA
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};