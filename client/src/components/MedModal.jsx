/**
 * MedModal - Modal for adding/editing medications
 */
import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'
import { medicationsAPI } from '../api/medications'

const MedModal = ({ open, onClose, medication = null, patientId }) => {
  const [formData, setFormData] = useState({
    name: '',
    dose: '',
    frequency: '',
    startDate: '',
    endDate: '',
    prescribedBy: '',
    notes: '',
    responsibleUser: '',
  })

  useEffect(() => {
    if (medication) {
      setFormData(medication)
    }
  }, [medication])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (medication) {
        await medicationsAPI.update(medication._id, { ...formData, patientId })
      } else {
        await medicationsAPI.create({ ...formData, patientId })
      }
      onClose()
      // Refresh medications list
    } catch (error) {
      console.error('Error saving medication:', error)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {medication ? 'Edit Medication' : 'Add Medication'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Medication Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              placeholder="e.g., Aspirin"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dose *</label>
              <input
                type="text"
                required
                value={formData.dose}
                onChange={(e) => setFormData({ ...formData, dose: e.target.value })}
                className="input-field"
                placeholder="e.g., 100mg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Frequency *
              </label>
              <select
                required
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="input-field"
              >
                <option value="">Select frequency</option>
                <option value="Once daily">Once daily</option>
                <option value="Twice daily">Twice daily</option>
                <option value="Three times daily">Three times daily</option>
                <option value="Four times daily">Four times daily</option>
                <option value="As needed">As needed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prescribed By
            </label>
            <input
              type="text"
              value={formData.prescribedBy}
              onChange={(e) => setFormData({ ...formData, prescribedBy: e.target.value })}
              className="input-field"
              placeholder="Doctor name"
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
              {medication ? 'Update' : 'Add'} Medication
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MedModal

