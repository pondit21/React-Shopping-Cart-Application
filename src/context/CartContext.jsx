import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { promoCodes } from "../data/products";

// Create Cart Context
export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Cart items stored in localStorage for seamless persistence
  // Format: [{ id, Name, Price, Image, quantity, Processor, ... }]
  const [cartItems, setCartItems] = useLocalStorage("Cart Products", []);

  // UI States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentView, setCurrentView] = useState("home"); // 'home' | 'cart' | 'checkout'

  // Toast Notification System
  const showToast = useCallback((message, type = "success", title = "") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts(prev => [...prev, { id, message, type, title }]);

    // Auto remove after 3.5s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Add to cart operation (single click add)
  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || !product.id) return;

    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);

      if (existingIndex > -1) {
        // Increment existing item quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        // Add new item to front of cart
        const newItem = {
          ...product,
          quantity: Math.max(1, quantity)
        };
        return [newItem, ...prevItems];
      }
    });

    showToast(
      `"${product.Name.substring(0, 32)}..." added to your cart!`,
      "success",
      "Added to Cart"
    );
  }, [setCartItems, showToast]);

  // Remove individual item from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const target = prevItems.find(item => item.id === productId);
      if (target) {
        showToast(`Removed "${target.Name.substring(0, 28)}..." from cart.`, "info", "Item Removed");
      }
      return prevItems.filter(item => item.id !== productId);
    });
  }, [setCartItems, showToast]);

  // Update item quantity dynamically inside cart (+ or -)
  const updateQuantity = useCallback((productId, type) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          let newQty = item.quantity;
          if (type === "add") {
            newQty += 1;
          } else if (type === "sub") {
            newQty = Math.max(1, newQty - 1);
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  }, [setCartItems]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedPromo(null);
    showToast("Your cart has been cleared.", "info", "Cart Cleared");
  }, [setCartItems, showToast]);

  // Promo code operations
  const applyPromoCode = useCallback((inputCode) => {
    if (!inputCode) {
      showToast("Please enter a promo code!", "error", "Invalid Code");
      return false;
    }

    const cleanCode = inputCode.trim();
    const promo = promoCodes[cleanCode] || promoCodes[cleanCode.toUpperCase()] || promoCodes[cleanCode.toLowerCase()];

    if (promo) {
      setAppliedPromo(promo);
      showToast(
        `Promo code "${promo.code}" applied! You get ${promo.discountPercent}% OFF.`,
        "success",
        "Promo Applied"
      );
      return true;
    } else {
      showToast(`Invalid promo code! Try "OSTAD10" for 10% off.`, "error", "Promo Error");
      return false;
    }
  }, [showToast]);

  const removePromoCode = useCallback(() => {
    setAppliedPromo(null);
    showToast("Promo code removed.", "info");
  }, [showToast]);

  // Real-time Cart Summary Calculations
  const summary = useMemo(() => {
    const totalCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
    const subTotal = cartItems.reduce((acc, item) => {
      const price = Number(item.Price) || 0;
      const qty = Number(item.quantity) || 1;
      return acc + (price * qty);
    }, 0);

    const discountRate = appliedPromo ? (appliedPromo.discountPercent / 100) : 0;
    const discountAmount = subTotal * discountRate;
    const finalTotal = Math.max(0, subTotal - discountAmount);

    return {
      totalCount,
      subTotal: Number(subTotal.toFixed(2)),
      discountRate,
      discountAmount: Number(discountAmount.toFixed(2)),
      finalTotal: Number(finalTotal.toFixed(2))
    };
  }, [cartItems, appliedPromo]);

  // Quick view product modal helper
  const openProductModal = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // View navigation helper
  const navigateTo = useCallback((view) => {
    setCurrentView(view);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const value = {
    cartItems,
    summary,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    isDrawerOpen,
    setIsDrawerOpen,
    toggleDrawer: () => setIsDrawerOpen(prev => !prev),
    toasts,
    showToast,
    removeToast,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedProduct,
    openProductModal,
    closeProductModal,
    currentView,
    navigateTo
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
