import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { motion } from 'framer-motion';
import { 
  Shield, 
  User, 
  Phone, 
  MapPin, 
  Globe, 
  Bell, 
  Settings,
  LogOut,
  Edit3
} from 'lucide-react';

const AuthorityDashboard: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useI18n();

  // Mock authority user data
  const authorityData = {
    name: 'Rohith Kanna S',
    username: 'Rohithkannas',
    mobile: '+91 9876543210',
    location: 'Patna, Bihar',
    languagePreferred: 'English',
    alertPreferences: {
      email: true,
      sms: true,
      push: true,
      severity: 'high'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AegisFlood Authority</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Administrative Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                onClick={logout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {authorityData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Authority Profile & Preferences Management
          </p>
        </motion.div>

        {/* Profile Data in Row Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Mobile Number */}
          <div className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 animate-pulse hover:animate-none transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center animate-bounce">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Mobile Number
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {authorityData.mobile}
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 animate-pulse hover:animate-none transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-black rounded-xl flex items-center justify-center animate-bounce">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Location
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {authorityData.location}
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Language Preferred */}
          <div className="bg-gradient-to-br from-white to-blue-50 dark:from-black dark:to-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 animate-pulse hover:animate-none transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-white to-blue-600 rounded-xl flex items-center justify-center animate-bounce">
                <Globe className="w-6 h-6 text-blue-800" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Language Preferred
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {authorityData.languagePreferred}
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Alert Preferences */}
          <div className="bg-gradient-to-br from-blue-50 to-gray-50 dark:from-gray-700 dark:to-black rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600 p-6 animate-pulse hover:animate-none transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-800 to-black rounded-xl flex items-center justify-center animate-bounce">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Alert Preferences
                </h3>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {authorityData.alertPreferences.severity.toUpperCase()} Priority
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Detailed Alert Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Alert Notification Settings
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-white">@</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Email Alerts</span>
              </div>
              <div className={`w-12 h-6 rounded-full ${authorityData.alertPreferences.email ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${authorityData.alertPreferences.email ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">SMS Alerts</span>
              </div>
              <div className={`w-12 h-6 rounded-full ${authorityData.alertPreferences.sms ? 'bg-green-600' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${authorityData.alertPreferences.sms ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">Push Notifications</span>
              </div>
              <div className={`w-12 h-6 rounded-full ${authorityData.alertPreferences.push ? 'bg-purple-600' : 'bg-gray-300'} relative transition-colors`}>
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${authorityData.alertPreferences.push ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* User Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{authorityData.name}</h3>
              <p className="text-blue-100">Authority Administrator</p>
              <p className="text-blue-200 text-sm mt-1">Username: {authorityData.username}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;
