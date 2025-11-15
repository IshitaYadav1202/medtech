import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRouter from './router'
import { AuthProvider } from './contexts/AuthContext'
import { SocketProvider } from './contexts/SocketContext'
import NetworkStatus from './components/NetworkStatus'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <Router>
            <AppRouter />
            <Toaster position="top-right" />
            <NetworkStatus />
          </Router>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App

