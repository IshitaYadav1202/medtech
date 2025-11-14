import express from 'express'
import {
  register,
  login,
  getMe,
  joinGroup,
} from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/join-group', protect, joinGroup)

export default router

