import { Card } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
	const { role } = useAuth()
	const { t } = useI18n()
	const { theme } = useTheme()
	const navigate = useNavigate()

	const handleEditProfile = () => {
		navigate('/location')
	}
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-y-auto">
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header Section */}
				<div className="text-center mb-8">
					<div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
						<span className="text-2xl text-white">👤</span>
					</div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
						{t('profile.userProfile')}
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300">{t('profile.manageAccount')}</p>
				</div>
				{/* Profile Information */}
				<div className="grid md:grid-cols-2 gap-6 mb-8">
					<Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
						<div className="flex items-center mb-4">
							<div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
								<span className="text-lg text-white">ℹ️</span>
							</div>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('profile.accountDetails')}</h2>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<span className="text-gray-700 dark:text-gray-300 font-medium">{t('profile.role')}:</span>
								<span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold capitalize">
									{role || 'User'}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<span className="text-gray-700 dark:text-gray-300 font-medium">{t('profile.status')}:</span>
								<span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
									🟢 {t('profile.active')}
								</span>
							</div>
							<div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
								<span className="text-gray-700 dark:text-gray-300 font-medium">{t('profile.memberSince')}:</span>
								<span className="text-gray-600 dark:text-gray-400">2024</span>
							</div>
						</div>
					</Card>
					<Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
						<div className="flex items-center mb-4">
							<div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center mr-3 shadow-sm">
								<span className="text-lg text-white">⚙️</span>
							</div>
							<h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('profile.quickActions')}</h2>
						</div>
						<div className="space-y-3">
							<button 
								onClick={handleEditProfile}
								className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md"
							>
								🔧 {t('profile.editProfile')}
							</button>
							<button className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-sm hover:shadow-md">
								📱 {t('profile.notificationSettings')}
							</button>
						</div>
					</Card>
				</div>
				{/* Additional Features */}
				<Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
					<div className="text-center">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🚀 {t('profile.comingSoon')}</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							{t('profile.comingSoonDesc')}
						</p>
						<div className="grid md:grid-cols-3 gap-6">
							<div className="text-center">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
									<span className="text-xl text-white">📊</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('profile.activityHistory')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{t('profile.activityHistoryDesc')}</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
									<span className="text-xl text-white">🎯</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('profile.personalization')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{t('profile.personalizationDesc')}</p>
							</div>
							<div className="text-center">
								<div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
									<span className="text-xl text-white">🔒</span>
								</div>
								<h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('profile.privacySecurity')}</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">{t('profile.privacySecurityDesc')}</p>
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
