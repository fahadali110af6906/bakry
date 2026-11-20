import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  CheckCircle2,
  Clock,
  Truck,
  Store,
  ChefHat,
  Flame,
  Printer,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

export const OrderTrackerModal = () => {
  const {
    activeModal,
    setActiveModal,
    activeOrderForTracking,
    setReceiptOrder,
    setPersona
  } = useBakery();

  if (activeModal !== 'orderTracker' || !activeOrderForTracking) return null;

  const order = activeOrderForTracking;

  const getStepIcon = (index) => {
    switch (index) {
      case 0: return CheckCircle2;
      case 1: return Flame;
      case 2: return ChefHat;
      case 3: return PackageCheck;
      case 4: return order.orderType === 'Store Pickup' ? Store : Truck;
      default: return Clock;
    }
  };

  const handleOpenReceipt = () => {
    setReceiptOrder(order);
    setActiveModal('receipt');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative my-6">
        
        <div className="bg-gradient-to-r from-stone-900 via-bakery-950 to-stone-900 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-xl shadow-lg">
                🥐
              </div>
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Live Oven Tracker</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">Order #{order.id}</h2>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
              aria-label="Close Tracker"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-stone-800 text-xs text-stone-300">
            <div>
              <span className="text-stone-400 block">Fulfillment:</span>
              <strong className="text-amber-200 text-sm font-semibold">{order.orderType} • {order.deliverySlot}</strong>
            </div>
            <div className="text-right">
              <span className="text-stone-400 block">Total Billed:</span>
              <strong className="text-amber-400 text-sm font-serif font-bold">${order.total?.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">
            Kitchen & Delivery Progress
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            {order.trackingTimeline.map((step, idx) => {
              const Icon = getStepIcon(idx);
              const isCompleted = step.completed;
              const isCurrent = isCompleted && (!order.trackingTimeline[idx + 1] || !order.trackingTimeline[idx + 1].completed);

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 sm:-left-8 w-6 sm:w-8 h-6 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                        : 'bg-white border-stone-300 text-stone-400'
                    } ${isCurrent ? 'ring-4 ring-amber-400/30 animate-pulse' : ''}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>
                        {step.status}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {isCompleted ? 'Completed' : 'Upcoming Stage'}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                      {step.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-stone-100/80 p-4 rounded-2xl border border-stone-200/80 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
              Items in this Batch
            </span>
            <div className="space-y-1.5">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-stone-800">
                  <span>{item.quantity}× {item.name}</span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={handleOpenReceipt}
              className="flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-amber-700" />
              <span>View & Print Thermal Receipt</span>
            </button>

            <button
              onClick={() => {
                setActiveModal(null);
                setPersona('admin');
              }}
              className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-300 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Mode (Advance Kitchen Status)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
