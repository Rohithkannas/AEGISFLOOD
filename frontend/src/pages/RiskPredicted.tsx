import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import { motion } from 'framer-motion';
import { Card, Button, StatusPill } from '../components/ui';

interface RiskPrediction {
  id: string;
  location: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  timeframe: string;
  factors: string[];
  recommendations: string[];
  icon: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  lastUpdated: string;
}

const RiskPredicted: React.FC = () => {
  const { token, role } = useAuth();
  const { t } = useI18n();
  const [predictions, setPredictions] = useState<RiskPrediction[]>([
    {
      id: '1',
      location: 'Patna Sadar',
      riskLevel: 'high',
      probability: 85,
      timeframe: 'Next 24 hours',
      factors: ['Heavy rainfall forecast', 'High river levels', 'Poor drainage'],
      recommendations: ['Avoid low-lying areas', 'Keep emergency kit ready', 'Monitor updates'],
      icon: '🌧️',
      trend: 'increasing',
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      location: 'Danapur',
      riskLevel: 'critical',
      probability: 95,
      timeframe: 'Next 12 hours',
      factors: ['Ganga overflow', 'Industrial area flooding', 'Evacuation needed'],
      recommendations: ['Immediate evacuation', 'Move to higher ground', 'Follow emergency protocols'],
      icon: '🌊',
      trend: 'increasing',
      lastUpdated: '1 hour ago'
    },
    {
      id: '3',
      location: 'Phulwari Sharif',
      riskLevel: 'medium',
      probability: 60,
      timeframe: 'Next 48 hours',
      factors: ['Moderate rainfall', 'Localized flooding', 'Drainage issues'],
      recommendations: ['Stay alert', 'Avoid waterlogged areas', 'Keep documents safe'],
      icon: '⚡',
      trend: 'stable',
      lastUpdated: '3 hours ago'
    },
    {
      id: '4',
      location: 'Khagaul',
      riskLevel: 'low',
      probability: 25,
      timeframe: 'Next 72 hours',
      factors: ['Light rainfall', 'Good drainage', 'Elevated terrain'],
      recommendations: ['Normal activities', 'Stay informed', 'Report any issues'],
      icon: '🌤️',
      trend: 'decreasing',
      lastUpdated: '4 hours ago'
    },
    {
      id: '5',
      location: 'Fatuha',
      riskLevel: 'high',
      probability: 75,
      timeframe: 'Next 36 hours',
      factors: ['Heavy downpour', 'Flash flood risk', 'Urban flooding'],
      recommendations: ['Avoid travel', 'Secure belongings', 'Stay indoors'],
      icon: '🌩️',
      trend: 'increasing',
      lastUpdated: '30 minutes ago'
    }
  ]);

  const [selectedArea, setSelectedArea] = useState<'Patna Sadar' | 'Danapur' | 'Phulwari Sharif' | 'Khagaul' | 'Fatuha'>('Patna Sadar');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'all' | 'low' | 'medium' | 'high' | 'critical'>('all');

  const filteredPredictions = predictions.filter(prediction => {
    const riskMatch = selectedRiskLevel === 'all' || prediction.riskLevel === selectedRiskLevel;
    const areaMatch = prediction.location === selectedArea;
    return riskMatch && areaMatch;
  });

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'from-blue-400 to-blue-600';
      case 'medium': return 'from-gray-400 to-gray-600';
      case 'high': return 'from-blue-600 to-black';
      case 'critical': return 'from-black to-gray-800';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-red-600';
      case 'decreasing': return 'text-green-600';
      case 'stable': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-black rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl text-white">🔮</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('riskPredictions')}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{t('aiPoweredForecasting')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('liveUpdates')}</span>
            </div>
          </div>
        </div>

        {/* Area Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Select Area:</span>
              <div className="flex flex-wrap gap-2">
                {(['Patna Sadar', 'Danapur', 'Phulwari Sharif', 'Khagaul', 'Fatuha'] as const).map(area => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedArea === area
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('riskLevel')}:</span>
              <div className="flex space-x-2">
                {(['all', 'low', 'medium', 'high', 'critical'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setSelectedRiskLevel(level)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedRiskLevel === level
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPredictions.map((prediction, index) => (
            <div 
              key={prediction.id} 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getRiskColor(prediction.riskLevel)} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                  {prediction.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{prediction.location}</h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        prediction.riskLevel === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        prediction.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        prediction.riskLevel === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {prediction.riskLevel.toUpperCase()}
                      </span>
                      <span className={`text-lg ${getTrendColor(prediction.trend)}`}>
                        {getTrendIcon(prediction.trend)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Probability Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Probability: {prediction.probability}%</span>
                      <span className="text-gray-500 dark:text-gray-500">{prediction.timeframe}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getRiskColor(prediction.riskLevel)} transition-all duration-1000`}
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Risk Factors */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Factors:</p>
                    <div className="flex flex-wrap gap-2">
                      {prediction.factors.map((factor, factorIndex) => (
                        <span key={factorIndex} className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-lg">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recommendations */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations:</p>
                    <div className="space-y-1">
                      {prediction.recommendations.map((rec, recIndex) => (
                        <div key={recIndex} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-xs text-gray-500 dark:text-gray-500">Updated: {prediction.lastUpdated}</span>
                    <button className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskPredicted;
