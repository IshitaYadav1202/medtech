# CarePulse Development Startup Script
Write-Host "🚀 Starting CarePulse Development Servers..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Start Server
Write-Host "📡 Starting Backend Server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; Write-Host 'Starting server...' -ForegroundColor Green; npm run dev" -WindowStyle Minimized

# Wait a bit for server to start
Start-Sleep -Seconds 3

# Start Client
Write-Host "💻 Starting Frontend Client..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; Write-Host 'Starting client...' -ForegroundColor Green; npm run dev" -WindowStyle Minimized

Write-Host ""
Write-Host "✅ Servers starting..." -ForegroundColor Green
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📡 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Make sure MongoDB is running (or server will work without it)" -ForegroundColor Yellow

