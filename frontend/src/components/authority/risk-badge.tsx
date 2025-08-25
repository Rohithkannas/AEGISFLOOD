import React from 'react'
import { clsx } from 'clsx'

interface RiskBadgeProps {
  level: 'low' | 'moderate' | 'high' | 'critical'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const riskColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  critical: 'bg-red-100 text-red-800 border-red-200'
}

const riskSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base'
}

export default function RiskBadge({ level, size = 'md', className }: RiskBadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-md border font-medium capitalize',
        riskColors[level],
        riskSizes[size],
        className
      )}
    >
      {level}
    </span>
  )
}
