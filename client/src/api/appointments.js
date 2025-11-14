import api from './index'

export const appointmentsAPI = {
  getAll: async (patientId, startDate, endDate) => {
    const response = await api.get('/appointments', {
      params: { patientId, startDate, endDate },
    })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/appointments/${id}`)
    return response.data
  },

  create: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData)
    return response.data
  },

  update: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/appointments/${id}`)
    return response.data
  },

  completeChecklist: async (id, checklistItem) => {
    const response = await api.post(`/appointments/${id}/checklist`, checklistItem)
    return response.data
  },
}

