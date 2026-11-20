import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Award,
  Sparkles,
  Send,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const Footer = () => {
  const { bakeryInfo, setPersona, resetToDemoDefaults, showToast } = useBakery();
  const [emailInput, setEmailInput] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!emailInput) return;
    showToast(`Merci! ${emailInput} has been enrolled in our Secret Tasting Club 🥐`, 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 flex items-center justify-center text-white text-xl font-serif">
                🥖
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                {bakeryInfo.name}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              {bakeryInfo.story}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>San Francisco Best Artisanal Bakery 2024 & 2025</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Oven Baking Hours</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {bakeryInfo.openingHours.map((item, idx) => (
                <li key={idx} className="flex justify-between text-stone-300 border-b border-stone-800/60 pb-1.5">
                  <span className="text-stone-400">{item.days}</span>
                  <span className="font-semibold text-amber-100">{item.hours}</span>
                </li>
              ))}
              <li className="pt-2 text-xs text-amber-300/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Express local delivery radius: {bakeryInfo.deliveryRadius}</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Patisserie Atelier</span>
            </h3>
            <div className="space-y-2 text-sm text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>{bakeryInfo.address}, {bakeryInfo.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{bakeryInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{bakeryInfo.email}</span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-amber-200">
              The Secret Tasting Club
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Receive notifications when special limited seasonal pastries and wedding cake slots open.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-stone-900 border border-stone-700 text-stone-200 text-xs px-3 py-2.5 rounded-l-xl focus:outline-none focus:border-amber-500 w-full"
                  required
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-3.5 py-2.5 rounded-r-xl transition-all flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[11px] text-stone-500 block">
                Zero spam. Only fresh, buttery updates.
              </span>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {bakeryInfo.name}. All rights reserved.</span>
            <span>•</span>
            <span>Crafted for Customers & Business Owners</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setPersona('admin')}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Launch Business Owner Console</span>
            </button>

            <button
              onClick={resetToDemoDefaults}
              className="text-stone-400 hover:text-stone-200 flex items-center gap-1 transition-colors"
              title="Restores original bakery products, orders, reviews and stock"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
