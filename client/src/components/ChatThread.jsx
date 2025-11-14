/**
 * ChatThread - Individual chat thread/message component
 * Shows: participants, messages, input field
 */
import { useState, useEffect, useRef } from 'react'
import { formatTime, getRelativeTime } from '../utils/helpers'
import { FiSend, FiPaperclip } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useSocket } from '../contexts/SocketContext'

const ChatThread = ({ thread, onSendMessage }) => {
  const { user } = useAuth()
  const { socket } = useSocket()
  const [message, setMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread?.messages])

  useEffect(() => {
    if (socket && thread) {
      socket.on(`thread:${thread._id}:message`, (newMessage) => {
        // Handle new message via socket
      })
    }
  }, [socket, thread])

  const handleSend = (e) => {
    e.preventDefault()
    if (message.trim() && onSendMessage) {
      onSendMessage(thread._id, message)
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900">{thread?.title || 'Chat'}</h3>
        <p className="text-sm text-gray-500">
          {thread?.participants?.map((p) => p.name).join(', ')}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {thread?.messages?.map((msg) => {
          const isOwn = msg.sender?._id === user?._id
          return (
            <div
              key={msg._id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isOwn
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-900'
                }`}
              >
                {!isOwn && (
                  <p className="text-xs font-semibold mb-1">{msg.sender?.name}</p>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${isOwn ? 'text-primary-100' : 'text-gray-500'}`}>
                  {getRelativeTime(msg.timestamp)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-600 hover:text-gray-900"
            title="Attach file"
          >
            <FiPaperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 input-field"
          />
          <button
            type="submit"
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChatThread

