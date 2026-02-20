import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RecommendationCard } from './RecommendationCard';
import { BottomNavigation } from './BottomNavigation';
import { ChevronLeft, PieChart, TrendingDown, Sparkles, BookOpen, Shield, Target, X, Zap } from 'lucide-react';
type PortfolioHealthRecommendationsProps = {
  onBack?: () => void;
  isSubscribed?: boolean;
};
const FREE_RECOMMENDATION_COUNT = 2;
const recommendations = [{
  icon: TrendingDown,
  title: 'Reduce Apple Concentration',
  description: 'Apple (AAPL) makes up 21.3% of your portfolio, just above the recommended 20% single-stock limit. Trimming would lower concentration risk.',
  type: 'reduce-risk' as const,
  actionLabel: 'View Strategy',
  details: {
    impact: 'High',
    effort: 'Medium',
    suggestedAction: 'Gradually reduce Apple to 12-15% and redistribute into your S&P 500 ETF or iShares MSCI World position.',
    targetAllocation: '12-15% Apple'
  }
}, {
  icon: Sparkles,
  title: 'Boost Commodity Hedging',
  description: 'Commodities are at 10.8%. Increasing to 13-15% could provide stronger inflation protection and reduce correlation with equities.',
  type: 'diversify' as const,
  actionLabel: 'Explore Options',
  details: {
    impact: 'Medium',
    effort: 'Low',
    suggestedAction: 'Add to your Gold ETC position or diversify with a broad Commodity ETF to hedge against equity downturns and inflation.',
    targetAllocation: '13-15% Commodities'
  }
}, {
  icon: PieChart,
  title: 'Rebalance to Target Allocation',
  description: 'Your portfolio has drifted from its optimal mix due to recent market moves. A rebalance could improve risk-adjusted returns.',
  type: 'rebalance' as const,
  actionLabel: 'See Plan',
  details: {
    impact: 'High',
    effort: 'Low',
    suggestedAction: 'Target: 30% Stocks, 25% ETFs, 15% Commodities, 12% Crypto, 10% Bonds, 5% Cash. Use auto-invest to maintain ratios.',
    targetAllocation: 'Balanced 6-class portfolio'
  }
}, {
  icon: Shield,
  title: 'Add Geographic Diversification',
  description: 'Over 53% of your portfolio is in US assets. European or Emerging Market ETFs could reduce geographic concentration.',
  type: 'reduce-risk' as const,
  actionLabel: 'Learn More',
  details: {
    impact: 'Medium',
    effort: 'Low',
    suggestedAction: 'Allocate 10-15% to a Europe or World ex-US ETF to spread currency and regulatory risk across regions.',
    targetAllocation: '10-15% Non-US Exposure'
  }
}, {
  icon: BookOpen,
  title: 'Explore Dividend Income',
  description: 'Your portfolio is growth-focused with limited dividend income. Dividend stocks provide steady returns regardless of market direction.',
  type: 'info' as const,
  actionLabel: 'Read Guide',
  details: {
    impact: 'Educational',
    effort: 'Low',
    suggestedAction: 'Look at dividend-focused ETFs like VHYL or individual blue-chips like Unilever or AstraZeneca available on Trading 212.',
    targetAllocation: 'N/A'
  }
}];
export const PortfolioHealthRecommendations = ({
  onBack,
  isSubscribed = false
}: PortfolioHealthRecommendationsProps) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);
  const slideVariants = {
    enter: {
      x: '100%',
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: {
      x: '100%',
      opacity: 0
    }
  };
  const rec = selectedRecommendation !== null ? recommendations[selectedRecommendation] : null;
  return <div className="h-full w-full relative overflow-hidden">
      {/* Recommendations List Page */}
      <div className="h-full w-full bg-white text-gray-900 flex flex-col">
        {/* Safe area / notch spacer */}
        <div className="flex-shrink-0 bg-white h-8" />

        {/* Header */}
        <header className="flex-shrink-0 bg-white py-4 px-4 border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <ChevronLeft className="w-6 h-6 text-gray-500" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Recommendations</h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Smart Optimizer CTA — top of page in free mode */}
          {!isSubscribed && <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-[#00b8d9]/20" style={{
              background: 'linear-gradient(135deg, #e8f7fb 0%, #f0f4ff 50%, #e8f7fb 100%)'
            }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{
                background: 'radial-gradient(circle, #00b8d9 0%, transparent 70%)',
                transform: 'translate(30%, -30%)'
              }} />
              <div className="relative p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-[#00b8d9] rounded-lg p-1.5">
                    <Zap className="w-4 h-4 text-white" strokeWidth={2.5} fill="white" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">Smart Optimizer</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#00b8d9]/15 text-[#00b8d9] px-2 py-0.5 rounded-full">Pro</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-1">
                  Unlock all {recommendations.length} AI-driven recommendations, auto-rebalancing strategies, and personalised allocation targets.
                </p>
                <p className="text-gray-400 text-xs mb-4">
                  2 of {recommendations.length} actions available on Free plan
                </p>
                <div className="flex items-center gap-3">
                  <button className="flex-1 text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-[0.98]" style={{
                    backgroundColor: '#00b8d9',
                    boxShadow: '0 4px 14px rgba(0,184,217,0.35)'
                  }}>
                    Upgrade — £4.99/mo
                  </button>
                  <button className="text-gray-400 text-xs font-medium px-3 py-3">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </motion.div>}

          {/* Overview Banner — subscribed mode */}
          {isSubscribed && <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} className="mb-6">
            <div className="bg-[#e8f7fb] rounded-2xl p-5 border border-[#00b8d9]/15">
              <div className="flex items-start gap-3">
                <div className="bg-[#00b8d9]/15 rounded-xl p-2.5">
                  <Target className="w-6 h-6 text-[#00b8d9]" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-gray-900 font-semibold text-base mb-1">5 Actions to Improve</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Personalised recommendations to optimise your 6-class portfolio across stocks, ETFs, crypto, commodities and bonds.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>}

          {/* Recommendations List */}
          <div className="space-y-3">
            {recommendations.map((rec, index) => {
              const isLocked = !isSubscribed && index >= FREE_RECOMMENDATION_COUNT;
              return <RecommendationCard
                key={index}
                icon={rec.icon}
                title={rec.title}
                description={rec.description}
                type={rec.type}
                actionLabel={rec.actionLabel}
                onClick={isLocked ? undefined : () => setSelectedRecommendation(index)}
                index={index}
                locked={isLocked}
              />;
            })}
          </div>
        </div>

        <BottomNavigation />
      </div>

      {/* Detail Page — slides in over the top */}
      <AnimatePresence>
        {selectedRecommendation !== null && rec && <motion.div key="detail" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }} className="absolute inset-0 bg-white flex flex-col z-50">
            {/* Safe area / notch spacer */}
            <div className="flex-shrink-0 bg-white h-8" />

            {/* Detail Header */}
            <header className="flex-shrink-0 bg-white py-4 px-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <button onClick={() => setSelectedRecommendation(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <ChevronLeft className="w-6 h-6 text-gray-500" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">Detail</h1>
                <button onClick={() => setSelectedRecommendation(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </header>

            {/* Detail Body */}
            <div className="flex-1 flex flex-col px-4 pt-6 pb-6 gap-4 overflow-hidden">
              {/* Title block */}
              <div className="flex items-start gap-4 flex-shrink-0">
                <div className="bg-[#00b8d9]/10 rounded-xl p-3">
                  {React.createElement(rec.icon, {
                className: 'w-8 h-8 text-[#00b8d9]',
                strokeWidth: 2
              })}
                </div>
                <div className="flex-1">
                  <h2 className="text-gray-900 text-xl font-semibold mb-2">{rec.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{rec.description}</p>
                </div>
              </div>

              {/* Detail Cards — evenly spaced */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex-1 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Impact</p>
                  <p className="text-gray-900 font-medium">{rec.details.impact}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex-1 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Effort Required</p>
                  <p className="text-gray-900 font-medium">{rec.details.effort}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex-1 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Suggested Action</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{rec.details.suggestedAction}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex-1 flex flex-col justify-center">
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Target Allocation</p>
                  <p className="font-medium text-[#00b8d9]">{rec.details.targetAllocation}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 space-y-3 pt-2">
                <button className="w-full text-white font-semibold py-4 rounded-2xl transition-colors" style={{
              backgroundColor: '#00b8d9'
            }}>
                  Take Action
                </button>
                <button onClick={() => setSelectedRecommendation(null)} className="w-full bg-gray-100 text-gray-700 font-medium py-4 rounded-2xl transition-colors">
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};