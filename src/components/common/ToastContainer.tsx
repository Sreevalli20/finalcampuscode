import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const icons = {
          success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
          info: <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />,
        };

        return (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-100 shadow-xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-2"
          >
            {icons[t.type]}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-neutral-100 leading-tight">{t.title}</p>
              {t.message && <p className="text-xs text-neutral-400 mt-0.5 leading-normal">{t.message}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-neutral-500 hover:text-neutral-300 transition-colors p-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
