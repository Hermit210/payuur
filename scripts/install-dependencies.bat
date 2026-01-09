@echo off
REM Install Dependencies Script for Soluma
echo 🚀 Installing Soluma Dependencies...

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install backend dependencies (if exists)
if exist "backend" (
  echo 📦 Installing backend dependencies...
  cd backend
  call npm install
  cd ..
)

echo.
echo ✅ All dependencies installed successfully!
echo.
echo 🎯 Next steps:
echo 1. Run 'npm run dev:frontend' to start the frontend
echo 2. Run 'npm run demo' to test the platform

pause
