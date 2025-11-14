import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carepulse'
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    // Don't exit in development - allow server to start without DB
    if (process.env.NODE_ENV === 'production') {
      process.exit(1)
    } else {
      console.log('Server will continue without database connection (development mode)')
    }
  }
}

export default connectDB

