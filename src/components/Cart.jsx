import React, { useState } from "react";
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Tag, Check, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Cart({ onOpenCheckout }) {
  const {
    cartItems,
    summary,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigateTo
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromoCode(promoInput)) {
      setPromoInput("");
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to remove all items from your cart? This action cannot be undone.")) {
      clearCart();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button
          onClick={() => navigateTo("home")}
          className="hover:text-amber-600 transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home / Shop</span>
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold">Shopping Cart</span>
      </nav>

      {/* Main Cart Section (Table on Left, Summary on Right) */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Cart Table or Empty State */}
        <div className="flex-1 w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-hidden">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {cartItems.length} {cartItems.length === 1 ? "distinct PC configuration" : "distinct PC configurations"} selected
              </p>
            </div>

            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg border border-rose-200 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Cart</span>
              </button>
            )}
          </div>

          {/* Cart Table Content */}
          {cartItems.length === 0 ? (
            /* Empty Cart State */
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-40 h-40 bg-slate-50 rounded-full flex items-center justify-center p-6 border border-slate-100">
                <img
                  src="/assets/empty-cart.webp"
                  alt="Empty shopping cart"
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <ShoppingBag className="w-16 h-16 text-slate-300" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-800">Your Cart is Empty</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Your shopping cart is currently empty. Explore our catalog of high-performance gaming desktop rigs to get started.
                </p>
              </div>

              <button
                onClick={() => navigateTo("home")}
                className="mt-2 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-sm rounded-lg shadow-sm transition-all flex items-center gap-2 active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Go to Shop</span>
              </button>
            </div>
          ) : (
            /* Full Table View */
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 uppercase text-[11px] font-bold border-b border-slate-200 tracking-wider">
                    <th className="py-3 px-3 text-center w-28">IMAGE</th>
                    <th className="py-3 px-3">PRODUCT</th>
                    <th className="py-3 px-3 text-center">UNIT PRICE</th>
                    <th className="py-3 px-3 text-center">QUANTITY</th>
                    <th className="py-3 px-3 text-center">TOTAL</th>
                    <th className="py-3 px-3 text-center">REMOVE</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {cartItems.map((item) => {
                    const itemTotal = (item.Price * item.quantity).toFixed(2);

                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Image */}
                        <td className="py-4 px-3 text-center align-middle">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F7F7F7] rounded-lg p-2 mx-auto flex items-center justify-center border border-slate-100 shadow-sm">
                            <img
                              src={item.Image}
                              alt={item.Name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                        </td>

                        {/* Product Details */}
                        <td className="py-4 px-3 align-middle max-w-xs sm:max-w-md">
                          <div className="space-y-1">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                              {item.Name}
                            </h4>
                            <div className="text-xs text-slate-500 line-clamp-1">
                              {item.Processor} • {item.Graphics_Processor} • {item.RAM}
                            </div>
                            <div className="text-[11px] text-emerald-600 font-semibold">
                              In Stock • Ships to {item.Ships_To || "Bangladesh"}
                            </div>
                          </div>
                        </td>

                        {/* Unit Price */}
                        <td className="py-4 px-3 text-center align-middle font-semibold text-slate-800 whitespace-nowrap">
                          ${item.Price.toFixed(2)}
                        </td>

                        {/* Quantity Stepper */}
                        <td className="py-4 px-3 text-center align-middle whitespace-nowrap">
                          <div className="inline-flex items-center border border-slate-300 rounded-lg bg-white shadow-sm overflow-hidden text-xs">
                            <button
                              onClick={() => updateQuantity(item.id, "sub")}
                              disabled={item.quantity <= 1}
                              className={`p-1.5 px-2.5 hover:bg-slate-100 transition-colors ${
                                item.quantity <= 1 ? "opacity-30 cursor-not-allowed text-slate-400" : "text-slate-700"
                              }`}
                              title="Decrease quantity"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <span className="px-3 py-1 font-bold text-slate-900 text-sm min-w-[32px] text-center bg-slate-50">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.id, "add")}
                              className="p-1.5 px-2.5 hover:bg-slate-100 text-slate-700 transition-colors"
                              title="Increase quantity"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="py-4 px-3 text-center align-middle font-black text-slate-950 text-sm sm:text-base whitespace-nowrap">
                          ${itemTotal}
                        </td>

                        {/* Remove Action */}
                        <td className="py-4 px-3 text-center align-middle whitespace-nowrap">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Remove this PC from cart"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Continue Shopping link */}
          {cartItems.length > 0 && (
            <div className="pt-6 mt-4 border-t border-slate-200 flex justify-between items-center flex-wrap gap-3">
              <button
                onClick={() => navigateTo("home")}
                className="text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping for More PCs</span>
              </button>

              <div className="text-xs text-slate-500 font-medium">
                The price and availability of items are subject to change.
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="w-full lg:w-96 bg-white rounded-xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5 shrink-0">
          <h2 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          {/* Pricing Breakdown */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center text-slate-600">
              <span>Subtotal (before discount):</span>
              <span className="font-bold text-slate-900">
                ${summary.subTotal.toFixed(2)}
              </span>
            </div>

            {/* Discount row if promo applied */}
            {summary.discountAmount > 0 && (
              <div className="flex justify-between items-center text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 font-medium text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Discount ({appliedPromo.code.toUpperCase()} - {appliedPromo.discountPercent}%):
                </span>
                <span className="font-bold">
                  -${summary.discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-600">
              <span>Estimated Shipping:</span>
              <span className="font-bold text-emerald-600 uppercase text-xs tracking-wider">
                FREE Delivery
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>Estimated Tax:</span>
              <span className="font-bold text-slate-900">
                $0.00
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <div>
                <span className="text-base font-extrabold text-slate-900">
                  Total ({summary.totalCount} {summary.totalCount === 1 ? "item" : "items"}):
                </span>
                <span className="block text-[11px] text-slate-400 font-normal">
                  Inclusive of all applicable duties
                </span>
              </div>
              <span className="text-2xl font-black text-[#b12704]">
                ${summary.finalTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Promo Code Input Section */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Have a Promo / Coupon Code?
            </label>

            {appliedPromo ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2.5 rounded-lg text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>
                    Coupon <strong>{appliedPromo.code.toUpperCase()}</strong> active ({appliedPromo.discountPercent}% OFF)
                  </span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="e.g. OSTAD10"
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 uppercase font-mono font-medium"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-lg transition-colors shrink-0 shadow-sm"
                >
                  Apply Promo Code
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400">
              Try <strong className="text-slate-600">OSTAD10</strong> for 10% off or <strong className="text-slate-600">OSTAD5</strong> for 5% off.
            </p>
          </div>

          {/* Proceed to Checkout Button */}
          <button
            onClick={onOpenCheckout}
            disabled={cartItems.length === 0}
            className={`w-full py-3.5 px-4 rounded-lg font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
              cartItems.length === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                : "bg-amber-400 hover:bg-amber-500 text-slate-950 border border-amber-500"
            }`}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-500 justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure 256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
