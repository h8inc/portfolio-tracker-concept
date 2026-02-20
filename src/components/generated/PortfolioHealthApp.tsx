import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioHealthOverview } from './PortfolioHealthOverview';
import { PortfolioHealthDiversification } from './PortfolioHealthDiversification';
import { PortfolioHealthRecommendations } from './PortfolioHealthRecommendations';
type Screen = 'overview' | 'diversification' | 'recommendations';
type PortfolioHealthAppProps = {
  isSubscribed?: boolean;
};
export const PortfolioHealthApp = ({ isSubscribed = false }: PortfolioHealthAppProps) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('overview');
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };
  const [direction, setDirection] = useState(0);
  const navigateToScreen = (screen: Screen, dir: number = 1) => {
    setDirection(dir);
    setCurrentScreen(screen);
  };
  return <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {currentScreen === 'overview' && <motion.div key="overview" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
        x: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        }
      }} className="absolute inset-0 flex flex-col">
            <PortfolioHealthOverview onNavigateToDiversification={() => navigateToScreen('diversification', 1)} onNavigateToRecommendations={() => navigateToScreen('recommendations', 1)} />
          </motion.div>}

        {currentScreen === 'diversification' && <motion.div key="diversification" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
        x: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        }
      }} className="absolute inset-0 flex flex-col">
            <PortfolioHealthDiversification onBack={() => navigateToScreen('overview', -1)} />
          </motion.div>}

        {currentScreen === 'recommendations' && <motion.div key="recommendations" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{
        x: {
          type: 'spring',
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2
        }
      }} className="absolute inset-0 flex flex-col">
            <PortfolioHealthRecommendations onBack={() => navigateToScreen('overview', -1)} isSubscribed={isSubscribed} />
          </motion.div>}
      </AnimatePresence>
    </div>;
};