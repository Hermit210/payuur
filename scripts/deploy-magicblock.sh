#!/bin/bash

# MagicBlock Deployment Script for Soluma
# This script handles the complete deployment process

set -e

echo "🚀 Soluma MagicBlock Deployment Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
CLUSTER=${1:-devnet}
PROGRAM_NAME="soluma_magicblock"

echo -e "${BLUE}📋 Deployment Configuration:${NC}"
echo "  Cluster: $CLUSTER"
echo "  Program: $PROGRAM_NAME"
echo ""

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

if ! command -v anchor &> /dev/null; then
    echo -e "${RED}❌ Anchor CLI not found. Please install it first.${NC}"
    exit 1
fi

if ! command -v solana &> /dev/null; then
    echo -e "${RED}❌ Solana CLI not found. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Set Solana cluster
echo -e "${YELLOW}🌐 Setting Solana cluster to $CLUSTER...${NC}"
solana config set --url $CLUSTER

# Check wallet balance
echo -e "${YELLOW}💰 Checking wallet balance...${NC}"
BALANCE=$(solana balance --lamports)
MIN_BALANCE=1000000000  # 1 SOL in lamports

if [ "$BALANCE" -lt "$MIN_BALANCE" ]; then
    echo -e "${RED}❌ Insufficient balance. Need at least 1 SOL for deployment.${NC}"
    if [ "$CLUSTER" = "devnet" ]; then
        echo -e "${YELLOW}💸 Requesting airdrop...${NC}"
        solana airdrop 2
        sleep 5
    else
        echo -e "${RED}Please fund your wallet and try again.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✅ Wallet balance sufficient${NC}"

# Build the program
echo -e "${YELLOW}🔨 Building Anchor program...${NC}"
anchor build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"

# Deploy the program
echo -e "${YELLOW}🚀 Deploying to $CLUSTER...${NC}"
anchor deploy --provider.cluster $CLUSTER

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

# Get program ID
PROGRAM_ID=$(solana address -k target/deploy/$PROGRAM_NAME-keypair.json)
echo -e "${GREEN}✅ Program deployed successfully${NC}"
echo -e "${BLUE}📝 Program ID: $PROGRAM_ID${NC}"

# Update Anchor.toml with the new program ID
echo -e "${YELLOW}📝 Updating Anchor.toml...${NC}"
sed -i.bak "s/SoLuMa1111111111111111111111111111111111111/$PROGRAM_ID/g" Anchor.toml

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
anchor test --skip-local-validator

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Tests failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Tests passed${NC}"

# Update frontend environment
echo -e "${YELLOW}🔧 Updating frontend configuration...${NC}"
cat > frontend/.env << EOF
VITE_SOLANA_RPC_URL=https://api.$CLUSTER.solana.com
VITE_MAGICBLOCK_RPC_URL=http://localhost:8899
VITE_PROGRAM_ID=$PROGRAM_ID
VITE_CLUSTER=$CLUSTER
EOF

# Build frontend
echo -e "${YELLOW}🏗️ Building frontend...${NC}"
cd frontend
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi

cd ..
echo -e "${GREEN}✅ Frontend built successfully${NC}"

# Generate deployment summary
echo -e "${YELLOW}📊 Generating deployment summary...${NC}"
cat > DEPLOYMENT_SUMMARY.md << EOF
# Soluma MagicBlock Deployment Summary

## Deployment Details
- **Date**: $(date)
- **Cluster**: $CLUSTER
- **Program ID**: \`$PROGRAM_ID\`
- **Program Name**: $PROGRAM_NAME

## Endpoints
- **Solana RPC**: https://api.$CLUSTER.solana.com
- **MagicBlock RPC**: http://localhost:8899 (local development)

## Quick Start
\`\`\`bash
# Start MagicBlock engine
magicblock-engine start

# Run frontend
cd frontend && npm run dev

# Test the integration
npm run magicblock:demo
\`\`\`

## Program Accounts
- **Event PDA**: Derived from ["event", organizer, title]
- **Ticket PDA**: Derived from ["ticket", event, buyer]

## MagicBlock Features
- ⚡ Ultra-low latency (<1ms)
- 🆓 Zero transaction fees
- 📈 Real-time state updates
- 🔄 Delegation/undelegation support

## Testing
\`\`\`bash
# Run Anchor tests
anchor test

# Run MagicBlock integration tests
npm run magicblock:test

# Run performance demo
npm run magicblock:demo
\`\`\`

## Support
- [MagicBlock Documentation](https://docs.magicblock.gg)
- [Setup Guide](./MAGICBLOCK_SETUP.md)
- [GitHub Repository](https://github.com/dhruv457457/soLuma)
EOF

echo -e "${GREEN}✅ Deployment summary created${NC}"

# Final success message
echo ""
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL! 🎉${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Start MagicBlock engine: magicblock-engine start"
echo "2. Run frontend: cd frontend && npm run dev"
echo "3. Test integration: npm run magicblock:demo"
echo "4. View deployment details: cat DEPLOYMENT_SUMMARY.md"
echo ""
echo -e "${YELLOW}🔗 Program ID: $PROGRAM_ID${NC}"
echo -e "${YELLOW}🌐 Cluster: $CLUSTER${NC}"
echo ""
echo -e "${GREEN}Ready for hackathon submission! 🚀${NC}"