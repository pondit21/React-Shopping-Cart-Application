import React from "react";
import { ChevronUp, Globe, DollarSign } from "lucide-react";
import { useCart } from "../context/CartContext";

export function Footer() {
  const { navigateTo } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#232F3E] text-slate-300 text-xs mt-16">
      {/* Back to Top Bar */}
      <button
        onClick={scrollToTop}
        className="w-full py-3 bg-[#37475A] hover:bg-[#485769] text-white font-semibold flex items-center justify-center gap-1.5 transition-colors"
        aria-label="Back to top"
      >
        <ChevronUp className="w-4 h-4" />
        <span>Back to top</span>
      </button>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">
            Get to Know Us
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><a href="#" className="hover:underline hover:text-white transition-colors">About Amazon Gaming</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Careers & Engineering</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Corporate Responsibility</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Amazon Science</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">
            Make Money with Us
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Sell Custom Gaming PCs</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Become an Affiliate</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Advertise Your Products</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Self-Publish with Us</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">
            Payment & Financing
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Amazon Business Card</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Shop with Reward Points</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Reload Your Balance</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Currency Converter</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-2 text-slate-300">
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Amazon and COVID-19</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Your Account & Orders</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Shipping Rates & Policies</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Returns & Replacements</a></li>
            <li><a href="#" className="hover:underline hover:text-white transition-colors">Help & 24/7 Support</a></li>
          </ul>
        </div>
      </div>

      {/* Middle Bar with Logo and Regional Selectors */}
      <div className="border-t border-slate-700 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={() => navigateTo("home")}
            className="flex items-center gap-1 font-black text-xl text-white mr-4"
          >
            <span>amazon</span>
            <span className="text-amber-400 text-xs font-bold uppercase ml-1">Gaming</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-slate-600 hover:border-slate-400 text-white cursor-pointer">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>English</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-slate-600 hover:border-slate-400 text-white cursor-pointer">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span>USD - U.S. Dollar</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded border border-slate-600 hover:border-slate-400 text-white cursor-pointer">
            <span>🇧🇩 Bangladesh Delivery</span>
          </div>
        </div>
      </div>

      {/* Copyright Bottom */}
      <div className="bg-[#131A22] py-6 text-center text-slate-400 text-[11px] space-y-2">
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#" className="hover:underline hover:text-white">Conditions of Use</a>
          <a href="#" className="hover:underline hover:text-white">Privacy Notice</a>
          <a href="#" className="hover:underline hover:text-white">Consumer Health Data Privacy</a>
          <a href="#" className="hover:underline hover:text-white">Your Ads Privacy Choices</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates. Built with React & Context API for Ostad Assignment.</p>
      </div>
    </footer>
  );
}

export default Footer;
