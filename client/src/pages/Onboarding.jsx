import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Onboarding = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: '',
    patientDOB: '',
    conditions: [],
    inviteEmails: [],
    initialMeds: [],
    initialAppts: [],
  })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // TODO: Submit onboarding data
      toast.success('Onboarding complete!')
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="card">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-primary-600">Step {step} of 3</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {step === 1 && 'Add Patient Information'}
            {step === 2 && 'Invite Care Team'}
            {step === 3 && 'Set Up Initial Medications & Appointments'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.patientDOB}
                    onChange={(e) => setFormData({ ...formData, patientDOB: e.target.value })}
                    className="input-field"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invite Team Members (Email addresses, one per line)
                </label>
                <textarea
                  value={formData.inviteEmails.join('\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inviteEmails: e.target.value.split('\n').filter((e) => e.trim()),
                    })
                  }
                  className="input-field"
                  rows="5"
                  placeholder="family@example.com&#10;caregiver@example.com"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  You can add medications and appointments later. Click continue to finish setup.
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  Back
                </button>
              )}
              <button type="submit" className="btn-primary">
                {step === 3 ? 'Complete Setup' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding

