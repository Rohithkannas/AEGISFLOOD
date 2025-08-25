import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import BiharFloodMap from '../components/BiharFloodMap'
import DistrictSelector from '../components/DistrictSelector'
import MobileNumberInput from '../components/MobileNumberInput'
import TimeSlider from '../components/TimeSlider'
import RiskChart from '../components/RiskChart'
import PredictionDayline from '../components/PredictionDayline'
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
  Activity,
  ChevronRight,
  Droplets,
  Thermometer,
  Wind,
  Eye,
  Sun,
  Moon,
  Phone,
  Mail,
  User
} from 'lucide-react'

interface Alert {
  id: string
  type: 'warning' | 'info' | 'critical'
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
  const { logout } = useAuth()
  const { t } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  
  const [floodRisk] = useState({
    level: 'Medium',
    score: 65,
    trend: 'increasing'
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
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [selectedHour, setSelectedHour] = useState(12)
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'low' | 'medium' | 'high' | 'critical'>('medium')

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'safe': return 'text-green-600 bg-green-100'
      case 'low': return 'text-yellow-600 bg-yellow-100'
      case 'medium': return 'text-orange-600 bg-orange-100'
      case 'high': return 'text-red-600 bg-red-100'
      case 'critical': return 'text-red-800 bg-red-200'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ))
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const unreadAlerts = alerts.filter(alert => !alert.isRead)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-8">
        {/* Header - Logo, Tabs, Icons */}
        <div className="flex items-center justify-between mb-6">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">AegisFlood</span>
          </div>

          {/* Center: Tabs */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">{t('app.dashboard')}</span>
            <Link to="/recent-alerts" className="px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{t('app.alerts')}</Link>
            <Link to="/risk-predicted" className="px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{t('app.predictions')}</Link>
            <Link to="/recent-alerts" className="px-3 py-1 rounded-full text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">{t('app.chat')}</Link>
          </div>

          {/* Right: Icons + Theme Toggle */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link to="/recent-alerts" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              <Bell className="w-5 h-5" />
              {unreadAlerts.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
            <Link
              to="/profile"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        {unreadAlerts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-800 dark:text-amber-200 font-medium">
                  {unreadAlerts[0].message}
                </span>
              </div>
              <button 
                onClick={() => markAlertAsRead(alerts.find(a => !a.isRead)?.id || '')}
                className="text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Main Content - Professional Layout */}
        <div className="space-y-6">
          {/* Top Stat Cards - Temperature, Rainfall, Humidity, Wind Speed */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {/* Temperature */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Temperature</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">28.5°C</p>
                </div>
                <Thermometer className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            {/* Rainfall */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Rainfall</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">12.3 mm</p>
                </div>
                <Droplets className="w-6 h-6 text-sky-500" />
              </div>
            </div>
            {/* Humidity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Humidity</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">75%</p>
                </div>
                <Droplets className="w-6 h-6 text-cyan-500" />
              </div>
            </div>
            {/* Wind Speed */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Wind Speed</h3>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">8.2 km/h</p>
                </div>
                <Wind className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </motion.div>

          {/* Risk Map Section - allowed to scroll under fixed footer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dash.riskMap')}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('dash.interactiveRiskMap')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <Activity className="w-3 h-3 mr-1" />
                    {t('dash.live')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Scaled Up Fixed Map Container - Reduced height to avoid footer overlap */}
            <div className="relative w-full h-[560px]">
              <BiharFloodMap 
                className="w-full h-full" 
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
                selectedHour={selectedHour}
                activeLayer={activeLayer}
                onLayerChange={setActiveLayer}
              />
            </div>
          </motion.div>

          {/* AI Analysis - 3 dynamic bullet points by severity and location */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🤖</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Risk Analysis</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                  {selectedRiskLevel === 'low' && (
                    <>
                      <li><strong>Severity:</strong> Low risk in {selectedDistrict}. Conditions are stable; stay informed.</li>
                      <li><strong>Nearest safe point:</strong> District Emergency Center / Collectorate, {selectedDistrict} (designated shelter).</li>
                      <li><strong>Safety measures:</strong> Keep basic supplies ready, follow local updates, and avoid unnecessary travel through waterlogged lanes.</li>
                    </>
                  )}
                  {selectedRiskLevel === 'medium' && (
                    <>
                      <li><strong>Severity:</strong> Moderate risk in {selectedDistrict}. Water levels could rise with rainfall.</li>
                      <li><strong>Nearest safe point:</strong> Move towards higher ground near the District Collectorate or nearest government school/community center.</li>
                      <li><strong>Safety measures:</strong> Prepare a go-bag, charge phones, avoid low-lying areas/underpasses, and keep emergency helplines handy.</li>
                    </>
                  )}
                  {selectedRiskLevel === 'high' && (
                    <>
                      <li><strong>Severity:</strong> High risk in {selectedDistrict}. Localized flooding likely.</li>
                      <li><strong>Nearest safe point:</strong> Proceed to the closest official shelter or District Emergency Center; use main roads on higher elevation.</li>
                      <li><strong>Safety measures:</strong> Move valuables to higher shelves, turn off mains if instructed, avoid crossing fast water, and coordinate with neighbors.</li>
                    </>
                  )}
                  {selectedRiskLevel === 'critical' && (
                    <>
                      <li><strong>Severity:</strong> Critical risk in {selectedDistrict}. Evacuation may be necessary.</li>
                      <li><strong>Nearest safe point:</strong> Head immediately to the designated relief shelter or District Emergency Operations Center; follow official evacuation routes.</li>
                      <li><strong>Safety measures:</strong> Evacuate early, keep IDs/meds/water, avoid bridges/riverbanks, and stay connected with authorities for instructions.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Prediction Timeline - Big and Horizontal */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <PredictionDayline 
              selectedDistrict={selectedDistrict}
              className="h-80"
              onRiskChange={setSelectedRiskLevel}
            />
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Time Slider */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <TimeSlider 
                currentHour={selectedHour}
                onTimeChange={setSelectedHour}
              />
            </motion.div>

            {/* Risk Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <RiskChart 
                selectedHour={selectedHour}
                currentRiskLevel={selectedRiskLevel}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
