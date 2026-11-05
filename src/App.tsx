/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Check, ArrowUp } from 'lucide-react';
import { Product, CartItem, Order, ProductCategory } from './types/amanzo';
import { INITIAL_PRODUCTS } from './data/amanzoData';

import { AmanzoTopBar } from './components/AmanzoTopBar';
import { AmanzoHeader } from './components/AmanzoHeader';
import { AmanzoHero } from './components/AmanzoHero';
import { AmanzoCategoryRail } from './components/AmanzoCategoryRail';
import { AmanzoFeaturedSection } from './components/AmanzoFeaturedSection';
import { AmanzoProductGrid } from './components/AmanzoProductGrid';
import { AmanzoTrustBadges } from './components/AmanzoTrustBadges';
import { AmanzoNewsletter } from './components/AmanzoNewsletter';
import { AmanzoFooter } from './components/AmanzoFooter';

import { AmanzoCartDrawer } from './components/AmanzoCartDrawer';
import { AmanzoCheckoutModal } from './components/AmanzoCheckoutModal';
import { AmanzoAdminModal } from './components/AmanzoAdminModal';
import { AmanzoOrderTrackingModal } from './components/AmanzoOrderTrackingModal';
import { AmanzoProductDetailModal } from './components/AmanzoProductDetailModal';
import { AmanzoWishlistDrawer } from './components/AmanzoWishlistDrawer';

