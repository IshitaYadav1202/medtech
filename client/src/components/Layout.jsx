import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import QuickAddBar from './QuickAddBar'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main className="flex-1 p-6 lg:ml-64">
          {children}
        </main>
      </div>
      <QuickAddBar />
    </div>
  )
}

export default Layout

