import Card from '../components/shared/Card'
import Toggle from '../components/shared/Toggle'
import { useState } from 'react'
import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'
import { Bell, Globe, Moon, Shield, Volume2, Eye, Sun } from 'lucide-react'

export default function Settings() {
  const { t } = useI18n()
  const { theme, toggleTheme } = useTheme()
  const [sms, setSms] = useState(true)
  const [whatsapp, setWhatsapp] = useState(false)
  const [email, setEmail] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl text-white">⚙️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('app.settings')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">{t('settings.managePreferences')}</p>
        </div>
        {/* Settings Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <span className="text-lg text-white">🔔</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.alertPreferences')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.emailAlerts')}</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.pushNotifications')}</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <span className="text-lg text-white">🖥️</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.displaySettings')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-gray-600 mr-2" />
                  ) : (
                    <Sun className="w-4 h-4 text-gray-600 mr-2" />
                  )}
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.darkMode')}</span>
                </div>
                <Toggle checked={theme === 'dark'} onChange={toggleTheme} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.fontSize')}</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <span className="text-lg text-white">🔒</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.privacySecurity')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.twoFA')}</span>
                <Toggle checked={false} onChange={() => {}} />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300 font-medium">{t('settings.dataEncryption')}</span>
                <Toggle checked={true} onChange={() => {}} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}




