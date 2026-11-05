import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { CartItem } from '../types/amanzo';

interface AmanzoCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  language: 'en' | 'hi';
}

export const AmanzoCartDrawer: React.FC<AmanzoCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
  language,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Subtotal
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // Free shipping threshold ₹999
  const FREE_SHIPPING_THRESHOLD = 999;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingFee = isFreeShipping || cart.length === 0 ? 0 : 99;

  const totalDiscount = couponDiscount;
  const grandTotal = Math.max(0, subtotal - totalDiscount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim().toUpperCase();
    if (code === 'STEPUP20' || code === 'AMANZO20') {
      const disc = Math.round(subtotal * 0.2);
      setAppliedCoupon(code);
      setCouponDiscount(disc);
      setCouponCode('');
    } else if (code === 'AMANZO10' || code === 'FIRST10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedCoupon(code);
      setCouponDiscount(disc);
      setCouponCode('');
    } else {
      setCouponError(
        language === 'en'
          ? 'Invalid coupon. Try STEPUP20 or AMANZO10'
          : 'अमान्य कूपन कोड। कृपया STEPUP20 या AMANZO10 आज़माएँ।'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Top Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FFC400]/20 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-neutral-900" />
              </div>
              <div>
                <h2 className="text-base font-black text-neutral-900 tracking-tight">
                  {language === 'en' ? 'Your Shopping Cart' : 'आपका कार्ट'}
                </h2>
                <span className="text-xs text-neutral-500">
                  {cart.reduce((sum, item) => sum + item.qty, 0)} {language === 'en' ? 'items' : 'आइटम'}
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

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-[#FFF9E6] border-b border-[#FFEAA7] text-xs">
            {isFreeShipping ? (
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'en'
                    ? '🎉 You have unlocked FREE Express Delivery!'
                    : '🎉 बधाई! आपके ऑर्डर पर फ्री डिलीवरी लागू हो गई है!'}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between font-semibold text-neutral-800 mb-1">
                  <span>
                    {language === 'en'
                      ? `Add ₹${amountNeededForFreeShipping} more for FREE shipping`
                      : `फ्री डिलीवरी के लिए ₹${amountNeededForFreeShipping} का सामान और जोड़ें`}
                  </span>
                  <span className="text-[11px] font-bold text-neutral-500">
                    ₹{subtotal}/₹{FREE_SHIPPING_THRESHOLD}
                  </span>
                </div>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#FFC400] h-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center text-neutral-500 space-y-3">
                <div className="text-5xl">🛍️</div>
                <p className="text-sm font-semibold text-neutral-800">
                  {language === 'en' ? 'Your cart is empty' : 'आपका कार्ट अभी खाली है।'}
                </p>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  {language === 'en'
                    ? 'Explore our hot sneakers and deals to add items to your cart.'
                    : 'स्टोर से अपनी पसंद के जूते चुनें और कार्ट में जोड़ें।'}
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#FFC400] hover:bg-[#F0B800] text-black text-xs font-bold px-5 py-2.5 rounded-full cursor-pointer transition-colors shadow-xs"
                >
                  {language === 'en' ? 'Shop Shoes Now' : 'शॉपिंग करें'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 items-center">
                  {/* Item Image */}
                  <div className="w-16 h-16 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-2xl">{item.product.emoji || '👟'}</span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-neutral-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      Size: <span className="font-semibold text-black">{item.selectedSize}</span>
                    </div>
                    <div className="text-xs font-black text-neutral-900 mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50 p-0.5 shrink-0">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-700 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-neutral-900">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="p-1 hover:bg-neutral-200 rounded text-neutral-700 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. STEPUP20)"
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-300 rounded-lg uppercase tracking-wider text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-black text-white text-xs font-bold px-3.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md font-semibold">
                  <span>Coupon {appliedCoupon} applied (-₹{couponDiscount})</span>
                  <button
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponDiscount(0);
                    }}
                    className="text-neutral-500 hover:text-red-600 text-[10px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponError && (
                <div className="text-xs text-red-600 font-medium">{couponError}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 border-t border-neutral-200 pt-3">
                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Subtotal' : 'सबटोटल'}</span>
                  <span className="font-semibold text-neutral-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>{language === 'en' ? 'Coupon Discount' : 'कूपन छूट'}</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>{language === 'en' ? 'Delivery Shipping' : 'डिलीवरी चार्ज'}</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-neutral-900 border-t border-neutral-200 pt-2">
                  <span>{language === 'en' ? 'Total Amount' : 'कुल राशि'}</span>
                  <span className="text-lg text-neutral-950 font-black">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-[#FFC400]/25 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-sm"
              >
                <span>{language === 'en' ? 'Proceed to Checkout' : 'ऑर्डर पूरा करें (चेकआउट)'}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
