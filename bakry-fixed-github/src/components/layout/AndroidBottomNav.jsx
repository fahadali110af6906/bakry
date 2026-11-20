import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShoppingBag,
  Cake,
  Croissant,
  Clock,
  ShieldCheck,
  Store
} from 'lucide-react';

export const AndroidBottomNav = () => {
  const {
    persona,
    setPersona,
    cartItemCount,
    setCartOpen,
    setActiveModal,
    orders
  } = useBakery();

  const handleTrackOrder = () => {
    if (orders.length > 0) {
      setActiveModal('orderTracker');
    } else {
      setCartOpen(true);
    }
  };

  const isOwner = persona === 'admin';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 shadow-2xl safe-area-bottom">
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        
        <button
          onClick={() => {
            setPersona('customer');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            !isOwner
              ? 'text-amber-700 font-bold'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <div className={`p-1 rounded-full ${!isOwner ? 'bg-amber-100 dark:bg-amber-950 text-amber-700' : ''}`}>
            <Croissant className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Menu</span>
        </button>

        <button
          onClick={() => setActiveModal('customCake')}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-stone-500 dark:text-stone-400 hover:text-amber-600 transition-all"
        >
          <div className="p-1 rounded-full">
            <Cake className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Custom Cake</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-stone-500 dark:text-stone-400 hover:text-amber-600 transition-all"
        >
          <div className="p-1 rounded-full relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-amber-500 text-stone-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">My Bag</span>
        </button>

        <button
          onClick={handleTrackOrder}
          className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-stone-500 dark:text-stone-400 hover:text-amber-600 transition-all"
        >
          <div className="p-1 rounded-full">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Tracker</span>
        </button>

        <button
          onClick={() => setPersona(isOwner ? 'customer' : 'admin')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            isOwner
              ? 'text-amber-400 font-bold'
              : 'text-stone-500 dark:text-stone-400 hover:text-amber-600'
          }`}
        >
          <div className={`p-1 rounded-full ${isOwner ? 'bg-amber-400 text-stone-950 shadow-md' : ''}`}>
            {isOwner ? <Store className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
          </div>
          <span className="text-[10px] tracking-tight">{isOwner ? 'Store View' : 'Owner App'}</span>
        </button>

      </div>

      <div className="w-32 h-1 bg-stone-300 dark:bg-stone-700 rounded-full mx-auto my-1.5" />
    </nav>
  );
};
