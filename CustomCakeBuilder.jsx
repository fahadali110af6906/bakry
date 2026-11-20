import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CAKE_CUSTOMIZER_OPTIONS } from '../../data/mockData';
import {
  X,
  Cake,
  Check,
  ShoppingBag
} from 'lucide-react';

export const CustomCakeBuilder = () => {
  const {
    activeModal,
    setActiveModal,
    addToCart
  } = useBakery();

  const [selectedTier, setSelectedTier] = useState(CAKE_CUSTOMIZER_OPTIONS.tiers[1]);
  const [selectedSponge, setSelectedSponge] = useState(CAKE_CUSTOMIZER_OPTIONS.spongeFlavors[1]);
  const [selectedFilling, setSelectedFilling] = useState(CAKE_CUSTOMIZER_OPTIONS.fillings[0]);
  const [selectedFinish, setSelectedFinish] = useState(CAKE_CUSTOMIZER_OPTIONS.finishes[0]);
  const [selectedToppings, setSelectedToppings] = useState(['gold-leaf', 'macarons']);
  const [inscription, setInscription] = useState('Happy Celebration!');
  const [occasion, setOccasion] = useState('Birthday Celebration');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (activeModal !== 'customCake') return null;

  const basePrice = selectedTier.price;
  const spongePrice = selectedSponge.price || 0;
  const fillingPrice = selectedFilling.price || 0;
  const finishPrice = selectedFinish.price || 0;
  const toppingsPrice = selectedToppings.reduce((sum, topId) => {
    const topping = CAKE_CUSTOMIZER_OPTIONS.toppings.find((t) => t.id === topId);
    return sum + (topping ? topping.price : 0);
  }, 0);

  const totalPrice = basePrice + spongePrice + fillingPrice + finishPrice + toppingsPrice;

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleAddCakeToCart = () => {
    const customCakeProduct = {
      id: `custom-cake-${Date.now()}`,
      name: `Couture ${selectedTier.name.split('(')[0]} Cake`,
      category: 'cakes',
      price: totalPrice,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      description: `Custom ${selectedTier.name} with ${selectedSponge.name} & ${selectedFilling.name}. Inscription: "${inscription}"`,
    };

    const customDetails = {
      tier: selectedTier.name,
      sponge: selectedSponge.name,
      filling: selectedFilling.name,
      finish: selectedFinish.name,
      toppings: selectedToppings.map(id => CAKE_CUSTOMIZER_OPTIONS.toppings.find(t => t.id === id)?.name).filter(Boolean),
      inscription,
      occasion,
      specialInstructions
    };

    addToCart(customCakeProduct, 1, customDetails);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6 max-h-[92vh] flex flex-col">
        
        <div className="p-6 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-md">
              <Cake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Interactive Custom Cake Studio
              </h2>
              <p className="text-xs text-stone-500">
                Design your bespoke multi-tier celebration cake with our pastry chefs
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-stone-200">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                  <span>Select Size & Tier Architecture</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAKE_CUSTOMIZER_OPTIONS.tiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTier(tier)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/30'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2 right-2 bg-amber-500 text-stone-950 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full shadow">
                          Popular
                        </span>
                      )}
                      <strong className="block text-xs font-bold text-stone-900">{tier.name.split('(')[0]}</strong>
                      <span className="text-[11px] text-stone-500 block leading-tight mt-0.5">({tier.name.split('(')[1]}</span>
                      <span className="text-xs font-bold text-amber-700 mt-2 block font-serif">${tier.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">2</span>
                <span>Artisan Sponge Base Flavor</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CAKE_CUSTOMIZER_OPTIONS.spongeFlavors.map((sponge) => {
                  const isSelected = selectedSponge.id === sponge.id;
                  return (
                    <button
                      key={sponge.id}
                      type="button"
                      onClick={() => setSelectedSponge(sponge)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/30'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-stone-300 shrink-0 mt-0.5 shadow-inner"
                        style={{ backgroundColor: sponge.color }}
                      />
                      <div>
                        <strong className="block text-xs font-bold text-stone-900 leading-tight">{sponge.name}</strong>
                        <span className="text-[10px] text-stone-500 block">{sponge.desc}</span>
                        {sponge.price > 0 && (
                          <span className="text-[10px] font-bold text-amber-700">+${sponge.price.toFixed(2)}</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">3</span>
                <span>Interior Filling & Ganache</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAKE_CUSTOMIZER_OPTIONS.fillings.map((filling) => {
                  const isSelected = selectedFilling.id === filling.id;
                  return (
                    <button
                      key={filling.id}
                      type="button"
                      onClick={() => setSelectedFilling(filling)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/30'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <strong className="text-xs font-bold text-stone-900">{filling.name}</strong>
                        {filling.price > 0 && (
                          <span className="text-[10px] font-bold text-amber-700 shrink-0 ml-1">+${filling.price.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{filling.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">4</span>
                <span>Exterior Buttercream Finish</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAKE_CUSTOMIZER_OPTIONS.finishes.map((finish) => {
                  const isSelected = selectedFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/30'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <strong className="text-xs font-bold text-stone-900">{finish.name}</strong>
                        {finish.price > 0 && (
                          <span className="text-[10px] font-bold text-amber-700 shrink-0 ml-1">+${finish.price.toFixed(2)}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{finish.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">5</span>
                <span>Luxury Accents & Garnishes (Select Multiple)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CAKE_CUSTOMIZER_OPTIONS.toppings.map((topping) => {
                  const isSelected = selectedToppings.includes(topping.id);
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => toggleTopping(topping.id)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/70 text-stone-900 font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{topping.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-700">+${topping.price.toFixed(2)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">6</span>
                <span>Piped Inscription on Cake Plaque</span>
              </label>

              <div className="space-y-2">
                <input
                  type="text"
                  maxLength={40}
                  placeholder="e.g. Happy 30th Birthday Sophie!"
                  value={inscription}
                  onChange={(e) => setInscription(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 text-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Piped in edible Valrhona dark chocolate or gold lettering</span>
                  <span>{inscription.length} / 40 chars</span>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 text-white flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest block">Live Render</span>
                  <h3 className="font-serif text-lg font-bold text-white">Your Bespoke Creation</h3>
                </div>
                <span className="bg-amber-950 text-amber-300 text-xs px-2.5 py-1 rounded-full border border-amber-800/80 font-bold">
                  {selectedTier.name.split('(')[0]}
                </span>
              </div>

              <div className="relative bg-stone-900/90 rounded-3xl p-6 border border-stone-800 text-center flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />

                <div className="space-y-1.5 flex flex-col items-center my-2">
                  <div className="flex items-center gap-1 text-xs mb-1">
                    {selectedToppings.includes('gold-leaf') && <span title="24k Gold">✨</span>}
                    {selectedToppings.includes('fresh-berries') && <span title="Fresh Berries">🍓</span>}
                    {selectedToppings.includes('macarons') && <span title="French Macaron">🧁</span>}
                    {selectedToppings.includes('pressed-flowers') && <span title="Flowers">🌸</span>}
                  </div>

                  {selectedTier.id === '3-tier' && (
                    <div
                      className="w-20 h-9 rounded-t-xl shadow-md border border-white/20 flex items-center justify-center text-[10px] font-bold transition-all duration-500"
                      style={{ backgroundColor: selectedSponge.color, color: selectedSponge.id === 'dark-choc' ? '#fff' : '#333' }}
                    >
                      Top Tier
                    </div>
                  )}

                  {(selectedTier.id === '2-tier' || selectedTier.id === '3-tier') && (
                    <div
                      className="w-32 h-11 rounded-t-xl shadow-md border border-white/20 flex items-center justify-center text-xs font-bold transition-all duration-500"
                      style={{ backgroundColor: selectedSponge.color, color: selectedSponge.id === 'dark-choc' ? '#fff' : '#333' }}
                    >
                      Mid Tier
                    </div>
                  )}

                  <div
                    className="w-48 h-14 rounded-t-2xl shadow-lg border border-white/20 flex items-center justify-center text-xs font-bold transition-all duration-500"
                    style={{ backgroundColor: selectedSponge.color, color: selectedSponge.id === 'dark-choc' ? '#fff' : '#333' }}
                  >
                    Base Tier
                  </div>

                  <div className="w-56 h-3.5 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 rounded-full shadow-lg" />
                </div>

                {inscription && (
                  <div className="mt-3 bg-stone-950/80 px-4 py-1.5 rounded-full border border-amber-500/40 text-amber-200 text-xs italic font-serif max-w-xs truncate">
                    "{inscription}"
                  </div>
                )}
              </div>

              <div className="space-y-2 text-xs text-stone-300 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <div className="flex justify-between">
                  <span className="text-stone-400">Sponge:</span>
                  <span className="font-semibold text-white">{selectedSponge.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Filling:</span>
                  <span className="font-semibold text-white">{selectedFilling.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Finish:</span>
                  <span className="font-semibold text-white">{selectedFinish.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Garnishes:</span>
                  <span className="font-semibold text-amber-300">
                    {selectedToppings.length > 0 ? `${selectedToppings.length} luxury toppings selected` : 'Classic'}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-stone-800 space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-stone-400 text-xs block">Estimated Artisan Total</span>
                  <span className="text-[11px] text-amber-400">Includes decorative box & ribbon</span>
                </div>
                <div className="font-serif text-3xl font-bold text-amber-300">
                  ${totalPrice.toFixed(2)}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddCakeToCart}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold py-4 rounded-2xl text-sm shadow-luxury transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Custom Cake to Bag • ${totalPrice.toFixed(2)}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
