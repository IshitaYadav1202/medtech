import express from 'express'
import {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  completeChecklist,
} from '../controllers/appointmentController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.route('/').get(getAppointments).post(createAppointment)
router.route('/:id').get(getAppointment).put(updateAppointment).delete(deleteAppointment)
router.post('/:id/checklist', completeChecklist)

export default router

