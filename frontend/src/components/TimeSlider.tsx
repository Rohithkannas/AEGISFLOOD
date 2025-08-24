import React, { useState, useEffect } from 'react'
import { useI18n } from '../context/I18nContext'
import { Clock, Play, Pause } from 'lucide-react'

interface TimeSliderProps {
  onTimeChange: (hour: number) => void
  currentHour?: number
}

const TimeSlider: React.FC<TimeSliderProps> = ({ onTimeChange, currentHour = 12 }) => {
  const { t } = useI18n()
  const [selectedHour, setSelectedHour] = useState(currentHour)
  const [isPlaying, setIsPlaying] = useState(false)

  const hours = Array.from({ length: 24 }, (_, i) => i)
  
  const getRiskLevel = (hour: number) => {
    // Simulate risk levels throughout the day
    if (hour >= 2 && hour <= 6) return 'high'
    if (hour >= 14 && hour <= 18) return 'medium'
    return 'low'
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-orange-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-400'
    }
  }

  const handleSliderChange = (hour: number) => {
    setSelectedHour(hour)
    onTimeChange(hour)
  }

  const formatTime = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`
  }

  useEffect(() => {
    let interval: number
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedHour(prev => {
          const next = (prev + 1) % 24
          onTimeChange(next)
          return next
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, onTimeChange])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prediction Time</h3>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </button>
      </div>

      {/* Current Time Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {formatTime(selectedHour)}
        </div>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          getRiskLevel(selectedHour) === 'high' ? 'bg-red-100 text-red-800' :
          getRiskLevel(selectedHour) === 'medium' ? 'bg-orange-100 text-orange-800' :
          'bg-green-100 text-green-800'
        }`}>
          {getRiskLevel(selectedHour).charAt(0).toUpperCase() + getRiskLevel(selectedHour).slice(1)} Risk
        </div>
      </div>

      {/* Time Slider */}
      <div className="relative mb-4">
        <input
          type="range"
          min="0"
          max="23"
          value={selectedHour}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(selectedHour / 23) * 100}%, #e5e7eb ${(selectedHour / 23) * 100}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

      {/* Risk Timeline Visualization */}
      <div className="flex space-x-1 mb-4">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`flex-1 h-3 rounded-sm cursor-pointer transition-all ${
              getRiskColor(getRiskLevel(hour))
            } ${hour === selectedHour ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
            onClick={() => handleSliderChange(hour)}
            title={`${formatTime(hour)} - ${getRiskLevel(hour)} risk`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">Low Risk</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">Medium Risk</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span className="text-gray-600 dark:text-gray-400">High Risk</span>
        </div>
      </div>
    </div>
  )
}

export default TimeSlider
