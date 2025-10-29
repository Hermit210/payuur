@echo off
REM MagicBlock Deployment Script for Soluma (Windows)
REM This script handles the complete deployment process

setlocal enabledelayedexpansion

echo 🚀 Soluma MagicBlock Deployment Script
echo ======================================

REM Configuration
set CLUSTER=%1
if "%CLUSTER%"=="" set CLUSTER=devnet
set PROGRAM_NAME=soluma_magicblock

echo 📋 Deployment Configuration:
echo   Cluster: %CLUSTER%
echo   Program: %PROGRAM_NAME%
echo.

REM Check prerequisites
echo 🔍 Checking prerequisites...

where anchor >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Anchor CLI not found. Please install it first.
    exit /b 1
)

where solana >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Solana CLI not found. Please install it first.
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Set Solana cluster
echo 🌐 Setting Solana cluster to %CLUSTER%...
solana config set --url %CLUSTER%

REM Check wallet balance
echo 💰 Checking wallet balance...
for /f "tokens=*" %%i in ('solana balance --lamports') do set BALANCE=%%i
set MIN_BALANCE=1000000000

if %BALANCE% lss %MIN_BALANCE% (
    echo ❌ Insufficient balance. Need at least 1 SOL for deployment.
    if "%CLUSTER%"=="devnet" (
        echo 💸 Requesting airdrop...
        solana airdrop 2
        timeout /t 5 /nobreak >nul
    ) else (
        echo Please fund your wallet and try again.
        exit /b 1
    )
)

echo ✅ Wallet balance sufficient

REM Build the program
echo 🔨 Building Anchor program...
anchor build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    exit /b 1
)

echo ✅ Build successful

REM Deploy the program
echo 🚀 Deploying to %CLUSTER%...
anchor deploy --provider.cluster %CLUSTER%

if %errorlevel% neq 0 (
    echo ❌ Deployment failed
    exit /b 1
)

REM Get program ID
for /f "tokens=*" %%i in ('solana address -k target/deploy/%PROGRAM_NAME%-keypair.json') do set PROGRAM_ID=%%i
echo ✅ Program deployed successfully
echo 📝 Program ID: %PROGRAM_ID%

REM Update frontend environment
echo 🔧 Updating frontend configuration...
(
echo VITE_SOLANA_RPC_URL=https://api.%CLUSTER%.solana.com
echo VITE_MAGICBLOCK_RPC_URL=http://localhost:8899
echo VITE_PROGRAM_ID=%PROGRAM_ID%
echo VITE_CLUSTER=%CLUSTER%
) > frontend\.env

REM Build frontend
echo 🏗️ Building frontend...
cd frontend
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    exit /b 1
)

cd ..
echo ✅ Frontend built successfully

REM Generate deployment summary
echo 📊 Generating deployment summary...
(
echo # Soluma MagicBlock Deployment Summary
echo.
echo ## Deployment Details
echo - **Date**: %date% %time%
echo - **Cluster**: %CLUSTER%
echo - **Program ID**: `%PROGRAM_ID%`
echo - **Program Name**: %PROGRAM_NAME%
echo.
echo ## Endpoints
echo - **Solana RPC**: https://api.%CLUSTER%.solana.com
echo - **MagicBlock RPC**: http://localhost:8899 ^(local development^)
echo.
echo ## Quick Start
echo ```bash
echo # Start MagicBlock engine
echo magicblock-engine start
echo.
echo # Run frontend
echo cd frontend ^&^& npm run dev
echo.
echo # Test the integration
echo npm run magicblock:demo
echo ```
echo.
echo ## Program Accounts
echo - **Event PDA**: Derived from ["event", organizer, title]
echo - **Ticket PDA**: Derived from ["ticket", event, buyer]
echo.
echo ## MagicBlock Features
echo - ⚡ Ultra-low latency ^(<1ms^)
echo - 🆓 Zero transaction fees
echo - 📈 Real-time state updates
echo - 🔄 Delegation/undelegation support
echo.
echo ## Testing
echo ```bash
echo # Run Anchor tests
echo anchor test
echo.
echo # Run MagicBlock integration tests
echo npm run magicblock:test
echo.
echo # Run performance demo
echo npm run magicblock:demo
echo ```
echo.
echo ## Support
echo - [MagicBlock Documentation]^(https://docs.magicblock.gg^)
echo - [Setup Guide]^(./MAGICBLOCK_SETUP.md^)
echo - [GitHub Repository]^(https://github.com/dhruv457457/soLuma^)
) > DEPLOYMENT_SUMMARY.md

echo ✅ Deployment summary created

REM Final success message
echo.
echo 🎉 DEPLOYMENT SUCCESSFUL! 🎉
echo.
echo 📋 Next Steps:
echo 1. Start MagicBlock engine: magicblock-engine start
echo 2. Run frontend: cd frontend ^&^& npm run dev
echo 3. Test integration: npm run magicblock:demo
echo 4. View deployment details: type DEPLOYMENT_SUMMARY.md
echo.
echo 🔗 Program ID: %PROGRAM_ID%
echo 🌐 Cluster: %CLUSTER%
echo.
echo Ready for hackathon submission! 🚀

pause