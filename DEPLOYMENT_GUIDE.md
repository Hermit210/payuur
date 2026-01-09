# 🚀 Deployment Guide - Soluma

## Quick Setup

### 1. Install Dependencies

**Option A: Use Installation Script**
```bash
# Windows
scripts/install-dependencies.bat

# Linux/Mac
chmod +x scripts/install-dependencies.sh
./scripts/install-dependencies.sh
```

**Option B: Manual Installation**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Start Development Server

```bash
# Start frontend
npm run dev:frontend

# Or directly
cd frontend && npm run dev
```

### 3. Access the Application

Open your browser to: `http://localhost:5173`

## 📁 Project Structure

```
soLuma-main/
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   └── solana-realtime.ts    # Solana integration
│   │   ├── components/
│   │   └── config/
│   │       └── soluma.ts             # Configuration
├── programs/
│   └── soluma/
│       └── src/
│           └── lib.rs                # Solana program
├── scripts/
│   ├── install-dependencies.sh       # Setup script
│   └── install-dependencies.bat      # Windows setup
└── tests/
    └── soluma.ts                     # Program tests
```

## 🔍 Verification

### Check Installation
```bash
# Verify dependencies are installed
npm list --depth=0

# Check frontend dependencies
cd frontend && npm list --depth=0
```

### Test Build
```bash
# Test frontend build
cd frontend && npm run build
```

### Run Demo
```bash
# Start the demo
npm run demo

# Or use the demo script
node scripts/demo.js
```

## 🐛 Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
cd frontend && npm run dev -- --port 3000
```

**2. Node Version Issues**
```bash
# Use Node 18 or higher
node --version

# Install with nvm if needed
nvm install 18
nvm use 18
```

**3. Wallet Connection Issues**
- Ensure you're on Solana Devnet
- Clear browser cache and cookies
- Try a different wallet extension

## 🎉 Success!

If everything is working correctly, you should see:

- ✅ Frontend running on `http://localhost:5173`
- ✅ Wallet connection working
- ✅ Event creation functional
- ✅ Real-time updates across browser tabs
