import mongoose from 'mongoose'

const feedSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['medication', 'appointment', 'symptom', 'note', 'alert'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    urgent: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
feedSchema.index({ group: 1, timestamp: -1 })
feedSchema.index({ urgent: 1, timestamp: -1 })

const Feed = mongoose.model('Feed', feedSchema)

export default Feed

