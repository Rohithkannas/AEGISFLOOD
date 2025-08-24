import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, MapPin, Phone, Globe, Bell, CheckCircle, ArrowRight, Eye, EyeOff, ChevronDown } from 'lucide-react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { useI18n } from '../context/I18nContext'

type RegistrationData = {
  location: string
  phone: string
  language: 'en' | 'hi' | 'as' | 'ta'
  alerts: {
    sms: boolean
    whatsapp: boolean
  }
}

export default function Registration() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { setLanguage } = useI18n()
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    location: '',
    phone: '',
    language: 'en',
    alerts: {
      sms: true,
      whatsapp: false
    }
  })
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const steps = [
    { id: 1, title: 'Location', icon: MapPin },
    { id: 2, title: 'Phone', icon: Phone },
    { id: 3, title: 'Language', icon: Globe },
    { id: 4, title: 'Alerts', icon: Bell }
  ]

  const updateData = (field: keyof RegistrationData, value: any) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const sendOtp = async () => {
    setLoading(true)
    setError('')
    try {
      // Temporarily bypass API call and simulate OTP sent
      // await api.post('/auth/send-otp', { phone: registrationData.phone })
      setOtpSent(true)
      setMessage('For demo purposes, please enter 0000 as OTP')
    } catch (error) {
      // Fallback to demo mode
      setOtpSent(true)
      setMessage('For demo purposes, please enter 0000 as OTP')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    setLoading(true)
    setError('')
    try {
      // Check for demo OTP first
      if (otp === '0000') {
        setMessage('Phone verified successfully!')
        setTimeout(() => {
          nextStep()
        }, 500) // Smooth transition delay
        return
      }
      
      // Try API verification for real OTPs
      await api.post('/auth/verify-otp', { phone: registrationData.phone, otp })
      setMessage('Phone verified successfully!')
      setTimeout(() => {
        nextStep()
      }, 500)
    } catch (error) {
      // If API fails but user entered demo OTP, allow it
      if (otp === '0000') {
        setMessage('Phone verified successfully!')
        setTimeout(() => {
          nextStep()
        }, 500)
      } else {
        setError('Invalid OTP. Please try 0000 for demo.')
      }
    } finally {
      setLoading(false)
    }
  }

  const submitRegistration = async () => {
    setLoading(true)
    setError('')
    try {
      // Demo mode - bypass API and proceed directly
      setMessage('Registration successful! Redirecting...')
      
      // Simulate successful login for demo
      login('demo-token', 'citizen')
      setLanguage(registrationData.language)
      
      // Smooth transition to dashboard
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
      
      // Uncomment below for real API integration
      // const response = await api.post('/auth/register', registrationData)
      // login(response.data.access_token, response.data.role)
      // setLanguage(registrationData.language)
      // navigate('/dashboard')
    } catch (error) {
      // Fallback to demo mode even if API fails
      setMessage('Registration successful! Redirecting...')
      login('demo-token', 'citizen')
      setLanguage(registrationData.language)
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Your Location</h3>
              <p className="text-gray-600">Help us provide accurate flood alerts for your area</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your District
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={registrationData.location}
                    onChange={(e) => updateData('location', e.target.value)}
                    className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Select your district</option>
                    {[
                      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
                      "Bhojpur", "Buxar", "Darbhanga", "East Champaran (Motihari)", "Gaya",
                      "Gopalganj", "Jamui", "Jehanabad", "Kaimur (Bhabua)", "Katihar",
                      "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani",
                      "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnea",
                      "Rohtas", "Saharsa", "Samastipur", "Saran (Chhapra)", "Sheikhpura",
                      "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
                    ].map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <button 
                onClick={nextStep} 
                disabled={!registrationData.location}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <Link 
                to="/login" 
                className="w-full block text-center py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Back to Login
              </Link>
            </div>
          </motion.div>
        )
      
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Phone className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Phone Verification</h3>
              <p className="text-gray-600">We'll send you alerts and updates via SMS</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={registrationData.phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
                      if (value.length <= 10) {
                        updateData('phone', value);
                      }
                    }}
                    placeholder="Enter 10-digit mobile number"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all ${
                      registrationData.phone.length > 0 && registrationData.phone.length !== 10
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                    disabled={otpSent}
                    maxLength={10}
                  />
                </div>
                {registrationData.phone.length > 0 && registrationData.phone.length !== 10 && (
                  <p className="text-xs text-red-600 mt-1">Invalid number - must be 10 digits</p>
                )}
              </div>
              
              {!otpSent ? (
                <>
                  <button 
                    onClick={sendOtp} 
                    disabled={!registrationData.phone || registrationData.phone.length !== 10 || loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                  <button 
                    onClick={prevStep} 
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Back
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 4-digit OTP"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                      maxLength={4}
                    />
                  </div>
                  <button 
                    onClick={verifyOtp} 
                    disabled={otp.length !== 4 || loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button 
                    onClick={() => setOtpSent(false)} 
                    className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Change Phone Number
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )
      
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Preferred Language</h3>
              <p className="text-gray-600">Choose your preferred language for alerts</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { code: 'en', name: 'English' },
                  { code: 'hi', name: 'हिंदी' },
                  { code: 'as', name: 'অসমীয়া' },
                  { code: 'ta', name: 'தமிழ்' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => updateData('language', lang.code)}
                    className={`p-4 border-2 rounded-lg text-center transition-all font-medium ${
                      registrationData.language === lang.code
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={nextStep} 
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                onClick={prevStep} 
                className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </div>
          </motion.div>
        )
      
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <Bell className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-gray-900">Alert Preferences</h3>
              <p className="text-gray-600">Choose how you want to receive flood alerts</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registrationData.alerts.sms}
                    onChange={(e) => updateData('alerts', { 
                      ...registrationData.alerts, 
                      sms: e.target.checked 
                    })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">SMS Alerts</div>
                    <div className="text-sm text-gray-600">Receive critical flood warnings via SMS</div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registrationData.alerts.whatsapp}
                    onChange={(e) => updateData('alerts', { 
                      ...registrationData.alerts, 
                      whatsapp: e.target.checked 
                    })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">WhatsApp Alerts</div>
                    <div className="text-sm text-gray-600">Get detailed updates on WhatsApp</div>
                  </div>
                </label>
              </div>
              
              <button 
                onClick={submitRegistration} 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Registration</span>
                  </>
                )}
              </button>
              
              <button 
                onClick={prevStep} 
                className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                Back
              </button>
            </div>
          </motion.div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AegisFlood</span>
            </Link>
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join AegisFlood</h1>
            <p className="text-gray-600">
              Step {currentStep} of 4: {steps.find(s => s.id === currentStep)?.title}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mb-8"
          >
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </motion.div>

          {/* Step Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6"
          >
            {renderStepContent()}
          </motion.div>

          {/* Error/Success Messages */}
          {(error || message) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg text-center mb-6 ${
                error 
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}
            >
              {error || message}
            </motion.div>
          )}

          {/* Step Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center space-x-3"
          >
            {steps.map((step) => {
              const StepIcon = step.icon
              return (
                <div
                  key={step.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    step.id <= currentStep
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : step.id === currentStep ? (
                    <StepIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </div>
  )
}