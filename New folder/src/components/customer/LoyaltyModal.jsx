import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  Award,
  Gift,
  Crown,
  Copy
} from 'lucide-react';

export const LoyaltyModal = () => {
  const {
    activeModal,
    setActiveModal,
    loyaltyPoints,
    showToast
  } = useBakery();

  if (activeModal !== 'loyalty') return null;

  const pointsValue = (loyaltyPoints * 0.05).toFixed(2);

  const tiers = [
    { name: 'Bronze Connoisseur', minPts: 0, perk: 'Complimentary morning espresso on every 5th visit' },
    { name: 'Silver Gourmet', minPts: 200, perk: '10% discount on all artisan breads & birthday treats' },
    { name: 'Gold Patissier VIP', minPts: 500, perk: 'Free priority delivery & private wedding cake tastings' },
  ];

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    showToast(`Reward code ${code} copied!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6">
        
        <div className="bg-gradient-to-br from-amber-700 via-amber-600 to-amber-900 text-white p-6 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-amber-200 text-[10px] font-bold uppercase tracking-widest block">VIP Patisserie Club</span>
                <h2 className="font-serif text-xl font-bold">Artisan Rewards</h2>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Rewards"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 bg-stone-950/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center justify-between">
            <div>
              <span className="text-stone-300 text-xs block">Your Available Balance</span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-serif text-3xl font-extrabold text-amber-300">{loyaltyPoints}</span>
                <span className="text-xs text-amber-200 font-semibold">Points</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-stone-300 text-xs block">Redemption Value</span>
              <span className="text-lg font-bold text-white font-serif">${pointsValue}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Available Member Coupons</span>
            </h3>

            <div className="space-y-2">
              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-stone-900 block">10% Off Welcome Treat</strong>
                  <span className="text-[11px] text-stone-500">Min spend $20</span>
                </div>
                <button
                  onClick={() => copyCode('WELCOME10')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>WELCOME10</span>
                </button>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm flex items-center justify-between">
                <div>
                  <strong className="text-xs font-bold text-stone-900 block">15% Off VIP Celebration</strong>
                  <span className="text-[11px] text-stone-500">Min spend $50</span>
                </div>
                <button
                  onClick={() => copyCode('GOLDEN15')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl text-xs font-bold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>GOLDEN15</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              VIP Tier Perks
            </h3>

            <div className="space-y-2">
              {tiers.map((t, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200 text-xs flex items-start gap-2.5">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900 font-bold block">{t.name} ({t.minPts}+ Pts)</strong>
                    <span className="text-stone-500 text-[11px]">{t.perk}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition-all"
          >
            Got it, Return to Bakery
          </button>

        </div>

      </div>
    </div>
  );
};
