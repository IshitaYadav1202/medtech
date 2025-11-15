import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import SymptomModal from '../components/SymptomModal'
import { symptomsAPI } from '../api/symptoms'
import { formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState([])
  const [trends, setTrends] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadSymptoms()
    loadTrends()
  }, [])

  const loadSymptoms = async () => {
    try {
      const response = await symptomsAPI.getAll()
      const data = response.data || response || []
      setSymptoms(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error loading symptoms:', error)
      setSymptoms([])
      toast.error('Failed to load symptoms')
    } finally {
      setLoading(false)
    }
  }

  const loadTrends = async () => {
    try {
      const data = await symptomsAPI.getTrends(null, 7)
      setTrends(data)
    } catch (error) {
      console.error('Failed to load trends:', error)
    }
  }

  const chartData = trends
    ? {
        labels: trends.dates || [],
        datasets: [
          {
            label: 'Severity',
            data: trends.severities || [],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
          },
        ],
      }
    : null

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Symptom Tracker</h1>
          <p className="text-gray-600 mt-1">Track and monitor symptoms over time</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          + Log Symptom
        </button>
      </div>

      {/* Trend Chart */}
      {chartData && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Symptom Trends (Last 7 Days)</h2>
          <Line data={chartData} options={{ responsive: true }} />
        </div>
      )}

      {/* Recent Logs */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Symptom Logs</h2>
        <div className="space-y-4">
          {symptoms.length > 0 ? (
            symptoms.map((symptom) => (
              <div
                key={symptom._id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {formatDate(symptom.timestamp)} - {symptom.mood}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Severity: {symptom.severity}/10</p>
                    {symptom.note && (
                      <p className="text-sm text-gray-700 mt-2">{symptom.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No symptoms logged yet</p>
          )}
        </div>
      </div>

      <SymptomModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}

export default Symptoms

