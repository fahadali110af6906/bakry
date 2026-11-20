import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Store,
  Tag,
  Clock
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    bakeryInfo,
    cart,
    cartOpen,
    setCartOpen,
    cartSubtotal,
    cartItemCount,
    discountAmount,
    calculatedDeliveryFee,
    calculatedTax,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    deliveryType,
    setDeliveryType,
    deliverySlot,
    setDeliverySlot,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setActiveModal
  } = useBakery();

  const [promoInput, setPromoInput] = useState('');

  if (!cartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    if (applyPromoCode(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setCartOpen(false);
    setActiveModal('checkout');
  };

  const freeThreshold = bakeryInfo.freeDeliveryThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / freeThreshold) * 100);
  const remainingForFree = Math.max(0, freeThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="flex-1" onClick={() => setCartOpen(false)} />

      <div className="w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl border-l border-stone-200 flex flex-col justify-between overflow-hidden">
        
        <div className="p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-sm">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                Your Artisan Bag
              </h2>
              <span className="text-xs text-stone-500">{cartItemCount} items selected</span>
            </div>
          </div>

          <button
            onClick={() => setCartOpen(false)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-amber-50/80 px-5 py-3 border-b border-amber-200/60">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-950 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-amber-700" />
              {cartSubtotal >= freeThreshold ? (
                <strong className="text-emerald-700">🎉 You've unlocked Free Artisan Delivery!</strong>
              ) : (
                <span>Add <strong>${remainingForFree.toFixed(2)}</strong> more for <strong>Free Delivery</strong></span>
              )}
            </span>
            <span className="text-[11px] text-amber-800 font-bold">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-amber-200/70 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                🥐
              </div>
              <h3 className="font-serif text-lg font-bold text-stone-900">Your bag is currently empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our fresh croissants, stoneground sourdoughs, and artisan pastries to start your order.
              </p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-4 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 shadow-sm"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.uniqueCartId}
                className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-sm flex gap-3.5 items-center justify-between"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80";
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-bold text-stone-900 truncate">
                    {item.name}
                  </h4>

                  {item.isCustomCake && item.customDetails && (
                    <div className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 my-1 truncate">
                      ✨ {item.customDetails.sponge} • {item.customDetails.finish}
                    </div>
                  )}

                  <span className="text-xs font-bold text-amber-700 block">
                    ${item.price.toFixed(2)} each
                  </span>

                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.uniqueCartId, item.quantity - 1)}
                        className="p-1 text-stone-500 hover:text-stone-800"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-800 px-2">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.uniqueCartId, item.quantity + 1)}
                        className="p-1 text-stone-500 hover:text-stone-800"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.uniqueCartId)}
                      className="text-stone-400 hover:text-rose-600 p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif text-sm font-bold text-stone-900 block">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-200/80 bg-white space-y-4">
            
            <div className="grid grid-cols-2 gap-2 bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>Express Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-amber-600" />
                <span>Store Pickup (Free)</span>
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Select Dispatch Slot:</span>
              </label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="Today, 11:00 AM - 01:00 PM">Today, 11:00 AM - 01:00 PM (Lunch)</option>
                <option value="Today, 02:00 PM - 04:00 PM">Today, 02:00 PM - 04:00 PM (Afternoon Tea)</option>
                <option value="Today, 05:00 PM - 07:00 PM">Today, 05:00 PM - 07:00 PM (Evening)</option>
                <option value="Tomorrow Morning, 07:30 AM - 09:30 AM">Tomorrow Morning, 07:30 AM - 09:30 AM (Breakfast)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Promo <strong>{appliedPromo.code}</strong> applied (-${discountAmount.toFixed(2)})</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-emerald-700 hover:text-emerald-900 font-bold text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo code (e.g. WELCOME10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 text-xs uppercase px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </form>
              )}

              {!appliedPromo && (
                <div className="flex items-center gap-1 text-[10px] text-stone-500 overflow-x-auto">
                  <span>Try:</span>
                  <button onClick={() => applyPromoCode('WELCOME10')} className="underline hover:text-amber-700">WELCOME10</button>
                  <span>•</span>
                  <button onClick={() => applyPromoCode('GOLDEN15')} className="underline hover:text-amber-700">GOLDEN15</button>
                  <span>•</span>
                  <button onClick={() => applyPromoCode('FREESHIP')} className="underline hover:text-amber-700">FREESHIP</button>
                </div>
              )}
            </div>

            <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Artisan Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery ({deliveryType === 'pickup' ? 'Pickup' : 'Local Courier'})</span>
                <span className="font-semibold text-stone-900">
                  {calculatedDeliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${calculatedDeliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8.25%)</span>
                <span>${calculatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 border-t border-stone-200 pt-2 font-serif">
                <span>Total Amount</span>
                <span className="text-base text-amber-800">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-amber-600 to-bakery-700 hover:from-amber-700 hover:to-bakery-800 text-white font-bold py-3.5 rounded-2xl shadow-luxury transition-all flex items-center justify-center gap-2 text-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
