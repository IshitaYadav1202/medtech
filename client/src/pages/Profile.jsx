import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getRoleDisplayName } from '../utils/helpers'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notifications: user?.notifications || {
      email: true,
      push: true,
      sms: false,
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Implement profile update API call
    toast.success('Profile updated successfully')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={getRoleDisplayName(user?.role)}
              disabled
              className="input-field bg-gray-100"
            />
          </div>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, email: e.target.checked },
                })
              }
              className="mr-3"
            />
            <span>Email Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.push}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, push: e.target.checked },
                })
              }
              className="mr-3"
            />
            <span>Push Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.notifications.sms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, sms: e.target.checked },
                })
              }
              className="mr-3"
            />
            <span>SMS Notifications</span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Profile

