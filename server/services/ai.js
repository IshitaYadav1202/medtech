import axios from 'axios'

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000'

/**
 * Generate daily summary for patient
 */
export const generateDailySummary = async (patientId, date) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/summary/daily`, {
      patientId,
      date,
    })
    return response.data
  } catch (error) {
    console.error('Error generating daily summary:', error)
    return null
  }
}

/**
 * Generate weekly summary for patient
 */
export const generateWeeklySummary = async (patientId, startDate, endDate) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/summary/weekly`, {
      patientId,
      startDate,
      endDate,
    })
    return response.data
  } catch (error) {
    console.error('Error generating weekly summary:', error)
    return null
  }
}

/**
 * Detect patterns in symptoms
 */
export const detectSymptomPatterns = async (patientId, symptoms) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/patterns/symptoms`, {
      patientId,
      symptoms,
    })
    return response.data
  } catch (error) {
    console.error('Error detecting symptom patterns:', error)
    return null
  }
}

/**
 * Generate appointment suggestions
 */
export const generateAppointmentSuggestions = async (patientId, appointmentHistory) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/suggestions/appointment`, {
      patientId,
      appointmentHistory,
    })
    return response.data
  } catch (error) {
    console.error('Error generating appointment suggestions:', error)
    return null
  }
}

/**
 * Analyze medication adherence
 */
export const analyzeMedicationAdherence = async (patientId, medicationHistory) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/api/analysis/adherence`, {
      patientId,
      medicationHistory,
    })
    return response.data
  } catch (error) {
    console.error('Error analyzing medication adherence:', error)
    return null
  }
}

