# 🚀 CarePulse Quick Start Guide

## ⚠️ IMPORTANT: Network Error Fix

If you're seeing "Network Error", make sure the **backend server is running**!

## 📋 Step-by-Step Setup

### 1. Start Backend Server (REQUIRED)

**Open Terminal 1:**
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
💚 Health check: http://localhost:5000/api/health
```

### 2. Start Frontend Client

**Open Terminal 2:**
```bash
cd client
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:3000/
```

### 3. (Optional) Start AI Service

**Open Terminal 3:**
```bash
cd ai-service
uvicorn main:app --reload
```

## 🎯 Quick Test

1. Open browser: http://localhost:3000
2. Try to register a new account
3. If you see "Network Error", check that the server is running on port 5000

## 🔧 Troubleshooting

### Network Error?
- ✅ Make sure backend server is running (`cd server && npm run dev`)
- ✅ Check server console for errors
- ✅ Verify server is on port 5000: http://localhost:5000/api/health

### MongoDB Connection Error?
- The server will still work without MongoDB for testing
- To use database features, install and start MongoDB:
  ```bash
  # Windows (if installed)
  mongod
  
  # Or use Docker
  docker run -d -p 27017:27017 mongo:7
  ```

### Port Already in Use?
- Change PORT in `server/.env`
- Or kill the process using the port

## 📝 Environment Variables

**server/.env** (create if doesn't exist):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carepulse
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**client/.env** (create if doesn't exist):
```env
VITE_API_URL=http://localhost:5000
```

## ✅ Verification

1. **Server Health Check:**
   - Visit: http://localhost:5000/api/health
   - Should return: `{"status":"ok",...}`

2. **Frontend:**
   - Visit: http://localhost:3000
   - Should show landing page

3. **Registration:**
   - Fill in form and submit
   - Should create account and redirect to onboarding

## 🎉 You're Ready!

Once both servers are running, you can:
- Register/Login
- Add medications
- Schedule appointments
- Track symptoms
- Use all features!

