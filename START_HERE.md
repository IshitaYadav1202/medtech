# 🚀 CarePulse - START HERE

## ⚠️ IMPORTANT: You MUST be in the project directory!

**Current Directory:** `C:\Users\Ishit\OneDrive\Desktop\medtech`

## 📋 Quick Start (3 Steps)

### Step 1: Navigate to Project Directory
```powershell
cd C:\Users\Ishit\OneDrive\Desktop\medtech
```

### Step 2: Start Backend Server
```powershell
cd server
npm run dev
```

**Wait until you see:**
```
🚀 Server running on port 5000
```

### Step 3: Start Frontend (New Terminal)
Open a **NEW** PowerShell window:
```powershell
cd C:\Users\Ishit\OneDrive\Desktop\medtech\client
npm run dev
```

**Wait until you see:**
```
➜  Local:   http://localhost:3000/
```

## ✅ Verify It's Working

1. **Check Backend:** Open http://localhost:5000/api/health
   - Should show: `{"status":"ok",...}`

2. **Check Frontend:** Open http://localhost:3000
   - Should show the CarePulse landing page

3. **Try Registration:**
   - Click "Get Started"
   - Fill in the form
   - Submit
   - Should work without network errors!

## 🔧 Common Errors & Fixes

### Error: "Could not read package.json"
**Fix:** You're in the wrong directory!
```powershell
# Make sure you're here:
cd C:\Users\Ishit\OneDrive\Desktop\medtech
```

### Error: "Port 5000 already in use"
**Fix:** Another server is running. Either:
- Close the other server, OR
- Change PORT in `server/.env` to 5001

### Error: "Network Error" when registering
**Fix:** Backend server is not running!
- Make sure Step 2 completed successfully
- Check http://localhost:5000/api/health works

### Error: "MongoDB connection error"
**Fix:** This is OK! Server will work without MongoDB for testing.
- To use database: Install MongoDB and start it

## 🎯 Directory Structure

```
medtech/
├── client/          ← Frontend (React)
│   └── npm run dev  ← Start here for frontend
├── server/          ← Backend (Node.js)
│   └── npm run dev  ← Start here for backend
└── ai-service/      ← AI Service (Python)
```

## 💡 Pro Tip

Use the startup script:
```powershell
cd C:\Users\Ishit\OneDrive\Desktop\medtech
.\start-dev.ps1
```

This will start both servers automatically!

## 📞 Still Having Issues?

1. Make sure Node.js is installed: `node --version`
2. Make sure you're in the correct directory
3. Check both PowerShell windows for error messages
4. Verify ports 3000 and 5000 are not blocked

