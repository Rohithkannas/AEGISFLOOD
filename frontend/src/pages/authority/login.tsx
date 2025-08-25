import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff, Building2 } from 'lucide-react'

export default function AuthorityLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    organizationType: 'SDMA',
    username: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const organizationTypes = [
    { value: 'SDMA', label: 'State Disaster Management Authority' },
    { value: 'DDMA', label: 'District Disaster Management Authority' },
    { value: 'NGO', label: 'Non-Governmental Organization' },
    { value: 'Municipal', label: 'Municipal Corporation' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation - just check if fields are not empty
    if (!formData.username.trim() || !formData.password.trim()) {
      return // Let HTML5 validation handle this
    }
    
    setIsLoading(true)

    // Mock authentication - any credentials work
    setTimeout(() => {
      setIsLoading(false)
      // Store auth state (mock)
      localStorage.setItem('authority_auth', JSON.stringify({
        isAuthenticated: true,
        user: {
          name: 'Admin User',
          organization: formData.organizationType,
          username: formData.username
        }
      }))
      navigate('/authority/dashboard')
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">AegisFlood Authority</h2>
          <p className="mt-2 text-sm text-gray-600">Government Flood Management System</p>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Organization Type */}
            <div>
              <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700 mb-1">
                Organization Type
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {organizationTypes.map((org) => (
                    <option key={org.value} value={org.value}>
                      {org.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
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

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign in to Dashboard'
            )}
          </button>

          {/* Demo Notice */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-700 text-center">
              <strong>Demo Mode:</strong> Use any username and password to access the dashboard
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
