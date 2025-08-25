import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import RiskBadge from '../../components/authority/risk-badge'
import { 
  Users, 
  AlertTriangle, 
  Shield, 
  TrendingUp,
  Filter,
  Calendar,
  MapPin,
  Eye,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function AuthorityDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all')
  const [dateRange, setDateRange] = useState('7days')
  const [currentPage, setCurrentPage] = useState(1)

  const stats = [
    {
      title: 'Total Districts',
      value: '24',
      icon: MapPin,
      gradient: 'from-blue-500 to-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'High Risk Areas',
      value: '8',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-red-600',
      textColor: 'text-white'
    },
    {
      title: 'Active Alerts',
      value: '12',
      icon: Shield,
      gradient: 'from-yellow-500 to-yellow-600',
      textColor: 'text-white'
    },
    {
      title: 'Population at Risk',
      value: '2.4M',
      icon: Users,
      gradient: 'from-green-500 to-green-600',
      textColor: 'text-white'
    }
  ]

  const districts = [
    'All Districts', 'Kamrup', 'Jorhat', 'Dibrugarh', 'Guwahati', 'Silchar', 'Tezpur'
  ]

  const districtData = [
    {
      district: 'Kamrup',
      villages: 145,
      population: '320K',
      riskLevel: 'high' as const,
      activeAlerts: 3,
      lastUpdated: '2 hours ago'
    },
    {
      district: 'Jorhat',
      villages: 98,
      population: '180K',
      riskLevel: 'moderate' as const,
      activeAlerts: 1,
      lastUpdated: '1 hour ago'
    },
    {
      district: 'Dibrugarh',
      villages: 203,
      population: '450K',
      riskLevel: 'critical' as const,
      activeAlerts: 5,
      lastUpdated: '30 mins ago'
    },
    {
      district: 'Guwahati',
      villages: 87,
      population: '280K',
      riskLevel: 'low' as const,
      activeAlerts: 0,
      lastUpdated: '3 hours ago'
    },
    {
      district: 'Silchar',
      villages: 156,
      population: '220K',
      riskLevel: 'high' as const,
      activeAlerts: 2,
      lastUpdated: '1 hour ago'
    },
    {
      district: 'Tezpur',
      villages: 134,
      population: '190K',
      riskLevel: 'moderate' as const,
      activeAlerts: 1,
      lastUpdated: '4 hours ago'
    }
  ]

  const itemsPerPage = 5
  const totalPages = Math.ceil(districtData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = districtData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SDMA Dashboard</h1>
            <p className="text-gray-600">Last updated: {new Date().toLocaleString()}</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Send Alert</span>
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`bg-gradient-to-r ${stat.gradient} rounded-xl p-6 shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} opacity-90 text-sm font-medium`}>
                      {stat.title}
                    </p>
                    <p className={`${stat.textColor} text-3xl font-bold mt-2`}>
                      {stat.value}
                    </p>
                  </div>
                  <Icon className={`h-12 w-12 ${stat.textColor} opacity-80`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Filters Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            
            <div className="space-y-4">
              {/* District Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {districts.map((district) => (
                    <option key={district} value={district.toLowerCase().replace(' ', '')}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              {/* Risk Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Level
                </label>
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="3months">Last 3 months</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Apply
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Map Panel */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Risk Zone Map</h2>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Real-time data</span>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Interactive Risk Map</p>
                <p className="text-gray-500 text-sm mt-2">
                  District boundaries with color-coded risk levels
                </p>
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-600">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm text-gray-600">High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Critical</span>
              </div>
            </div>
          </div>
        </div>

        {/* District Overview Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">District Overview</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    District
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Villages
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Population
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Active Alerts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((district, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{district.district}</div>
                      <div className="text-sm text-gray-500">Updated {district.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {district.villages}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {district.population}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RiskBadge level={district.riskLevel} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        district.activeAlerts > 0 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {district.activeAlerts} alerts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, districtData.length)} of {districtData.length} districts
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthorityLayout>
  )
}
