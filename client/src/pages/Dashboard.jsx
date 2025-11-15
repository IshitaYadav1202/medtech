import { useState, useEffect } from 'react'
import { FiPackage, FiCalendar, FiActivity, FiAlertCircle } from 'react-icons/fi'
import DashboardCard from '../components/DashboardCard'
import FeedItem from '../components/FeedItem'
import { medicationsAPI } from '../api/medications'
import { appointmentsAPI } from '../api/appointments'
import { feedAPI } from '../api/feed'
import { Line } from 'react-chartjs-2'
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

const Dashboard = () => {
  const [stats, setStats] = useState({
    missedMeds: 0,
    upcomingAppts: 0,
    symptomsToday: 0,
    alerts: 0,
  })
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Load medications, appointments, feed
      const [medsResponse, apptsResponse, feedResponse] = await Promise.all([
        medicationsAPI.getAll().catch(() => ({ data: [] })),
        appointmentsAPI.getAll().catch(() => ({ data: [] })),
        feedAPI.getAll({ limit: 5 }).catch(() => ({ data: [] })),
      ])

      const meds = Array.isArray(medsResponse.data) ? medsResponse.data : (Array.isArray(medsResponse) ? medsResponse : [])
      const appts = Array.isArray(apptsResponse.data) ? apptsResponse.data : (Array.isArray(apptsResponse) ? apptsResponse : [])
      const feed = Array.isArray(feedResponse.data) ? feedResponse.data : (Array.isArray(feedResponse) ? feedResponse : [])

      const missedMeds = meds.filter((m) => m.missedDoses > 0).length
      const upcomingAppts = appts.filter(
        (a) => new Date(a.datetime) > new Date() && new Date(a.datetime) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      ).length

      setStats({
        missedMeds,
        upcomingAppts,
        symptomsToday: 0, // TODO: Load from symptoms API
        alerts: 0, // TODO: Load from alerts API
      })
      setFeedItems(Array.isArray(feed) ? feed : [])
    } catch (error) {
      console.error('Error loading dashboard:', error)
      setStats({ missedMeds: 0, upcomingAppts: 0, symptomsToday: 0, alerts: 0 })
      setFeedItems([])
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Medication Adherence',
        data: [95, 100, 90, 85, 100, 95, 90],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
      },
    ],
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's your care overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Missed Medications"
          value={stats.missedMeds}
          icon={FiPackage}
          trend={stats.missedMeds > 0 ? 1 : 0}
          trendLabel="needs attention"
        />
        <DashboardCard
          title="Upcoming Appointments"
          value={stats.upcomingAppts}
          icon={FiCalendar}
        />
        <DashboardCard
          title="Symptoms Logged Today"
          value={stats.symptomsToday}
          icon={FiActivity}
        />
        <DashboardCard
          title="Active Alerts"
          value={stats.alerts}
          icon={FiAlertCircle}
          className={stats.alerts > 0 ? 'border-red-300 bg-red-50' : ''}
        />
      </div>

      {/* Chart */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Last 7 Days - Medication Adherence</h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      {/* Care Feed Preview */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Care Feed Updates</h2>
        <div className="space-y-4">
          {feedItems.length > 0 ? (
            feedItems.map((item) => <FeedItem key={item._id} item={item} />)
          ) : (
            <p className="text-gray-500 text-center py-8">No recent updates</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

