import { useState } from 'react';
import { Container, Theme } from './settings/types';
import { PortfolioHealthApp } from './components/generated/PortfolioHealthApp';

let theme: Theme = 'dark';
let container: Container = 'none';

function App() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  function setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  setTheme(theme);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 gap-8">
      {/* Mobile device shell */}
      <div
        className="relative overflow-hidden bg-white"
        style={{
          width: '390px',
          height: '844px',
          borderRadius: '48px',
          boxShadow: '0 0 0 10px #1a1a1a, 0 0 0 12px #333, 0 40px 80px rgba(0,0,0,0.35)',
          flexShrink: 0,
        }}
      >
        {/* Status bar notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a]"
          style={{
            width: '126px',
            height: '34px',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
        />
        {/* Scrollable content area */}
        <div className="absolute inset-0 overflow-hidden rounded-[48px]">
          <PortfolioHealthApp isSubscribed={isSubscribed} />
        </div>
      </div>

      {/* Subscription toggle — outside the phone frame */}
      <div className="flex flex-col items-center gap-4 select-none" style={{ flexShrink: 0 }}>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-64">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
            Preview Mode
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {isSubscribed ? 'Subscribed' : 'Free Plan'}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {isSubscribed
                  ? 'Full AI Optimizer access'
                  : '2 free recommendations'}
              </span>
            </div>

            <button
              onClick={() => setIsSubscribed(prev => !prev)}
              className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${
                isSubscribed ? 'bg-[#00b8d9]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isSubscribed ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className={`mt-4 pt-4 border-t border-gray-100 transition-opacity duration-300 ${isSubscribed ? 'opacity-100' : 'opacity-50'}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-400' : 'bg-gray-300'}`} />
              <span className="text-xs text-gray-600">AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-400' : 'bg-gray-300'}`} />
              <span className="text-xs text-gray-600">Auto-Rebalance Strategies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isSubscribed ? 'bg-emerald-400' : 'bg-gray-300'}`} />
              <span className="text-xs text-gray-600">Personalised Allocations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;