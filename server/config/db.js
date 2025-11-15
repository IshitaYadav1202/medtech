import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carepulse'
    
    // Set mongoose options
    mongoose.set('strictQuery', false)
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    return true
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`)
    console.log('⚠️  Server will continue without database connection (development mode)')
    console.log('💡 To fix: Make sure MongoDB is running or set MONGODB_URI in .env')
    // Don't exit - allow server to start without DB for development
    return false
  }
}

export default connectDB

