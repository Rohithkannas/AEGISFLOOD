import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Droplets,
  Wind,
  Thermometer
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  time: string;
  date: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'rainfall' | 'water_level' | 'temperature' | 'wind' | 'alert';
  value?: string;
  trend?: 'up' | 'down' | 'stable';
}

interface PredictionTimelineProps {
  selectedDistrict?: string;
  className?: string;
}

const PredictionTimeline: React.FC<PredictionTimelineProps> = ({ 
  selectedDistrict = 'Patna', 
  className = '' 
}) => {
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: '1',
      time: '06:00',
      date: 'Today',
      title: 'Heavy Rainfall Alert',
      description: 'Intense rainfall expected with 45mm precipitation',
      severity: 'high',
      type: 'rainfall',
      value: '45mm',
      trend: 'up'
    },
    {
      id: '2',
      time: '09:00',
      date: 'Today',
      title: 'Water Level Rising',
      description: 'River water level increased by 2.3 meters',
      severity: 'medium',
      type: 'water_level',
      value: '2.3m ↑',
      trend: 'up'
    },
    {
      id: '3',
      time: '12:00',
      date: 'Today',
      title: 'Temperature Drop',
      description: 'Significant temperature decrease recorded',
      severity: 'low',
      type: 'temperature',
      value: '24°C',
      trend: 'down'
    },
    {
      id: '4',
      time: '15:00',
      date: 'Today',
      title: 'Wind Speed Alert',
      description: 'Strong winds may affect flood patterns',
      severity: 'medium',
      type: 'wind',
      value: '35 km/h',
      trend: 'up'
    },
    {
      id: '5',
      time: '18:00',
      date: 'Today',
      title: 'Flood Risk Assessment',
      description: 'Critical flood risk level reached in low-lying areas',
      severity: 'critical',
      type: 'alert',
      value: 'Critical',
      trend: 'up'
    },
    {
      id: '6',
      time: '21:00',
      date: 'Today',
      title: 'Rainfall Subsiding',
      description: 'Rainfall intensity decreasing gradually',
      severity: 'low',
      type: 'rainfall',
      value: '12mm',
      trend: 'down'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rainfall': return <Droplets className="w-4 h-4" />;
      case 'water_level': return <TrendingUp className="w-4 h-4" />;
      case 'temperature': return <Thermometer className="w-4 h-4" />;
      case 'wind': return <Wind className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500 border-green-200 text-green-800';
      case 'medium': return 'bg-yellow-500 border-yellow-200 text-yellow-800';
      case 'high': return 'bg-orange-500 border-orange-200 text-orange-800';
      case 'critical': return 'bg-red-500 border-red-200 text-red-800';
      default: return 'bg-gray-500 border-gray-200 text-gray-800';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'high': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prediction Timeline</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDistrict} - Next 24 hours</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Live Updates
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-start space-x-4 p-4 rounded-xl border ${getSeverityBg(event.severity)}`}
          >
            {/* Timeline Line */}
            {index < timelineEvents.length - 1 && (
              <div className="absolute left-8 top-12 w-0.5 h-8 bg-gray-200 dark:bg-gray-700"></div>
            )}

            {/* Time Badge */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getSeverityColor(event.severity).split(' ')[0]}`}>
                {getTypeIcon(event.type)}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">
                {event.time}
              </span>
            </div>

            {/* Event Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <div className="flex items-center space-x-1">
                  {event.value && (
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded-lg">
                      {event.value}
                    </span>
                  )}
                  {getTrendIcon(event.trend)}
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
              
              {/* Severity Badge */}
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                  event.severity === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  event.severity === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {event.severity.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Last updated: 2 minutes ago</span>
          <span>Auto-refresh: ON</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionTimeline;
