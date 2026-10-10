import React, { useState } from "react";
import { X, Star, ShoppingCart, Check, ShieldCheck, Truck, RotateCcw, Cpu, HardDrive, Monitor, Zap } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductModal() {
  const { selectedProduct, closeProductModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!selectedProduct) return null;

  const {
    Name,
    Processor,
    Graphics_Processor,
    Storage,
    RAM,
    PowerSupply,
    Wireless_Connectivity,
    Operating_System,
    Color,
    ratingScore = 4.5,
    Reviews = 500,
    Price,
    originalPrice,
    Delivery_Date,
    Ships_To,
    Stock,
    Sold_By,
    Image: prodImage,
    brand
  } = selectedProduct;

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(selectedProduct, quantity);
    setTimeout(() => {
      setIsAdded(false);
      closeProductModal();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeProductModal}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-3xl border border-slate-200 animate-scale-up">
          {/* Close Button */}
          <button
            onClick={closeProductModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="w-full h-72 bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-4 flex items-center justify-center border border-slate-100">
                <img
                  src={prodImage}
                  alt={Name}
                  className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">2-Yr Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold">Fast Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-sky-600" />
                  <span className="font-semibold">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Specs & Action */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {brand || "Gaming Desktop"}
                </span>

                <h2 className="text-xl font-bold text-slate-900 mt-2 leading-snug">
                  {Name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.floor(ratingScore)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{ratingScore} / 5.0</span>
                  <span className="text-xs text-slate-400">({Reviews} customer reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 py-2 border-y border-slate-100">
                <span className="text-2xl sm:text-3xl font-black text-slate-950">
                  ${Price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {Stock || "In Stock"}
                </span>
              </div>

              {/* Specifications Table */}
              <div className="space-y-1.5 text-xs text-slate-700">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div><strong className="text-slate-900">CPU:</strong> {Processor}</div>
                  <div><strong className="text-slate-900">GPU:</strong> {Graphics_Processor}</div>
                  <div><strong className="text-slate-900">RAM:</strong> {RAM}</div>
                  <div><strong className="text-slate-900">Storage:</strong> {Storage}</div>
                  <div><strong className="text-slate-900">Power:</strong> {PowerSupply || "Gold Rated"}</div>
                  <div><strong className="text-slate-900">OS:</strong> {Operating_System || "Win 11 Home"}</div>
                  <div><strong className="text-slate-900">Network:</strong> {Wireless_Connectivity || "Wi-Fi"}</div>
                  <div><strong className="text-slate-900">Color:</strong> {Color || "Custom"}</div>
                </div>
              </div>

              {/* Quantity Picker & Add to Cart */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-slate-900 min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={`flex-1 py-3 px-4 rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-500"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add ({quantity}) to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
