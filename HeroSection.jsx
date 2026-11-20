import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  Sparkles,
  Cake,
  ShoppingBag,
  Calendar,
  Award,
  Flame,
  Wheat,
  ShieldCheck
} from 'lucide-react';

export const HeroSection = () => {
  const { bakeryInfo, setActiveModal, setPersona } = useBakery();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7EFE5] via-[#FAF7F2] to-[#FAF7F2] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-900/5">
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-100/90 border border-amber-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-900 shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Morning Stone Hearth Bake Active • Over {bakeryInfo.todaysBakeCount} Loaves Handcrafted Today</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.12]">
              Artisanal Devotion in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-bakery-600 to-amber-900 italic font-normal">
                Every Golden Crumb
              </span>
            </h1>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong className="text-stone-900 font-semibold">{bakeryInfo.name}</strong>. 
              We blend 48-hour slow sourdough fermentation with pure French AOP butter to create uncompromised breads, morning pastries, and couture celebration cakes.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#menu"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-bakery-700 hover:from-amber-700 hover:to-bakery-800 text-white font-bold px-6 py-3.5 rounded-2xl shadow-luxury transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Fresh Menu</span>
              </a>

              <button
                onClick={() => setActiveModal('customCake')}
                className="flex items-center gap-2 bg-white hover:bg-amber-50 text-stone-900 font-bold px-5 py-3.5 rounded-2xl border border-amber-900/15 shadow-sm transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Cake className="w-4 h-4 text-amber-600" />
                <span>Custom Cake Studio</span>
              </button>

              <button
                onClick={() => setActiveModal('reservation')}
                className="flex items-center gap-2 bg-amber-50/60 hover:bg-amber-100/80 text-amber-900 font-semibold px-4 py-3.5 rounded-2xl border border-amber-200 transition-all text-sm"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                <span>Book Tasting Table</span>
              </button>
            </div>

            <div className="pt-3 flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-500">
              <span>Are you the bakery owner or kitchen manager?</span>
              <button
                onClick={() => setPersona('admin')}
                className="text-amber-700 hover:text-amber-800 font-bold underline flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Access Business Suite</span>
              </button>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-3xl overflow-hidden shadow-luxury-lg border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
                  alt="Artisanal French Pastries"
                  className="w-full h-80 sm:h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chef's Morning Reserve</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold">
                    Pistachio Raspberry Tartlet & Pure Butter Croissants
                  </h3>
                  <p className="text-stone-300 text-xs mt-1">
                    Baked fresh with 84% AOP French butter & Sicilian pistachios.
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-luxury border border-amber-100 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <Wheat className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-stone-500 block uppercase">Tradition</span>
                  <span className="text-xs font-bold text-stone-900 block">48hr Wild Ferment</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-luxury border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-amber-500">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                  <span className="text-xs font-bold text-stone-900 block">4.9 / 5.0 (800+ Reviews)</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-amber-900/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              🌾
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Organic Stoneground</h4>
              <p className="text-[11px] text-stone-500">Zero artificial additives</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              🧈
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">84% AOP French Butter</h4>
              <p className="text-[11px] text-stone-500">27 delicate laminated layers</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              🔥
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Stone Hearth Baked</h4>
              <p className="text-[11px] text-stone-500">Crisp, caramelized crusts</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-stone-200/60 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              🚚
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-900">Express Local Delivery</h4>
              <p className="text-[11px] text-stone-500">Warm & fresh to your door</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
