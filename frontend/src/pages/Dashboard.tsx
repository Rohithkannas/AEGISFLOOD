import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronRight,
  Activity,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Eye,
  Calendar,
  Clock,
  Zap
} from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  rainfall: number
  windSpeed: number
}

interface FloodRisk {
  level: 'low' | 'medium' | 'high' | 'critical'
  score: number
  factors: string[]
  lastUpdated: string
}

interface Alert {
  id: string
  type: 'warning' | 'danger' | 'info'
  message: string
  timestamp: string
  isRead: boolean
}

interface CityRisk {
  name: string
  state: string
  risk: 'safe' | 'low' | 'medium' | 'high' | 'critical'
  percentage: number
}

export default function Dashboard() {
  const { role, logout } = useAuth()
  const { t } = useI18n()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 28.5,
    humidity: 75,
    rainfall: 12.3,
    windSpeed: 8.2
  })
  const [floodRisk, setFloodRisk] = useState<FloodRisk>({
    level: 'medium',
    score: 45,
    factors: ['Moderate rainfall in last 6 hours', 'Water levels approaching warning threshold'],
    lastUpdated: new Date().toISOString()
  })
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Heavy rainfall expected in next 6 hours',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isRead: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Water level monitoring active',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      isRead: true
    }
  ])
  const [activeLayer, setActiveLayer] = useState('flood-risk')

  // City risk data matching the example
  const [cityRisks] = useState<CityRisk[]>([
    { name: 'Chennai', state: 'Tamil Nadu', risk: 'medium', percentage: 58 },
    { name: 'Kolkata', state: 'West Bengal', risk: 'low', percentage: 35 },
    { name: 'Guwahati', state: 'Assam', risk: 'high', percentage: 78 },
    { name: 'Kochi', state: 'Kerala', risk: 'medium', percentage: 58 },
    { name: 'Bhubaneswar', state: 'Odisha', risk: 'safe', percentage: 15 },
    { name: 'Patna', state: 'Bihar', risk: 'medium', percentage: 62 }
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(40, Math.min(90, prev.humidity + (Math.random() - 0.5) * 10)),
        rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.5) * 5),
        windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 3)
      }))
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'safe': return 'text-emerald-600 bg-emerald-100 border-emerald-300'
      case 'low': return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-300'
      case 'high': return 'text-red-600 bg-red-100 border-red-300'
      case 'critical': return 'text-rose-600 bg-rose-100 border-rose-300'
      default: return 'text-slate-600 bg-slate-100 border-slate-300'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'safe': return '🟢'
      case 'low': return '🟡'
      case 'medium': return '🟠'
      case 'high': return '🔴'
      case 'critical': return '🔴'
      default: return '⚪'
    }
  }

  const getRiskGradient = (level: string) => {
    switch (level) {
      case 'safe': return 'from-emerald-400 to-emerald-600'
      case 'low': return 'from-yellow-400 to-yellow-600'
      case 'medium': return 'from-orange-400 to-orange-600'
      case 'high': return 'from-red-400 to-red-600'
      case 'critical': return 'from-rose-400 to-rose-600'
      default: return 'from-slate-400 to-slate-600'
    }
  }

  const getRiskBarColor = (level: string) => {
    switch (level) {
      case 'safe': return 'bg-emerald-500'
      case 'low': return 'bg-yellow-500'
      case 'medium': return 'bg-orange-500'
      case 'high': return 'bg-red-500'
      case 'critical': return 'bg-rose-500'
      default: return 'bg-slate-500'
    }
  }

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Dashboard</h2>
          <p className="text-gray-600">Preparing your flood monitoring data...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-y-auto">
      {/* Professional Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AegisFlood</span>
              </Link>
              <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button className="px-3 py-1 text-sm font-medium text-blue-600 bg-white rounded-md shadow-sm">Dashboard</button>
                <Link to="/recent-alerts" className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900">Alerts</Link>
                <Link to="/community-chat" className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-900">Community</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">2</span>
              </button>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                  <Settings className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="p-2 text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Weather Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Temperature</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.temperature.toFixed(1)}°C</p>
              </div>
              <Thermometer className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rainfall</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.rainfall.toFixed(1)} mm</p>
              </div>
              <Cloud className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Humidity</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.humidity.toFixed(0)}%</p>
              </div>
              <Droplets className="w-8 h-8 text-cyan-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wind Speed</p>
                <p className="text-2xl font-bold text-gray-900">{weatherData.windSpeed.toFixed(1)} km/h</p>
              </div>
              <Wind className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </motion.div>

        {/* Alert Banner */}
        {alerts.find(a => !a.isRead) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  {alerts.find(a => !a.isRead)?.message}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  {new Date(alerts.find(a => !a.isRead)?.timestamp || '').toLocaleTimeString()}
                </p>
              </div>
              <button 
                onClick={() => markAlertAsRead(alerts.find(a => !a.isRead)?.id || '')}
                className="text-amber-600 hover:text-amber-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content Grid - Risk Map takes 50% of whole page */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[70vh]">
          
          {/* Risk Map Section - 50% of whole page */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Interactive Risk Map</h2>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </span>
                </div>
              </div>
            </div>
            
            <div className="h-[calc(100%-5rem)] relative">
              {/* Map Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Risk Map Visualization</h3>
                  <p className="text-gray-600 max-w-sm">
                    Interactive flood risk mapping with real-time data visualization and predictive analytics
                  </p>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <span className="text-sm font-medium">+</span>
                </button>
                <button className="w-8 h-8 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center justify-center hover:bg-gray-50">
                  <span className="text-sm font-medium">-</span>
                </button>
              </div>
              
              {/* Layer Controls */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Layers</h4>
                <div className="space-y-1">
                  {[
                    { id: 'flood-risk', name: 'Flood Risk', active: activeLayer === 'flood-risk' },
                    { id: 'rainfall', name: 'Rainfall', active: activeLayer === 'rainfall' },
                    { id: 'river-levels', name: 'River Levels', active: activeLayer === 'river-levels' }
                  ].map((layer) => (
                    <button
                      key={layer.id}
                      onClick={() => setActiveLayer(layer.id)}
                      className={`block w-full text-left px-2 py-1 text-xs rounded ${
                        layer.active 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {layer.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats and Info */}
          <div className="space-y-6">
            

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      alert.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                to="/recent-alerts" 
                className="mt-4 inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
              >
                View all alerts
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  to="/recent-alerts"
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Alerts</span>
                </Link>
                <Link 
                  to="/community-chat"
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-5 h-5 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-900">Community</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}





