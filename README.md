# CarePulse

A collaborative family/patient care management platform for medication tracking, appointment scheduling, symptom monitoring, and AI-powered health insights.

## Features

- **Multi-role Support**: Caregiver, Patient, Family Member, Medical Professional
- **Medication Management**: Schedule, track, and receive reminders for medications
- **Appointment Calendar**: Manage appointments with pre-visit checklists and AI suggestions
- **Symptom Tracker**: Daily logging with emoji, slider, text, and voice note inputs
- **AI-Powered Insights**: Daily/weekly summaries, pattern detection, and alerts
- **Care Feed**: Social feed-style updates for all care events
- **Group Chat**: Secure real-time communication
- **Emergency Alerts**: Red flag system for urgent situations
- **Health Visualizations**: Trends, graphs, and analytics

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Chart.js
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **Real-time**: Socket.io
- **AI Service**: Python FastAPI
- **Notifications**: Web Push, SMS (Twilio)

## Project Structure

```
project-root/
├── client/          # React app
├── server/          # Node + Express
├── ai-service/      # Python FastAPI
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB
- Python 3.9+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Client
   cd client && npm install
   
   # Server
   cd server && npm install
   
   # AI Service
   cd ai-service && pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in each directory
   - Fill in your configuration

4. Start development servers:
   ```bash
   # Terminal 1 - Client
   cd client && npm run dev
   
   # Terminal 2 - Server
   cd server && npm run dev
   
   # Terminal 3 - AI Service
   cd ai-service && uvicorn main:app --reload
   ```

### Docker Setup

```bash
docker-compose up -d
```

## Development Roadmap

- [x] Project scaffolding
- [ ] Auth & Group Setup
- [ ] Dashboard
- [ ] Medications & Appointments CRUD
- [ ] Symptoms Tracker
- [ ] Care Feed & Chat
- [ ] AI Summary/Alert microservice
- [ ] Emergency Alerts
- [ ] Testing & Deployment

## License

MIT

