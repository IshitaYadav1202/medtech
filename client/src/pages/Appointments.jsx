import { useState, useEffect } from 'react'
import ApptCalendar from '../components/ApptCalendar'
import ApptModal from '../components/ApptModal'
import { appointmentsAPI } from '../api/appointments'
import toast from 'react-hot-toast'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const response = await appointmentsAPI.getAll()
      const data = response.data || response || []
      setAppointments(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading appointments:', error)
      setAppointments([])
      toast.error('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowModal(true)
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppt(appointment)
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setSelectedAppt(null)
    setSelectedDate(null)
    loadAppointments()
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage appointments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Add Appointment
        </button>
      </div>

      {appointments.length > 0 || true ? (
        <ApptCalendar
          appointments={appointments}
          onDateSelect={handleDateSelect}
          onAppointmentClick={handleAppointmentClick}
        />
      ) : (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No appointments scheduled yet</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            + Schedule Your First Appointment
          </button>
        </div>
      )}

      <ApptModal
        open={showModal}
        onClose={handleModalClose}
        appointment={selectedAppt}
        selectedDate={selectedDate}
      />
    </div>
  )
}

export default Appointments

