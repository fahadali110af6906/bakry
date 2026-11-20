import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import confetti from 'canvas-confetti';
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const CheckoutModal = () => {
  const {
    activeModal,
    setActiveModal,
    cart,
    cartSubtotal,
    discountAmount,
    calculatedDeliveryFee,
    calculatedTax,
    cartTotal,
    deliveryType,
    deliverySlot,
    placeOrder
  } = useBakery();

  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@gmail.com',
    phone: '+1 (555) 234-8921',
    address: '742 Evergreen Terrace, Apt 4B, San Francisco, CA',
    paymentMethod: 'Credit Card',
    cardNumber: '4821 •••• •••• 9920',
    cardExp: '09/28',
    cardCvv: '482',
    notes: 'Please package pastries in signature gold-ribbon gift boxes.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (activeModal !== 'checkout') return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D97706', '#B25D2B', '#F59E0B', '#FBBF24', '#773822']
        });
      } catch (err) {}

      placeOrder(formData);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6 max-h-[92vh] flex flex-col">
        
        <div className="p-5 sm:p-6 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Artisan Checkout
              </h2>
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-Bit Encrypted Secure Patisserie Order</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-stone-200">
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">1</span>
                <span>Customer Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">Email (for receipt)</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-stone-600 block mb-1">Phone (for dispatch SMS)</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">2</span>
                <span>{deliveryType === 'delivery' ? 'Delivery Address & Slot' : 'Bakery Pickup Verification'}</span>
              </h3>

              {deliveryType === 'delivery' ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-stone-600 block mb-1">Street Address, Apt / Suite</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-xs flex items-center gap-2 text-amber-900">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Scheduled Slot: <strong>{deliverySlot}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs space-y-1 text-stone-700">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <span>Pickup Counter: Le Petit Délice Flagship Atelier</span>
                  </div>
                  <p className="text-stone-500">42 Boulevard de la Rose, San Francisco • Ready at selected slot: {deliverySlot}</p>
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-stone-600 block mb-1">Special Chef & Delivery Notes</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Gate code, gift packaging requests, allergy reminders..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl focus:ring-1 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center text-[10px]">3</span>
                <span>Payment Method</span>
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Credit Card' })}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    formData.paymentMethod === 'Credit Card'
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/30'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-bold text-stone-800">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Apple / Google Pay' })}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    formData.paymentMethod === 'Apple / Google Pay'
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/30'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-stone-800" />
                  <span className="text-xs font-bold text-stone-800">Digital Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery' })}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    formData.paymentMethod === 'Cash on Delivery'
                      ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/30'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <Banknote className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-stone-800">Pay on Delivery</span>
                </button>
              </div>

              {formData.paymentMethod === 'Credit Card' && (
                <div className="space-y-2.5 bg-white p-3.5 rounded-2xl border border-stone-200 mt-2">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">Expires</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-500 block mb-1">CVC / CVV</label>
                      <input
                        type="password"
                        name="cardCvv"
                        maxLength={4}
                        value={formData.cardCvv}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 bg-stone-900 text-stone-200 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h3 className="font-serif text-lg font-bold text-white">Order Summary</h3>
                <span className="text-xs text-amber-400 font-medium">Baking freshly for your order</span>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.uniqueCartId} className="flex justify-between items-start text-xs border-b border-stone-800/60 pb-2">
                    <div>
                      <span className="text-white font-medium block">{item.name}</span>
                      <span className="text-stone-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</span>
                    </div>
                    <span className="text-amber-200 font-semibold font-serif">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-950/70 border border-amber-700/60 p-3 rounded-2xl text-xs text-amber-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You will earn <strong>+{Math.floor(cartTotal)} Loyalty Points</strong> on this order!</span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Artisan Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-stone-200">{calculatedDeliveryFee === 0 ? 'FREE' : `$${calculatedDeliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax</span>
                  <span className="text-stone-200">${calculatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white border-t border-stone-700 pt-2 font-serif">
                  <span>Grand Total</span>
                  <span className="text-amber-400 text-lg">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black py-4 rounded-2xl text-sm shadow-luxury transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Oven Slot...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Authorize Order • ${cartTotal.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
