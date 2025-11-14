import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    inviteCode: {
      type: String,
      unique: true,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Group = mongoose.model('Group', groupSchema)

export default Group

