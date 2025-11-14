/**
 * ApptModal - Modal for adding/editing appointments
 */
import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { appointmentsAPI } from '../api/appointments'

const ApptModal = ({ open, onClose, appointment = null, patientId }) => {
  const [formData, setFormData] = useState({
    datetime: '',
    doctor: '',
    location: '',
    reason: '',
    notes: '',
    checklist: [],
  })

  useEffect(() => {
    if (appointment) {
      setFormData(appointment)
    }
  }, [appointment])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (appointment) {
        await appointmentsAPI.update(appointment._id, { ...formData, patientId })
      } else {
        await appointmentsAPI.create({ ...formData, patientId })
      }
      onClose()
    } catch (error) {
      console.error('Error saving appointment:', error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {appointment ? 'Edit Appointment' : 'Add Appointment'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={formData.datetime}
              onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor *</label>
              <input
                type="text"
                required
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                className="input-field"
                placeholder="Dr. Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
                placeholder="Hospital/Clinic name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason *</label>
            <input
              type="text"
              required
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="input-field"
              placeholder="e.g., Annual checkup"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="input-field"
              rows="3"
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {appointment ? 'Update' : 'Add'} Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApptModal

