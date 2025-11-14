import Appointment from '../models/Appointment.js'
import Patient from '../models/Patient.js'

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
export const getAppointments = async (req, res, next) => {
  try {
    const { patientId, startDate, endDate } = req.query
    const query = {}

    if (patientId) query.patient = patientId
    if (startDate || endDate) {
      query.datetime = {}
      if (startDate) query.datetime.$gte = new Date(startDate)
      if (endDate) query.datetime.$lte = new Date(endDate)
    }

    const appointments = await Appointment.find(query)
      .populate('patient', 'name')
      .sort({ datetime: 1 })

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
export const getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'name')

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    res.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
export const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body)

    // Add to patient's appointments array
    await Patient.findByIdAndUpdate(req.body.patient, {
      $push: { appointments: appointment._id },
    })

    // TODO: Generate AI suggestions based on previous appointments
    // appointment.aiSuggestions = await generateAISuggestions(req.body.patient)

    res.status(201).json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
export const updateAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    res.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
export const deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    // Remove from patient's appointments array
    await Patient.findByIdAndUpdate(appointment.patient, {
      $pull: { appointments: appointment._id },
    })

    await appointment.deleteOne()

    res.json({
      success: true,
      message: 'Appointment deleted',
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Complete checklist item
// @route   POST /api/appointments/:id/checklist
// @access  Private
export const completeChecklist = async (req, res, next) => {
  try {
    const { item, completed } = req.body
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' })
    }

    const checklistItem = appointment.checklist.find((c) => c.item === item)
    if (checklistItem) {
      checklistItem.completed = completed
      checklistItem.completedAt = completed ? new Date() : null
      checklistItem.completedBy = completed ? req.user._id : null
    } else {
      appointment.checklist.push({
        item,
        completed,
        completedAt: completed ? new Date() : null,
        completedBy: completed ? req.user._id : null,
      })
    }

    await appointment.save()

    res.json({
      success: true,
      data: appointment,
    })
  } catch (error) {
    next(error)
  }
}

