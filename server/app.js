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

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CarePulse API is running' })
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

