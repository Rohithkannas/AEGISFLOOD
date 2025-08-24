import React, { useState, useEffect } from 'react'
import { useI18n } from '../context/I18nContext'
import { Brain, MessageSquare, Zap, AlertTriangle, TrendingUp, MapPin } from 'lucide-react'

interface AIInsight {
  id: string
  type: 'analysis' | 'prediction' | 'recommendation'
  content: string
  confidence: number
  timestamp: string
}

interface ExplainableAIProps {
  selectedDistrict?: string
  currentRisk?: number
  selectedHour?: number
}

const ExplainableAI: React.FC<ExplainableAIProps> = ({ 
  selectedDistrict = 'Patna', 
  currentRisk = 45,
  selectedHour = 12 
}) => {
  const { t } = useI18n()
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isTyping, setIsTyping] = useState(false)

  const generateInsights = () => {
    const newInsights: AIInsight[] = [
      {
        id: '1',
        type: 'analysis',
        content: `Based on current meteorological data for ${selectedDistrict}, I'm analyzing multiple risk factors. The current risk level of ${currentRisk}% is influenced by recent rainfall patterns, river water levels, and soil saturation indices.`,
        confidence: 92,
        timestamp: new Date().toISOString()
      },
      {
        id: '2',
        type: 'prediction',
        content: `For the next 6 hours, I predict a ${currentRisk > 50 ? 'moderate increase' : 'gradual decrease'} in flood risk. Key contributing factors include upstream precipitation data and current drainage capacity utilization at 78%.`,
        confidence: 87,
        timestamp: new Date().toISOString()
      },
      {
        id: '3',
        type: 'recommendation',
        content: `${currentRisk > 60 ? 'Immediate action recommended: Alert local authorities and prepare evacuation routes.' : 'Continue monitoring. Consider issuing advisory notices to residents in low-lying areas.'} Deploy additional sensors in vulnerable zones.`,
        confidence: 94,
        timestamp: new Date().toISOString()
      }
    ]
    
    setInsights(newInsights)
  }

  useEffect(() => {
    setIsTyping(true)
    const timer = setTimeout(() => {
      generateInsights()
      setIsTyping(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [selectedDistrict, currentRisk, selectedHour])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <Brain className="w-4 h-4" />
      case 'prediction': return <TrendingUp className="w-4 h-4" />
      case 'recommendation': return <AlertTriangle className="w-4 h-4" />
      default: return <MessageSquare className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analysis': return 'text-blue-600 bg-blue-50'
      case 'prediction': return 'text-purple-600 bg-purple-50'
      case 'recommendation': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Risk Analyst</h3>
            <p className="text-sm text-gray-500">Real-time flood risk analysis</p>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {/* Context Card */}
        <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Current Analysis Context</span>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Location:</strong> {selectedDistrict}, Bihar</p>
            <p><strong>Time:</strong> {selectedHour.toString().padStart(2, '0')}:00</p>
            <p><strong>Risk Level:</strong> {currentRisk.toFixed(1)}%</p>
          </div>
        </div>

        {/* AI Insights */}
        {isTyping ? (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-4 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        ) : (
          insights.map((insight, index) => (
            <div key={insight.id} className="flex items-start space-x-3 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl rounded-tl-sm p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(insight.type)}`}>
                      {getTypeIcon(insight.type)}
                      <span className="capitalize">{insight.type}</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed">
                    {insight.content}
                  </p>
                </div>
                <div className="text-xs text-gray-400 mt-1 ml-4">
                  {new Date(insight.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Bar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">AI Model Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-yellow-500" />
            <span className="text-xs text-gray-600">Real-time Analysis</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExplainableAI
