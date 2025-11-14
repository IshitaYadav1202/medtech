/**
 * MedTable - Displays medications in a table format
 * Shows: name, dose, frequency, next dose time, responsible person, status
 */
import { formatTime, getUrgencyColor } from '../utils/helpers'
import { FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi'

const MedTable = ({ medications, onMarkTaken, onEdit, onDelete }) => {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Medication
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dose
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Frequency
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Dose
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Responsible
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {medications?.map((med) => (
            <tr key={med._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{med.name}</div>
                {med.prescribedBy && (
                  <div className="text-sm text-gray-500">Prescribed by {med.prescribedBy}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {med.dose}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {med.frequency}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatTime(med.nextDue)}</div>
                <div className="text-xs text-gray-500">{new Date(med.nextDue).toLocaleDateString()}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {med.responsibleUser?.name || 'Unassigned'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    med.missedDoses > 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {med.missedDoses > 0 ? `${med.missedDoses} missed` : 'On track'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onMarkTaken(med._id)}
                  className="text-green-600 hover:text-green-900"
                  title="Mark as taken"
                >
                  <FiCheck className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onEdit(med)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Edit"
                >
                  <FiEdit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(med._id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <FiTrash2 className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MedTable

