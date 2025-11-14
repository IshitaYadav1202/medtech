import api from './index'

export const chatAPI = {
  getThreads: async () => {
    const response = await api.get('/chat/threads')
    return response.data
  },

  getThread: async (threadId) => {
    const response = await api.get(`/chat/threads/${threadId}`)
    return response.data
  },

  createThread: async (threadData) => {
    const response = await api.post('/chat/threads', threadData)
    return response.data
  },

  sendMessage: async (threadId, message) => {
    const response = await api.post(`/chat/threads/${threadId}/messages`, message)
    return response.data
  },
}

