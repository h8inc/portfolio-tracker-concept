import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Lock, LucideIcon } from 'lucide-react';
type RecommendationType = 'rebalance' | 'diversify' | 'reduce-risk' | 'info';
type RecommendationCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  type: RecommendationType;
  actionLabel?: string;
  onClick?: () => void;
  index?: number;
  locked?: boolean;
};
export const RecommendationCard = ({
  icon: Icon,
  title,
  description,
  type,
  actionLabel,
  onClick,
  index = 0,
  locked = false
}: RecommendationCardProps) => {
  const getTypeColor = (type: RecommendationType) => {
    switch (type) {
      case 'rebalance':
        return 'text-[#00b8d9]';
      case 'diversify':
        return 'text-[#00b8d9]';
      case 'reduce-risk':
        return 'text-amber-500';
      case 'info':
        return 'text-gray-500';
    }
  };
  const getTypeBg = (type: RecommendationType) => {
    switch (type) {
      case 'rebalance':
        return 'bg-[#00b8d9]/10';
      case 'diversify':
        return 'bg-[#00b8d9]/10';
      case 'reduce-risk':
        return 'bg-amber-50';
      case 'info':
        return 'bg-gray-100';
    }
  };
  const typeColor = getTypeColor(type);
  const typeBg = getTypeBg(type);

  if (locked) {
    return <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.4,
      delay: index * 0.1
    }} className="relative rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4" style={{ filter: 'blur(6px)', WebkitFilter: 'blur(6px)', pointerEvents: 'none', userSelect: 'none' }}>
        <div className="flex items-start gap-4">
          <div className={`${typeBg} rounded-xl p-3 flex-shrink-0`}>
            <Icon className={`w-6 h-6 ${typeColor}`} strokeWidth={2} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 font-medium text-base mb-1">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-sm border border-gray-200">
          <Lock className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.5} />
          <span className="text-xs font-semibold text-gray-500">Pro Insight</span>
        </div>
      </div>
    </motion.div>;
  }

  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4,
    delay: index * 0.1
  }} whileTap={{
    scale: 0.98
  }} onClick={onClick} className="bg-white rounded-2xl p-4 border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
    <div className="flex items-start gap-4">
      <div className={`${typeBg} rounded-xl p-3 flex-shrink-0`}>
        <Icon className={`w-6 h-6 ${typeColor}`} strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-gray-900 font-medium text-base mb-1">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>

        {actionLabel && <div className="flex items-center gap-1 mt-3">
            <span className={`text-sm font-medium ${typeColor}`}>{actionLabel}</span>
            <ChevronRight className={`w-4 h-4 ${typeColor}`} strokeWidth={2} />
          </div>}
      </div>
    </div>
  </motion.div>;
};