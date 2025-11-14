/**
 * DashboardCard - Reusable card component for dashboard widgets
 * Displays title, value, icon, and optional trend/action
 */
const DashboardCard = ({ title, value, icon: Icon, trend, trendLabel, onClick, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`card cursor-pointer hover:shadow-md transition-shadow ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-red-600' : 'text-green-600'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)} {trendLabel}
            </p>
          )}
        </div>
        {Icon && (
          <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary-600" />
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardCard

