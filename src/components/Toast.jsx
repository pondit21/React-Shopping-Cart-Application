import React from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-portal-container fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg shadow-xl text-sm font-medium transition-all duration-300 animate-slide-in backdrop-blur-md ${
              isSuccess
                ? "bg-[#065f46]/95 text-emerald-50 border border-emerald-400/30"
                : isError
                ? "bg-[#991b1b]/95 text-rose-50 border border-rose-400/30"
                : "bg-[#1e293b]/95 text-slate-100 border border-slate-700/50"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-300" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {!isSuccess && !isError && <Info className="w-5 h-5 text-sky-300" />}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <h4 className="font-semibold text-xs uppercase tracking-wider opacity-80 mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm leading-snug break-words">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 rounded hover:bg-black/20 text-white/70 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
