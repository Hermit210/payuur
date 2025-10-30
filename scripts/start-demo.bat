@echo off
echo 🎪 Starting Soluma MagicBlock Demo
echo ================================

echo.
echo ✅ Program ID: CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr
echo ✅ Network: Solana Devnet
echo ✅ MagicBlock: Integrated
echo.

echo 🚀 Starting frontend development server...
cd frontend
start cmd /k "npm run dev"

echo.
echo 📋 Demo Instructions:
echo 1. Open http://localhost:5173 in your browser
echo 2. Connect your Solana wallet (Phantom recommended)
echo 3. Try creating an event or purchasing tickets
echo 4. Experience real-time updates via MagicBlock
echo.

echo 🎯 Key Features to Test:
echo - Ultra-low latency transactions (^<1ms)
echo - Zero-fee ticket purchases
echo - Real-time event updates
echo - Instant check-in verification
echo.

pause