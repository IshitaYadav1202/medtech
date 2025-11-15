import { useState, useEffect } from 'react'
import { FiWifi, FiWifiOff } from 'react-icons/fi'
import api from '../api'

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [serverStatus, setServerStatus] = useState(null)

  useEffect(() => {
    // Check browser online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check server status
    checkServerStatus()

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const checkServerStatus = async () => {
    try {
      const response = await api.get('/health')
      setServerStatus(response.data.status === 'ok')
    } catch (error) {
      setServerStatus(false)
    }
  }

  if (isOnline && serverStatus) return null

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
      {!isOnline ? (
        <>
          <FiWifiOff className="h-5 w-5" />
          <span>No Internet Connection</span>
        </>
      ) : !serverStatus ? (
        <>
          <FiWifiOff className="h-5 w-5" />
          <span>Server Offline - Please start the backend server</span>
        </>
      ) : null}
    </div>
  )
}

export default NetworkStatus

