import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Filter, 
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Eye,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'expired';
  icon: string;
  affectedAreas: string[];
}

const RecentAlerts: React.FC = () => {
  const { token, role, logout } = useAuth();
  const { t } = useI18n();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Heavy Rainfall Warning',
      description: 'Intense rainfall expected in Patna area with potential flooding in low-lying regions.',
      severity: 'high',
      location: 'Patna, Bihar',
      timestamp: '2 hours ago',
      status: 'active',
      icon: '🌧️',
      affectedAreas: ['Patna City', 'Danapur', 'Phulwari Sharif']
    },
    {
      id: '2',
      title: 'River Water Level Rising',
      description: 'Ganga River water level has increased by 2.5 meters in the last 6 hours.',
      severity: 'critical',
      location: 'Ganga Basin',
      timestamp: '4 hours ago',
      status: 'active',
      icon: '🌊',
      affectedAreas: ['Muzaffarpur', 'Darbhanga', 'Begusarai']
    },
    {
      id: '3',
      title: 'Flash Flood Alert',
      description: 'Sudden water accumulation reported in several areas due to blocked drainage.',
      severity: 'medium',
      location: 'Central Patna',
      timestamp: '6 hours ago',
      status: 'resolved',
      icon: '⚡',
      affectedAreas: ['Boring Road', 'Kankarbagh', 'Rajendra Nagar']
    },
    {
      id: '4',
      title: 'Evacuation Notice',
      description: 'Immediate evacuation required for residents in flood-prone zones.',
      severity: 'critical',
      location: 'South Patna',
      timestamp: '8 hours ago',
      status: 'active',
      icon: '🚨',
      affectedAreas: ['Patliputra', 'Kurji', 'Digha']
    },
    {
      id: '5',
      title: 'Weather Advisory',
      description: 'Moderate rainfall expected with isolated heavy spells in the evening.',
      severity: 'low',
      location: 'Greater Patna',
      timestamp: '12 hours ago',
      status: 'expired',
      icon: '🌦️',
      affectedAreas: ['All Areas']
    },
    {
      id: '6',
      title: 'Dam Water Release Alert',
      description: 'Scheduled water release from upstream dam will increase river levels.',
      severity: 'medium',
      location: 'Ganga River',
      timestamp: '1 day ago',
      status: 'resolved',
      icon: '🏗️',
      affectedAreas: ['Riverfront Areas', 'Ghat Areas']
    },
    {
      id: '7',
      title: 'Urban Flooding Risk',
      description: 'Poor drainage system may cause waterlogging in commercial areas.',
      severity: 'low',
      location: 'Commercial District',
      timestamp: '1 day ago',
      status: 'expired',
      icon: '🏢',
      affectedAreas: ['GS Road', 'Zoo Road', 'MG Road']
    },
    {
      id: '8',
      title: 'Emergency Shelter Setup',
      description: 'Temporary shelters established for displaced residents.',
      severity: 'high',
      location: 'Multiple Locations',
      timestamp: '2 days ago',
      status: 'active',
      icon: '🏠',
      affectedAreas: ['Relief Camps', 'Community Centers']
    }
  ]);

  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'resolved' | 'expired'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredAlerts = alerts.filter(alert => {
    const statusMatch = filterStatus === 'all' || alert.status === filterStatus;
    const severityMatch = filterSeverity === 'all' || alert.severity === filterSeverity;
    const searchMatch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && severityMatch && searchMatch;
  });

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Info className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <Shield className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'critical': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertCircle className="w-3 h-3" />;
      case 'resolved': return <CheckCircle className="w-3 h-3" />;
      case 'expired': return <Clock className="w-3 h-3" />;
      default: return <Info className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-50 text-red-700 border-red-200';
      case 'resolved': return 'bg-green-50 text-green-700 border-green-200';
      case 'expired': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      {/* Navigation Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">AegisFlood</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t('alerts.recentAlerts')}</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="capitalize text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('app.dashboard')}
              </Link>
              <Link to="/recent-alerts" className="capitalize text-blue-600 dark:text-blue-400 font-medium">
                {t('alerts.recentAlerts')}
              </Link>
              <Link to="/community-chat" className="capitalize text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                {t('app.community')}
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredAlerts.filter(a => a.status === 'active').length} {t('dash.activeAlerts')}
                </span>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="hidden md:flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-2">
                <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg capitalize">
                  {t('app.dashboard')}
                </Link>
                <Link to="/recent-alerts" className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium capitalize">
                  {t('alerts.recentAlerts')}
                </Link>
                <Link to="/community-chat" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg capitalize">
                  {t('app.community')}
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button 
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('app.logout')}</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('alerts.recentAlerts')}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t('alerts.viewAllAlerts')}</p>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {filteredAlerts.filter(a => a.status === 'active').length} {t('alerts.status_active')}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('alerts.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{t('alerts.status')}:</span>
              <div className="flex space-x-2">
                {(['all', 'active', 'resolved', 'expired'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? t('alerts.status_all') : status === 'active' ? t('alerts.status_active') : status === 'resolved' ? t('alerts.status_resolved') : t('alerts.status_expired')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{t('alerts.severity')}:</span>
              <div className="flex space-x-2">
                {(['all', 'low', 'medium', 'high', 'critical'] as const).map(severity => (
                  <button
                    key={severity}
                    onClick={() => setFilterSeverity(severity)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filterSeverity === severity
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {severity === 'all' ? t('alerts.severity_all') : severity === 'low' ? t('alerts.severity_low') : severity === 'medium' ? t('alerts.severity_medium') : severity === 'high' ? t('alerts.severity_high') : t('alerts.severity_critical')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                {/* Severity Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityColor(alert.severity)} shadow-sm`}>
                  {getSeverityIcon(alert.severity)}
                </div>

                {/* Alert Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {alert.title}
                    </h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg border text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {getStatusIcon(alert.status)}
                      <span>{alert.status === 'active' ? t('alerts.status_active') : alert.status === 'resolved' ? t('alerts.status_resolved') : t('alerts.status_expired')}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{alert.description}</p>

                  {/* Location and Time */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{t('alerts.timestamp')}:</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>

                  {/* Affected Areas */}
                  {alert.affectedAreas.length > 0 && (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('alerts.affectedAreas')}:</p>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedAreas.map((area, areaIndex) => (
                          <span 
                            key={areaIndex} 
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex space-x-3">
                    <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      <Eye className="w-4 h-4" />
                      <span>{t('alerts.viewDetails')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <Link 
                      to="/dashboard"
                      className="flex items-center space-x-2 text-green-600 hover:text-green-700 text-sm font-medium group-hover:translate-x-1 transition-transform"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{t('alerts.viewOnMap')}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlerts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('alerts.emptyTitle')}</h3>
            <p className="text-gray-500">{t('alerts.emptyDesc')}</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default RecentAlerts;
