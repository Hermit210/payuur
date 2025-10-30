# 🚀 MAGICBLOCK FIX SCRIPT — RUN AS ADMIN

# Close any Node or NPM processes
Write-Host "Killing any Node or NPM processes..." -ForegroundColor Cyan
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
Stop-Process -Name npm -Force -ErrorAction SilentlyContinue

# Remove all old global installs
Write-Host "Cleaning old global MagicBlock installations..." -ForegroundColor Cyan
rd /s /q "C:\Users\salon\AppData\Roaming\npm\node_modules\magicblock" 2>$null
rd /s /q "C:\Users\salon\AppData\Roaming\npm\node_modules\.magicblock-mvOSv9Ui" 2>$null
del "C:\Users\salon\AppData\Roaming\npm\magicblock.cmd" 2>$null

# Clean npm cache
Write-Host "Cleaning npm cache..." -ForegroundColor Cyan
npm cache clean --force

# Move to your project directory
Write-Host "Navigating to your project folder..." -ForegroundColor Cyan
cd "C:\Users\salon\OneDrive\Desktop\payuur"

# Initialize npm if needed
if (!(Test-Path package.json)) {
    Write-Host "Creating package.json..." -ForegroundColor Cyan
    npm init -y
}

# Install MagicBlock locally (not globally)
Write-Host "Installing MagicBlock locally..." -ForegroundColor Cyan
npm install magicblock@latest

# Test run MagicBlock
Write-Host "Running MagicBlock test..." -ForegroundColor Green
node node_modules/magicblock/cli-ui/dist/index.js --help

Write-Host "`n✅ DONE! If no error shows above, MagicBlock is now working." -ForegroundColor Green
Write-Host "Try running: npx magicblock connect" -ForegroundColor Yellow