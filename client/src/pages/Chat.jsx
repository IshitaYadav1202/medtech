import { useState, useEffect } from 'react'
import ChatThread from '../components/ChatThread'
import { chatAPI } from '../api/chat'
import { useSocket } from '../contexts/SocketContext'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'

const Chat = () => {
  const [threads, setThreads] = useState([])
  const [selectedThread, setSelectedThread] = useState(null)
  const [loading, setLoading] = useState(true)
  const { socket } = useSocket()

  useEffect(() => {
    loadThreads()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('message:new', (message) => {
        // Update thread with new message
        setThreads((prev) =>
          prev.map((thread) =>
            thread._id === message.threadId
              ? { ...thread, messages: [...thread.messages, message] }
              : thread
          )
        )
      })
    }
  }, [socket])

  const loadThreads = async () => {
    try {
      const data = await chatAPI.getThreads()
      setThreads(data)
      if (data.length > 0 && !selectedThread) {
        setSelectedThread(data[0])
      }
    } catch (error) {
      toast.error('Failed to load chat threads')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (threadId, message) => {
    try {
      await chatAPI.sendMessage(threadId, { content: message })
      loadThreads()
    } catch (error) {
      toast.error('Failed to send message')
    }
  }

  const handleCreateThread = () => {
    // TODO: Open modal to create new thread
    toast.info('Create thread functionality coming soon')
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] space-x-6">
      {/* Threads List */}
      <div className="w-80 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          <button
            onClick={handleCreateThread}
            className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <FiPlus className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-12rem)]">
          {threads.map((thread) => (
            <div
              key={thread._id}
              onClick={() => setSelectedThread(thread)}
              className={`p-3 rounded-lg cursor-pointer ${
                selectedThread?._id === thread._id
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <p className="font-semibold text-gray-900">{thread.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {thread.messages?.[thread.messages.length - 1]?.content || 'No messages'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
        {selectedThread ? (
          <ChatThread thread={selectedThread} onSendMessage={handleSendMessage} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat thread to start messaging
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat

