import Medication from '../models/Medication.js'
import Patient from '../models/Patient.js'

// @desc    Get all medications
// @route   GET /api/medications
// @access  Private
export const getMedications = async (req, res, next) => {
  try {
    const { patientId } = req.query
    const query = patientId ? { patient: patientId } : {}
    
    const medications = await Medication.find(query)
      .populate('patient', 'name')
      .populate('responsibleUser', 'name email')
      .sort({ nextDue: 1 })

    res.json({
      success: true,
      count: medications.length,
      data: medications,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single medication
// @route   GET /api/medications/:id
// @access  Private
export const getMedication = async (req, res, next) => {
  try {
    const medication = await Medication.findById(req.params.id)
      .populate('patient', 'name')
      .populate('responsibleUser', 'name email')

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    res.json({
      success: true,
      data: medication,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create medication
// @route   POST /api/medications
// @access  Private
export const createMedication = async (req, res, next) => {
  try {
    const medication = await Medication.create(req.body)

    // Add to patient's medications array if patientId is provided
    if (req.body.patient || req.body.patientId) {
      const patientId = req.body.patient || req.body.patientId
      try {
        await Patient.findByIdAndUpdate(patientId, {
          $push: { medications: medication._id },
        })
      } catch (patientError) {
        // Patient not found, but medication is created - continue
        console.warn('Patient not found for medication:', patientError.message)
      }
    }

    res.status(201).json({
      success: true,
      data: medication,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update medication
// @route   PUT /api/medications/:id
// @access  Private
export const updateMedication = async (req, res, next) => {
  try {
    const medication = await Medication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    res.json({
      success: true,
      data: medication,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete medication
// @route   DELETE /api/medications/:id
// @access  Private
export const deleteMedication = async (req, res, next) => {
  try {
    const medication = await Medication.findById(req.params.id)

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    // Remove from patient's medications array
    await Patient.findByIdAndUpdate(medication.patient, {
      $pull: { medications: medication._id },
    })

    await medication.deleteOne()

    res.json({
      success: true,
      message: 'Medication deleted',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Mark dose as taken
// @route   POST /api/medications/:id/dose
// @access  Private
export const markDoseTaken = async (req, res, next) => {
  try {
    const { doseId, taken } = req.body
    const medication = await Medication.findById(req.params.id)

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    // Update history
    const doseIndex = medication.history.findIndex((d) => d.doseId === doseId)
    if (doseIndex !== -1) {
      medication.history[doseIndex].taken = taken
      medication.history[doseIndex].takenAt = taken ? new Date() : null
      medication.history[doseIndex].takenBy = taken ? req.user._id : null
    } else {
      medication.history.push({
        doseId,
        scheduledTime: new Date(),
        taken,
        takenAt: taken ? new Date() : null,
        takenBy: taken ? req.user._id : null,
      })
    }

    // Update missed doses count
    if (!taken) {
      medication.missedDoses = (medication.missedDoses || 0) + 1
    }

    await medication.save()

    res.json({
      success: true,
      data: medication,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get medication history
// @route   GET /api/medications/:id/history
// @access  Private
export const getMedicationHistory = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query
    const medication = await Medication.findById(req.params.id)

    if (!medication) {
      return res.status(404).json({ message: 'Medication not found' })
    }

    let history = medication.history || []

    // Filter by date range if provided
    if (startDate || endDate) {
      history = history.filter((entry) => {
        const entryDate = new Date(entry.scheduledTime)
        if (startDate && entryDate < new Date(startDate)) return false
        if (endDate && entryDate > new Date(endDate)) return false
        return true
      })
    }

    res.json({
      success: true,
      data: history,
    })
  } catch (error) {
    next(error)
  }
}

