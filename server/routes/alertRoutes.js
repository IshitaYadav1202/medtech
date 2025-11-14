import express from 'express'
import {
  getAlerts,
  createAlert,
  updateAlert,
  acknowledgeAlert,
} from '../controllers/alertController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.route('/').get(getAlerts).post(createAlert)
router.route('/:id').put(updateAlert)
router.post('/:id/acknowledge', acknowledgeAlert)

export default router

