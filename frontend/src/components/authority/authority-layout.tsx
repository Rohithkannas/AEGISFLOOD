import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Grid3X3, 
  AlertTriangle, 
  BarChart3, 
  Users, 
  Settings, 
  Moon, 
  Sun, 
  Monitor,
  Globe,
  ChevronDown,
  LogOut,
  User,
  Megaphone
} from 'lucide-react'

interface AuthorityLayoutProps {
  children?: React.ReactNode
}

export default function AuthorityLayout({ children }: AuthorityLayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [theme, setTheme] = useState<'light' | 'dark' | 'black'>('light')
  const [language, setLanguage] = useState('en')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const navigation = [
    { name: 'Overview', href: '/authority/dashboard', icon: Grid3X3 },
    { name: 'Alerts', href: '/authority/alerts', icon: AlertTriangle },
    { name: 'Announcements', href: '/authority/announcements', icon: Megaphone },
    { name: 'History', href: '/authority/history', icon: BarChart3 },
    { name: 'Contacts', href: '/authority/contacts', icon: Users },
    { name: 'Settings', href: '/authority/settings', icon: Settings },
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'as', name: 'অসমীয়া' },
    { code: 'bn', name: 'বাংলা' },
  ]

  const handleLogout = () => {
    // Mock logout - redirect to login
    navigate('/authority/login')
  }

  const themeClasses = {
    light: 'bg-white text-gray-900',
    dark: 'bg-gray-900 text-white',
    black: 'bg-black text-white'
  }

  return (
    <div className={`min-h-screen ${themeClasses[theme]}`}>
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">AegisFlood Admin</h1>
            <span className="text-blue-100">Government Flood Management System</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2 bg-blue-700 rounded-lg p-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-2 rounded ${theme === 'light' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}
              >
                <Sun className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-2 rounded ${theme === 'dark' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}
              >
                <Moon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTheme('black')}
                className={`p-2 rounded ${theme === 'black' ? 'bg-blue-500' : 'hover:bg-blue-600'}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-lg"
              >
                <Globe className="h-4 w-4" />
                <span>{languages.find(l => l.code === language)?.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 px-3 py-2 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <span>Admin User</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className={`w-64 min-h-screen ${theme === 'light' ? 'bg-gray-50 border-r border-gray-200' : theme === 'dark' ? 'bg-gray-800 border-r border-gray-700' : 'bg-gray-900 border-r border-gray-800'}`}>
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500'
                          : theme === 'light'
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
