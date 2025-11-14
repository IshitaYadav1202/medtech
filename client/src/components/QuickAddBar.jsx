import { useState } from 'react'
import { FiPlus, FiX } from 'react-icons/fi'
import MedModal from './MedModal'
import ApptModal from './ApptModal'
import SymptomModal from './SymptomModal'

const QuickAddBar = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [showMedModal, setShowMedModal] = useState(false)
  const [showApptModal, setShowApptModal] = useState(false)
  const [showSymptomModal, setShowSymptomModal] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {showMenu && (
          <div className="mb-4 space-y-2">
            <button
              onClick={() => {
                setShowMedModal(true)
                setShowMenu(false)
              }}
              className="block w-full px-4 py-2 bg-white rounded-lg shadow-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              + Medication
            </button>
            <button
              onClick={() => {
                setShowApptModal(true)
                setShowMenu(false)
              }}
              className="block w-full px-4 py-2 bg-white rounded-lg shadow-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              + Appointment
            </button>
            <button
              onClick={() => {
                setShowSymptomModal(true)
                setShowMenu(false)
              }}
              className="block w-full px-4 py-2 bg-white rounded-lg shadow-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              + Symptom Log
            </button>
          </div>
        )}

        <button
          onClick={() => setShowMenu(!showMenu)}
          className="h-14 w-14 bg-primary-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
        >
          {showMenu ? <FiX className="h-6 w-6" /> : <FiPlus className="h-6 w-6" />}
        </button>
      </div>

      <MedModal open={showMedModal} onClose={() => setShowMedModal(false)} />
      <ApptModal open={showApptModal} onClose={() => setShowApptModal(false)} />
      <SymptomModal open={showSymptomModal} onClose={() => setShowSymptomModal(false)} />
    </>
  )
}

export default QuickAddBar

