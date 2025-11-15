#!/bin/bash

# CarePulse Development Startup Script
echo "🚀 Starting CarePulse Development Servers..."
echo ""

# Start Server in background
echo "📡 Starting Backend Server..."
cd server && npm run dev &
SERVER_PID=$!

# Wait a bit for server to start
sleep 3

# Start Client
echo "💻 Starting Frontend Client..."
cd ../client && npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Servers starting..."
echo "📱 Frontend: http://localhost:3000"
echo "📡 Backend: http://localhost:5000"
echo ""
echo "⚠️  Make sure MongoDB is running (or server will work without it)"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for user interrupt
wait