export default function App() {
  // Localization: English ('en') or Hindi ('hi')
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  // Products state with LocalStorage persistence (matching prompt requirements)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('amanzo_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse local products', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amanzo_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse cart', e);
    }
    return [];
  });

  // Wishlist state with LocalStorage persistence
  const [wishlistIds, setWishlistIds] = useState<(string | number)[]>(() => {
    try {
      const saved = localStorage.getItem('amanzo_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse wishlist', e);
    }
    return [1]; // default has Black Sneakers saved
  });

  // Recent Orders with LocalStorage persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amanzo_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse orders', e);
    }
    return [];
  });

  // Navigation & Filtering State
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');

  // Modals Visibility
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<any>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('amanzo_products', JSON.stringify(products));
    } catch (e) {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('amanzo_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('amanzo_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('amanzo_orders', JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);

  // Cart operations
  const handleAddToCart = (product: Product, size?: string) => {
    const chosenSize = size || product.sizes?.[0] || 'UK 8';
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.selectedSize === chosenSize
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${chosenSize}-${Date.now()}`,
          productId: product.id,
          product,
          selectedSize: chosenSize,
          qty: 1,
        },
      ];
    });

    showToast(
      language === 'en'
        ? `Added "${product.name}" (${chosenSize}) to cart!`
        : `"${product.name}" (${chosenSize}) कार्ट में जोड़ दिया गया!`
    );
  };

  const handleUpdateCartQty = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, qty: newQty } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast(language === 'en' ? 'Item removed from cart.' : 'आइटम कार्ट से हटाया गया।');
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string | number) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(
          language === 'en' ? 'Removed from Wishlist' : 'विशलिस्ट से हटाया गया'
        );
        return prev.filter((id) => id !== productId);
      } else {
        showToast(
          language === 'en' ? 'Saved to Wishlist ❤️' : 'विशलिस्ट में जोड़ा गया ❤️'
        );
        return [...prev, productId];
      }
    });
  };

  // Admin Catalog management
  const handleSaveProduct = (prodData: Partial<Product>) => {
    setProducts((prev) => {
      const existsIndex = prev.findIndex((p) => p.id === prodData.id);
      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex] = { ...updated[existsIndex], ...prodData } as Product;
        showToast(
          language === 'en' ? 'Product updated successfully!' : 'प्रोडक्ट अपडेट हो गया!'
        );
        return updated;
      } else {
        showToast(
          language === 'en' ? 'New product saved to catalog!' : 'नया प्रोडक्ट सेव हो गया!'
        );
        return [prodData as Product, ...prev];
      }
    });
  };

  const handleDeleteProduct = (id: string | number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(
      language === 'en' ? 'Product removed from store.' : 'प्रोडक्ट स्टोर से हटा दिया गया।'
    );
  };

  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('amanzo_products');
    showToast(
      language === 'en'
        ? 'Restored default AMANZO catalog!'
        : 'डिफ़ॉल्ट AMANZO कैटलॉग रीसेट कर दिया गया!'
    );
  };

  // Order placement
  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    showToast(
      language === 'en'
        ? `Order #${order.orderId} Placed Successfully!`
        : `ऑर्डर #${order.orderId} सफलतापूर्वक दर्ज हुआ!`
    );
  };

  // Spotlight Product (Black Sneakers or first hot deal)
  const spotlightProduct =
    products.find((p) => p.id === 1) ||
    products.find((p) => p.isHotDeal) ||
    products[0] ||
    INITIAL_PRODUCTS[0];

  const totalCartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111111] font-sans relative selection:bg-[#FFC400] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 bg-[#111111] text-white px-5 py-3.5 rounded-xl shadow-2xl text-xs sm:text-sm font-semibold flex items-center gap-3 border border-[#FFC400]/40 animate-in fade-in slide-in-from-bottom-3">
          <div className="w-5 h-5 rounded-full bg-[#FFC400] text-black flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Black Trust Notification Strip */}
      <AmanzoTopBar
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'))
        }
      />

      {/* Main Sticky Header & Category Ribbon */}
      <AmanzoHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onSelectCategory={setSelectedCategory}
        activeNav={activeNav}
        onNavClick={setActiveNav}
        language={language}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. HERO BANNER: "Step Up Your Style" (Screenshot matching) */}
        <AmanzoHero
          onShopNow={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          language={language}
        />

        {/* 2. SHOP BY CATEGORY: Circular Cards (Screenshot matching) */}
        <AmanzoCategoryRail
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />

        {/* 3. FEATURED PRODUCTS & PROMO SPLIT: Hot Deal Black Sneakers + Big Savings Banner */}
        <AmanzoFeaturedSection
          featuredProduct={spotlightProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          isInWishlist={wishlistIds.includes(spotlightProduct.id)}
          onViewProductDetail={(p) => setSelectedProductForDetail(p)}
          onExploreDeals={() => {
            setSelectedCategory('All');
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          language={language}
          onToast={showToast}
        />

        {/* 4. ALL PRODUCTS CATALOG GRID with Filter Chips, Sort, & Live Search */}
        <AmanzoProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onViewDetail={(p) => setSelectedProductForDetail(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          language={language}
        />

        {/* 5. TRUST BADGES 4 PILLARS (Screenshot matching) */}
        <AmanzoTrustBadges language={language} />

        {/* 6. NEWSLETTER SUBSCRIPTION (Screenshot matching) */}
        <AmanzoNewsletter language={language} />
      </main>

      {/* 7. FOOTER with Payment Methods & Copyright (Screenshot matching) */}
      <AmanzoFooter
        onNavClick={setActiveNav}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        language={language}
      />

      {/* Floating Action Button (FAB) for Store Management (from user's HTML prompt: .admin-fab) */}
      <button
        onClick={() => setIsAdminOpen(true)}
        className="fixed right-4 bottom-5 sm:right-6 sm:bottom-6 bg-[#111111] hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 z-40 border border-[#FFC400]/40 cursor-pointer transition-all hover:scale-105 active:scale-95"
        title="स्टोर मैनेजमेंट / Manage Products"
      >
        <Settings className="w-4 h-4 text-[#FFC400]" />
        <span>
          {language === 'en' ? '⚙ Manage Store' : '⚙ प्रोडक्ट मैनेज करें'}
        </span>
      </button>

      {/* --- Interactive Modals & Drawers --- */}

      {/* Cart Drawer */}
      <AmanzoCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        language={language}
      />

      {/* Checkout Modal */}
      <AmanzoCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onPlaceOrderSuccess={handleOrderSuccess}
        language={language}
      />

      {/* Store Management / Admin Modal */}
      <AmanzoAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onSaveProduct={handleSaveProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetCatalog={handleResetCatalog}
        language={language}
      />

      {/* Order Tracking Modal */}
      <AmanzoOrderTrackingModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        recentOrders={orders}
        language={language}
      />

      {/* Product Detail Modal */}
      <AmanzoProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={
          selectedProductForDetail
            ? wishlistIds.includes(selectedProductForDetail.id)
            : false
        }
        language={language}
      />

      {/* Wishlist Drawer */}
      <AmanzoWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        language={language}
      />
    </div>
  );
}
