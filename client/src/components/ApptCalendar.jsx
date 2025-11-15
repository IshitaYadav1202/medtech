/**
 * ApptCalendar - Calendar view for appointments
 * Supports day/week/month views with color-coding for urgency
 */
import { useState } from 'react'
import Calendar from 'react-calendar'
import { formatDate, formatTime, getUrgencyColor } from '../utils/helpers'
import 'react-calendar/dist/Calendar.css'

const ApptCalendar = ({ appointments, onDateSelect, onAppointmentClick }) => {
  const [date, setDate] = useState(new Date())
  const [view, setView] = useState('month') // month, week, day

  const tileContent = ({ date, view }) => {
    if (view === 'month' && appointments && Array.isArray(appointments)) {
      const dayAppts = appointments.filter(
        (apt) => apt && apt.datetime && new Date(apt.datetime).toDateString() === date.toDateString()
      )
      if (dayAppts && dayAppts.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 justify-center mt-1">
            {dayAppts.slice(0, 2).map((apt) => (
              <div
                key={apt._id}
                className={`h-1 w-1 rounded-full ${
                  getUrgencyColor(apt.datetime) === 'red'
                    ? 'bg-red-500'
                    : getUrgencyColor(apt.datetime) === 'orange'
                    ? 'bg-orange-500'
                    : 'bg-blue-500'
                }`}
              />
            ))}
            {dayAppts.length > 2 && (
              <span className="text-xs text-gray-500">+{dayAppts.length - 2}</span>
            )}
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Appointment Calendar</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 rounded ${view === 'month' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded ${view === 'week' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Week
          </button>
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded ${view === 'day' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Day
          </button>
        </div>
      </div>

      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
        onClickDay={(date) => onDateSelect && onDateSelect(date)}
      />

      {/* Appointments for selected date */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">
          {formatDate(date)} Appointments
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {appointments && Array.isArray(appointments) && appointments.length > 0 ? (
            appointments
              .filter(
                (apt) => apt && apt.datetime && new Date(apt.datetime).toDateString() === date.toDateString()
              )
              .map((apt) => (
                <div
                  key={apt._id || Math.random()}
                  onClick={() => onAppointmentClick && onAppointmentClick(apt)}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{apt.doctor || 'Unknown Doctor'}</p>
                      <p className="text-sm text-gray-600">{apt.location || 'No location'}</p>
                      <p className="text-sm text-gray-500">{formatTime(apt.datetime)}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        getUrgencyColor(apt.datetime) === 'red'
                          ? 'bg-red-100 text-red-800'
                          : getUrgencyColor(apt.datetime) === 'orange'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {apt.reason || 'Appointment'}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-500 text-center py-4">No appointments for this date</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApptCalendar

