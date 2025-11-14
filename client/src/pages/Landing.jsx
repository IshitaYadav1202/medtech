import { Link } from 'react-router-dom'
import { FiHeart, FiUsers, FiActivity, FiShield } from 'react-icons/fi'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            CarePulse
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Collaborative family care management for medications, appointments, and health tracking
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary text-lg px-8 py-3">
              Login
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="card text-center">
            <FiHeart className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Medication Tracking</h3>
            <p className="text-gray-600">
              Never miss a dose with smart reminders and tracking
            </p>
          </div>
          <div className="card text-center">
            <FiUsers className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Family Collaboration</h3>
            <p className="text-gray-600">
              Share care updates with family members and caregivers
            </p>
          </div>
          <div className="card text-center">
            <FiActivity className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Symptom Tracking</h3>
            <p className="text-gray-600">
              Monitor health trends with daily symptom logs
            </p>
          </div>
          <div className="card text-center">
            <FiShield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Insights</h3>
            <p className="text-gray-600">
              Get intelligent summaries and health pattern detection
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing

