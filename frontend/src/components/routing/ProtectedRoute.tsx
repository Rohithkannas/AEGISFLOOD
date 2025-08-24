import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
	const { token, role } = useAuth()
	if (!token) return <Navigate to="/register" replace />
	
	// Redirect authority users to their dashboard
	if (role === 'authority') {
		return <Navigate to="/authority-dashboard" replace />
	}
	
	return <Outlet />
}
