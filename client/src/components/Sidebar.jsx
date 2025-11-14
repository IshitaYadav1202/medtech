import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiPill,
  FiCalendar,
  FiActivity,
  FiRss,
  FiMessageCircle,
  FiX,
} from 'react-icons/fi'

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation()

  const menuItems = [
    { path: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/medications', icon: FiPill, label: 'Medications' },
    { path: '/appointments', icon: FiCalendar, label: 'Appointments' },
    { path: '/symptoms', icon: FiActivity, label: 'Symptoms' },
    { path: '/feed', icon: FiRss, label: 'Care Feed' },
    { path: '/chat', icon: FiMessageCircle, label: 'Chat' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="p-4">
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
          >
            <FiX className="h-5 w-5" />
          </button>

          <nav className="mt-8 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

