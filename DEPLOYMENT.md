# CarePulse Deployment Guide

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Python 3.9+

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Set Up Environment Variables

**server/.env:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carepulse
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
```

**client/.env:**
```env
VITE_API_URL=http://localhost:5000
```

### 3. Start Services

**Terminal 1 - Server:**
```bash
npm run dev:server
```

**Terminal 2 - Client:**
```bash
npm run dev:client
```

**Terminal 3 - AI Service:**
```bash
npm run dev:ai
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Service: http://localhost:8000

---

## Production Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

#### Deploy Frontend to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to client folder: `cd client`
3. Run: `vercel`
4. Set environment variable: `VITE_API_URL=https://your-render-backend-url.onrender.com`

#### Deploy Backend to Render:
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Set:
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
5. Add environment variables from server/.env

#### Deploy AI Service to Render:
1. Create new Web Service (Python)
2. Build Command: `cd ai-service && pip install -r requirements.txt`
3. Start Command: `cd ai-service && uvicorn main:app --host 0.0.0.0 --port $PORT`

---

### Option 2: Railway (All Services)

1. Go to https://railway.app
2. Create new project from GitHub
3. Add services:
   - Client (Node.js)
   - Server (Node.js)
   - AI Service (Python)
4. Configure each service with appropriate build/start commands
5. Add environment variables

---

### Option 3: Docker Compose (Self-Hosted)

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Server on port 5000
- Client on port 3000
- AI Service on port 8000

---

### Option 4: MongoDB Atlas Setup

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carepulse
   ```

---

## Environment Variables Checklist

### Server (.env)
- [ ] NODE_ENV
- [ ] PORT
- [ ] MONGODB_URI
- [ ] JWT_SECRET
- [ ] JWT_EXPIRE
- [ ] CLIENT_URL
- [ ] AI_SERVICE_URL
- [ ] (Optional) TWILIO credentials
- [ ] (Optional) Email credentials

### Client (.env)
- [ ] VITE_API_URL

---

## Build Commands

```bash
# Build client for production
npm run build:client

# Start production server
npm run start:server

# Start production client
npm run start:client
```

---

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access (for Atlas)

### Port Already in Use
- Change PORT in .env files
- Kill process using port: `lsof -ti:5000 | xargs kill`

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

---

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Use MongoDB Atlas or secure database
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Configure environment variables
- [ ] Set up monitoring/logging
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

