import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        attachments: [
          {
            type: String, // URL to file
            fileType: String,
          },
        ],
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    lastMessage: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Index for efficient queries
chatSchema.index({ group: 1, lastMessage: -1 })

const Chat = mongoose.model('Chat', chatSchema)

export default Chat

