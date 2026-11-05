import React, { useState } from 'react';
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  Settings,
  Sparkles,
} from 'lucide-react';
import { AmanzoLogo } from './AmanzoLogo';
import { ProductCategory } from '../types/amanzo';

interface AmanzoHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  language: 'en' | 'hi';
}

export const AmanzoHeader: React.FC<AmanzoHeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  onOpenTrackOrder,
  onSelectCategory,
  activeNav,
  onNavClick,
  language,
}) => {
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  const categories: { label: string; labelHi: string; value: ProductCategory }[] = [
    { label: 'All Footwear & Goods', labelHi: 'सभी प्रोडक्ट्स', value: 'All' },
    { label: 'Sneakers', labelHi: 'स्नीकर्स', value: 'Sneakers' },
    { label: 'Sports Shoes', labelHi: 'स्पोर्ट्स शूज़', value: 'Sports Shoes' },
    { label: 'Casual Shoes', labelHi: 'कैज़ुअल शूज़', value: 'Casual Shoes' },
    { label: 'Running Shoes', labelHi: 'रनिंग शूज़', value: 'Running Shoes' },
    { label: 'Boots', labelHi: 'बूट्स', value: 'Boots' },
    { label: 'Canvas Shoes', labelHi: 'कैनवास शूज़', value: 'Canvas Shoes' },
    { label: 'Fashion & Apparel', labelHi: 'फैशन व कपड़े', value: 'Fashion' },
    { label: 'Other Accessories', labelHi: 'अन्य सामग्री', value: 'Other' },
  ];

  const navLinks = [
    { id: 'home', label: 'Home', labelHi: 'होम' },
    { id: 'shop', label: 'Shop', labelHi: 'शॉप' },
    { id: 'offers', label: 'Offers', labelHi: 'ऑफ़र्स' },
    { id: 'blog', label: 'Blog', labelHi: 'ब्लॉग' },
    { id: 'track-order', label: 'Track Order', labelHi: 'ट्रैक ऑर्डर' },
    { id: 'contact', label: 'Contact', labelHi: 'संपर्क' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3.5 flex items-center justify-between gap-4 lg:gap-8">
        {/* Brand Logo */}
        <button
          onClick={() => {
            onNavClick('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left cursor-pointer focus:outline-hidden"
        >
          <AmanzoLogo
            tagline={language === 'en' ? 'Your World, Your Shopping.' : 'आपका अपना स्टोर'}
          />
        </button>

        {/* Search Bar (Screenshot style: rounded pill with black circular search button on the right) */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-auto relative items-center">
          <div className="w-full relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Search for shoes, sneakers, brands...'
                  : 'प्रोडक्ट या जूते खोजें...'
              }
              className="w-full py-2.5 pl-5 pr-14 bg-white border border-neutral-300 rounded-full text-sm text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/20 transition-all shadow-inner"
            />
            <button
              onClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute right-1 top-1 bottom-1 w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Action Icons: Account, Wishlist, Cart, Admin */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Admin / Store Manager button (Requested in prompt HTML) */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-[#FFC400]/20 hover:text-neutral-900 transition-colors border border-neutral-200 cursor-pointer"
            title="स्टोर मैनेजमेंट / Manage Store Products"
          >
            <Settings className="w-3.5 h-3.5 text-[#E6AC00]" />
            <span className="hidden md:inline">
              {language === 'en' ? 'Store Manager' : 'स्टोर मैनेज'}
            </span>
          </button>

          {/* Account Icon */}
          <button
            onClick={() => onOpenTrackOrder()}
            className="p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-100 cursor-pointer relative"
            title="My Orders & Profile"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            className="p-2 text-neutral-700 hover:text-black transition-colors rounded-full hover:bg-neutral-100 cursor-pointer relative"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#FFC400] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            onClick={onOpenCart}
            className="p-2 text-neutral-800 hover:text-black transition-colors rounded-full hover:bg-neutral-100 cursor-pointer relative"
            title="View Cart"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 bg-[#DC2626] text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs ring-2 ring-white">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar below header */}
      <div className="sm:hidden px-4 pb-2.5">
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              language === 'en' ? 'Search for shoes...' : 'प्रोडक्ट खोजें...'
            }
            className="w-full py-2 pl-4 pr-12 bg-white border border-neutral-300 rounded-full text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden focus:border-[#FFC400]"
          />
          <button
            onClick={() => {
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="absolute right-1 w-7 h-7 rounded-full bg-[#111111] text-white flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Strip (Yellow All Categories button + Home, Shop, Offers, Blog, Track Order, Contact) */}
      <div className="border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto py-1.5 scrollbar-none">
            {/* All Categories Dropdown Button (Exact Yellow Button from Screenshot) */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-xs cursor-pointer select-none"
              >
                <Menu className="w-4 h-4 text-black" />
                <span>{language === 'en' ? 'All Categories' : 'सभी कैटेगरी'}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    categoriesDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Categories Dropdown Menu */}
              {categoriesDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                    {language === 'en' ? 'Browse Departments' : 'कैटेगरी चुनें'}
                  </div>
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => {
                        onSelectCategory(cat.value);
                        setCategoriesDropdownOpen(false);
                        const el = document.getElementById('products-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-[#FFC400]/15 hover:text-black flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{language === 'en' ? cat.label : cat.labelHi}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Nav Links with Subtle Dividers */}
            <nav className="flex items-center gap-1 sm:gap-4 md:gap-6 text-xs sm:text-sm font-semibold text-neutral-700 whitespace-nowrap">
              {navLinks.map((link, idx) => {
                const isActive = activeNav === link.id;
                return (
                  <React.Fragment key={link.id}>
                    {idx > 0 && <span className="text-neutral-300 font-normal">|</span>}
                    <button
                      onClick={() => {
                        onNavClick(link.id);
                        if (link.id === 'track-order') {
                          onOpenTrackOrder();
                        } else if (link.id === 'shop' || link.id === 'offers') {
                          const el = document.getElementById('products-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else if (link.id === 'contact') {
                          const el = document.getElementById('footer-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else if (link.id === 'home') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative py-2.5 px-1 sm:px-2 cursor-pointer transition-colors ${
                        isActive
                          ? 'text-[#111111]'
                          : 'text-neutral-600 hover:text-black'
                      }`}
                    >
                      {language === 'en' ? link.label : link.labelHi}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FFC400] rounded-t-sm" />
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </nav>
          </div>

          {/* Right Promotional Offer tag in Nav */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-600 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#E6AC00]" />
            <span>
              {language === 'en'
                ? 'Use code STEPUP20 for 20% OFF'
                : 'कोड STEPUP20 से पाएँ 20% छूट'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
