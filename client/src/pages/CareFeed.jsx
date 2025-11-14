import { useState, useEffect } from 'react'
import FeedItem from '../components/FeedItem'
import { feedAPI } from '../api/feed'
import toast from 'react-hot-toast'

const CareFeed = () => {
  const [feedItems, setFeedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ type: '', urgent: false })

  useEffect(() => {
    loadFeed()
  }, [filters])

  const loadFeed = async () => {
    try {
      const data = await feedAPI.getAll(filters)
      setFeedItems(data)
    } catch (error) {
      toast.error('Failed to load feed')
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (id) => {
    // TODO: Implement like functionality
    console.log('Like:', id)
  }

  const handleComment = async (id) => {
    // TODO: Implement comment functionality
    console.log('Comment:', id)
  }

  const handleShare = async (id) => {
    // TODO: Implement share functionality
    console.log('Share:', id)
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Care Feed</h1>
          <p className="text-gray-600 mt-1">All care updates and activities</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="input-field"
          >
            <option value="">All Types</option>
            <option value="medication">Medications</option>
            <option value="appointment">Appointments</option>
            <option value="symptom">Symptoms</option>
            <option value="note">Notes</option>
            <option value="alert">Alerts</option>
          </select>
          <button
            onClick={() => setFilters({ ...filters, urgent: !filters.urgent })}
            className={`btn-secondary ${filters.urgent ? 'bg-red-100' : ''}`}
          >
            Urgent Only
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {feedItems.length > 0 ? (
          feedItems.map((item) => (
            <FeedItem
              key={item._id}
              item={item}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500">No feed items found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CareFeed

