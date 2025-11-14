import express from 'express'
import {
  getSymptoms,
  getSymptom,
  createSymptom,
  updateSymptom,
  deleteSymptom,
  getSymptomTrends,
} from '../controllers/symptomController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect) // All routes require authentication

router.route('/').get(getSymptoms).post(createSymptom)
router.route('/:id').get(getSymptom).put(updateSymptom).delete(deleteSymptom)
router.get('/trends/:patientId', getSymptomTrends)

export default router

