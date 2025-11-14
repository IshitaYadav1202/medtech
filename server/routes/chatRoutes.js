import express from 'express'
import {
  getThreads,
  getThread,
  createThread,
  sendMessage,
} from '../controllers/chatController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.get('/threads', getThreads)
router.post('/threads', createThread)
router.get('/threads/:id', getThread)
router.post('/threads/:id/messages', sendMessage)

export default router

