import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import app from './app.js'

dotenv.config()

const PORT = process.env.PORT || 5000

// Create HTTP server
const server = http.createServer(app)

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  // Join user's group room
  socket.on('join:group', (groupId) => {
    socket.join(`group:${groupId}`)
    console.log(`User ${socket.id} joined group ${groupId}`)
  })

  // Handle chat messages
  socket.on('message:send', (data) => {
    io.to(`group:${data.groupId}`).emit('message:new', data)
  })

  // Handle alerts
  socket.on('alert:create', (data) => {
    io.to(`group:${data.groupId}`).emit('alert:new', data)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Make io available to routes
app.set('io', io)

// Connect to MongoDB
connectDB()

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

