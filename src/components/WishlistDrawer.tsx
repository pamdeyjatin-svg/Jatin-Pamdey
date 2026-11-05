import React from 'react';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Product, StyleProfile, ProductColor } from '../types';
import { calculateStyleMatch } from '../utils/styleEngine';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  allProducts: Product[];
  styleProfile: StyleProfile;
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  allProducts,
  styleProfile,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-stone-900 fill-stone-900" />
              <h3 className="font-display font-bold text-base text-stone-900">
                Saved Wishlist
              </h3>
              <span className="text-xs font-mono text-stone-500">
                ({wishlistedProducts.length})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-base text-stone-900">
                  No saved items yet
                </h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Click the heart icon on any Kapda, footwear, or accessory item to save it for later reference.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => {
                const match = calculateStyleMatch(product, styleProfile);
                return (
                  <div
                    key={product.id}
                    className="p-3.5 bg-white border border-stone-200 rounded-xl flex gap-3 relative shadow-2xs"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                      className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0 cursor-pointer"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="font-display font-semibold text-xs text-stone-900 truncate cursor-pointer hover:text-stone-700"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] font-mono text-stone-500">
                        {product.categoryLabel} · {match.score}% Style Match
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-stone-950 tabular-nums">
                          {product.currency}{product.price.toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => {
                            onAddToCart(product, product.sizes[0], product.colors[0]);
                          }}
                          className="px-2.5 py-1 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
