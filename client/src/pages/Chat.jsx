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
      const response = await chatAPI.getThreads()
      const data = response.data || response || []
      const threadsArray = Array.isArray(data) ? data : []
      setThreads(threadsArray)
      if (threadsArray.length > 0 && !selectedThread) {
        setSelectedThread(threadsArray[0])
      }
    } catch (error) {
      console.error('Error loading threads:', error)
      setThreads([])
      // Don't show error if it's just empty - create a default thread
      if (threads.length === 0) {
        const defaultThread = {
          _id: 'default',
          title: 'General Chat',
          participants: [],
          messages: [],
        }
        setThreads([defaultThread])
        setSelectedThread(defaultThread)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (threadId, message) => {
    try {
      await chatAPI.sendMessage(threadId, { content: message })
      // Reload threads to get updated messages
      const response = await chatAPI.getThreads()
      const data = response.data || response || []
      const threadsArray = Array.isArray(data) ? data : []
      setThreads(threadsArray)
      // Update selected thread
      const updatedThread = threadsArray.find((t) => t._id === threadId)
      if (updatedThread) {
        setSelectedThread(updatedThread)
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error(error.response?.data?.message || 'Failed to send message')
    }
  }

  const handleCreateThread = async () => {
    try {
      const newThread = await chatAPI.createThread({
        title: `Chat ${threads.length + 1}`,
        participants: [],
      })
      const response = await chatAPI.getThreads()
      const data = response.data || response || []
      setThreads(Array.isArray(data) ? data : [])
      if (newThread) {
        setSelectedThread(newThread.data || newThread)
      }
      toast.success('New chat thread created')
    } catch (error) {
      console.error('Error creating thread:', error)
      toast.error('Failed to create chat thread')
    }
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
          {threads.length > 0 ? (
            threads.filter(thread => thread && thread._id).map((thread) => (
              <div
                key={thread._id}
                onClick={() => setSelectedThread(thread)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedThread?._id === thread._id
                    ? 'bg-primary-50 border border-primary-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <p className="font-semibold text-gray-900">{thread.title || 'Untitled Chat'}</p>
                <p className="text-sm text-gray-500 truncate">
                  {thread.messages && thread.messages.length > 0
                    ? thread.messages[thread.messages.length - 1]?.content || 'No messages'
                    : 'No messages yet'}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No chat threads yet</p>
              <button
                onClick={handleCreateThread}
                className="mt-4 btn-primary text-sm"
              >
                Create First Thread
              </button>
            </div>
          )}
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

