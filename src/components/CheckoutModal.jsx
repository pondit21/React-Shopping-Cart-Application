import React, { useState } from "react";
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, Smartphone, ArrowRight, Sparkles, PackageCheck } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";

export function CheckoutModal({ isOpen, onClose }) {
  const { summary, cartItems, clearCart, navigateTo } = useCart();

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+880 1712 345678",
    address: "House 42, Road 11, Banani",
    city: "Dhaka",
    postalCode: "1213",
    paymentMethod: "cod" // 'cod' | 'card' | 'mobile'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedId = "AMZ-BD-" + Math.floor(100000 + Math.random() * 900000);

    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(generatedId);
      setOrderPlaced(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }

      // Clear the shopping cart
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    onClose();
    navigateTo("home");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={!orderPlaced ? onClose : undefined}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fade-in"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-slate-200 animate-scale-up">
          {/* Header */}
          <div className="bg-[#131921] text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-lg">
                {orderPlaced ? "Order Confirmation" : "Complete Your Order"}
              </h3>
            </div>

            {!orderPlaced && (
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-white transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body */}
          {orderPlaced ? (
            /* Order Placed Success Screen */
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle className="w-12 h-12" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  Order Successfully Placed!
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  Thank you, {formData.fullName}!
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your order has been received and is being prepared for fast delivery to <strong className="text-slate-900">{formData.city}, Bangladesh</strong>.
                </p>
              </div>

              {/* Order Details Receipt Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Order Reference:</span>
                  <span className="font-mono font-bold text-slate-900">{orderId}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Payment Method:</span>
                  <span className="font-bold text-slate-900 uppercase">
                    {formData.paymentMethod === "cod" ? "Cash on Delivery" : formData.paymentMethod === "card" ? "Credit / Debit Card" : "bKash / Mobile Banking"}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-600">3-5 Business Days</span>
                </div>
                <div className="flex justify-between items-baseline pt-1 text-sm font-bold text-slate-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-[#b12704] text-base font-black">
                    ${summary.finalTotal > 0 ? summary.finalTotal.toFixed(2) : "Paid"}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <span>Return to Amazon Gaming Shop</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
              {/* Order Summary Strip */}
              <div className="bg-amber-50/80 border border-amber-200/90 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-600 font-medium">Order Total ({summary.totalCount} items):</span>
                  <span className="font-black text-slate-950 text-base sm:text-lg ml-2">
                    ${summary.finalTotal.toFixed(2)}
                  </span>
                </div>
                <div className="text-emerald-700 font-bold flex items-center gap-1 text-xs">
                  <Truck className="w-4 h-4" />
                  <span>Free Express Delivery Included</span>
                </div>
              </div>

              {/* Shipping Address Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>1. Shipping & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">City / Division</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Full Street Address</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address, building, apartment"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-500" />
                  <span>2. Payment Option</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "cod"
                        ? "bg-amber-50/70 border-amber-500 ring-1 ring-amber-500 text-slate-900 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Cash on Delivery</div>
                      <div className="text-[10px] text-slate-500 font-normal">Pay upon receipt</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "mobile"
                        ? "bg-amber-50/70 border-amber-500 ring-1 ring-amber-500 text-slate-900 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile"
                      checked={formData.paymentMethod === "mobile"}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">bKash / Nagad</div>
                      <div className="text-[10px] text-slate-500 font-normal">Instant mobile pay</div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                      formData.paymentMethod === "card"
                        ? "bg-amber-50/70 border-amber-500 ring-1 ring-amber-500 text-slate-900 font-bold"
                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="accent-amber-500"
                    />
                    <div className="text-xs">
                      <div className="font-bold">Card Payment</div>
                      <div className="text-[10px] text-slate-500 font-normal">Visa / MasterCard</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                      <span>Securing Your Order...</span>
                    </div>
                  ) : (
                    <>
                      <span>Place Order (${summary.finalTotal.toFixed(2)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>By placing order, you agree to Amazon's Conditions of Use & Privacy Notice</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutModal;
