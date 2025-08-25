import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import RiskBadge from '../../components/authority/risk-badge'
import { 
  Plus, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Calendar,
  Users,
  MessageSquare,
  Smartphone,
  Bell,
  Filter,
  Search
} from 'lucide-react'

interface Alert {
  id: string
  title: string
  type: 'flood_warning' | 'evacuation' | 'all_clear'
  riskLevel: 'low' | 'moderate' | 'high' | 'critical'
  affectedAreas: string[]
  message: string
  sentTime: string
  deliveryStatus: {
    sms: number
    whatsapp: number
    push: number
  }
  totalRecipients: number
  status: 'sent' | 'scheduled' | 'draft'
}

export default function AlertsManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterRisk, setFilterRisk] = useState('all')

  const [newAlert, setNewAlert] = useState({
    type: 'flood_warning',
    riskLevel: 'moderate',
    affectedAreas: [] as string[],
    message: '',
    language: 'en',
    channels: {
      sms: true,
      whatsapp: true,
      push: true
    },
    schedule: 'immediate'
  })

  const activeAlerts: Alert[] = [
    {
      id: '1',
      title: 'Severe Flood Warning - Kamrup District',
      type: 'flood_warning',
      riskLevel: 'critical',
      affectedAreas: ['Kamrup', 'Guwahati'],
      message: 'Heavy rainfall expected. Move to higher ground immediately.',
      sentTime: '2 hours ago',
      deliveryStatus: { sms: 85, whatsapp: 92, push: 78 },
      totalRecipients: 15420,
      status: 'sent'
    },
    {
      id: '2',
      title: 'Evacuation Notice - Jorhat Villages',
      type: 'evacuation',
      riskLevel: 'high',
      affectedAreas: ['Jorhat'],
      message: 'Immediate evacuation required for riverside villages.',
      sentTime: '4 hours ago',
      deliveryStatus: { sms: 91, whatsapp: 88, push: 82 },
      totalRecipients: 8750,
      status: 'sent'
    },
    {
      id: '3',
      title: 'Weather Update - Dibrugarh',
      type: 'flood_warning',
      riskLevel: 'moderate',
      affectedAreas: ['Dibrugarh'],
      message: 'Moderate rainfall expected. Stay alert and avoid low-lying areas.',
      sentTime: '6 hours ago',
      deliveryStatus: { sms: 94, whatsapp: 89, push: 85 },
      totalRecipients: 12300,
      status: 'sent'
    }
  ]

  const recentAlerts: Alert[] = [
    ...activeAlerts,
    {
      id: '4',
      title: 'All Clear - Silchar District',
      type: 'all_clear',
      riskLevel: 'low',
      affectedAreas: ['Silchar'],
      message: 'Water levels have receded. Normal activities can resume.',
      sentTime: '1 day ago',
      deliveryStatus: { sms: 96, whatsapp: 93, push: 88 },
      totalRecipients: 9800,
      status: 'sent'
    }
  ]

  const alertTypes = [
    { value: 'flood_warning', label: 'Flood Warning', icon: AlertTriangle, color: 'text-yellow-600' },
    { value: 'evacuation', label: 'Evacuation Notice', icon: Users, color: 'text-red-600' },
    { value: 'all_clear', label: 'All Clear', icon: CheckCircle, color: 'text-green-600' }
  ]

  const districts = ['Kamrup', 'Jorhat', 'Dibrugarh', 'Guwahati', 'Silchar', 'Tezpur']

  const messageTemplates = {
    en: {
      flood_warning: 'FLOOD ALERT: Heavy rainfall expected in your area. Move to higher ground and stay safe. Follow official instructions.',
      evacuation: 'EVACUATION NOTICE: Immediate evacuation required. Proceed to designated safe zones. Emergency services are available.',
      all_clear: 'ALL CLEAR: Flood situation has improved. Normal activities can resume. Stay cautious and follow local guidelines.'
    },
    hi: {
      flood_warning: 'बाढ़ चेतावनी: आपके क्षेत्र में भारी बारिश की संभावना है। ऊंचे स्थान पर जाएं और सुरक्षित रहें।',
      evacuation: 'निकासी सूचना: तत्काल निकासी आवश्यक है। निर्धारित सुरक्षित क्षेत्रों में जाएं।',
      all_clear: 'स्थिति सामान्य: बाढ़ की स्थिति में सुधार हुआ है। सामान्य गतिविधियां शुरू की जा सकती हैं।'
    }
  }

  const handleCreateAlert = () => {
    // Mock alert creation
    console.log('Creating alert:', newAlert)
    setShowCreateModal(false)
    // Reset form
    setNewAlert({
      type: 'flood_warning',
      riskLevel: 'moderate',
      affectedAreas: [],
      message: '',
      language: 'en',
      channels: { sms: true, whatsapp: true, push: true },
      schedule: 'immediate'
    })
  }

  const handleTemplateSelect = (type: string, language: string) => {
    const template = messageTemplates[language as keyof typeof messageTemplates]?.[type as keyof typeof messageTemplates.en]
    if (template) {
      setNewAlert(prev => ({ ...prev, message: template }))
    }
  }

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alert Management</h1>
            <p className="text-gray-600">Create and manage flood alerts for affected areas</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Alert</span>
          </button>
        </div>

        {/* Active Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                      <RiskBadge level={alert.riskLevel} size="sm" />
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{alert.sentTime}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{alert.totalRecipients.toLocaleString()} recipients</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Delivery Status */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">SMS</span>
                      <Smartphone className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${alert.deliveryStatus.sms}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-blue-900">{alert.deliveryStatus.sms}%</span>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-900">WhatsApp</span>
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-green-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${alert.deliveryStatus.whatsapp}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-green-900">{alert.deliveryStatus.whatsapp}%</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-900">Push</span>
                      <Bell className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-purple-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${alert.deliveryStatus.push}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-purple-900">{alert.deliveryStatus.push}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Recent Alerts History</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search alerts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="flood_warning">Flood Warning</option>
                  <option value="evacuation">Evacuation</option>
                  <option value="all_clear">All Clear</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alert</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipients</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sent</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentAlerts.map((alert) => {
                  const avgDelivery = Math.round((alert.deliveryStatus.sms + alert.deliveryStatus.whatsapp + alert.deliveryStatus.push) / 3)
                  return (
                    <tr key={alert.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{alert.title}</div>
                        <div className="text-sm text-gray-500">{alert.affectedAreas.join(', ')}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize text-sm text-gray-900">
                          {alert.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <RiskBadge level={alert.riskLevel} size="sm" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {alert.totalRecipients.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${avgDelivery}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{avgDelivery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {alert.sentTime}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Create New Alert</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Alert Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Alert Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {alertTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.value}
                        onClick={() => setNewAlert(prev => ({ ...prev, type: type.value as any }))}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          newAlert.type === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${type.color}`} />
                        <div className="text-sm font-medium text-gray-900">{type.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Risk Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                <select
                  value={newAlert.riskLevel}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, riskLevel: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low Risk</option>
                  <option value="moderate">Moderate Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical Risk</option>
                </select>
              </div>

              {/* Affected Areas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Affected Areas</label>
                <div className="grid grid-cols-2 gap-2">
                  {districts.map((district) => (
                    <label key={district} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAlert.affectedAreas.includes(district)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewAlert(prev => ({
                              ...prev,
                              affectedAreas: [...prev.affectedAreas, district]
                            }))
                          } else {
                            setNewAlert(prev => ({
                              ...prev,
                              affectedAreas: prev.affectedAreas.filter(area => area !== district)
                            }))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{district}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Template */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={newAlert.language}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, language: e.target.value }))}
                      className="text-xs px-2 py-1 border border-gray-300 rounded"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                    </select>
                    <button
                      onClick={() => handleTemplateSelect(newAlert.type, newAlert.language)}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Use Template
                    </button>
                  </div>
                </div>
                <textarea
                  value={newAlert.message}
                  onChange={(e) => setNewAlert(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter alert message..."
                />
              </div>

              {/* Delivery Channels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Channels</label>
                <div className="space-y-2">
                  {Object.entries(newAlert.channels).map(([channel, enabled]) => (
                    <label key={channel} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={(e) => setNewAlert(prev => ({
                          ...prev,
                          channels: { ...prev.channels, [channel]: e.target.checked }
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="immediate"
                      checked={newAlert.schedule === 'immediate'}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, schedule: e.target.value }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Send Immediately</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="schedule"
                      value="scheduled"
                      checked={newAlert.schedule === 'scheduled'}
                      onChange={(e) => setNewAlert(prev => ({ ...prev, schedule: e.target.value }))}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Schedule for Later</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAlert}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send Alert</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthorityLayout>
  )
}
