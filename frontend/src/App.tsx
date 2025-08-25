import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/ui/Header'
import NavigationBar from './components/ui/NavigationBar'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  const location = useLocation()
  const pathname = location.pathname
  const isHome = pathname === '/'
  const isRegister = pathname.startsWith('/register')
  const isLogin = pathname.startsWith('/login')
  const isDashboard = pathname.startsWith('/dashboard')
  const isCommunityChat = pathname.startsWith('/community-chat')
  const isRecentAlerts = pathname.startsWith('/recent-alerts')
  const isRiskPredicted = pathname.startsWith('/risk-predicted')
  const isAuthorityDashboard = pathname.startsWith('/authority')

  const showHeader = !(isHome || isRegister || isLogin || isDashboard || isCommunityChat || isRecentAlerts || isRiskPredicted || isAuthorityDashboard)
  // Hide footer on Dashboard per request
  const showFooter = !(isHome || isRegister || isDashboard || isAuthorityDashboard)
  
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        {showHeader && <Header />}
        <div className={`flex-1 ${showHeader ? 'container mx-auto p-4' : ''} ${showFooter ? 'pb-20' : ''}`}> {/* Bottom padding only when footer visible */}
          <Outlet />
        </div>
        {showFooter && <NavigationBar activePath={pathname} />}
      </div>
    </ThemeProvider>
  )
}




