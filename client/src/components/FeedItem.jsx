/**
 * FeedItem - Individual feed post component
 * Shows: type, content, user, timestamp, comments, actions
 */
import { formatDate, getRelativeTime } from '../utils/helpers'
import { FiHeart, FiMessageCircle, FiShare2 } from 'react-icons/fi'

const FeedItem = ({ item, onLike, onComment, onShare }) => {
  const getTypeIcon = (type) => {
    const icons = {
      medication: '💊',
      appointment: '📅',
      symptom: '📊',
      note: '📝',
      alert: '🚨',
    }
    return icons[type] || '📌'
  }

  return (
    <div className="card mb-4">
      <div className="flex items-start space-x-3">
        <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
          {item.user?.name?.charAt(0) || 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{item.user?.name}</span>
            <span className="text-2xl">{getTypeIcon(item.type)}</span>
            <span className="text-sm text-gray-500">{getRelativeTime(item.timestamp)}</span>
            {item.urgent && (
              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                Urgent
              </span>
            )}
          </div>

          <div className="mt-2">
            <p className="text-gray-700">{item.content}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Comments */}
          {item.comments && item.comments.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-gray-200 pt-3">
              {item.comments.map((comment, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                    {comment.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-sm">{comment.user?.name}</span>
                    <span className="text-sm text-gray-700 ml-2">{comment.comment}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-gray-200">
            <button
              onClick={() => onLike && onLike(item._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <FiHeart className="h-5 w-5" />
              <span className="text-sm">{item.likes || 0}</span>
            </button>
            <button
              onClick={() => onComment && onComment(item._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <FiMessageCircle className="h-5 w-5" />
              <span className="text-sm">{item.comments?.length || 0}</span>
            </button>
            <button
              onClick={() => onShare && onShare(item._id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
            >
              <FiShare2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedItem

