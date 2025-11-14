import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <AppRouter />
          <Toaster position="top-right" />
        </Router>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App

