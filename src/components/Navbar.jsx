import React from "react";
import { ShoppingCart, Search, MapPin, ChevronDown, X, Sparkles, SlidersHorizontal, Laptop } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Navbar({ onToggleMobileFilter, showMobileFilterBtn }) {
  const {
    summary,
    toggleDrawer,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    navigateTo,
    currentView
  } = useCart();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (currentView !== "home") {
      navigateTo("home");
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (currentView !== "home") {
      navigateTo("home");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-md">
      {/* Top Banner with Promo code reminder */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 text-xs font-semibold py-1 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span>LIMITED TIME OFFER: Get up to 10% OFF with code <strong className="underline decoration-slate-900 font-black tracking-wide">OSTAD10</strong> at checkout!</span>
        <span className="hidden md:inline-block bg-slate-950 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ml-1">Free Delivery</span>
      </div>

      {/* Main Amazon Navigation Bar */}
      <nav className="bg-[#131921] text-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-1.5 py-1 px-2 rounded hover:outline hover:outline-1 hover:outline-white/40 transition-all text-left group"
            title="Amazon Gaming Store Home"
          >
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">amazon</span>
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider ml-1 bg-amber-400/20 px-1.5 py-0.5 rounded border border-amber-400/40">Gaming</span>
            </div>
          </button>
        </div>

        {/* Deliver to Location Widget (Desktop) */}
        <div className="hidden xl:flex items-center gap-1.5 py-1 px-2.5 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-slate-200 transition-all">
          <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="text-xs leading-tight">
            <span className="text-slate-400 text-[11px] block font-normal">Deliver to</span>
            <span className="font-bold text-white">Bangladesh</span>
          </div>
        </div>

        {/* Interactive Search Bar */}
        <div className="flex-1 max-w-3xl min-w-[160px]">
          <div className="flex items-stretch rounded-md overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-amber-500 transition-all">
            {/* Category Dropdown */}
            <div className="relative hidden md:block">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="h-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium px-3 pr-7 border-r border-slate-300 outline-none cursor-pointer appearance-none transition-colors"
                aria-label="Select product category"
              >
                <option value="All">All PCs</option>
                <option value="Intel">Intel Core</option>
                <option value="AMD">AMD Ryzen</option>
                <option value="High-End">RTX 40 Series</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search gaming PCs, Intel i7, RTX 4060, 32GB RAM..."
                className="w-full h-10 px-3.5 text-slate-900 text-sm placeholder:text-slate-400 outline-none bg-transparent"
                aria-label="Search products"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="p-1.5 text-slate-400 hover:text-slate-700 mr-1 rounded-full transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Search Submit Button */}
            <button
              onClick={() => currentView !== "home" && navigateTo("home")}
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-4 sm:px-5 flex items-center justify-center transition-colors font-medium shrink-0"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Mobile Filter Button if on home view */}
        {showMobileFilterBtn && currentView === "home" && (
          <button
            onClick={onToggleMobileFilter}
            className="lg:hidden p-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center border border-slate-700"
            title="Filter products"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        )}

        {/* Account / Sign In Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-1.5 py-1 px-2.5 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-xs leading-tight transition-all">
          <div>
            <span className="text-slate-300 text-[11px] block font-normal">Hello, Gamer</span>
            <span className="font-bold text-white flex items-center gap-0.5">
              Account & Lists
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </span>
          </div>
        </div>

        {/* Returns & Orders (Desktop) */}
        <div
          onClick={() => navigateTo("cart")}
          className="hidden md:flex items-center gap-1.5 py-1 px-2.5 rounded hover:outline hover:outline-1 hover:outline-white/40 cursor-pointer text-xs leading-tight transition-all"
        >
          <div>
            <span className="text-slate-300 text-[11px] block font-normal">Returns</span>
            <span className="font-bold text-white">& Orders</span>
          </div>
        </div>

        {/* Cart Drawer Trigger Button */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleDrawer}
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded hover:outline hover:outline-1 hover:outline-white/40 text-white transition-all relative group bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60"
            title="Open Shopping Cart Drawer"
            aria-label={`Cart with ${summary.totalCount} items`}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-amber-400 group-hover:scale-105 transition-transform" />
              <span
                className={`absolute -top-2 -right-2 min-w-[20px] h-5 px-1 bg-amber-500 text-slate-950 rounded-full font-black text-xs flex items-center justify-center shadow-md transition-transform ${
                  summary.totalCount > 0 ? "scale-100" : "scale-90 opacity-90"
                }`}
              >
                {summary.totalCount}
              </span>
            </div>

            <div className="hidden sm:flex flex-col text-left text-xs leading-tight pl-0.5">
              <span className="text-[10px] text-slate-300 font-medium">Cart</span>
              <span className="font-bold text-amber-400">
                ${summary.finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </button>
        </div>
      </nav>

      {/* Sub Navigation Bar with Category Pills */}
      <div className="bg-[#232f3e] text-slate-200 px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs font-medium overflow-x-auto no-scrollbar gap-4 border-t border-slate-700/40">
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => { setSelectedCategory("All"); setSearchQuery(""); navigateTo("home"); }}
            className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
              selectedCategory === "All" && currentView === "home" && !searchQuery
                ? "bg-amber-500 text-slate-950 font-bold"
                : "hover:bg-slate-700 text-white"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>All Gaming Desktops</span>
          </button>

          <button
            onClick={() => { setSelectedCategory("Intel"); navigateTo("home"); }}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === "Intel" && currentView === "home"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            Intel Core Edition
          </button>

          <button
            onClick={() => { setSelectedCategory("AMD"); navigateTo("home"); }}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === "AMD" && currentView === "home"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            AMD Ryzen Edition
          </button>

          <button
            onClick={() => { setSelectedCategory("High-End"); navigateTo("home"); }}
            className={`px-2.5 py-1 rounded transition-colors ${
              selectedCategory === "High-End" && currentView === "home"
                ? "bg-amber-500 text-slate-950 font-bold"
                : "hover:bg-slate-700 text-slate-300"
            }`}
          >
            RTX 4070 / High Performance
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => navigateTo("cart")}
            className={`px-2.5 py-1 rounded font-semibold transition-colors ${
              currentView === "cart"
                ? "bg-amber-400 text-slate-950"
                : "text-amber-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            Full Cart ({summary.totalCount})
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
