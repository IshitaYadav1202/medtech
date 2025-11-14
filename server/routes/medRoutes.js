import express from 'express'
import {
  getMedications,
  getMedication,
  createMedication,
  updateMedication,
  deleteMedication,
  markDoseTaken,
  getMedicationHistory,
} from '../controllers/medicationController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.route('/').get(getMedications).post(createMedication)
router.route('/:id').get(getMedication).put(updateMedication).delete(deleteMedication)
router.post('/:id/dose', markDoseTaken)
router.get('/:id/history', getMedicationHistory)

export default router

