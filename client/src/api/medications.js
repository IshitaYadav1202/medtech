import api from './index'

export const medicationsAPI = {
  getAll: async (patientId) => {
    const response = await api.get(`/medications${patientId ? `?patientId=${patientId}` : ''}`)
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/medications/${id}`)
    return response.data
  },

  create: async (medicationData) => {
    const response = await api.post('/medications', medicationData)
    return response.data
  },

  update: async (id, medicationData) => {
    const response = await api.put(`/medications/${id}`, medicationData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/medications/${id}`)
    return response.data
  },

  markTaken: async (id, doseId, taken) => {
    const response = await api.post(`/medications/${id}/dose`, { doseId, taken })
    return response.data
  },

  getHistory: async (id, startDate, endDate) => {
    const response = await api.get(`/medications/${id}/history`, {
      params: { startDate, endDate },
    })
    return response.data
  },
}

