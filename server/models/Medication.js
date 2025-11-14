import mongoose from 'mongoose'

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide medication name'],
      trim: true,
    },
    dose: {
      type: String,
      required: [true, 'Please provide dose'],
      trim: true,
    },
    frequency: {
      type: String,
      required: [true, 'Please provide frequency'],
      enum: ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'As needed'],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    nextDue: {
      type: Date,
      required: true,
    },
    prescribedBy: {
      type: String,
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
    responsibleUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    history: [
      {
        doseId: String,
        scheduledTime: Date,
        taken: Boolean,
        takenAt: Date,
        takenBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        notes: String,
      },
    ],
    missedDoses: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Medication = mongoose.model('Medication', medicationSchema)

export default Medication

