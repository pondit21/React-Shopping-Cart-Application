import React from "react";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

export function CartDrawer() {
  const {
    cartItems,
    summary,
    isDrawerOpen,
    setIsDrawerOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    navigateTo
  } = useCart();

  if (!isDrawerOpen) return null;

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to remove all items from your cart?")) {
      clearCart();
    }
  };

  const handleGoToCart = () => {
    setIsDrawerOpen(false);
    navigateTo("cart");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-in-right">
          {/* Drawer Top Header */}
          <div className="bg-[#131921] text-white p-4 flex items-center justify-between border-b border-slate-700">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-base tracking-wide">
                Your Shopping Cart
              </h2>
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full">
                {summary.totalCount}
              </span>
            </div>

            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close cart drawer"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subtotal Banner Card (Styled like reference app) */}
          {cartItems.length > 0 && (
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm text-center space-y-2">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                  Sub Total ({summary.totalCount} items)
                </div>
                <div className="text-2xl font-black text-[#b12704]">
                  ${summary.subTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="pt-1 flex gap-2">
                  <button
                    onClick={handleGoToCart}
                    className="flex-1 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm group"
                  >
                    <span>Go to Cart Page</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleClearCart}
                    className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg border border-rose-200 transition-colors"
                    title="Clear all cart items"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center p-4">
                  <img
                    src="/assets/empty-cart.webp"
                    alt="Empty cart"
                    className="max-h-full max-w-full object-contain opacity-80"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <ShoppingBag className="w-12 h-12 text-slate-400" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-slate-800">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Looks like you haven't added any gaming PCs to your shopping cart yet.
                  </p>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Start Shopping</span>
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-slate-200 p-3 flex gap-3 items-center hover:border-slate-300 transition-colors shadow-sm"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-[#F7F7F7] rounded-md p-1.5 flex items-center justify-center shrink-0 border border-slate-100">
                    <img
                      src={item.Image}
                      alt={item.Name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-semibold text-xs text-slate-900 line-clamp-2 leading-tight" title={item.Name}>
                      {item.Name}
                    </h4>

                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-sm text-[#b12704]">
                        ${(item.Price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[11px] text-slate-400">
                          (${item.Price.toFixed(2)} each)
                        </span>
                      )}
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="inline-flex items-center border border-slate-300 rounded-md bg-slate-50 overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, "sub")}
                          disabled={item.quantity <= 1}
                          className={`p-1 px-2 hover:bg-slate-200 transition-colors ${
                            item.quantity <= 1 ? "opacity-40 cursor-not-allowed" : "text-slate-700"
                          }`}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="px-2.5 py-0.5 font-bold text-slate-900 min-w-[24px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(item.id, "add")}
                          className="p-1 px-2 hover:bg-slate-200 text-slate-700 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Bottom Footer */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-white space-y-3">
              <div className="flex justify-between items-center text-sm font-bold text-slate-900">
                <span>Total Items:</span>
                <span>{summary.totalCount} PCs</span>
              </div>

              <button
                onClick={handleGoToCart}
                className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>View Full Cart & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default CartDrawer;
