import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from './AuthContext'

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider')
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
        const newSocket = io(apiUrl, {
          auth: {
            token: localStorage.getItem('token'),
          },
          reconnection: true,
          reconnectionDelay: 1000,
        })

        newSocket.on('connect', () => {
          console.log('Socket connected')
        })

        newSocket.on('disconnect', () => {
          console.log('Socket disconnected')
        })

        newSocket.on('connect_error', (error) => {
          console.error('Socket connection error:', error)
        })

        setSocket(newSocket)

        return () => {
          newSocket.close()
        }
      } catch (error) {
        console.error('Error initializing socket:', error)
      }
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [user])

  const value = {
    socket,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

