import React from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types/amanzo';

interface AmanzoProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size?: string) => void;
  onViewDetail: (product: Product) => void;
  onToggleWishlist: (productId: string | number) => void;
  isInWishlist: boolean;
  language: 'en' | 'hi';
}

export const AmanzoProductCard: React.FC<AmanzoProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetail,
  onToggleWishlist,
  isInWishlist,
  language,
}) => {
  return (
    <article className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Image Container */}
        <div className="relative h-52 sm:h-56 bg-neutral-100 flex items-center justify-center p-4 overflow-hidden">
          {/* Discount / Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 bg-[#DC2626] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs hover:bg-white transition-all cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isInWishlist ? 'fill-red-500 text-red-500' : 'text-neutral-500 hover:text-black'
              }`}
            />
          </button>

          {/* Product Image */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain filter group-hover:scale-108 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onClick={() => onViewDetail(product)}
            />
          ) : (
            <div
              onClick={() => onViewDetail(product)}
              className="text-6xl flex items-center justify-center cursor-pointer select-none"
            >
              {product.emoji || '👟'}
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-5">
          {/* Category */}
          <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
            {product.category}
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetail(product)}
            className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#E6AC00] transition-colors line-clamp-1 cursor-pointer"
            title={product.name}
          >
            {language === 'en' ? product.name : product.nameHi || product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-xs font-bold text-neutral-800">
              {product.rating}
            </span>
            <span className="text-xs text-neutral-400">
              ({product.reviewsCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-lg sm:text-xl font-black text-neutral-900 tracking-tight">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xs text-neutral-400 line-through font-medium">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-bold text-emerald-600">
                  {product.discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Description snippet */}
          {product.desc && (
            <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
              {product.desc}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons matching user's html (.add and .details) */}
      <div className="p-4 pt-0 flex gap-2">
        <button
          onClick={() => onAddToCart(product, product.sizes?.[0] || 'UK 8')}
          className="flex-1 bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
        >
          <ShoppingCart className="w-3.5 h-3.5 text-black" />
          <span>{language === 'en' ? 'Add to Cart' : 'कार्ट में जोड़ें'}</span>
        </button>

        <button
          onClick={() => onViewDetail(product)}
          className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs py-2.5 px-3 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
          title="Product Details"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="ml-1 hidden sm:inline">
            {language === 'en' ? 'Details' : 'विवरण'}
          </span>
        </button>
      </div>
    </article>
  );
};
