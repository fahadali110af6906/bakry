import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  ShoppingBag,
  Sparkles,
  Cake,
  CalendarCheck,
  Award,
  Search,
  Store,
  ShieldCheck,
  Menu,
  X,
  PhoneCall,
  Clock
} from 'lucide-react';

export const Navbar = ({ onSearchChange, searchQuery }) => {
  const {
    bakeryInfo,
    persona,
    setPersona,
    cartItemCount,
    setCartOpen,
    setActiveModal,
    loyaltyPoints
  } = useBakery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-950 via-bakery-900 to-amber-950 text-amber-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Free Artisan Delivery over $45 • Use code <strong className="text-amber-300 tracking-wider">WELCOME10</strong></span>
            </span>
            <span className="hidden md:inline text-amber-400/40">|</span>
            <span className="hidden md:flex items-center gap-1 text-amber-200/80">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Fresh stone-hearth bake every morning at 5:00 AM</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:flex items-center gap-1 text-amber-200/80">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>{bakeryInfo.phone}</span>
            </span>

            {/* Quick Persona Switcher Top Banner Button */}
            <div className="flex items-center bg-amber-900/80 rounded-full p-0.5 border border-amber-700/60 text-xs">
              <button
                onClick={() => setPersona('customer')}
                className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                  persona === 'customer'
                    ? 'bg-amber-500 text-amber-950 font-bold shadow'
                    : 'text-amber-200 hover:text-white'
                }`}
                title="Customer Storefront & Ordering"
              >
                <Store className="w-3 h-3" />
                <span>Customer</span>
              </button>
              <button
                onClick={() => setPersona('admin')}
                className={`px-2.5 py-0.5 rounded-full transition-all flex items-center gap-1 ${
                  persona === 'admin'
                    ? 'bg-amber-400 text-stone-950 font-bold shadow'
                    : 'text-amber-200 hover:text-white'
                }`}
                title="Business Owner / Kitchen Management Console"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Owner Admin</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPersona('customer')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-bakery-600 via-amber-600 to-amber-800 flex items-center justify-center text-white shadow-luxury font-serif text-2xl font-bold tracking-tight">
              🥖
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 block leading-tight">
                {bakeryInfo.name}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-bakery-600 font-semibold block">
                {bakeryInfo.tagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-700">
            <a href="#menu" className="hover:text-bakery-600 transition-colors py-2">
              Artisan Menu
            </a>
            <button
              onClick={() => setActiveModal('customCake')}
              className="flex items-center gap-1.5 text-stone-700 hover:text-bakery-600 transition-colors py-2"
            >
              <Cake className="w-4 h-4 text-amber-600" />
              <span>Custom Cake Studio</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">Interactive</span>
            </button>
            <button
              onClick={() => setActiveModal('reservation')}
              className="flex items-center gap-1 text-stone-700 hover:text-bakery-600 transition-colors py-2"
            >
              <CalendarCheck className="w-4 h-4 text-stone-500" />
              <span>Tasting & Catering</span>
            </button>
            <a href="#reviews" className="hover:text-bakery-600 transition-colors py-2">
              Reviews
            </a>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-44 md:w-56">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search croissants, tarts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/80 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 transition-all placeholder:text-stone-400"
              />
            </div>

            <button
              onClick={() => setActiveModal('loyalty')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-full text-xs font-semibold text-amber-900 transition-all"
              title="View VIP Club & Loyalty Rewards"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>{loyaltyPoints} Pts</span>
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-stone-900 hover:bg-bakery-800 text-white px-4 py-2.5 rounded-full transition-all shadow-sm font-medium text-sm"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline font-semibold">Bag</span>
              {cartItemCount > 0 && (
                <span className="bg-amber-500 text-stone-950 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200/60 flex flex-col gap-3 text-sm">
            <div className="relative mb-2">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search bakery menu..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-200 rounded-xl focus:outline-none"
              />
            </div>
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-amber-50 font-medium text-stone-800"
            >
              🥐 Browse Artisan Menu
            </a>
            <button
              onClick={() => {
                setActiveModal('customCake');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 font-medium text-stone-800 text-left"
            >
              <Cake className="w-4 h-4 text-amber-600" />
              <span>Interactive Custom Cake Studio</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('reservation');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 font-medium text-stone-800 text-left"
            >
              <CalendarCheck className="w-4 h-4 text-stone-600" />
              <span>Book Table / Event Catering</span>
            </button>
            <button
              onClick={() => {
                setActiveModal('loyalty');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 font-medium text-stone-800 text-left"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>VIP Loyalty Rewards ({loyaltyPoints} Points)</span>
            </button>
            <div className="pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setPersona(persona === 'customer' ? 'admin' : 'customer');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 bg-stone-900 text-amber-300 font-bold rounded-xl text-center flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Switch to {persona === 'customer' ? 'Business Owner Admin Suite' : 'Customer Storefront'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
