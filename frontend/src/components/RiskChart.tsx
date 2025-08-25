import React from 'react'
import { useI18n } from '../context/I18nContext'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface RiskDataPoint {
  time: string
  risk: number
  rainfall: number
  temperature: number
}

interface RiskChartProps {
  data?: RiskDataPoint[]
  selectedHour?: number
  currentRiskLevel?: 'low' | 'medium' | 'high' | 'critical'
}

const RiskChart: React.FC<RiskChartProps> = ({ data, selectedHour = 12, currentRiskLevel }) => {
  const { t } = useI18n()

  // Generate sample data if none provided
  const chartData = data || Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, '0')}:00`,
    risk: Math.sin(i * 0.3) * 30 + 50 + Math.random() * 20,
    rainfall: Math.max(0, Math.sin(i * 0.2) * 15 + Math.random() * 10),
    temperature: 25 + Math.sin(i * 0.26) * 8 + Math.random() * 3
  }))

  const maxRisk = Math.max(...chartData.map(d => d.risk))
  const minRisk = Math.min(...chartData.map(d => d.risk))

  const getRiskTrend = () => {
    if (selectedHour === 0) return 'stable'
    const current = chartData[selectedHour]?.risk || 0
    const previous = chartData[selectedHour - 1]?.risk || 0
    const diff = current - previous
    if (diff > 5) return 'increasing'
    if (diff < -5) return 'decreasing'
    return 'stable'
  }

  const trend = getRiskTrend()
  const currentRisk = chartData[selectedHour]?.risk || 0

  const colorByRisk: Record<string, string> = {
    low: '#22c55e',       // green-500
    medium: '#eab308',    // yellow-500
    high: '#f97316',      // orange-500
    critical: '#ef4444',  // red-500
    default: '#3b82f6'    // blue-500
  }
  const lineColor = currentRiskLevel ? (colorByRisk[currentRiskLevel] || colorByRisk.default) : colorByRisk.default
  const pointActive = currentRiskLevel ? (colorByRisk[currentRiskLevel] || '#1d4ed8') : '#1d4ed8'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Risk Analysis</h3>
        <div className="flex items-center space-x-2">
          {trend === 'increasing' && <TrendingUp className="w-4 h-4 text-red-500" />}
          {trend === 'decreasing' && <TrendingDown className="w-4 h-4 text-green-500" />}
          {trend === 'stable' && <Minus className="w-4 h-4 text-gray-500" />}
          <span className={`text-sm font-medium ${
            trend === 'increasing' ? 'text-red-600' : 
            trend === 'decreasing' ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
          }`}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </span>
        </div>
      </div>

      {/* Current Risk Level */}
      <div className="mb-6">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {currentRisk.toFixed(1)}% Risk Level
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              currentRisk > 70 ? 'bg-red-500' :
              currentRisk > 40 ? 'bg-orange-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(currentRisk, 100)}%` }}
          />
        </div>
      </div>

      {/* Line Chart */}
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={200 - (y * 2)}
              x2="400"
              y2={200 - (y * 2)}
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-600"
              strokeWidth="1"
            />
          ))}
          
          {/* Risk line */}
          <polyline
            fill="none"
            stroke={lineColor}
            strokeWidth="2"
            points={chartData.map((d, i) => 
              `${(i / 23) * 400},${200 - (d.risk * 2)}`
            ).join(' ')}
          />
          
          {/* Data points */}
          {chartData.map((d, i) => (
            <circle
              key={i}
              cx={(i / 23) * 400}
              cy={200 - (d.risk * 2)}
              r={i === selectedHour ? "6" : "3"}
              fill={i === selectedHour ? pointActive : lineColor}
              className="transition-all duration-200"
            />
          ))}
          
          {/* Selected hour indicator */}
          <line
            x1={(selectedHour / 23) * 400}
            y1="0"
            x2={(selectedHour / 23) * 400}
            y2="200"
            stroke={pointActive}
            strokeWidth="2"
            strokeDasharray="4,4"
            opacity="0.7"
          />
        </svg>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>

      {/* Time labels */}
      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {chartData[selectedHour]?.rainfall.toFixed(1) || '0.0'}mm
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Rainfall</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {chartData[selectedHour]?.temperature.toFixed(1) || '0.0'}°C
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Temperature</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {maxRisk.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Peak Risk</div>
        </div>
      </div>
    </div>
  )
}

export default RiskChart
