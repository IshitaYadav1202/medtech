import mongoose from 'mongoose'

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide patient name'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    conditions: [
      {
        type: String,
        trim: true,
      },
    ],
    medications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medication',
      },
    ],
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Symptom',
      },
    ],
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    primaryCaregiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Patient = mongoose.model('Patient', patientSchema)

export default Patient

