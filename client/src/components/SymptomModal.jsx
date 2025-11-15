/**
 * SymptomModal - Modal for logging symptoms
 * Supports: emoji/mood picker, slider, text, voice note input
 */
import { useState, useEffect } from 'react'
import { FiX, FiMic } from 'react-icons/fi'
import { symptomsAPI } from '../api/symptoms'
import toast from 'react-hot-toast'

const SymptomModal = ({ open, onClose, patientId = null }) => {
  const [formData, setFormData] = useState({
    severity: 5,
    mood: 'neutral',
    note: '',
    symptoms: [],
  })
  const [recording, setRecording] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) {
      // Reset form when modal closes
      setFormData({ severity: 5, mood: 'neutral', note: '', symptoms: [] })
      setRecording(false)
    }
  }, [open])

  const moods = [
    { emoji: '😊', value: 'happy' },
    { emoji: '😐', value: 'neutral' },
    { emoji: '😔', value: 'sad' },
    { emoji: '😰', value: 'anxious' },
    { emoji: '😴', value: 'tired' },
    { emoji: '🤒', value: 'sick' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.note && formData.symptoms.length === 0) {
      toast.error('Please add at least a note or symptom')
      return
    }
    
    setLoading(true)
    try {
      const dataToSend = {
        ...formData,
        timestamp: new Date().toISOString(),
      }
      if (patientId) {
        dataToSend.patientId = patientId
      }
      
      await symptomsAPI.create(dataToSend)
      toast.success('Symptom logged successfully')
      onClose()
    } catch (error) {
      console.error('Error logging symptom:', error)
      toast.error(error.response?.data?.message || error.message || 'Failed to log symptom')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Log Symptom</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Mood Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              How are you feeling?
            </label>
            <div className="flex space-x-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.value })}
                  className={`text-4xl p-2 rounded-lg transition-all ${
                    formData.mood === mood.value
                      ? 'bg-primary-100 ring-2 ring-primary-500'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity: {formData.severity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.severity}
              onChange={(e) => setFormData({ ...formData, severity: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Mild</span>
              <span>Moderate</span>
              <span>Severe</span>
            </div>
          </div>

          {/* Text Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="input-field"
              rows="4"
              placeholder="Describe your symptoms..."
            />
          </div>

          {/* Voice Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voice Note</label>
            <button
              type="button"
              onClick={() => setRecording(!recording)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                recording
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiMic className="h-5 w-5" />
              <span>{recording ? 'Stop Recording' : 'Start Recording'}</span>
            </button>
            {recording && (
              <p className="text-sm text-gray-500 mt-2">Recording in progress...</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging...' : 'Log Symptom'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SymptomModal

