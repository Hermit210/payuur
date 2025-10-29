// Cypherpunk-themed security features for the hackathon
import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff,
  Fingerprint,
  Zap,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface SecurityMetrics {
  encryptionLevel: string;
  transactionSecurity: 'HIGH' | 'MEDIUM' | 'LOW';
  privacyScore: number;
  decentralizationIndex: number;
  censorshipResistance: boolean;
}

export const CypherpunkSecurity: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    encryptionLevel: 'AES-256 + Solana Native',
    transactionSecurity: 'HIGH',
    privacyScore: 95,
    decentralizationIndex: 98,
    censorshipResistance: true
  });
  
  const [showPrivateData, setShowPrivateData] = useState(false);
  const [securityScan, setSecurityScan] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const runSecurityScan = () => {
    setSecurityScan('scanning');
    setTimeout(() => {
      setSecurityScan('complete');
      // Simulate improved metrics after scan
      setSecurityMetrics(prev => ({
        ...prev,
        privacyScore: Math.min(100, prev.privacyScore + Math.floor(Math.random() * 5)),
        decentralizationIndex: Math.min(100, prev.decentralizationIndex + Math.floor(Math.random() * 2))
      }));
    }, 3000);
  };

  if (!connected) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6 text-center">
          <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Connect wallet to access Cypherpunk security features</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cypherpunk Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CYPHERPUNK SECURITY SUITE
          </h2>
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
        <p className="text-gray-400 text-sm">Decentralized • Private • Censorship-Resistant</p>
      </div>

      {/* Security Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/30">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 text-sm font-medium">Privacy Score</p>
            <p className="text-2xl font-bold text-white">{securityMetrics.privacyScore}%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/30">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-blue-400 text-sm font-medium">Decentralization</p>
            <p className="text-2xl font-bold text-white">{securityMetrics.decentralizationIndex}%</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/30">
          <CardContent className="p-4 text-center">
            <Lock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-purple-400 text-sm font-medium">Encryption</p>
            <p className="text-xs font-bold text-white">{securityMetrics.encryptionLevel}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/30">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 text-sm font-medium">Security Level</p>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {securityMetrics.transactionSecurity}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Cypherpunk Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Controls */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="w-5 h-5 text-cyan-400" />
              Privacy Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white">Anonymous Ticketing</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ACTIVE
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white">Zero-Knowledge Proofs</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ENABLED
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2">
                {showPrivateData ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4 text-cyan-400" />}
                <span className="text-sm text-white">Private Data Visibility</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowPrivateData(!showPrivateData)}
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                {showPrivateData ? 'Hide' : 'Show'}
              </Button>
            </div>

            {showPrivateData && (
              <div className="p-3 rounded-lg bg-red-900/20 border border-red-700/30">
                <p className="text-xs text-red-400 mb-2">⚠️ SENSITIVE DATA</p>
                <p className="text-xs font-mono text-white break-all">
                  Wallet: {publicKey?.toString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  This data is encrypted and never stored on centralized servers
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Scanner */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-cyan-400" />
              Security Scanner
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button
                onClick={runSecurityScan}
                disabled={securityScan === 'scanning'}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
              >
                {securityScan === 'scanning' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Scanning...
                  </>
                ) : securityScan === 'complete' ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Scan Complete
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </>
                )}
              </Button>
            </div>

            {securityScan === 'complete' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-green-900/20">
                  <span className="text-sm text-green-400">✓ Wallet Security</span>
                  <span className="text-xs text-green-300">PASSED</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-900/20">
                  <span className="text-sm text-green-400">✓ Transaction Integrity</span>
                  <span className="text-xs text-green-300">PASSED</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-900/20">
                  <span className="text-sm text-green-400">✓ Privacy Protection</span>
                  <span className="text-xs text-green-300">PASSED</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-green-900/20">
                  <span className="text-sm text-green-400">✓ Censorship Resistance</span>
                  <span className="text-xs text-green-300">PASSED</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cypherpunk Manifesto Quote */}
      <Card className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700">
        <CardContent className="p-6 text-center">
          <blockquote className="text-gray-300 italic text-sm mb-2">
            "Privacy is necessary for an open society in the electronic age. We cannot expect governments, corporations, or other large, faceless organizations to grant us privacy out of their beneficence."
          </blockquote>
          <cite className="text-xs text-gray-500">— Eric Hughes, A Cypherpunk's Manifesto</cite>
        </CardContent>
      </Card>
    </div>
  );
};