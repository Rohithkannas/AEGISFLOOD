import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import RiskBadge from '../../components/authority/risk-badge'
import { 
  Calendar, 
  Download, 
  Filter, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity,
  FileText,
  Settings
} from 'lucide-react'

export default function HistoricalData() {
  const [timePeriod, setTimePeriod] = useState('30days')
  const [chartType, setChartType] = useState('trends')

  const quickFilters = [
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '3months', label: 'Last 3 months' },
    { value: '1year', label: 'Last 1 year' }
  ]

  const chartData = {
    trends: [
      { date: '2024-01-01', low: 12, moderate: 8, high: 4, critical: 2 },
      { date: '2024-01-15', low: 10, moderate: 12, high: 6, critical: 3 },
      { date: '2024-02-01', low: 8, moderate: 15, high: 8, critical: 4 },
      { date: '2024-02-15', low: 6, moderate: 18, high: 10, critical: 6 }
    ],
    alerts: {
      flood_warning: 45,
      evacuation: 23,
      all_clear: 32
    },
    response: {
      sms: 89,
      whatsapp: 92,
      push: 78
    },
    population: [
      { month: 'Jan', affected: 180000 },
      { month: 'Feb', affected: 240000 },
      { month: 'Mar', affected: 320000 },
      { month: 'Apr', affected: 280000 }
    ]
  }

  const exportOptions = [
    { format: 'CSV', description: 'Comma-separated values for spreadsheet analysis' },
    { format: 'PDF', description: 'Formatted report with charts and summaries' },
    { format: 'JSON', description: 'Raw data in JSON format for API integration' }
  ]

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Historical Data & Analytics</h1>
            <p className="text-gray-600">Analyze flood patterns and alert effectiveness over time</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configure Reports</span>
            </button>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Time Period</h2>
            </div>
            <div className="flex items-center space-x-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setTimePeriod(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    timePeriod === filter.value
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Level Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Risk Level Trends</h3>
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Risk Level Trends Chart</p>
                <p className="text-gray-500 text-sm">Line chart showing risk levels over time</p>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Low</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Moderate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">High</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Critical</span>
              </div>
            </div>
          </div>

          {/* Alert Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Alert Distribution</h3>
              <PieChart className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <PieChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Alert Type Distribution</p>
                <p className="text-gray-500 text-sm">Pie chart of alert types sent</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Flood Warning</span>
                </div>
                <span className="text-sm font-medium text-gray-900">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Evacuation</span>
                </div>
                <span className="text-sm font-medium text-gray-900">23%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">All Clear</span>
                </div>
                <span className="text-sm font-medium text-gray-900">32%</span>
              </div>
            </div>
          </div>

          {/* Response Rates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Delivery Success Rates</h3>
              <Activity className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">SMS</span>
                  <span className="text-sm font-bold text-gray-900">89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                  <span className="text-sm font-bold text-gray-900">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Push Notifications</span>
                  <span className="text-sm font-bold text-gray-900">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Insight:</strong> WhatsApp shows highest delivery rates. Consider prioritizing this channel for critical alerts.
              </p>
            </div>
          </div>

          {/* Population Impact */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Population Impact</h3>
              <BarChart3 className="h-5 w-5 text-gray-600" />
            </div>
            
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Population Impact Chart</p>
                <p className="text-gray-500 text-sm">Area chart of affected population over time</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">2.4M</p>
                <p className="text-sm text-gray-600">Peak Affected</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">1.8M</p>
                <p className="text-sm text-gray-600">Current Month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Export Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Data Export Options</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exportOptions.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{option.format}</h3>
                    <FileText className="h-5 w-5 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export {option.format}</span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Scheduled Reports</h4>
              <p className="text-sm text-gray-600 mb-3">
                Set up automatic report generation and delivery to stakeholders
              </p>
              <div className="flex items-center space-x-3">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>Weekly Summary</option>
                  <option>Monthly Report</option>
                  <option>Quarterly Analysis</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>PDF Format</option>
                  <option>CSV Format</option>
                  <option>Both Formats</option>
                </select>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                  Schedule Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthorityLayout>
  )
}
