import { useState, useEffect } from 'react'
import MedTable from '../components/MedTable'
import MedModal from '../components/MedModal'
import { medicationsAPI } from '../api/medications'
import toast from 'react-hot-toast'

const Medications = () => {
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedMed, setSelectedMed] = useState(null)

  useEffect(() => {
    loadMedications()
  }, [])

  const loadMedications = async () => {
    try {
      const data = await medicationsAPI.getAll()
      setMedications(data)
    } catch (error) {
      toast.error('Failed to load medications')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkTaken = async (id) => {
    try {
      await medicationsAPI.markTaken(id, null, true)
      toast.success('Medication marked as taken')
      loadMedications()
    } catch (error) {
      toast.error('Failed to update medication')
    }
  }

  const handleEdit = (medication) => {
    setSelectedMed(medication)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await medicationsAPI.delete(id)
        toast.success('Medication deleted')
        loadMedications()
      } catch (error) {
        toast.error('Failed to delete medication')
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedMed(null)
    loadMedications()
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-600 mt-1">Manage and track medications</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Add Medication
        </button>
      </div>

      <MedTable
        medications={medications}
        onMarkTaken={handleMarkTaken}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MedModal
        open={showModal}
        onClose={handleModalClose}
        medication={selectedMed}
      />
    </div>
  )
}

export default Medications

