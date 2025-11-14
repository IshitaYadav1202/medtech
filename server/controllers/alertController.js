import Alert from '../models/Alert.js'

// @desc    Get all alerts
// @route   GET /api/alerts
// @access  Private
export const getAlerts = async (req, res, next) => {
  try {
    const { urgency, resolved } = req.query
    const query = { group: req.user.group }

    if (urgency) query.urgency = urgency
    if (resolved !== undefined) query.resolved = resolved === 'true'

    const alerts = await Alert.find(query)
      .populate('patient', 'name')
      .populate('triggeredBy', 'name')
      .populate('acknowledgedBy.user', 'name')
      .sort({ urgency: 1, createdAt: -1 })

    res.json({
      success: true,
      count: alerts.length,
      data: alerts,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Create alert
// @route   POST /api/alerts
// @access  Private
export const createAlert = async (req, res, next) => {
  try {
    const alertData = {
      ...req.body,
      group: req.user.group,
      triggeredBy: req.user._id,
    }

    const alert = await Alert.create(alertData)

    // Emit socket event for real-time updates
    const io = req.app.get('io')
    if (io) {
      io.to(`group:${req.user.group}`).emit('alert:new', alert)
    }

    // TODO: Send push notifications and SMS if configured
    // await sendAlertNotifications(alert)

    res.status(201).json({
      success: true,
      data: alert,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Update alert
// @route   PUT /api/alerts/:id
// @access  Private
export const updateAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' })
    }

    res.json({
      success: true,
      data: alert,
    })
  } catch (error) {
    next(error)
  }
}

// @desc    Acknowledge alert
// @route   POST /api/alerts/:id/acknowledge
// @access  Private
export const acknowledgeAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findById(req.params.id)

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' })
    }

    // Check if already acknowledged by this user
    const alreadyAcknowledged = alert.acknowledgedBy.some(
      (a) => a.user.toString() === req.user._id.toString()
    )

    if (!alreadyAcknowledged) {
      alert.acknowledgedBy.push({
        user: req.user._id,
        acknowledgedAt: new Date(),
      })
      await alert.save()
    }

    res.json({
      success: true,
      data: alert,
    })
  } catch (error) {
    next(error)
  }
}

