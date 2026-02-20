import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioHealthScore } from './PortfolioHealthScore';
import { HealthMetricCard } from './HealthMetricCard';
import { DiversificationChart, AssetAllocation } from './DiversificationChart';
import { BottomNavigation } from './BottomNavigation';
import { PortfolioValueSection } from './PortfolioValueSection';
import { PieChart, TrendingUp, Shield, AlertTriangle, ChevronLeft, Info } from 'lucide-react';
type PortfolioHealthOverviewProps = {
  onNavigateToDiversification?: () => void;
  onNavigateToRisk?: () => void;
  onNavigateToRecommendations?: () => void;
};
export const PortfolioHealthOverview = ({
  onNavigateToDiversification,
  onNavigateToRisk,
  onNavigateToRecommendations
}: PortfolioHealthOverviewProps) => {
  const [healthScore] = useState(76);
  const allocations: AssetAllocation[] = [{
    name: 'Stocks',
    percentage: 38.2,
    value: '€58,168',
    color: '#6b7280',
    icon: '📊',
    holdings: [
      { name: 'Apple', ticker: 'AAPL', value: '€32,480', percentage: 21.3 },
      { name: 'Tesla', ticker: 'TSLA', value: '€15,228', percentage: 10.0 },
      { name: 'NVIDIA', ticker: 'NVDA', value: '€10,460', percentage: 6.9 },
    ]
  }, {
    name: 'ETFs',
    percentage: 24.3,
    value: '€37,002',
    color: '#00b8d9',
    icon: '📈',
    holdings: [
      { name: 'S&P 500 ETF', value: '€22,841', percentage: 15.0 },
      { name: 'VHYL Dividend', value: '€8,389', percentage: 5.5 },
      { name: 'iShares MSCI World', value: '€5,772', percentage: 3.8 },
    ]
  }, {
    name: 'Crypto ETNs',
    percentage: 16.4,
    value: '€24,973',
    color: '#f59e0b',
    icon: '₿',
    holdings: [
      { name: 'Bitcoin ETN', value: '€19,217', percentage: 12.6 },
      { name: 'Ethereum ETN', value: '€5,756', percentage: 3.8 },
    ]
  }, {
    name: 'Commodities',
    percentage: 10.8,
    value: '€16,445',
    color: '#10b981',
    icon: '🥇',
    holdings: [
      { name: 'Gold ETC', value: '€10,668', percentage: 7.0 },
      { name: 'Silver ETC', value: '€3,808', percentage: 2.5 },
      { name: 'Oil ETC', value: '€1,969', percentage: 1.3 },
    ]
  }, {
    name: 'Bonds',
    percentage: 7.2,
    value: '€10,964',
    color: '#3b82f6',
    icon: '🏛️',
    holdings: [
      { name: 'iShares € Govt Bond', value: '€7,614', percentage: 5.0 },
      { name: 'Corporate Bond ETF', value: '€3,350', percentage: 2.2 },
    ]
  }, {
    name: 'Cash & Forex',
    percentage: 3.1,
    value: '€4,720',
    color: '#8b5cf6',
    icon: '💶',
    holdings: [
      { name: 'EUR Balance', value: '€3,197', percentage: 2.1 },
      { name: 'USD Balance', value: '€1,523', percentage: 1.0 },
    ]
  }];
  return <div className="flex flex-col h-full w-full bg-white text-gray-900">
      {/* Safe area / notch spacer — consistent across all screens */}
      <div className="flex-shrink-0 bg-white h-8" />

      {/* Header — fixed at top, never scrolls */}
      <header className="flex-shrink-0 bg-white/95 backdrop-blur-lg py-4 px-4 border-b border-gray-100 z-10" style={{
      borderTopWidth: "0px",
      borderRightWidth: "0px",
      borderBottomWidth: "0px",
      borderLeftWidth: "0px",
      borderStyle: "none",
      borderRadius: "0px"
    }}>
        <div className="flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Portfolio Health</h1>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Info className="w-6 h-6 text-gray-500" />
          </button>
        </div>
      </header>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="pb-28 space-y-6">

          {/* Portfolio Value + Chart */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4
        }}>
            <PortfolioValueSection />
            <div className="h-px bg-gray-100" style={{
            display: "none"
          }} />
          </motion.div>

          {/* Health Score Section */}
          <div className="px-4 space-y-6">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="type-eyebrow mb-4 px-1">
                Overall Health Score
              </h2>
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm" style={{
              borderTopWidth: "",
              borderTopColor: "",
              borderRightWidth: "",
              borderRightColor: "",
              borderBottomWidth: "",
              borderBottomColor: "",
              borderLeftWidth: "",
              borderLeftColor: "",
              borderStyle: "",
              borderRadius: "",
              paddingTop: "0px"
            }}>
                <div className="flex justify-center mb-0">
                  <PortfolioHealthScore score={healthScore} />
                </div>
                <div className="pt-3 mt-2">
                  <div className="space-y-0 divide-y divide-gray-100">
                    <button onClick={onNavigateToRecommendations} className="w-full py-4 hover:bg-gray-50 transition-colors flex items-center justify-between" style={{
                    borderTopWidth: "0px",
                    borderRightWidth: "0px",
                    borderBottomWidth: "0px",
                    borderLeftWidth: "0px",
                    borderStyle: "none",
                    borderRadius: "0px"
                  }}>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00b8d9]/10 rounded-xl p-2.5">
                          <TrendingUp className="w-5 h-5 text-[#00b8d9]" strokeWidth={2} />
                        </div>
                        <div className="text-left">
                          <p className="text-gray-900 font-medium text-sm">View Recommendations</p>
                          <p className="text-gray-400 text-xs">5 suggestions available</p>
                        </div>
                      </div>
                      <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                    </button>

                    <button className="w-full py-4 hover:bg-gray-50 transition-colors flex items-center justify-between" style={{
                    display: "none"
                  }}>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00b8d9]/10 rounded-xl p-2.5">
                          <PieChart className="w-5 h-5 text-[#00b8d9]" strokeWidth={2} />
                        </div>
                        <div className="text-left">
                          <p className="text-gray-900 font-medium text-sm">Rebalance Portfolio</p>
                          <p className="text-gray-400 text-xs">Optimize your allocation</p>
                        </div>
                      </div>
                      <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Metrics */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-1">
                Key Metrics
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <HealthMetricCard icon={PieChart} title="Diversification" value="Good" subtitle="6 classes, 13 holdings" status="good" onClick={onNavigateToDiversification} />
                <HealthMetricCard icon={AlertTriangle} title="Concentration" value="21.3%" subtitle="Apple is largest holding" status="warning" onClick={onNavigateToRisk} />
                <HealthMetricCard icon={TrendingUp} title="Volatility" value="Medium" subtitle="Hedged with bonds & commodities" status="good" onClick={onNavigateToRisk} />
                <HealthMetricCard icon={Shield} title="Stability" value="Good" subtitle="Diversified across 6 classes" status="good" onClick={onNavigateToRecommendations} />
              </div>
            </motion.div>

            {/* Asset Allocation */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  Asset Allocation
                </h2>
                <button onClick={onNavigateToDiversification} className="text-[#00b8d9] text-xs font-medium hover:text-[#0097b5] transition-colors">
                  View Details
                </button>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <DiversificationChart allocations={allocations} />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom Navigation — fixed at bottom, never scrolls */}
      <div className="flex-shrink-0 bg-white z-10">
        <BottomNavigation />
      </div>
    </div>;
};