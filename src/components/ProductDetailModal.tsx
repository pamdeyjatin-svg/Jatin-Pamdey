import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Sparkles, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product, StyleProfile, ProductColor } from '../types';
import { calculateStyleMatch, getComplementaryItems } from '../utils/styleEngine';
import { STYLE_ARCHETYPES_INFO } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  styleProfile: StyleProfile;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  styleProfile,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen || !product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [addedNotice, setAddedNotice] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const match = calculateStyleMatch(product, styleProfile);
  const complementaryItems = getComplementaryItems(product);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleAddCompleteLook = () => {
    // Add main item
    onAddToCart(product, selectedSize, selectedColor);
    // Add complementary items
    complementaryItems.forEach((item) => {
      onAddToCart(item, item.sizes[0], item.colors[0]);
    });
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const totalLookPrice = product.price + complementaryItems.reduce((acc, cur) => acc + cur.price, 0);
  const discountedLookPrice = Math.round(totalLookPrice * 0.9); // 10% bundle saving

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>SKU: {product.id.toUpperCase()}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with 2-Column Split */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Gallery Left (5 cols) */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Style Compatibility Tag */}
                <div className="absolute top-3 left-3 bg-stone-900/95 text-stone-50 px-2.5 py-1 rounded text-xs font-mono font-medium flex items-center gap-1.5 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{match.score}% Style Match</span>
                </div>
              </div>

              {/* Material Trust Callout */}
              <div className="p-3.5 bg-stone-100/80 border border-stone-200 rounded-lg text-xs space-y-1">
                <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-stone-700" />
                  <span>Artisanal Specification</span>
                </div>
                <p className="text-stone-600">
                  {product.material} · Sourced ethically and hand-inspected before shipment.
                </p>
              </div>
            </div>

            {/* Contiguous Purchase Module Right (6 cols) */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold text-stone-950 tracking-tight">
                  {product.name}
                </h2>

                <div className="flex items-center gap-3 mt-2">
                  <span className="font-mono text-xl font-bold text-stone-950 tabular-nums">
                    {product.currency}
                    {product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-sm text-stone-400 line-through tabular-nums">
                      {product.currency}
                      {product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-stone-500 font-mono">
                    (Incl. all taxes)
                  </span>
                </div>
              </div>

              {/* Personalized Style Match Analysis */}
              <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-amber-950">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Why this matches your {STYLE_ARCHETYPES_INFO[styleProfile.archetype].label} profile
                  </span>
                  <span className="font-mono text-[11px] font-bold text-amber-800">
                    {match.score}%
                  </span>
                </div>
                <ul className="text-xs text-amber-900/80 space-y-1 pl-4 list-disc marker:text-amber-500">
                  {match.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">Color:</span>
                  <span className="text-stone-600 font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-2xs font-semibold'
                            : 'border-stone-200 bg-white/70 hover:border-stone-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/15 shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-900">Select Size:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-stone-600 hover:text-stone-950 underline underline-offset-2 font-mono text-[11px] cursor-pointer"
                  >
                    {showSizeGuide ? 'Hide Sizing' : 'Size Guide'}
                  </button>
                </div>

                {showSizeGuide && (
                  <div className="p-3 bg-stone-100 rounded-lg text-[11px] font-mono text-stone-600 space-y-1 border border-stone-200">
                    <div>XS: Chest 36" | S: Chest 38" | M: Chest 40" | L: Chest 42" | XL: Chest 44"</div>
                    <div>Footwear fits true to UK/European sizing. Half-sizes should size up.</div>
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-mono font-medium rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-stone-50 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-stone-400 text-stone-800'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description & Product Details */}
              <div className="space-y-2 pt-1 border-t border-stone-200">
                <p className="text-xs text-stone-700 leading-relaxed">
                  {product.description}
                </p>
                <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc marker:text-stone-400">
                  {product.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Purchase Actions */}
              <div className="pt-2 space-y-2.5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{addedNotice ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'border-rose-300 bg-rose-50 text-rose-600'
                        : 'border-stone-300 bg-white hover:border-stone-400 text-stone-700'
                    }`}
                    title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                  </button>
                </div>

                {/* Delivery & Trust markers */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-stone-500 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-stone-700" />
                    <span>Free express delivery</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
                    <span>14-day seamless exchange</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COMPLETE THE LOOK MODULE */}
          {complementaryItems.length > 0 && (
            <div className="mt-10 pt-8 border-t border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <h3 className="font-display font-bold text-base text-stone-900">
                      Complete The Look
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Harmonized pairings from our Shoes &amp; Accessories rotation for this piece.
                  </p>
                </div>

                <button
                  onClick={handleAddCompleteLook}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-900 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    Add Entire Look ({product.currency}
                    {discountedLookPrice.toLocaleString('en-IN')})
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-950 px-1 rounded font-mono font-bold">
                    Save 10%
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {complementaryItems.map((comp) => (
                  <div
                    key={comp.id}
                    onClick={() => onSelectProduct(comp)}
                    className="p-3 bg-white border border-stone-200 rounded-xl flex items-center gap-3 cursor-pointer hover:border-stone-400 transition-all group"
                  >
                    <img
                      src={comp.image}
                      alt={comp.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase text-stone-400">
                        {comp.category}
                      </div>
                      <div className="text-xs font-semibold text-stone-900 truncate group-hover:text-stone-700">
                        {comp.name}
                      </div>
                      <div className="text-xs font-mono font-medium text-stone-950 tabular-nums mt-0.5">
                        {comp.currency}
                        {comp.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
