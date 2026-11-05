import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import { Product } from '../types/amanzo';

interface AmanzoProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  onToggleWishlist: (productId: string | number) => void;
  isInWishlist: boolean;
  language: 'en' | 'hi';
}

export const AmanzoProductDetailModal: React.FC<AmanzoProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  language,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0] || 'UK 8'
  );
  const [pincode, setPincode] = useState('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeMessage(
        language === 'en'
          ? 'Fast delivery available to ' + pincode + ' within 2-3 days!'
          : pincode + ' पर 2-3 दिनों में एक्सप्रेस डिलीवरी उपलब्ध है!'
      );
    } else {
      setPincodeMessage(
        language === 'en'
          ? 'Please enter a valid 6-digit Indian PIN code.'
          : 'कृपया मान्य 6 अंकों का पिनकोड दर्ज करें।'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 shrink-0">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
            {product.category}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-200 text-neutral-500 hover:text-black flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Image Stage */}
          <div className="space-y-4">
            <div className="w-full aspect-square bg-neutral-100 rounded-2xl border border-neutral-200 flex items-center justify-center p-6 overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain filter hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="text-8xl">{product.emoji || '👟'}</div>
              )}
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600">
              <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                <Truck className="w-4 h-4 text-[#E6AC00] mx-auto mb-1" />
                <span className="font-semibold">Free Delivery</span>
              </div>
              <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                <RotateCcw className="w-4 h-4 text-[#E6AC00] mx-auto mb-1" />
                <span className="font-semibold">7 Days Return</span>
              </div>
              <div className="bg-neutral-50 p-2 rounded-lg border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-[#E6AC00] mx-auto mb-1" />
                <span className="font-semibold">100% Genuine</span>
              </div>
            </div>
          </div>

          {/* Right Product Specifications */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2">
                {product.badge && (
                  <span className="bg-[#DC2626] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="text-xs text-emerald-600 font-bold">
                  ● In Stock (Express Dispatch)
                </span>
              </div>

              <h2 className="text-2xl font-black text-neutral-900 mt-1 tracking-tight">
                {language === 'en'
                  ? product.name
                  : product.nameHi || product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-neutral-900">
                  {product.rating}
                </span>
                <span className="text-xs text-neutral-400">
                  ({product.reviewsCount} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-black text-neutral-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-neutral-400 line-through font-semibold">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-extrabold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded-full">
                      {product.discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
              <div className="text-[11px] text-neutral-400 mt-0.5">
                Inclusive of all taxes & GST.
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-neutral-700 mb-2">
                <span>{language === 'en' ? 'Select Size (UK/India):' : 'साइज़ चुनें:'}</span>
                <span className="text-[#E6AC00]">Size Guide 📏</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                      selectedSize === sz
                        ? 'bg-[#111111] text-white shadow-sm ring-2 ring-[#FFC400]'
                        : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Description & Features */}
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                {language === 'en' ? 'Description' : 'विवरण'}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.desc}
              </p>

              {product.features && product.features.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs text-neutral-600">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Pincode Check Form */}
            <form onSubmit={handleCheckPincode} className="pt-2">
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'en' ? 'Delivery Availability' : 'डिलीवरी जांचें'}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode"
                  className="px-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                />
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  Check
                </button>
              </div>
              {pincodeMessage && (
                <div className="text-xs text-emerald-700 font-semibold mt-1.5">
                  {pincodeMessage}
                </div>
              )}
            </form>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-4 border-t border-neutral-200">
              <button
                onClick={() => {
                  onAddToCart(product, selectedSize);
                  onClose();
                }}
                className="flex-1 bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black py-3 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#FFC400]/25 transition-all cursor-pointer text-sm"
              >
                <ShoppingCart className="w-4 h-4 text-black" />
                <span>{language === 'en' ? 'Add to Cart' : 'कार्ट में जोड़ें'}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className="p-3 rounded-xl border border-neutral-300 hover:border-black text-neutral-700 transition-colors cursor-pointer"
                title="Wishlist"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isInWishlist ? 'fill-red-500 text-red-500' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
