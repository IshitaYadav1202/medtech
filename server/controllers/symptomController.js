import Symptom from '../models/Symptom.js'
import Patient from '../models/Patient.js'

// @desc    Get all symptoms
// @route   GET /api/symptoms
// @access  Private
export const getSymptoms = async (req, res, next) => {
  try {
    const { patientId, startDate, endDate } = req.query
    const query = {}

    if (patientId) query.patient = patientId
    if (startDate || endDate) {
      query.timestamp = {}
      if (startDate) query.timestamp.$gte = new Date(startDate)
      if (endDate) query.timestamp.$lte = new Date(endDate)
    }

    const symptoms = await Symptom.find(query)
      .populate('patient', 'name')
      .populate('enteredBy', 'name')
      .sort({ timestamp: -1 })

    res.json({
      success: true,
      count: symptoms.length,
      data: symptoms,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single symptom
// @route   GET /api/symptoms/:id
// @access  Private
export const getSymptom = async (req, res, next) => {
  try {
    const symptom = await Symptom.findById(req.params.id)
      .populate('patient', 'name')
      .populate('enteredBy', 'name')

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' })
    }

    res.json({
      success: true,
      data: symptom,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create symptom
// @route   POST /api/symptoms
// @access  Private
export const createSymptom = async (req, res, next) => {
  try {
    const symptomData = {
      ...req.body,
      enteredBy: req.user._id,
    }

    const symptom = await Symptom.create(symptomData)

    // Add to patient's symptoms array if patientId is provided
    if (req.body.patient || req.body.patientId) {
      const patientId = req.body.patient || req.body.patientId
      try {
        await Patient.findByIdAndUpdate(patientId, {
          $push: { symptoms: symptom._id },
        })
      } catch (patientError) {
        // Patient not found, but symptom is created - continue
        console.warn('Patient not found for symptom:', patientError.message)
      }
    }

    // TODO: Check for patterns and generate alerts if needed
    // await checkSymptomPatterns(symptom)

    res.status(201).json({
      success: true,
      data: symptom,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update symptom
// @route   PUT /api/symptoms/:id
// @access  Private
export const updateSymptom = async (req, res, next) => {
  try {
    const symptom = await Symptom.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' })
    }

    res.json({
      success: true,
      data: symptom,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete symptom
// @route   DELETE /api/symptoms/:id
// @access  Private
export const deleteSymptom = async (req, res, next) => {
  try {
    const symptom = await Symptom.findById(req.params.id)

    if (!symptom) {
      return res.status(404).json({ message: 'Symptom not found' })
    }

    // Remove from patient's symptoms array
    await Patient.findByIdAndUpdate(symptom.patient, {
      $pull: { symptoms: symptom._id },
    })

    await symptom.deleteOne()

    res.json({
      success: true,
      message: 'Symptom deleted',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get symptom trends
// @route   GET /api/symptoms/trends/:patientId
// @access  Private
export const getSymptomTrends = async (req, res, next) => {
  try {
    const { patientId } = req.params
    const { days = 7 } = req.query

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(days))

    const symptoms = await Symptom.find({
      patient: patientId,
      timestamp: { $gte: startDate },
    }).sort({ timestamp: 1 })

    // Format data for chart
    const dates = symptoms.map((s) => s.timestamp.toISOString().split('T')[0])
    const severities = symptoms.map((s) => s.severity)

    res.json({
      success: true,
      data: {
        dates,
        severities,
        symptoms,
      },
    })
  } catch (error) {
    next(error)
  }
}

