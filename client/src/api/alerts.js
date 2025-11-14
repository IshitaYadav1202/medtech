import api from './index'

export const alertsAPI = {
  getAll: async () => {
    const response = await api.get('/alerts')
    return response.data
  },

  create: async (alertData) => {
    const response = await api.post('/alerts', alertData)
    return response.data
  },

  update: async (id, alertData) => {
    const response = await api.put(`/alerts/${id}`, alertData)
    return response.data
  },

  acknowledge: async (id) => {
    const response = await api.post(`/alerts/${id}/acknowledge`)
    return response.data
  },
}

