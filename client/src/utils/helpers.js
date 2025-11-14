import { format, formatDistance, isToday, isPast, isFuture } from 'date-fns'

/**
 * Format date for display
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

/**
 * Format time for display
 */
export const formatTime = (date) => {
  if (!date) return ''
  return format(new Date(date), 'hh:mm a')
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (date) => {
  if (!date) return ''
  return formatDistance(new Date(date), new Date(), { addSuffix: true })
}

/**
 * Check if date is today
 */
export const isDateToday = (date) => {
  if (!date) return false
  return isToday(new Date(date))
}

/**
 * Check if date is in the past
 */
export const isDatePast = (date) => {
  if (!date) return false
  return isPast(new Date(date))
}

/**
 * Check if date is in the future
 */
export const isDateFuture = (date) => {
  if (!date) return false
  return isFuture(new Date(date))
}

/**
 * Get urgency color based on time remaining
 */
export const getUrgencyColor = (date) => {
  if (!date) return 'gray'
  const now = new Date()
  const target = new Date(date)
  const diffHours = (target - now) / (1000 * 60 * 60)

  if (diffHours < 0) return 'red' // Past due
  if (diffHours < 2) return 'orange' // Urgent
  if (diffHours < 24) return 'yellow' // Soon
  return 'green' // Normal
}

/**
 * Truncate text
 */
export const truncate = (text, length = 50) => {
  if (!text) return ''
  return text.length > length ? `${text.substring(0, length)}...` : text
}

/**
 * Get role display name
 */
export const getRoleDisplayName = (role) => {
  const roleMap = {
    caregiver: 'Caregiver',
    patient: 'Patient',
    family: 'Family Member',
    medical: 'Medical Professional',
  }
  return roleMap[role] || role
}

