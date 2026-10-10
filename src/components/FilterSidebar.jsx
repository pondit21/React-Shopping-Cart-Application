import React from "react";
import { Star, RotateCcw, Filter, Check, ChevronRight } from "lucide-react";

export function FilterSidebar({
  filters,
  setFilters,
  onResetFilters,
  availableProcessors,
  availableRams,
  availableGpus,
  activeFilterCount,
  onCloseMobile
}) {
  const handleProcessorChange = (proc) => {
    setFilters(prev => {
      const exists = prev.processors.includes(proc);
      return {
        ...prev,
        processors: exists
          ? prev.processors.filter(p => p !== proc)
          : [...prev.processors, proc]
      };
    });
  };

  const handleRamChange = (ram) => {
    setFilters(prev => {
      const exists = prev.rams.includes(ram);
      return {
        ...prev,
        rams: exists
          ? prev.rams.filter(r => r !== ram)
          : [...prev.rams, ram]
      };
    });
  };

  const handleGpuChange = (gpu) => {
    setFilters(prev => {
      const exists = prev.gpus.includes(gpu);
      return {
        ...prev,
        gpus: exists
          ? prev.gpus.filter(g => g !== gpu)
          : [...prev.gpus, gpu]
      };
    });
  };

  const handlePriceMaxChange = (e) => {
    setFilters(prev => ({
      ...prev,
      maxPrice: Number(e.target.value)
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  return (
    <aside className="w-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-6 text-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-base text-slate-900">Filter Products</h3>
          {activeFilterCount > 0 && (
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-semibold">
              {activeFilterCount} active
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 hover:underline"
            title="Clear all filters"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">Price Range</span>
          <span className="font-bold text-amber-600 text-sm">
            Up to ${filters.maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="600"
          max="2500"
          step="50"
          value={filters.maxPrice}
          onChange={handlePriceMaxChange}
          className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
        />

        <div className="flex justify-between text-xs text-slate-400 font-medium">
          <span>$600</span>
          <span>$1500</span>
          <span>$2500</span>
        </div>

        {/* Quick Price Preset Chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <button
            onClick={() => setFilters(prev => ({ ...prev, maxPrice: 900 }))}
            className={`text-xs px-2 py-1 rounded-md border transition-colors ${
              filters.maxPrice === 900
                ? "bg-amber-50 border-amber-400 text-amber-900 font-bold"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            Under $900
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, maxPrice: 1500 }))}
            className={`text-xs px-2 py-1 rounded-md border transition-colors ${
              filters.maxPrice === 1500
                ? "bg-amber-50 border-amber-400 text-amber-900 font-bold"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            Under $1500
          </button>
          <button
            onClick={() => setFilters(prev => ({ ...prev, maxPrice: 2500 }))}
            className={`text-xs px-2 py-1 rounded-md border transition-colors ${
              filters.maxPrice === 2500
                ? "bg-amber-50 border-amber-400 text-amber-900 font-bold"
                : "border-slate-200 hover:bg-slate-50 text-slate-600"
            }`}
          >
            All Prices
          </button>
        </div>
      </div>

      {/* Processor Architecture Filter */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="font-semibold text-sm text-slate-900">Processor / CPU</h4>
        <div className="space-y-1.5">
          {availableProcessors.map(proc => {
            const isChecked = filters.processors.includes(proc);
            return (
              <label
                key={proc}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleProcessorChange(proc)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 accent-amber-500 w-4 h-4 cursor-pointer"
                />
                <span className={isChecked ? "font-bold text-slate-900" : ""}>{proc}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* RAM Capacity Filter */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="font-semibold text-sm text-slate-900">RAM Size</h4>
        <div className="flex flex-wrap gap-2">
          {availableRams.map(ram => {
            const isSelected = filters.rams.includes(ram);
            return (
              <button
                key={ram}
                type="button"
                onClick={() => handleRamChange(ram)}
                className={`px-2.5 py-1 text-xs rounded-md border font-medium transition-all ${
                  isSelected
                    ? "bg-amber-500 border-amber-500 text-slate-950 font-bold shadow-sm"
                    : "border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50"
                }`}
              >
                {ram}
              </button>
            );
          })}
        </div>
      </div>

      {/* Graphics Processor (GPU) Filter */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="font-semibold text-sm text-slate-900">Graphics (GPU)</h4>
        <div className="space-y-1.5">
          {availableGpus.map(gpu => {
            const isChecked = filters.gpus.includes(gpu);
            return (
              <label
                key={gpu}
                className="flex items-center gap-2.5 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleGpuChange(gpu)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400 accent-amber-500 w-4 h-4 cursor-pointer"
                />
                <span className={isChecked ? "font-bold text-slate-900" : ""}>{gpu}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Customer Reviews Rating Filter */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h4 className="font-semibold text-sm text-slate-900">Customer Rating</h4>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5].map((rating) => {
            const isSelected = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors ${
                  isSelected
                    ? "bg-amber-50 text-amber-900 font-bold border border-amber-300"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-1">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.floor(rating)
                            ? "fill-amber-400 text-amber-400"
                            : star - 0.5 <= rating
                            ? "fill-amber-400/50 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-1">& Up</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Close Button */}
      {onCloseMobile && (
        <div className="pt-4 border-t border-slate-100 lg:hidden">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
          >
            Apply & View Results
          </button>
        </div>
      )}
    </aside>
  );
}

export default FilterSidebar;
