import React, { useState } from 'react';
import { AndroidStatusBar } from './AndroidStatusBar';
import { AndroidBottomNav } from './AndroidBottomNav';
import { Smartphone, Monitor, Store, ShieldCheck, RefreshCw } from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

export const AndroidFrameWrapper = ({ children }) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState(false);
  const { persona, setPersona, resetToDemoDefaults } = useBakery();

  const isDark = persona === 'admin';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-stone-100' : 'bg-[#FAF7F2] text-stone-800'
    }`}>
      
      {/* Top Device Simulator Controller Bar (visible on desktop screens) */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2 bg-stone-900 border-b border-stone-800 text-xs text-stone-300 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <Smartphone className="w-4 h-4" />
            <span>Android Bakery Mobile App Suite</span>
          </div>
          <span className="text-stone-600">|</span>
          <span className="text-stone-400">Optimized for Android Smartphones & Tablets</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-stone-950 rounded-xl p-1 border border-stone-800">
            <button
              onClick={() => setPersona('customer')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                persona === 'customer'
                  ? 'bg-amber-600 text-stone-950 shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Customer App</span>
            </button>
            <button
              onClick={() => setPersona('admin')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                persona === 'admin'
                  ? 'bg-amber-400 text-stone-950 shadow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Admin App</span>
            </button>
          </div>

          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 border transition-all ${
              deviceFrameMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
            title="Toggle Android Device Frame Simulation"
          >
            {deviceFrameMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{deviceFrameMode ? 'Full Screen View' : 'Android Frame View'}</span>
          </button>

          <button
            onClick={resetToDemoDefaults}
            className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200"
            title="Reset Demo Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {deviceFrameMode ? (
        <div className="py-10 px-4 flex items-center justify-center bg-stone-900/90 min-h-[calc(100vh-45px)]">
          <div className="w-full max-w-[430px] h-[890px] bg-[#FAF7F2] rounded-[48px] shadow-[0_0_60px_rgba(0,0,0,0.8)] border-[10px] border-stone-800 relative overflow-hidden flex flex-col">
            <AndroidStatusBar isDark={isDark} />
            <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
              {children}
            </div>
            <AndroidBottomNav />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen pb-16">
          <AndroidStatusBar isDark={isDark} />
          <div className="flex-1">
            {children}
          </div>
          <AndroidBottomNav />
        </div>
      )}

    </div>
  );
};
