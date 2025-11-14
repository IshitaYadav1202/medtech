import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema(
  {
    datetime: {
      type: Date,
      required: [true, 'Please provide appointment date and time'],
    },
    doctor: {
      type: String,
      required: [true, 'Please provide doctor name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide location'],
      trim: true,
    },
    reason: {
      type: String,
      required: [true, 'Please provide reason'],
      trim: true,
    },
    notes: {
      type: String,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    checklist: [
      {
        item: String,
        completed: { type: Boolean, default: false },
        completedAt: Date,
        completedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    aiSuggestions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment

