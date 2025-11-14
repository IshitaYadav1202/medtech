import api from './index'

export const symptomsAPI = {
  getAll: async (patientId, startDate, endDate) => {
    const response = await api.get('/symptoms', {
      params: { patientId, startDate, endDate },
    })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/symptoms/${id}`)
    return response.data
  },

  create: async (symptomData) => {
    const response = await api.post('/symptoms', symptomData)
    return response.data
  },

  update: async (id, symptomData) => {
    const response = await api.put(`/symptoms/${id}`, symptomData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/symptoms/${id}`)
    return response.data
  },

  getTrends: async (patientId, days = 7) => {
    const response = await api.get(`/symptoms/trends/${patientId}`, {
      params: { days },
    })
    return response.data
  },
}

