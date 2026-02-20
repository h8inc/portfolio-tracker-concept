import React from 'react';
import { motion } from 'framer-motion';
type RiskLevel = 'low' | 'medium' | 'high';
type RiskIndicatorProps = {
  level: RiskLevel;
  percentage: number;
  label: string;
  description: string;
  className?: string;
};
export const RiskIndicator = ({
  level,
  percentage,
  label,
  description,
  className = ''
}: RiskIndicatorProps) => {
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'high':
        return '#ef4444';
    }
  };
  const getRiskTrackColor = (level: RiskLevel) => {
    switch (level) {
      case 'low':
        return 'rgba(16,185,129,0.12)';
      case 'medium':
        return 'rgba(245,158,11,0.12)';
      case 'high':
        return 'rgba(239,68,68,0.12)';
    }
  };
  const riskColor = getRiskColor(level);
  const trackColor = getRiskTrackColor(level);
  return <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{
          backgroundColor: riskColor
        }} />
          <span className="text-gray-800 text-sm font-medium">{label}</span>
        </div>
        <span className="text-gray-500 text-sm">{percentage}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full rounded-full" style={{
        backgroundColor: riskColor
      }} initial={{
        width: 0
      }} animate={{
        width: `${percentage}%`
      }} transition={{
        duration: 0.8,
        delay: 0.2,
        ease: 'easeOut'
      }} />
      </div>

      <p className="text-gray-400 text-xs mt-2">{description}</p>
    </div>;
};