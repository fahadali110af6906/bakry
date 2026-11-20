import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useBakery();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => {
        const isError = toast.type === 'error';
        const isInfo = toast.type === 'info';
        
        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-luxury-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
              isError
                ? 'bg-rose-900/90 text-rose-100 border-rose-700'
                : isInfo
                ? 'bg-stone-900/90 text-stone-100 border-stone-700'
                : 'bg-amber-950/95 text-amber-100 border-amber-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              ) : isInfo ? (
                <Info className="w-5 h-5 text-sky-400 shrink-0" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <p className="text-sm font-medium leading-tight">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
