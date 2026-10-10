import React from "react";
import { ShieldCheck, Truck, RotateCcw, Zap, Tag, Copy, Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export function HeroBanner() {
  const { applyPromoCode, appliedPromo } = useCart();
  const [copied, setCopied] = React.useState(false);

  const handleCopyAndApply = (code) => {
    navigator.clipboard?.writeText?.(code);
    setCopied(true);
    applyPromoCode(code);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#1a2332] to-[#0f172a] text-white border border-slate-800 shadow-xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-10 w-60 sm:w-80 h-60 sm:h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Headline & Intro */}
        <div className="flex-1 text-center lg:text-left space-y-3 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Mega Gaming Deals • October 2026</span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            High-Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Gaming Desktops</span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Unleash ultra-smooth framerates with NVIDIA RTX 40-Series & high-core Intel / AMD Ryzen processors. Every system is stress-tested, plug-and-play ready with Windows 11.
          </p>

          {/* Promo code interactive pill */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5">
            <div className="w-full sm:w-auto flex items-center justify-between gap-2 bg-slate-800/90 border border-amber-500/40 rounded-lg p-2 sm:pr-3 text-xs">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <span className="text-slate-400 text-[10px] block font-medium">Coupon Code:</span>
                  <span className="font-mono font-bold text-amber-300 text-xs sm:text-sm">OSTAD10</span>
                  <span className="text-slate-300 text-[10px] sm:text-[11px] ml-1">(10% OFF)</span>
                </div>
              </div>

              <button
                onClick={() => handleCopyAndApply("OSTAD10")}
                className={`px-2.5 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 shrink-0 ${
                  appliedPromo?.code === "OSTAD10" || copied
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm"
                }`}
              >
                {copied || appliedPromo?.code === "OSTAD10" ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Applied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Apply Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="text-[11px] text-slate-400">
              Also try <code className="text-amber-400 font-mono font-semibold">OSTAD5</code> for 5% off!
            </div>
          </div>
        </div>

        {/* Right Feature Badges Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0 max-w-md">
          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-1.5 sm:p-2 rounded-md bg-amber-400/10 text-amber-400 shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Fast Delivery</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-400">To Bangladesh</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-1.5 sm:p-2 rounded-md bg-emerald-400/10 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">2-Yr Warranty</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-400">100% Genuine</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-1.5 sm:p-2 rounded-md bg-sky-400/10 text-sky-400 shrink-0">
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">30-Day Return</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Hassle-Free</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 backdrop-blur-sm">
            <div className="p-1.5 sm:p-2 rounded-md bg-purple-400/10 text-purple-400 shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Tested & Ready</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-400">Windows 11</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;
