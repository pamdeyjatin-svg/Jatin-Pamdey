import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/amanzo';

interface AmanzoWishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onAddToCart: (product: Product, size?: string) => void;
  onRemoveFromWishlist: (productId: string | number) => void;
  language: 'en' | 'hi';
}

export const AmanzoWishlistDrawer: React.FC<AmanzoWishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onAddToCart,
  onRemoveFromWishlist,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <Heart className="w-4 h-4 text-red-600 fill-red-600" />
              </div>
              <div>
                <h2 className="text-base font-black text-neutral-900 tracking-tight">
                  {language === 'en' ? 'My Wishlist' : 'मेरी विशलिस्ट'}
                </h2>
                <span className="text-xs text-neutral-500">
                  {wishlistProducts.length} {language === 'en' ? 'saved items' : 'पसंदीदा सामान'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center text-neutral-500 space-y-3">
                <div className="text-5xl">❤️</div>
                <p className="text-sm font-semibold text-neutral-800">
                  {language === 'en' ? 'Your wishlist is empty' : 'आपकी विशलिस्ट खाली है'}
                </p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  {language === 'en'
                    ? 'Save your favorite sneakers and footwear by tapping the heart icon.'
                    : 'पसंदीदा जूतों को दिल के आइकन पर क्लिक करके यहाँ सेव करें।'}
                </p>
              </div>
            ) : (
              wishlistProducts.map((p) => (
                <div key={p.id} className="py-4 flex gap-3.5 items-center">
                  <div className="w-16 h-16 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-2xl">{p.emoji || '👟'}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {p.name}
                    </h4>
                    <div className="text-xs font-black text-neutral-900 mt-1">
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onAddToCart(p, p.sizes?.[0] || 'UK 8');
                        onRemoveFromWishlist(p.id);
                      }}
                      className="bg-[#FFC400] hover:bg-[#F0B800] text-black font-bold text-xs p-2 rounded-lg flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Add</span>
                    </button>

                    <button
                      onClick={() => onRemoveFromWishlist(p.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-neutral-200 bg-neutral-50">
            <button
              onClick={onClose}
              className="w-full bg-[#111111] hover:bg-black text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs"
            >
              <span>{language === 'en' ? 'Explore More Shoes' : 'और जूते देखें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
