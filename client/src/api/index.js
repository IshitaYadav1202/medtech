import axios from 'axios'

// Use proxy in development, direct URL in production
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // In development, use proxy (Vite handles this)
  if (import.meta.env.DEV) {
    return '/api'
  }
  // Fallback
  return 'http://localhost:5000/api'
}

const API_URL = getApiUrl()

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network error - server not reachable
    if (!error.response) {
      const networkError = {
        ...error,
        message: 'Network Error: Unable to connect to server. Please make sure the server is running on port 5000.',
        isNetworkError: true,
      }
      return Promise.reject(networkError)
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // Only redirect if not already on login/register page
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login'
      }
    }
    // Return error with proper message
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject({ ...error, message: errorMessage })
  }
)

export default api

