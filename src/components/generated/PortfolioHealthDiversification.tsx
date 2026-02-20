import React from 'react';
import { motion } from 'framer-motion';
import { DiversificationChart, AssetAllocation } from './DiversificationChart';
import { RiskIndicator } from './RiskIndicator';
import { BottomNavigation } from './BottomNavigation';
import { ChevronLeft, MapPin, Building2, Layers, TrendingUp } from 'lucide-react';
type PortfolioHealthDiversificationProps = {
  onBack?: () => void;
};
export const PortfolioHealthDiversification = ({
  onBack
}: PortfolioHealthDiversificationProps) => {
  const assetAllocations: AssetAllocation[] = [{
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
  const sectorAllocations: AssetAllocation[] = [{
    name: 'Technology',
    percentage: 38.2,
    value: '€58,168',
    color: '#00b8d9',
    icon: '💻'
  }, {
    name: 'Broad Market',
    percentage: 24.3,
    value: '€37,002',
    color: '#3b82f6',
    icon: '📈'
  }, {
    name: 'Digital Assets',
    percentage: 16.4,
    value: '€24,973',
    color: '#f59e0b',
    icon: '₿'
  }, {
    name: 'Commodities',
    percentage: 10.8,
    value: '€16,445',
    color: '#10b981',
    icon: '🥇'
  }, {
    name: 'Fixed Income',
    percentage: 7.2,
    value: '€10,964',
    color: '#6366f1',
    icon: '🏛️'
  }, {
    name: 'Cash',
    percentage: 3.1,
    value: '€4,720',
    color: '#8b5cf6',
    icon: '💶'
  }];
  const geographicRisk: AssetAllocation[] = [{
    name: 'United States',
    percentage: 53.2,
    value: '€81,009',
    color: '#3b82f6',
    icon: '🇺🇸'
  }, {
    name: 'Global',
    percentage: 30.3,
    value: '€46,138',
    color: '#f59e0b',
    icon: '🌍'
  }, {
    name: 'Europe',
    percentage: 13.4,
    value: '€20,405',
    color: '#00b8d9',
    icon: '🇪🇺'
  }, {
    name: 'Cash',
    percentage: 3.1,
    value: '€4,720',
    color: '#6b7280',
    icon: '💶'
  }];
  return <div className="h-full w-full bg-white text-gray-900 flex flex-col">
      {/* Safe area / notch spacer */}
      <div className="flex-shrink-0 bg-white h-8" />

      {/* Header */}
      <header className="flex-shrink-0 bg-white/95 backdrop-blur-lg py-4 px-4 border-b border-gray-100 z-10">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-500" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Diversification</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pb-24 pt-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Overview Card */}
        <motion.div initial={{
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
                <Layers className="w-6 h-6 text-[#00b8d9]" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-gray-900 font-semibold text-base mb-1">Good Diversification</h2>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Your portfolio spans 6 asset classes across stocks, ETFs, crypto, commodities, bonds and cash. Technology concentration at 38% is worth monitoring.
                </p>
              </div>
            </div>
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
        delay: 0.1
      }} className="mb-6">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2">
            By Asset Type
          </h2>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <DiversificationChart allocations={assetAllocations} />
          </div>
        </motion.div>

        {/* Sector Allocation */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="mb-6">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            By Sector
          </h2>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-3">
                Technology dominates at 38%. Consider adding Healthcare or Financials exposure for better sector balance.
              </p>
            </div>
            <DiversificationChart allocations={sectorAllocations} />
          </div>
        </motion.div>

        {/* Geographic Risk */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.3
      }} className="mb-6">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Geographic Exposure
          </h2>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div className="mb-4">
              <p className="text-gray-400 text-xs mb-3">
                Over half your portfolio is US-focused. European or Emerging Market ETFs could reduce geographic concentration.
              </p>
            </div>
            <DiversificationChart allocations={geographicRisk} />
          </div>
        </motion.div>

        {/* Risk Breakdown */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.4
      }} className="mb-6">
          <h2 className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Risk Exposure
          </h2>
          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-5">
            <RiskIndicator level="medium" percentage={38.2} label="Sector Concentration" description="Technology is 38% of portfolio" />
            <RiskIndicator level="medium" percentage={35} label="Volatility Risk" description="Crypto & individual stocks add volatility" />
            <RiskIndicator level="low" percentage={12} label="Liquidity Risk" description="All holdings are easily tradeable" />
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.5
      }}>
          <button className="w-full text-white font-semibold py-4 rounded-2xl transition-colors" style={{
          backgroundColor: '#00b8d9'
        }}>
            Rebalance Portfolio
          </button>
        </motion.div>
      </div>

      <BottomNavigation />
    </div>;
};