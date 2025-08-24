import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Droplets,
  Wind,
  Thermometer,
  CloudRain,
  Sun,
  Cloud
} from 'lucide-react';

interface DayPrediction {
  id: string;
  date: Date;
  dayName: string;
  displayName: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  riskPercentage: number;
  weather: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  rainfall: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  alerts: string[];
  trend: 'up' | 'down' | 'stable';
}

interface PredictionDaylineProps {
  selectedDistrict?: string;
  className?: string;
  onRiskChange?: (riskLevel: 'low' | 'medium' | 'high' | 'critical') => void;
}

const PredictionDayline: React.FC<PredictionDaylineProps> = ({ 
  selectedDistrict = 'Patna', 
  className = '',
  onRiskChange
}) => {
  const [predictions, setPredictions] = useState<DayPrediction[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');

  useEffect(() => {
    const generatePredictions = () => {
      const now = new Date();
      const days: DayPrediction[] = [];
      
      // Generate predictions for 7 days (yesterday, today, tomorrow, next 4 days)
      for (let i = -1; i < 6; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() + i);
        
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = dayNames[date.getDay()];
        
        let displayName = '';
        if (i === -1) displayName = 'Yesterday';
        else if (i === 0) displayName = 'Today';
        else if (i === 1) displayName = 'Tomorrow';
        else displayName = dayName;

        // Generate realistic prediction data
        const baseRisk = 30 + Math.sin(i * 0.5) * 20 + Math.random() * 30;
        const riskPercentage = Math.max(10, Math.min(95, baseRisk));
        
        let riskLevel: 'low' | 'medium' | 'high' | 'critical' = 'low';
        if (riskPercentage > 75) riskLevel = 'critical';
        else if (riskPercentage > 50) riskLevel = 'high';
        else if (riskPercentage > 25) riskLevel = 'medium';

        const rainfall = Math.max(0, Math.sin(i * 0.3) * 25 + Math.random() * 20);
        const temperature = 25 + Math.sin(i * 0.2) * 8 + Math.random() * 5;
        const humidity = 60 + Math.random() * 30;
        const windSpeed = 10 + Math.random() * 25;

        let weather: 'sunny' | 'cloudy' | 'rainy' | 'stormy' = 'sunny';
        if (rainfall > 20) weather = 'stormy';
        else if (rainfall > 10) weather = 'rainy';
        else if (humidity > 75) weather = 'cloudy';

        const alerts = [];
        if (riskLevel === 'critical') alerts.push('Flood Warning Issued');
        if (rainfall > 15) alerts.push('Heavy Rainfall Expected');
        if (windSpeed > 20) alerts.push('Strong Wind Advisory');

        const trend = i === 0 ? 'stable' : 
                     riskPercentage > (days[days.length - 1]?.riskPercentage || 0) ? 'up' : 'down';

        days.push({
          id: `day-${i}`,
          date,
          dayName,
          displayName,
          riskLevel,
          riskPercentage,
          weather,
          rainfall,
          temperature,
          humidity,
          windSpeed,
          alerts,
          trend
        });
      }
      
      setPredictions(days);
      setSelectedDay(days.find(d => d.displayName === 'Today')?.id || days[1]?.id || '');
    };

    generatePredictions();
  }, []);

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy': return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rainy': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'stormy': return <CloudRain className="w-5 h-5 text-purple-500" />;
      default: return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'high': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      case 'critical': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-red-500" />;
      case 'down': return <TrendingDown className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  const selectedPrediction = predictions.find(p => p.id === selectedDay);

  useEffect(() => {
    if (selectedPrediction && onRiskChange) {
      onRiskChange(selectedPrediction.riskLevel);
    }
  }, [selectedPrediction, onRiskChange]);

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">7-Day Forecast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{selectedDistrict} flood risk prediction</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Day Selection - stretch to fill width */}
      <div className="flex gap-2 mb-6">
        {predictions.map((prediction) => (
          <button
            key={prediction.id}
            onClick={() => setSelectedDay(prediction.id)}
            className={`flex-1 min-w-0 px-2 py-3 rounded-xl border transition-all ${
              selectedDay === prediction.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <div className="text-center truncate">
              <div className={`text-sm font-medium ${
                selectedDay === prediction.id 
                  ? 'text-indigo-700 dark:text-indigo-300' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {prediction.displayName}
              </div>
              <div className={`text-xs ${
                selectedDay === prediction.id 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {prediction.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              <div className="flex items-center justify-center mt-1">
                {getWeatherIcon(prediction.weather)}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Day Details */}
      {selectedPrediction && (
        <motion.div
          key={selectedPrediction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${getRiskBg(selectedPrediction.riskLevel)}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getRiskColor(selectedPrediction.riskLevel)}`}></div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedPrediction.displayName} - {selectedPrediction.riskPercentage.toFixed(0)}% Risk
              </h4>
              {getTrendIcon(selectedPrediction.trend)}
            </div>
            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${
              selectedPrediction.riskLevel === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              selectedPrediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              selectedPrediction.riskLevel === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {selectedPrediction.riskLevel.toUpperCase()}
            </span>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedPrediction.rainfall.toFixed(1)}mm
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Rainfall</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedPrediction.temperature.toFixed(1)}°C
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Temperature</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedPrediction.windSpeed.toFixed(0)} km/h
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Wind Speed</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedPrediction.humidity.toFixed(0)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Humidity</div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {selectedPrediction.alerts.length > 0 && (
            <div className="space-y-2">
              {selectedPrediction.alerts.map((alert, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300">{alert}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Footer - Pushed to bottom */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Updated: {new Date().toLocaleTimeString()}</span>
          <span>Next update: {new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionDayline;
