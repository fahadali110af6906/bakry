import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

export const AndroidStatusBar = ({ isDark = false }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full px-6 py-2 flex items-center justify-between text-xs font-semibold select-none z-50 transition-colors ${
      isDark ? 'bg-stone-950 text-stone-200' : 'bg-[#FAF7F2] text-stone-800'
    }`}>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[13px] font-bold tracking-tight">{time || '10:42'}</span>
        <span className="text-[10px] opacity-70">🥐</span>
      </div>

      <div className="w-3.5 h-3.5 rounded-full bg-stone-900 border border-stone-700/50 shadow-inner flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
      </div>

      <div className="flex items-center gap-2 text-xs opacity-90">
        <span className="text-[10px] font-bold tracking-tighter">5G</span>
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px] font-bold">98%</span>
          <BatteryMedium className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
};
