import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Megaphone, 
  Clock, 
  MapPin, 
  Filter, 
  Search,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Play,
  Phone,
  Map,
  Plus,
  Users,
  MessageSquare
} from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  description: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  authority: string;
  isVerified: boolean;
}

const CommunityChat: React.FC = () => {
  const { token, role, logout } = useAuth();
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    // Sample data with more entries
    {
      id: '1',
      title: 'Flood Situation in Guwahati City Center',
      description: 'Heavy rainfall has caused severe flooding in the city center. Water levels are rising rapidly. All residents in the affected area are advised to evacuate immediately.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      location: 'Guwahati, Assam',
      severity: 'high',
      timestamp: '2 hours ago',
      authority: 'Assam State Disaster Management Authority',
      isVerified: true
    },
    {
      id: '2',
      title: 'River Brahmaputra Water Level Update',
      description: 'Current water level at Pandu Ghat: 50.2 meters (above danger level). Continuous monitoring in progress.',
      mediaType: 'video',
      mediaUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      location: 'Pandu Ghat, Guwahati',
      severity: 'medium',
      timestamp: '4 hours ago',
      authority: 'Central Water Commission',
      isVerified: true
    },
    {
      id: '3',
      title: 'Emergency Response Team Deployment',
      description: 'NDRF teams have been deployed to assist in rescue operations. Boats and emergency supplies are being distributed.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop',
      location: 'Multiple locations, Assam',
      severity: 'critical',
      timestamp: '6 hours ago',
      authority: 'National Disaster Response Force',
      isVerified: true
    },
    {
      id: '4',
      title: 'Road Closure Alert - NH-37',
      description: 'National Highway 37 is closed between Jorabat and Nagaon due to flooding. Alternative routes available.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?w=800&h=600&fit=crop',
      location: 'NH-37, Assam',
      severity: 'medium',
      timestamp: '8 hours ago',
      authority: 'Assam Police Traffic Control',
      isVerified: true
    }
  ]);

  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Info className="w-4 h-4" />;
      case 'medium': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <Shield className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'critical': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };


  const filteredAnnouncements = announcements.filter(announcement => {
    const severityMatch = selectedSeverity === 'all' || announcement.severity === selectedSeverity;
    const locationMatch = selectedLocation === 'all' || announcement.location.includes(selectedLocation);
    return severityMatch && locationMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      {/* Navigation Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">AegisFlood</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Community Chat</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/recent-alerts" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                Recent Alerts
              </Link>
              <Link to="/community-chat" className="text-blue-600 dark:text-blue-400 font-medium">
                Community
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {announcements.length} Announcements
                </span>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="hidden md:flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-2">
                <Link to="/dashboard" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  Dashboard
                </Link>
                <Link to="/recent-alerts" className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                  Recent Alerts
                </Link>
                <Link to="/community-chat" className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                  Community
                </Link>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <button 
                    onClick={logout}
                    className="w-full px-4 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community Chat</h2>
              <p className="text-gray-600 dark:text-gray-400">Official announcements and community updates</p>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-200 dark:border-gray-700">
              <Megaphone className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {announcements.filter(a => a.isVerified).length} Verified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Severity:</span>
              <select 
                value={selectedSeverity} 
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Levels</option>
                <option value="low">Low Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="high">High Risk</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Location:</span>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">All Locations</option>
                <option value="Guwahati">Guwahati</option>
                <option value="Assam">Assam</option>
                <option value="NH-37">NH-37</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Announcements Feed */}
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement, index) => (
            <motion.div
              key={announcement.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityColor(announcement.severity)} shadow-sm`}>
                    {getSeverityIcon(announcement.severity)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {announcement.severity.toUpperCase()}
                      </span>
                      {announcement.isVerified && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 text-green-700 rounded-lg border border-green-200 text-xs">
                          <CheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{announcement.authority}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{announcement.timestamp}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{announcement.title}</h3>

              {/* Media */}
              <div className="mb-4">
                {announcement.mediaType === 'image' ? (
                  <img 
                    src={announcement.mediaUrl} 
                    alt={announcement.title}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Flood+Image';
                    }}
                  />
                ) : (
                  <div className="relative">
                    <video 
                      src={announcement.mediaUrl} 
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4';
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                      <Play className="w-3 h-3" />
                      <span>Video</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{announcement.description}</p>

              {/* Location */}
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{announcement.location}</span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Link 
                  to="/dashboard"
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Map className="w-4 h-4" />
                  <span>View on Map</span>
                </Link>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>Emergency Contact</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAnnouncements.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No announcements found</h3>
            <p className="text-gray-500">Try adjusting your filters or check back later for updates</p>
          </motion.div>
        )}

        {/* Authority Post Button */}
        {role === 'authority' && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              <span>Post New Announcement</span>
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default CommunityChat;
