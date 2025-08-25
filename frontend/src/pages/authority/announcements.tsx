import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import RiskBadge from '../../components/authority/risk-badge'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  X,
  Megaphone,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Info,
  Shield,
  Image,
  Video,
  Calendar,
  Users
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  description: string
  mediaType: 'image' | 'video'
  mediaUrl: string
  location: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: string
  authority: string
  isVerified: boolean
  status: 'draft' | 'published' | 'archived'
  views: number
  createdAt: string
}

export default function AnnouncementsManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null)

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    description: '',
    mediaType: 'image' as 'image' | 'video',
    mediaUrl: '',
    location: '',
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    authority: 'State Disaster Management Authority',
    isVerified: true,
    status: 'draft' as 'draft' | 'published'
  })

  const announcements: Announcement[] = [
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
      isVerified: true,
      status: 'published',
      views: 1250,
      createdAt: '2024-01-15'
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
      isVerified: true,
      status: 'published',
      views: 890,
      createdAt: '2024-01-15'
    },
    {
      id: '3',
      title: 'Emergency Response Team Deployment',
      description: 'NDRF teams have been deployed to assist in rescue operations. Boats and emergency supplies are being distributed.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
      location: 'Multiple Districts',
      severity: 'critical',
      timestamp: '6 hours ago',
      authority: 'National Disaster Response Force',
      isVerified: true,
      status: 'published',
      views: 2100,
      createdAt: '2024-01-14'
    },
    {
      id: '4',
      title: 'Weather Advisory - Next 48 Hours',
      description: 'Meteorological department forecasts continued heavy rainfall. Citizens advised to stay indoors and avoid unnecessary travel.',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      location: 'Assam State',
      severity: 'medium',
      timestamp: '8 hours ago',
      authority: 'India Meteorological Department',
      isVerified: true,
      status: 'draft',
      views: 0,
      createdAt: '2024-01-14'
    }
  ]

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ]

  const locations = [
    'Guwahati, Assam',
    'Kamrup District',
    'Jorhat District',
    'Dibrugarh District',
    'Silchar District',
    'Multiple Districts',
    'Assam State'
  ]

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <Info className="h-5 w-5" />
      case 'medium': return <AlertCircle className="h-5 w-5" />
      case 'high': return <Shield className="h-5 w-5" />
      case 'critical': return <Megaphone className="h-5 w-5" />
      default: return <Info className="h-5 w-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-600'
      case 'medium': return 'bg-yellow-100 text-yellow-600'
      case 'high': return 'bg-orange-100 text-orange-600'
      case 'critical': return 'bg-red-100 text-red-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'published': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCreateAnnouncement = () => {
    console.log('Creating announcement:', newAnnouncement)
    setShowCreateModal(false)
    setNewAnnouncement({
      title: '',
      description: '',
      mediaType: 'image',
      mediaUrl: '',
      location: '',
      severity: 'medium',
      authority: 'State Disaster Management Authority',
      isVerified: true,
      status: 'draft'
    })
  }

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement)
    setShowCreateModal(true)
  }

  const handlePublishAnnouncement = (id: string) => {
    console.log('Publishing announcement:', id)
  }

  const handleArchiveAnnouncement = (id: string) => {
    console.log('Archiving announcement:', id)
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === 'all' || announcement.severity === filterSeverity
    const matchesStatus = filterStatus === 'all' || announcement.status === filterStatus
    
    return matchesSearch && matchesSeverity && matchesStatus
  })

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Announcements Management</h1>
            <p className="text-gray-600">Create and manage public announcements for citizens</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create Announcement</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Announcements</p>
                <p className="text-2xl font-bold text-gray-900">{announcements.length}</p>
              </div>
              <Megaphone className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">
                  {announcements.filter(a => a.status === 'published').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">
                  {announcements.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-red-600">
                  {announcements.filter(a => a.severity === 'critical').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {severityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Announcements ({filteredAnnouncements.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredAnnouncements.map((announcement) => (
              <div key={announcement.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getSeverityColor(announcement.severity)}`}>
                        {getSeverityIcon(announcement.severity)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{announcement.timestamp}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{announcement.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{announcement.views} views</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{announcement.description}</p>
                    
                    <div className="flex items-center space-x-3">
                      <RiskBadge level={announcement.severity as any} size="sm" />
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(announcement.status)}`}>
                        {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                      </span>
                      <span className="flex items-center space-x-1 text-xs text-gray-500">
                        {announcement.mediaType === 'image' ? <Image className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                        <span>{announcement.mediaType}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    {announcement.status === 'draft' && (
                      <button
                        onClick={() => handlePublishAnnouncement(announcement.id)}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleArchiveAnnouncement(announcement.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create/Edit Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
              </h2>
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingAnnouncement(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement ? editingAnnouncement.title : newAnnouncement.title}
                  onChange={(e) => editingAnnouncement 
                    ? setEditingAnnouncement({...editingAnnouncement, title: e.target.value})
                    : setNewAnnouncement({...newAnnouncement, title: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editingAnnouncement ? editingAnnouncement.description : newAnnouncement.description}
                  onChange={(e) => editingAnnouncement 
                    ? setEditingAnnouncement({...editingAnnouncement, description: e.target.value})
                    : setNewAnnouncement({...newAnnouncement, description: e.target.value})
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter detailed description"
                />
              </div>

              {/* Media Type and URL */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media Type</label>
                  <select
                    value={editingAnnouncement ? editingAnnouncement.mediaType : newAnnouncement.mediaType}
                    onChange={(e) => editingAnnouncement 
                      ? setEditingAnnouncement({...editingAnnouncement, mediaType: e.target.value as any})
                      : setNewAnnouncement({...newAnnouncement, mediaType: e.target.value as any})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Media URL</label>
                  <input
                    type="url"
                    value={editingAnnouncement ? editingAnnouncement.mediaUrl : newAnnouncement.mediaUrl}
                    onChange={(e) => editingAnnouncement 
                      ? setEditingAnnouncement({...editingAnnouncement, mediaUrl: e.target.value})
                      : setNewAnnouncement({...newAnnouncement, mediaUrl: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter media URL"
                  />
                </div>
              </div>

              {/* Location and Severity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <select
                    value={editingAnnouncement ? editingAnnouncement.location : newAnnouncement.location}
                    onChange={(e) => editingAnnouncement 
                      ? setEditingAnnouncement({...editingAnnouncement, location: e.target.value})
                      : setNewAnnouncement({...newAnnouncement, location: e.target.value})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <select
                    value={editingAnnouncement ? editingAnnouncement.severity : newAnnouncement.severity}
                    onChange={(e) => editingAnnouncement 
                      ? setEditingAnnouncement({...editingAnnouncement, severity: e.target.value as any})
                      : setNewAnnouncement({...newAnnouncement, severity: e.target.value as any})
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              {/* Authority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Authority</label>
                <input
                  type="text"
                  value={editingAnnouncement ? editingAnnouncement.authority : newAnnouncement.authority}
                  onChange={(e) => editingAnnouncement 
                    ? setEditingAnnouncement({...editingAnnouncement, authority: e.target.value})
                    : setNewAnnouncement({...newAnnouncement, authority: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter issuing authority"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingAnnouncement(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const updatedAnnouncement = { ...newAnnouncement, status: 'draft' as const }
                  setNewAnnouncement(updatedAnnouncement)
                  handleCreateAnnouncement()
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Save as Draft
              </button>
              <button
                onClick={() => {
                  const updatedAnnouncement = { ...newAnnouncement, status: 'published' as const }
                  setNewAnnouncement(updatedAnnouncement)
                  handleCreateAnnouncement()
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Publish Now
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthorityLayout>
  )
}
