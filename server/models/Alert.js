import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['medication', 'appointment', 'symptom', 'emergency', 'system'],
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    acknowledgedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        acknowledgedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolved: {
      type: Boolean,
      default: false,
    },
    resolvedAt: Date,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
alertSchema.index({ group: 1, urgency: 1, resolved: 1, createdAt: -1 })

const Alert = mongoose.model('Alert', alertSchema)

export default Alert

