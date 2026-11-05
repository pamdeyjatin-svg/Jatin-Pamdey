import React from 'react';
import { Heart, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product, StyleProfile, ProductColor } from '../types';
import { calculateStyleMatch } from '../utils/styleEngine';

interface ProductCardProps {
  product: Product;
  styleProfile: StyleProfile;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  styleProfile,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const match = calculateStyleMatch(product, styleProfile);
  const defaultColor = product.colors[0];
  const defaultSize = product.sizes[0];

  return (
    <div className="group relative bg-white border border-stone-200/90 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-stone-400 hover:shadow-md">
      {/* Product Image Slot */}
      <div
        onClick={() => onSelectProduct(product)}
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Heart Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-stone-950 hover:bg-white'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Style Match indicator (Unboxed subtle overlay, Top-Left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-stone-900/90 text-stone-50 text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{match.score}% Match</span>
        </div>

        {/* Stock / Limited run subtle indicator if any */}
        {product.stockStatus === 'low_stock' && (
          <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-stone-900 bg-amber-100/95 px-2 py-0.5 rounded backdrop-blur-xs">
            Only 3 Left
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Unboxed Metadata (Zero-Pill Rule) */}
          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.sizes.length} sizes</span>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="font-display font-semibold text-base text-stone-900 line-clamp-1 hover:text-stone-700 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Material & Style Match Reason */}
          <p className="text-xs text-stone-600 line-clamp-1 mt-1">
            {match.reasons[0] || product.material}
          </p>

          {/* Available Colors preview */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs inline-block"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[11px] font-mono text-stone-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="font-mono text-base font-bold text-stone-950 tabular-nums">
              {product.currency}
              {product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="ml-2 font-mono text-xs text-stone-400 line-through tabular-nums">
                {product.currency}
                {product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              title="View product specifications"
              aria-label="View product specifications"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => onQuickAdd(product, defaultSize, defaultColor)}
              className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Quick add to bag"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
