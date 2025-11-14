import api from './index'

export const feedAPI = {
  getAll: async (filters = {}) => {
    const response = await api.get('/feed', { params: filters })
    return response.data
  },

  create: async (feedItemData) => {
    const response = await api.post('/feed', feedItemData)
    return response.data
  },

  update: async (id, feedItemData) => {
    const response = await api.put(`/feed/${id}`, feedItemData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/feed/${id}`)
    return response.data
  },

  addComment: async (id, comment) => {
    const response = await api.post(`/feed/${id}/comments`, { comment })
    return response.data
  },
}

