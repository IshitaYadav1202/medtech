import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Routes
import userRoutes from './routes/userRoutes.js'
import medicationRoutes from './routes/medRoutes.js'
import appointmentRoutes from './routes/apptRoutes.js'
import symptomRoutes from './routes/symptomRoutes.js'
import feedRoutes from './routes/feedRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import alertRoutes from './routes/alertRoutes.js'

// Middleware
import { errorHandler } from './middleware/error.js'

dotenv.config()

const app = express()

// Middleware - CORS with proper configuration
app.use(cors({
  origin: process.env.CLIENT_URL || ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CarePulse API is running', timestamp: new Date().toISOString() })
})

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'CarePulse API', version: '1.0.0' })
})

// Routes
app.use('/api/auth', userRoutes)
app.use('/api/medications', medicationRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/symptoms', symptomRoutes)
app.use('/api/feed', feedRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/alerts', alertRoutes)

// Error handling middleware (must be last)
app.use(errorHandler)

export default app

