@echo off
echo 🎪 Starting Soluma Demo
echo ================================

echo.
echo ✅ Program ID: CfbfPPJfZVwiiSPSaf67s6eJKnLX3TARiC3MpJGsjWxr
echo ✅ Network: Solana Devnet
echo.

echo 🚀 Starting frontend development server...
echo.

echo 📋 Instructions:
echo 1. Open http://localhost:5173 in your browser
echo 2. Connect your Solana wallet (Phantom recommended)
echo 3. Try creating an event or purchasing tickets
echo.

cd frontend
call npm run dev
