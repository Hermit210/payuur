@echo off
REM Install Dependencies Script for Soluma MagicBlock Integration
echo 🚀 Installing Soluma MagicBlock Integration Dependencies...

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Install frontend dependencies
echo 🎨 Installing frontend dependencies...
cd frontend
npm install

REM Install backend dependencies (if exists)
if exist "..\backend" (
    echo ⚙️ Installing backend dependencies...
    cd ..\backend
    npm install
    cd ..
) else (
    cd ..
)

echo ✅ All dependencies installed successfully!
echo.
echo 🎯 Next steps:
echo 1. Run 'npm run dev:frontend' to start the frontend
echo 2. Run 'npm run demo' to test MagicBlock integration
echo 3. Check MAGICBLOCK_VERIFICATION.md for testing instructions

pause