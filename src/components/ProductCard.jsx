import React, { useState } from "react";
import { Star, ShoppingCart, Check, Eye, Zap, Truck, Shield } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({ product, viewMode = "grid" }) {
  const { addToCart, cartItems, openProductModal } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const {
    id,
    Name,
    Processor,
    Graphics_Processor,
    Storage,
    RAM,
    PowerSupply,
    Wireless_Connectivity,
    Operating_System,
    Customer_Rating,
    ratingScore = 4.5,
    Reviews = 500,
    Units_Sold,
    Price,
    originalPrice,
    Delivery_Date,
    Ships_To,
    Stock,
    Sold_By,
    Image: prodImage
  } = product;

  // Check if item is already in cart
  const cartItem = cartItems.find(item => item.id === id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleAddClick = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const discountPercent = originalPrice && originalPrice > Price
    ? Math.round(((originalPrice - Price) / originalPrice) * 100)
    : null;

  if (viewMode === "list") {
    // List View Layout (Horizontal Card)
    return (
      <div className="group bg-white rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row p-4 sm:p-5 gap-5 relative">
        {/* Product Image Section */}
        <div
          onClick={() => openProductModal(product)}
          className="relative w-full md:w-56 h-48 sm:h-52 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-lg p-3 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden border border-slate-100"
        >
          {Units_Sold && (
            <span className="absolute top-2 left-2 z-10 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {Units_Sold}
            </span>
          )}

          <img
            src={prodImage}
            alt={Name}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          <button
            onClick={(e) => { e.stopPropagation(); openProductModal(product); }}
            className="absolute bottom-2 right-2 bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 p-1.5 rounded-md shadow border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 font-medium"
            title="Quick View Specs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="text-[11px]">Quick View</span>
          </button>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {product.category || "Gaming PC"}
              </span>
              {Stock && (
                <span className={`text-[11px] font-medium ${Stock.includes("Only") ? "text-amber-600" : "text-emerald-600"}`}>
                  {Stock}
                </span>
              )}
            </div>

            <h3
              onClick={() => openProductModal(product)}
              className="font-bold text-base sm:text-lg text-slate-900 hover:text-amber-600 cursor-pointer transition-colors leading-snug line-clamp-2"
            >
              {Name}
            </h3>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= Math.floor(ratingScore)
                        ? "fill-amber-400 text-amber-400"
                        : star - 0.5 <= ratingScore
                        ? "fill-amber-400/50 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700">{ratingScore}</span>
              <span className="text-xs text-slate-400">({Reviews} reviews)</span>
            </div>

            {/* Detailed Specs Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="truncate"><strong className="text-slate-800">CPU:</strong> {Processor}</div>
              <div className="truncate"><strong className="text-slate-800">GPU:</strong> {Graphics_Processor}</div>
              <div className="truncate"><strong className="text-slate-800">RAM:</strong> {RAM}</div>
              <div className="truncate"><strong className="text-slate-800">Storage:</strong> {Storage}</div>
              <div className="truncate"><strong className="text-slate-800">PSU:</strong> {PowerSupply || "Standard"}</div>
              <div className="truncate"><strong className="text-slate-800">OS:</strong> {Operating_System || "Win 11"}</div>
            </div>
          </div>

          {/* Price & Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-950">
                  ${Price.toFixed(2)}
                </span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-1.5 py-0.5 rounded">
                    -{discountPercent}%
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-slate-400" />
                <span>Delivery: <strong>{Delivery_Date || "3-5 Business Days"}</strong> to {Ships_To || "Bangladesh"}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center gap-2">
              {inCartQty > 0 && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                  {inCartQty} in cart
                </span>
              )}
              <button
                onClick={handleAddClick}
                disabled={isAdding}
                className={`px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
                  isAdding
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-500/80"
                }`}
              >
                {isAdding ? (
                  <>
                    <Check className="w-4 h-4 animate-bounce" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Standard Grid Card)
  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 hover:border-amber-400/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="bg-slate-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          {Units_Sold || "Best Seller"}
        </span>

        {discountPercent && (
          <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm">
            SAVE {discountPercent}%
          </span>
        )}
      </div>

      {/* Product Image */}
      <div
        onClick={() => openProductModal(product)}
        className="relative w-full h-48 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-lg p-3 flex items-center justify-center cursor-pointer overflow-hidden border border-slate-100 mb-3"
      >
        <img
          src={prodImage}
          alt={Name}
          loading="lazy"
          className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
        />

        {/* Quick View Hover Button */}
        <button
          onClick={(e) => { e.stopPropagation(); openProductModal(product); }}
          className="absolute inset-x-4 bottom-3 bg-slate-900/90 hover:bg-slate-900 text-white py-1.5 px-3 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View Specs</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wide">
            {product.category || "Gaming Rig"}
          </div>

          <h3
            onClick={() => openProductModal(product)}
            className="font-bold text-sm text-slate-900 hover:text-amber-600 cursor-pointer transition-colors leading-snug line-clamp-2 h-10"
            title={Name}
          >
            {Name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(ratingScore)
                      ? "fill-amber-400 text-amber-400"
                      : star - 0.5 <= ratingScore
                      ? "fill-amber-400/50 text-amber-400"
                      : "text-slate-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">{ratingScore}</span>
            <span className="text-[11px] text-slate-400">({Reviews})</span>
          </div>

          {/* Compact Specs list */}
          <div className="mt-2 text-[11px] text-slate-600 space-y-0.5 bg-slate-50 p-2 rounded border border-slate-100/80">
            <div className="truncate"><span className="text-slate-400 font-medium">CPU:</span> {Processor}</div>
            <div className="truncate"><span className="text-slate-400 font-medium">GPU:</span> {Graphics_Processor}</div>
            <div className="truncate"><span className="text-slate-400 font-medium">RAM/SSD:</span> {RAM} • {Storage}</div>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-950">
                ${Price.toFixed(2)}
              </span>
              {originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {inCartQty > 0 && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                {inCartQty} in cart
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-500 truncate">
            Delivery by <strong>{Delivery_Date || "Oct 30"}</strong> to {Ships_To || "Bangladesh"}
          </div>

          <button
            onClick={handleAddClick}
            disabled={isAdding}
            className={`w-full py-2 px-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 ${
              isAdding
                ? "bg-emerald-600 text-white"
                : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-500/80"
            }`}
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
