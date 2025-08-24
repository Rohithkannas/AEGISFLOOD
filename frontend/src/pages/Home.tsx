import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Users, Building2, ArrowRight, CheckCircle, Globe, Smartphone, AlertTriangle } from 'lucide-react'

export default function Home() {
  const [activeSection, setActiveSection] = useState<'citizens' | 'authorities' | null>(null)

  return (
    <div className="min-h-screen bg-neutral-0">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-0/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-neutral-0" />
              </div>
              <span className="text-xl font-bold text-neutral-900">AegisFlood</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">Features</a>
              <a href="https://youtu.be/OXHTlMPbX7o?si=msPIHkCgc_ivWQlL" target="_blank" rel="noopener noreferrer" className="text-neutral-600 hover:text-neutral-900 transition-colors">Solutions</a>
              <Link to="/login" className="px-4 py-2 bg-neutral-900 text-neutral-0 rounded-lg hover:bg-neutral-800 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Globe className="w-4 h-4" />
              <span>Advanced Flood Prediction & Community Alert System</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight"
            >
              Protecting Communities Through
              <span className="text-blue-600"> Smart Technology</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Real-time flood monitoring, predictive analytics, and instant community alerts. 
              Safeguarding lives with cutting-edge technology and data-driven insights.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button 
                onClick={() => setActiveSection('citizens')}
                className="px-8 py-4 bg-neutral-900 text-neutral-0 rounded-xl hover:bg-neutral-800 transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                <Users className="w-5 h-5" />
                <span>For Citizens</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveSection('authorities')}
                className="px-8 py-4 border-2 border-neutral-200 text-neutral-900 rounded-xl hover:border-neutral-300 transition-all duration-200 flex items-center space-x-2 font-medium"
              >
                <Building2 className="w-5 h-5" />
                <span>For Authorities</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Interactive Sections */}
      {activeSection && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="py-20 px-6 bg-neutral-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <button
                onClick={() => setActiveSection(null)}
                className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mb-8"
              >
                ← Back to overview
              </button>
              
              {activeSection === 'citizens' ? (
                <>
                  <h2 className="text-4xl font-bold text-neutral-900 mb-4">Citizen Protection Platform</h2>
                  <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Stay informed and protected with personalized flood alerts and real-time monitoring
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold text-neutral-900 mb-4">Authority Management Dashboard</h2>
                  <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                    Comprehensive flood management tools for emergency response coordination
                  </p>
                </>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {activeSection === 'citizens' ? (
                <>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Real-time Alerts</h3>
                    <p className="text-neutral-600 mb-4">Instant notifications via SMS, WhatsApp, and mobile app when flood risks are detected in your area.</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Multi-channel delivery
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ delay: 0.1 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Personal Safety</h3>
                    <p className="text-neutral-600 mb-4">Customized safety recommendations and evacuation routes based on your location and flood severity.</p>
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Location-based guidance
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ delay: 0.2 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                      <Globe className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Community Network</h3>
                    <p className="text-neutral-600 mb-4">Connect with neighbors, share updates, and access community resources during emergencies.</p>
                    <div className="flex items-center text-purple-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Offline-first design
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Regional Monitoring</h3>
                    <p className="text-neutral-600 mb-4">Comprehensive dashboard showing flood risks across your jurisdiction with predictive analytics.</p>
                    <div className="flex items-center text-red-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Real-time data feeds
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ delay: 0.1 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Alert Management</h3>
                    <p className="text-neutral-600 mb-4">Coordinate emergency responses and distribute targeted alerts to affected communities instantly.</p>
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mass communication
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ delay: 0.2 }}
                    className="bg-neutral-0 p-8 rounded-2xl shadow-soft"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                      <Building2 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">Resource Coordination</h3>
                    <p className="text-neutral-600 mb-4">Manage emergency resources, track response teams, and coordinate with other agencies effectively.</p>
                    <div className="flex items-center text-orange-600 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Inter-agency integration
                    </div>
                  </motion.div>
                </>
              )}
            </div>

            <div className="text-center">
              <Link 
                to={activeSection === 'citizens' ? '/register' : '/login'}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-neutral-0 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                {activeSection === 'citizens' ? 'Get Started' : 'Access Dashboard'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Why Choose AegisFlood?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Advanced technology meets community safety in our comprehensive flood management platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Proven Reliability</h3>
              <p className="text-neutral-600">99.9% uptime with redundant systems ensuring continuous protection for your community.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Lightning Fast</h3>
              <p className="text-neutral-600">Sub-second alert delivery with optimized infrastructure for critical emergency situations.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">Global Scale</h3>
              <p className="text-neutral-600">Trusted by communities worldwide with multi-language support and regional customization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-0 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-neutral-0" />
            </div>
            <span className="text-xl font-bold">AegisFlood</span>
          </div>
          <p className="text-neutral-400 mb-8">
            Protecting communities through advanced flood prediction and alert systems
          </p>
          <div className="flex justify-center space-x-8 text-sm text-neutral-400">
            <a href="#" className="hover:text-neutral-0 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-0 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-neutral-0 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}




