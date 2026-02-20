import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export type Holding = {
  name: string;
  ticker?: string;
  value: string;
  percentage: number;
};

export type AssetAllocation = {
  name: string;
  percentage: number;
  value: string;
  color: string;
  icon: string;
  holdings?: Holding[];
};

type DiversificationChartProps = {
  allocations: AssetAllocation[];
  className?: string;
};

export const DiversificationChart = ({
  allocations,
  className = ''
}: DiversificationChartProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return <div className={`w-full ${className}`}>
    {/* Horizontal Bar */}
    <div className="relative w-full h-12 bg-gray-100 rounded-full overflow-hidden flex">
      {allocations.map((asset, index) => {
        const isExpanded = expandedIndex === index;
        return <motion.div key={asset.name} className="h-full relative cursor-pointer" style={{
          width: `${asset.percentage}%`,
          backgroundColor: asset.color
        }} initial={{
          width: 0
        }} animate={{
          width: `${asset.percentage}%`,
          opacity: expandedIndex === null || isExpanded ? 1 : 0.35
        }} transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: 'easeOut'
        }} whileHover={{
          opacity: 1
        }} onClick={() => setExpandedIndex(isExpanded ? null : index)}>
          {asset.percentage > 8 && <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-bold drop-shadow-lg">{asset.icon}</span>
          </div>}
        </motion.div>;
      })}
    </div>

    {/* Rows */}
    <div className="mt-3 space-y-1">
      {allocations.map((asset, index) => {
        const isExpanded = expandedIndex === index;
        const hasHoldings = asset.holdings && asset.holdings.length > 0;

        return <div key={asset.name}>
          <motion.div animate={{
            opacity: expandedIndex === null || isExpanded ? 1 : 0.5
          }} className={`flex items-center justify-between py-2 px-3 rounded-xl cursor-pointer transition-colors border border-gray-100 ${isExpanded ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`} onClick={() => setExpandedIndex(isExpanded ? null : index)}>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{
                backgroundColor: asset.color
              }} />
              <div className="flex items-center gap-2">
                <span className="text-base">{asset.icon}</span>
                <span className="text-gray-800 text-sm font-medium">{asset.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-baseline gap-2 font-mono tabular-nums">
                <span className="text-gray-800 text-sm font-semibold">{asset.value}</span>
                <span className="text-gray-400 text-xs">{asset.percentage.toFixed(1)}%</span>
              </div>
              {hasHoldings && <motion.div animate={{
                rotate: isExpanded ? 180 : 0
              }} transition={{
                duration: 0.2
              }}>
                <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
              </motion.div>}
            </div>
          </motion.div>

          <AnimatePresence>
            {isExpanded && hasHoldings && <motion.div initial={{
              height: 0,
              opacity: 0
            }} animate={{
              height: 'auto',
              opacity: 1
            }} exit={{
              height: 0,
              opacity: 0
            }} transition={{
              duration: 0.2
            }} className="overflow-hidden">
              <div className="pl-8 pr-3 py-1">
                {asset.holdings!.map(holding => <div key={holding.name} className="flex items-center justify-between py-1.5">
                  <span className="text-gray-500 text-xs font-medium">
                    {holding.name}
                    {holding.ticker && <span className="text-gray-400 ml-1">{holding.ticker}</span>}
                  </span>
                  <div className="flex items-baseline gap-2 font-mono tabular-nums">
                    <span className="text-gray-500 text-xs font-medium">{holding.value}</span>
                    <span className="text-gray-400 text-[11px]">{holding.percentage.toFixed(1)}%</span>
                  </div>
                </div>)}
              </div>
            </motion.div>}
          </AnimatePresence>
        </div>;
      })}
    </div>
  </div>;
};
