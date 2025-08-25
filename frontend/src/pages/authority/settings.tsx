import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import { 
  Building2, 
  Upload, 
  Globe, 
  Clock, 
  MessageSquare, 
  Bell, 
  Users, 
  Shield, 
  Database, 
  Palette, 
  Save,
  Eye,
  EyeOff
} from 'lucide-react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('organization')
  const [showPassword, setShowPassword] = useState(false)
  
  const [organizationSettings, setOrganizationSettings] = useState({
    name: 'State Disaster Management Authority',
    type: 'SDMA',
    contactEmail: 'admin@sdma.assam.gov.in',
    contactPhone: '+91-361-2345678',
    address: 'Dispur, Guwahati, Assam 781006',
    timezone: 'Asia/Kolkata',
    language: 'en'
  })

  const [alertSettings, setAlertSettings] = useState({
    defaultTemplate: 'flood_warning',
    smsEnabled: true,
    whatsappEnabled: true,
    pushEnabled: true,
    autoEscalation: true,
    escalationTime: 30,
    retryAttempts: 3
  })

  const [userSettings, setUserSettings] = useState({
    adminPassword: '',
    sessionTimeout: 60,
    twoFactorAuth: false,
    loginAttempts: 5,
    passwordExpiry: 90
  })

  const [systemSettings, setSystemSettings] = useState({
    theme: 'light',
    emailNotifications: true,
    smsNotifications: false,
    dataRetention: 365,
    backupFrequency: 'daily',
    maintenanceMode: false
  })

  const tabs = [
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'alerts', label: 'Alert Configuration', icon: Bell },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Preferences', icon: Shield }
  ]

  const organizationTypes = [
    { value: 'SDMA', label: 'State Disaster Management Authority' },
    { value: 'DDMA', label: 'District Disaster Management Authority' },
    { value: 'NGO', label: 'Non-Governmental Organization' },
    { value: 'Municipal', label: 'Municipal Corporation' }
  ]

  const timezones = [
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata (IST)' },
    { value: 'Asia/Dhaka', label: 'Asia/Dhaka (BST)' },
    { value: 'UTC', label: 'UTC' }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'as', label: 'Assamese' },
    { value: 'bn', label: 'Bengali' }
  ]

  const handleSave = () => {
    console.log('Saving settings...')
    // Mock save operation
  }

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600">Configure system preferences and organization details</p>
          </div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>

        <div className="flex space-x-6">
          {/* Sidebar Tabs */}
          <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Organization Settings */}
            {activeTab === 'organization' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Organization Settings</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={organizationSettings.name}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Organization Type
                      </label>
                      <select
                        value={organizationSettings.type}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {organizationTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email
                      </label>
                      <input
                        type="email"
                        value={organizationSettings.contactEmail}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, contactEmail: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        value={organizationSettings.contactPhone}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, contactPhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={organizationSettings.address}
                      onChange={(e) => setOrganizationSettings({...organizationSettings, address: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Timezone
                      </label>
                      <select
                        value={organizationSettings.timezone}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, timezone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="inline h-4 w-4 mr-1" />
                        Default Language
                      </label>
                      <select
                        value={organizationSettings.language}
                        onChange={(e) => setOrganizationSettings({...organizationSettings, language: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {languages.map((lang) => (
                          <option key={lang.value} value={lang.value}>
                            {lang.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Upload organization logo</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alert Configuration */}
            {activeTab === 'alerts' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Alert Configuration</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Default Message Templates</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Flood Warning Template
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="FLOOD ALERT: Heavy rainfall expected in your area. Move to higher ground and stay safe. Follow official instructions."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Evacuation Template
                        </label>
                        <textarea
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue="EVACUATION NOTICE: Immediate evacuation required. Proceed to designated safe zones. Emergency services are available."
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Channels</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={alertSettings.smsEnabled}
                          onChange={(e) => setAlertSettings({...alertSettings, smsEnabled: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">SMS (Priority: High)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={alertSettings.whatsappEnabled}
                          onChange={(e) => setAlertSettings({...alertSettings, whatsappEnabled: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">WhatsApp (Priority: Medium)</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={alertSettings.pushEnabled}
                          onChange={(e) => setAlertSettings({...alertSettings, pushEnabled: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Push Notifications (Priority: Low)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Auto-Escalation Rules</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={alertSettings.autoEscalation}
                          onChange={(e) => setAlertSettings({...alertSettings, autoEscalation: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Enable auto-escalation for critical alerts</span>
                      </label>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Escalation Time (minutes)
                          </label>
                          <input
                            type="number"
                            value={alertSettings.escalationTime}
                            onChange={(e) => setAlertSettings({...alertSettings, escalationTime: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Retry Attempts
                          </label>
                          <input
                            type="number"
                            value={alertSettings.retryAttempts}
                            onChange={(e) => setAlertSettings({...alertSettings, retryAttempts: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* User Management */}
            {activeTab === 'users' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Account</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Change Admin Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={userSettings.adminPassword}
                            onChange={(e) => setUserSettings({...userSettings, adminPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Session Timeout (minutes)
                        </label>
                        <input
                          type="number"
                          value={userSettings.sessionTimeout}
                          onChange={(e) => setUserSettings({...userSettings, sessionTimeout: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Security Policies</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={userSettings.twoFactorAuth}
                          onChange={(e) => setUserSettings({...userSettings, twoFactorAuth: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Enable Two-Factor Authentication</span>
                      </label>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Login Attempts
                          </label>
                          <input
                            type="number"
                            value={userSettings.loginAttempts}
                            onChange={(e) => setUserSettings({...userSettings, loginAttempts: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Expiry (days)
                          </label>
                          <input
                            type="number"
                            value={userSettings.passwordExpiry}
                            onChange={(e) => setUserSettings({...userSettings, passwordExpiry: parseInt(e.target.value)})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">User Roles & Permissions</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-3">Current Role: Super Administrator</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Dashboard Access</span>
                          <span className="text-sm text-green-600 font-medium">Full Access</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Alert Management</span>
                          <span className="text-sm text-green-600 font-medium">Full Access</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Contact Management</span>
                          <span className="text-sm text-green-600 font-medium">Full Access</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">System Settings</span>
                          <span className="text-sm text-green-600 font-medium">Full Access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Preferences */}
            {activeTab === 'system' && (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">System Preferences</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Palette className="inline h-4 w-4 mr-1" />
                        Theme Selection
                      </label>
                      <div className="flex space-x-4">
                        {['light', 'dark', 'black'].map((theme) => (
                          <label key={theme} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="theme"
                              value={theme}
                              checked={systemSettings.theme === theme}
                              onChange={(e) => setSystemSettings({...systemSettings, theme: e.target.value})}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 capitalize">{theme}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={systemSettings.emailNotifications}
                          onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Email notifications for system events</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={systemSettings.smsNotifications}
                          onChange={(e) => setSystemSettings({...systemSettings, smsNotifications: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">SMS notifications for critical alerts</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Database className="inline h-4 w-4 mr-1" />
                          Data Retention (days)
                        </label>
                        <input
                          type="number"
                          value={systemSettings.dataRetention}
                          onChange={(e) => setSystemSettings({...systemSettings, dataRetention: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Backup Frequency
                        </label>
                        <select
                          value={systemSettings.backupFrequency}
                          onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={systemSettings.maintenanceMode}
                          onChange={(e) => setSystemSettings({...systemSettings, maintenanceMode: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">Enable maintenance mode</span>
                      </label>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-800">System Status: Online</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          Last backup: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthorityLayout>
  )
}
