import React, { useState } from "react";
import { LayoutGrid, List, ArrowUpDown, SearchX, X, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { useCart } from "../context/CartContext";

export function ProductGrid({
  products,
  loading,
  sortBy,
  setSortBy,
  onResetFilters,
  activeFilterCount
}) {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCart();

  return (
    <div className="space-y-4">
      {/* Control Bar: Title, Count, Sort, View Mode */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        {/* Results title & badges */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-bold text-lg text-slate-900">
              Results
            </h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:text-amber-700"
                  title="Clear category filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-slate-800 text-white px-2.5 py-0.5 rounded-full">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-amber-400"
                  title="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Check each product card for detailed specifications, reviews, and buying choices.
          </p>
        </div>

        {/* Right Controls: Sort & Layout Toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0">
          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 font-medium text-xs rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              aria-label="Sort products"
            >
              <option value="featured">Featured / Best Match</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="Grid View"
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="List View"
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 animate-pulse"
            >
              <div className="w-full h-48 bg-slate-200 rounded-lg" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-8 bg-slate-200 rounded w-full mt-4" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center space-y-4 max-w-lg mx-auto my-8 shadow-sm">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <SearchX className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Gaming PCs Found</h3>
            <p className="text-sm text-slate-500">
              We couldn't find any products matching your active search keywords or filter criteria.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onResetFilters}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg shadow-sm transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      ) : (
        /* Product Cards Grid / List */
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5"
              : "flex flex-col gap-4"
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
