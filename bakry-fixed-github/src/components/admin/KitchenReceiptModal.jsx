import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import {
  X,
  Printer
} from 'lucide-react';

export const KitchenReceiptModal = () => {
  const {
    activeModal,
    setActiveModal,
    receiptOrder,
    bakeryInfo
  } = useBakery();

  if (activeModal !== 'receipt' || !receiptOrder) return null;

  const order = receiptOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white text-stone-900 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-300 relative my-6">
        
        <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Kitchen & Customer Bill</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-stone-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Thermal Slip</span>
            </button>
            <button
              onClick={() => setActiveModal(null)}
              className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500"
              aria-label="Close Receipt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4 font-mono text-xs leading-relaxed bg-white">
          <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-stone-300">
            <div className="text-2xl font-serif font-black tracking-tight text-stone-900">
              🥖 {bakeryInfo.name}
            </div>
            <p className="text-[11px] text-stone-600 uppercase tracking-widest">{bakeryInfo.tagline}</p>
            <p className="text-[10px] text-stone-500">{bakeryInfo.address}, {bakeryInfo.city}</p>
            <p className="text-[10px] text-stone-500">Tel: {bakeryInfo.phone}</p>
          </div>

          <div className="space-y-1 py-2 border-b border-dashed border-stone-300 text-[11px]">
            <div className="flex justify-between">
              <span>ORDER TICKET:</span>
              <strong className="text-stone-900 font-bold text-sm">#{order.id}</strong>
            </div>
            <div className="flex justify-between">
              <span>DATE/TIME:</span>
              <span>{order.orderTime || new Date().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>FULFILLMENT:</span>
              <strong className="uppercase bg-stone-100 px-1.5 py-0.5 rounded text-stone-900">{order.orderType}</strong>
            </div>
            <div className="flex justify-between">
              <span>SCHEDULED SLOT:</span>
              <span>{order.deliverySlot}</span>
            </div>
            <div className="flex justify-between">
              <span>CUSTOMER:</span>
              <strong>{order.customerName}</strong>
            </div>
            {order.customerPhone && (
              <div className="flex justify-between">
                <span>PHONE:</span>
                <span>{order.customerPhone}</span>
              </div>
            )}
            {order.deliveryAddress && order.orderType === 'Delivery' && (
              <div className="flex justify-between">
                <span>DESTINATION:</span>
                <span className="text-right max-w-[200px] truncate">{order.deliveryAddress}</span>
              </div>
            )}
          </div>

          <div className="py-2 border-b-2 border-dashed border-stone-300 space-y-2">
            <div className="flex justify-between font-bold text-[10px] uppercase border-b border-stone-200 pb-1 text-stone-600">
              <span>ITEM / DESCRIPTION</span>
              <span>QTY</span>
              <span>AMT</span>
            </div>

            {order.items?.map((item, idx) => (
              <div key={idx} className="space-y-0.5 text-stone-800">
                <div className="flex justify-between font-medium">
                  <span className="max-w-[210px]">{item.name}</span>
                  <span>{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                {item.isCustomCake && item.customDetails && (
                  <div className="text-[10px] text-stone-500 pl-2 italic">
                    • {item.customDetails.sponge} | {item.customDetails.finish}
                    {item.customDetails.inscription && (
                      <div>• Text: "{item.customDetails.inscription}"</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-1 py-2 border-b border-dashed border-stone-300 text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.subtotal?.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount / Promo:</span>
                <span>-${order.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Charge:</span>
              <span>${order.deliveryFee?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax:</span>
              <span>${order.tax?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-stone-300 text-stone-900 font-serif">
              <span>TOTAL PAID:</span>
              <span>${order.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[10px] text-stone-500 pt-0.5">
              <span>Payment Mode:</span>
              <span>{order.paymentMethod} ({order.paymentStatus || 'Verified'})</span>
            </div>
          </div>

          {order.specialNotes && (
            <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200/80 text-[11px] text-amber-900">
              <strong className="block text-[10px] uppercase font-bold text-amber-800">Kitchen & Packaging Memo:</strong>
              <span>{order.specialNotes}</span>
            </div>
          )}

          <div className="text-center pt-3 space-y-2">
            <div className="tracking-widest font-mono text-base font-black text-stone-700">
              ||| | ||||| ||| || |||||| || |
            </div>
            <p className="text-[10px] text-stone-500">
              Baked with stoneground organic flour & 100% French butter.<br />
              Merci pour votre visite! 🥐
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
