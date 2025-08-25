import React, { useState } from 'react'
import AuthorityLayout from '../../components/authority/authority-layout'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Send, 
  X,
  User,
  Phone,
  Mail,
  MapPin,
  UserCheck,
  Users,
  Shield
} from 'lucide-react'

interface Contact {
  id: string
  name: string
  phone: string
  email: string
  region: string
  role: 'emergency_contact' | 'community_leader' | 'official' | 'volunteer'
  status: 'active' | 'inactive'
  lastContact: string
  notes: string
}

export default function ContactManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterRole, setFilterRole] = useState('all')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    region: '',
    role: 'official',
    notes: ''
  })

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Rajesh Kumar',
      phone: '+91-9876543210',
      email: 'rajesh.kumar@sdma.gov.in',
      region: 'Kamrup',
      role: 'official',
      status: 'active',
      lastContact: '2 hours ago',
      notes: 'District Collector, primary contact for Kamrup district operations'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91-9876543211',
      email: 'priya.sharma@ngo.org',
      region: 'Jorhat',
      role: 'community_leader',
      status: 'active',
      lastContact: '1 day ago',
      notes: 'Community leader, coordinates with local volunteers'
    },
    {
      id: '3',
      name: 'Emergency Control Room',
      phone: '+91-1234567890',
      email: 'emergency@assam.gov.in',
      region: 'All Districts',
      role: 'emergency_contact',
      status: 'active',
      lastContact: '30 mins ago',
      notes: '24/7 emergency response center'
    },
    {
      id: '4',
      name: 'Amit Borah',
      phone: '+91-9876543212',
      email: 'amit.borah@volunteer.org',
      region: 'Dibrugarh',
      role: 'volunteer',
      status: 'active',
      lastContact: '3 hours ago',
      notes: 'Volunteer coordinator for flood relief operations'
    },
    {
      id: '5',
      name: 'Sita Devi',
      phone: '+91-9876543213',
      email: 'sita.devi@village.gov.in',
      region: 'Silchar',
      role: 'community_leader',
      status: 'inactive',
      lastContact: '1 week ago',
      notes: 'Village head, needs contact update'
    }
  ]

  const regions = ['All Districts', 'Kamrup', 'Jorhat', 'Dibrugarh', 'Guwahati', 'Silchar', 'Tezpur']
  const roles = [
    { value: 'all', label: 'All Roles' },
    { value: 'emergency_contact', label: 'Emergency Contact' },
    { value: 'community_leader', label: 'Community Leader' },
    { value: 'official', label: 'Government Official' },
    { value: 'volunteer', label: 'Volunteer' }
  ]

  const contactGroups = [
    { name: 'District Officials', count: 24, description: 'Government officials from all districts' },
    { name: 'Village Heads', count: 156, description: 'Community leaders and village representatives' },
    { name: 'Emergency Services', count: 12, description: '24/7 emergency response contacts' },
    { name: 'NGO Coordinators', count: 34, description: 'Non-governmental organization contacts' }
  ]

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'emergency_contact': return Shield
      case 'community_leader': return Users
      case 'official': return UserCheck
      case 'volunteer': return User
      default: return User
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'emergency_contact': return 'text-red-600 bg-red-100'
      case 'community_leader': return 'text-blue-600 bg-blue-100'
      case 'official': return 'text-green-600 bg-green-100'
      case 'volunteer': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const handleSelectContact = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleSelectAll = () => {
    setSelectedContacts(
      selectedContacts.length === contacts.length ? [] : contacts.map(c => c.id)
    )
  }

  const handleAddContact = () => {
    console.log('Adding contact:', newContact)
    setShowAddModal(false)
    setNewContact({ name: '', phone: '', email: '', region: '', role: 'official', notes: '' })
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
    setShowAddModal(true)
  }

  const handleSendTestAlert = () => {
    console.log('Sending test alert to:', selectedContacts)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = filterRegion === 'all' || contact.region === filterRegion
    const matchesRole = filterRole === 'all' || contact.role === filterRole
    
    return matchesSearch && matchesRegion && matchesRole
  })

  return (
    <AuthorityLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Management</h1>
            <p className="text-gray-600">Manage emergency contacts and communication groups</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowGroupModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>Manage Groups</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              
              <select
                value={filterRegion}
                onChange={(e) => setFilterRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {regions.map(region => (
                  <option key={region} value={region === 'All Districts' ? 'all' : region}>
                    {region}
                  </option>
                ))}
              </select>
              
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>Import CSV</span>
              </button>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedContacts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-700 font-medium">
                {selectedContacts.length} contact{selectedContacts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSendTestAlert}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center space-x-1"
                >
                  <Send className="h-3 w-3" />
                  <span>Send Test Alert</span>
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center space-x-1">
                  <Trash2 className="h-3 w-3" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Contacts ({filteredContacts.length})
              </h2>
              <button
                onClick={handleSelectAll}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {selectedContacts.length === contacts.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === contacts.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => {
                  const RoleIcon = getRoleIcon(contact.role)
                  return (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedContacts.includes(contact.id)}
                          onChange={() => handleSelectContact(contact.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-sm text-gray-500 flex items-center space-x-4">
                              <span className="flex items-center space-x-1">
                                <Phone className="h-3 w-3" />
                                <span>{contact.phone}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{contact.email}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(contact.role)}`}>
                          <RoleIcon className="h-3 w-3 mr-1" />
                          {contact.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{contact.region}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          contact.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {contact.lastContact}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contact Groups */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Contact Groups</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactGroups.map((group, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <span className="text-lg font-bold text-blue-600">{group.count}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <button className="w-full px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                    Manage Group
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingContact(null)
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingContact ? editingContact.name : newContact.name}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, name: e.target.value})
                    : setNewContact({...newContact, name: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editingContact ? editingContact.phone : newContact.phone}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, phone: e.target.value})
                    : setNewContact({...newContact, phone: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="+91-XXXXXXXXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingContact ? editingContact.email : newContact.email}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, email: e.target.value})
                    : setNewContact({...newContact, email: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                <select
                  value={editingContact ? editingContact.region : newContact.region}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, region: e.target.value})
                    : setNewContact({...newContact, region: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Region</option>
                  {regions.slice(1).map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={editingContact ? editingContact.role : newContact.role}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, role: e.target.value as any})
                    : setNewContact({...newContact, role: e.target.value})
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {roles.slice(1).map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingContact ? editingContact.notes : newContact.notes}
                  onChange={(e) => editingContact 
                    ? setEditingContact({...editingContact, notes: e.target.value})
                    : setNewContact({...newContact, notes: e.target.value})
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Additional notes..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingContact(null)
                }}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingContact ? 'Update Contact' : 'Add Contact'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthorityLayout>
  )
}
