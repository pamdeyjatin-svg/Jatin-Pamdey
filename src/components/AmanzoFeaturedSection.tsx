import React, { useState } from 'react';
import {
  ArrowRight,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
} from 'lucide-react';
import { Product } from '../types/amanzo';

interface AmanzoFeaturedSectionProps {
  featuredProduct: Product;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (productId: string | number) => void;
  isInWishlist: boolean;
  onViewProductDetail: (product: Product) => void;
  onExploreDeals: () => void;
  language: 'en' | 'hi';
  onToast: (msg: string) => void;
}

export const AmanzoFeaturedSection: React.FC<AmanzoFeaturedSectionProps> = ({
  featuredProduct,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onViewProductDetail,
  onExploreDeals,
  language,
  onToast,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    featuredProduct.sizes[0] || 'UK 8'
  );
  const [shared, setShared] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      onToast(
        language === 'en'
          ? 'Link copied to clipboard!'
          : 'लिंक कॉपी कर लिया गया!'
      );
      setTimeout(() => setShared(false), 2500);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      {/* Section Header with Yellow Accent Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-[#FFC400] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            {language === 'en' ? 'Featured Products' : 'खास प्रोडक्ट्स'}
          </h2>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E6AC00] hover:text-[#B38600] transition-colors cursor-pointer"
        >
          <span>{language === 'en' ? 'View All' : 'सभी देखें'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Grid: Left Hot Deal Spotlight Card + Right Lifestyle Promo Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Featured Card (Black Sneakers Hot Deal) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row relative">
          {/* Hot Deal Badge at Top-Left (Exact screenshot detail) */}
          <div className="absolute top-4 left-4 z-10 bg-[#DC2626] text-white text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <span>{featuredProduct.badge || 'Hot Deal 🔥'}</span>
          </div>

          {/* Product Image Stage */}
          <div
            onClick={() => onViewProductDetail(featuredProduct)}
            className="md:w-1/2 bg-neutral-50 relative flex items-center justify-center p-6 cursor-pointer overflow-hidden group"
          >
            <img
              src={featuredProduct.image}
              alt={featuredProduct.name}
              className="w-full h-64 md:h-full object-contain filter group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Product Details & Actions */}
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h3
                onClick={() => onViewProductDetail(featuredProduct)}
                className="text-2xl font-black text-neutral-900 tracking-tight cursor-pointer hover:text-[#B38600] transition-colors"
              >
                {language === 'en'
                  ? featuredProduct.name
                  : featuredProduct.nameHi || featuredProduct.name}
              </h3>

              {/* Star Rating & Review Count */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-800">
                  {featuredProduct.rating}
                </span>
                <span className="text-xs text-neutral-400">
                  ({(featuredProduct.reviewsCount / 1000).toFixed(1)}k Reviews)
                </span>
              </div>

              {/* Price Row: ₹2,099 ₹3,499 40% OFF */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-black text-[#DC2626] tracking-tight">
                  ₹{featuredProduct.price.toLocaleString('en-IN')}
                </span>
                <span className="text-base text-neutral-400 line-through font-semibold">
                  ₹{featuredProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="bg-[#DC2626] text-white text-[11px] font-black px-2 py-0.5 rounded-full">
                  {featuredProduct.discountPercent}% OFF
                </span>
              </div>

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-600 mb-1.5">
                  <span>{language === 'en' ? 'Select Size (UK):' : 'साइज़ चुनें (UK):'}</span>
                  <span className="text-[#E6AC00] font-bold">Standard Fit</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featuredProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#111111] text-white shadow-xs'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA & Sub-actions */}
            <div className="space-y-3 mt-6">
              {/* Big Yellow Add to Cart Button (Screenshot style) */}
              <button
                onClick={() => onAddToCart(featuredProduct, selectedSize)}
                className="w-full bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-md shadow-[#FFC400]/25 cursor-pointer text-base"
              >
                <ShoppingCart className="w-5 h-5 text-black" />
                <span>{language === 'en' ? 'Add to Cart' : 'कार्ट में जोड़ें'}</span>
              </button>

              {/* Sub-actions: Add to Wishlist & Share */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  onClick={() => onToggleWishlist(featuredProduct.id)}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isInWishlist
                        ? 'fill-red-500 text-red-500'
                        : 'text-neutral-500'
                    }`}
                  />
                  <span>
                    {isInWishlist
                      ? language === 'en'
                        ? 'In Wishlist'
                        : 'विशलिस्ट में है'
                      : language === 'en'
                      ? 'Add to Wishlist'
                      : 'विशलिस्ट में जोड़ें'}
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors cursor-pointer"
                >
                  {shared ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Share2 className="w-4 h-4 text-neutral-500" />
                  )}
                  <span>{shared ? 'Copied!' : language === 'en' ? 'Share' : 'शेयर'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Lifestyle Promo Banner (Big Shopping Big Savings) */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#111111] via-[#1a1a1a] to-[#262626] border border-neutral-800 shadow-xs flex flex-col justify-between p-6 sm:p-8 min-h-[340px] text-white">
          {/* Background Model Photo */}
          <img
            src="/src/assets/images/promo_lifestyle_shopper_1793854473090.jpg"
            alt="Big Shopping Big Savings"
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity filter contrast-125"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />

          {/* Headline & CTA */}
          <div className="relative z-10 max-w-xs space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#FFC400]">
              Special Campaign
            </span>
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Big Shopping <br />
              <span className="text-[#FFC400]">Big Savings</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed">
              {language === 'en'
                ? 'Get up to 60% OFF on trending sneakers, sports runners, and lifestyle footwear.'
                : 'ट्रेंडिंग स्नीकर्स और जूतों पर पाएँ 60% तक भारी बचत।'}
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <button
              onClick={onExploreDeals}
              className="inline-flex items-center gap-2 bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black text-xs sm:text-sm px-6 py-3 rounded-full transition-all transform hover:scale-[1.02] shadow-lg shadow-black/40 cursor-pointer"
            >
              <span>{language === 'en' ? 'Explore Deals' : 'ऑफ़र्स देखें'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
