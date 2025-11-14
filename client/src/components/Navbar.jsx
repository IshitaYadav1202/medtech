import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiBell, FiMenu, FiUser, FiLogOut } from 'react-icons/fi'

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="flex items-center ml-2 lg:ml-0">
              <span className="text-2xl font-bold text-primary-600">CarePulse</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900">
              <FiBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span className="hidden md:block text-sm font-medium">{user?.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <FiUser className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setDropdownOpen(false)
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

