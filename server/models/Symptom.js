import mongoose from 'mongoose'

const symptomSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    mood: {
      type: String,
      enum: ['happy', 'neutral', 'sad', 'anxious', 'tired', 'sick'],
      default: 'neutral',
    },
    note: {
      type: String,
    },
    voiceNote: {
      type: String, // URL to audio file
    },
    enteredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Symptom = mongoose.model('Symptom', symptomSchema)

export default Symptom

