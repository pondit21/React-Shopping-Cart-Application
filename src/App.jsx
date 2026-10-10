import React, { useState, useMemo } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { useProducts } from "./hooks/useProducts";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FilterSidebar from "./components/FilterSidebar";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Cart from "./components/Cart";
import ProductModal from "./components/ProductModal";
import CheckoutModal from "./components/CheckoutModal";
import ToastContainer from "./components/Toast";
import Footer from "./components/Footer";
import { X } from "lucide-react";

function MainApp() {
  const {
    currentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useCart();

  const { products, loading } = useProducts();

  // Filter State
  const [filters, setFilters] = useState({
    maxPrice: 2500,
    processors: [],
    rams: [],
    gpus: [],
    minRating: 0
  });

  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Available Filter Options extracted from products
  const availableProcessors = useMemo(() => {
    const list = new Set();
    products.forEach(p => {
      if (p.Processor?.includes("i9")) list.add("Intel Core i9");
      else if (p.Processor?.includes("i7")) list.add("Intel Core i7");
      else if (p.Processor?.includes("i5")) list.add("Intel Core i5");
      else if (p.Processor?.includes("Ryzen 9")) list.add("AMD Ryzen 9");
      else if (p.Processor?.includes("Ryzen 7")) list.add("AMD Ryzen 7");
      else if (p.Processor?.includes("Ryzen 5")) list.add("AMD Ryzen 5");
    });
    return Array.from(list);
  }, [products]);

  const availableRams = useMemo(() => {
    const list = new Set();
    products.forEach(p => {
      if (p.RAM?.includes("32GB")) list.add("32GB");
      else if (p.RAM?.includes("16GB")) list.add("16GB");
      else if (p.RAM?.includes("8GB")) list.add("8GB");
    });
    return Array.from(list);
  }, [products]);

  const availableGpus = useMemo(() => {
    const list = new Set();
    products.forEach(p => {
      if (p.Graphics_Processor?.includes("4070")) list.add("GeForce RTX 4070 / Ti");
      else if (p.Graphics_Processor?.includes("4060")) list.add("GeForce RTX 4060 / Ti");
      else if (p.Graphics_Processor?.includes("3070")) list.add("GeForce RTX 3070");
      else if (p.Graphics_Processor?.includes("3060")) list.add("GeForce RTX 3060");
      else if (p.Graphics_Processor?.includes("1660") || p.Graphics_Processor?.includes("1650")) list.add("GeForce GTX 16 Series");
      else if (p.Graphics_Processor?.includes("Radeon")) list.add("AMD Radeon RX");
    });
    return Array.from(list);
  }, [products]);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.maxPrice < 2500) count += 1;
    if (filters.processors.length > 0) count += filters.processors.length;
    if (filters.rams.length > 0) count += filters.rams.length;
    if (filters.gpus.length > 0) count += filters.gpus.length;
    if (filters.minRating > 0) count += 1;
    if (selectedCategory !== "All") count += 1;
    if (searchQuery.trim() !== "") count += 1;
    return count;
  }, [filters, selectedCategory, searchQuery]);

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      maxPrice: 2500,
      processors: [],
      rams: [],
      gpus: [],
      minRating: 0
    });
    setSelectedCategory("All");
    setSearchQuery("");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Search Query
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase().trim();
          const matchName = product.Name?.toLowerCase().includes(q);
          const matchProc = product.Processor?.toLowerCase().includes(q);
          const matchGpu = product.Graphics_Processor?.toLowerCase().includes(q);
          const matchRam = product.RAM?.toLowerCase().includes(q);
          const matchStorage = product.Storage?.toLowerCase().includes(q);
          const matchBrand = product.brand?.toLowerCase().includes(q);
          if (!matchName && !matchProc && !matchGpu && !matchRam && !matchStorage && !matchBrand) {
            return false;
          }
        }

        // 2. Category Filter
        if (selectedCategory === "Intel") {
          if (!product.Processor?.toLowerCase().includes("intel") && product.category !== "Intel") return false;
        } else if (selectedCategory === "AMD") {
          if (!product.Processor?.toLowerCase().includes("amd") && !product.Processor?.toLowerCase().includes("ryzen") && product.category !== "AMD") return false;
        } else if (selectedCategory === "High-End") {
          if (!product.Graphics_Processor?.includes("4070") && !product.RAM?.includes("32GB") && product.Price < 1500) return false;
        }

        // 3. Price Filter
        if (product.Price > filters.maxPrice) {
          return false;
        }

        // 4. Processor Filter
        if (filters.processors.length > 0) {
          const match = filters.processors.some(proc => {
            if (proc.includes("i9")) return product.Processor?.includes("i9");
            if (proc.includes("i7")) return product.Processor?.includes("i7");
            if (proc.includes("i5")) return product.Processor?.includes("i5");
            if (proc.includes("Ryzen 9")) return product.Processor?.includes("Ryzen 9");
            if (proc.includes("Ryzen 7")) return product.Processor?.includes("Ryzen 7");
            if (proc.includes("Ryzen 5")) return product.Processor?.includes("Ryzen 5");
            return false;
          });
          if (!match) return false;
        }

        // 5. RAM Filter
        if (filters.rams.length > 0) {
          const match = filters.rams.some(ram => product.RAM?.includes(ram));
          if (!match) return false;
        }

        // 6. GPU Filter
        if (filters.gpus.length > 0) {
          const match = filters.gpus.some(gpu => {
            if (gpu.includes("4070")) return product.Graphics_Processor?.includes("4070");
            if (gpu.includes("4060")) return product.Graphics_Processor?.includes("4060");
            if (gpu.includes("3070")) return product.Graphics_Processor?.includes("3070");
            if (gpu.includes("3060")) return product.Graphics_Processor?.includes("3060");
            if (gpu.includes("16")) return product.Graphics_Processor?.includes("1660") || product.Graphics_Processor?.includes("1650");
            if (gpu.includes("Radeon")) return product.Graphics_Processor?.includes("Radeon");
            return false;
          });
          if (!match) return false;
        }

        // 7. Customer Rating Filter
        if (filters.minRating > 0) {
          if ((product.ratingScore || 4.5) < filters.minRating) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.Price - b.Price;
        }
        if (sortBy === "price-desc") {
          return b.Price - a.Price;
        }
        if (sortBy === "rating") {
          return (b.ratingScore || 4.5) - (a.ratingScore || 4.5);
        }
        if (sortBy === "reviews") {
          return (b.Reviews || 0) - (a.Reviews || 0);
        }
        // Default featured
        return 0;
      });
  }, [products, searchQuery, selectedCategory, filters, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] text-slate-900">
      {/* Global Notifications */}
      <ToastContainer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Quick View Product Specs Modal */}
      <ProductModal />

      {/* Checkout Process Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Top Navbar */}
      <Navbar
        showMobileFilterBtn={true}
        onToggleMobileFilter={() => setIsMobileFilterOpen(true)}
      />

      {/* Main Content Area (padded for fixed navbar) */}
      <main className="flex-1 pt-28 sm:pt-32 pb-12">
        {currentView === "cart" ? (
          /* Dedicated Full Shopping Cart View */
          <Cart onOpenCheckout={() => setIsCheckoutOpen(true)} />
        ) : (
          /* Catalog & Shop View */
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
            {/* Promo Banner */}
            <HeroBanner />

            {/* Catalog Layout: Left Filter Sidebar, Right Product Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block lg:col-span-1 sticky top-36">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  onResetFilters={handleResetFilters}
                  availableProcessors={availableProcessors}
                  availableRams={availableRams}
                  availableGpus={availableGpus}
                  activeFilterCount={activeFilterCount}
                />
              </div>

              {/* Product Grid Area */}
              <div className="lg:col-span-3">
                <ProductGrid
                  products={filteredProducts}
                  loading={loading}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onResetFilters={handleResetFilters}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl z-10 p-4 overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
              <h3 className="font-bold text-base text-slate-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onResetFilters={handleResetFilters}
              availableProcessors={availableProcessors}
              availableRams={availableRams}
              availableGpus={availableGpus}
              activeFilterCount={activeFilterCount}
              onCloseMobile={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

export default App;
