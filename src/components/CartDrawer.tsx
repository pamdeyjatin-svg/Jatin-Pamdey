import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (discountAmount: number, promoCode: string) => void;
}

const FREE_SHIPPING_THRESHOLD = 2999;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo === 'KAPDA10' ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 250;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoInput.trim().toUpperCase() === 'KAPDA10') {
      setAppliedPromo('KAPDA10');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try KAPDA10 for 10% off.');
    }
  };

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-base text-stone-900">
                Shopping Bag
              </h3>
              <span className="text-xs font-mono text-stone-500">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} {items.length === 1 ? 'item' : 'items'})
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-5 py-3 bg-stone-100 border-b border-stone-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-stone-600 mb-1.5">
                Add <span className="font-semibold text-stone-900 font-mono">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for Free Express Delivery.
              </p>
            ) : (
              <p className="text-emerald-700 font-semibold mb-1.5">
                ✓ Free Express Delivery Unlocked!
              </p>
            )}
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center">
                  <Tag className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-base text-stone-900">
                  Your bag is currently empty
                </h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Explore our curated Kapda, artisan footwear, and minimal accessories matched to your aesthetic.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 bg-stone-900 text-stone-50 rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-stone-200 rounded-xl flex gap-3 relative shadow-2xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-lg object-cover bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-semibold text-xs text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-stone-500 flex items-center gap-2">
                      <span>Size: {item.selectedSize}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600 rounded-l-lg transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs tabular-nums font-semibold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-200 text-stone-600 rounded-r-lg transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono text-xs font-bold text-stone-950 tabular-nums">
                        {item.product.currency}
                        {(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Module */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-white space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. KAPDA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-xs font-mono uppercase text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="text-[11px] font-mono text-emerald-700 flex items-center justify-between">
                  <span>Code '{appliedPromo}' applied (10% off)</span>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-stone-500 hover:text-stone-800 underline text-[10px]"
                  >
                    Remove
                  </button>
                </div>
              )}
              {promoError && (
                <div className="text-[11px] font-mono text-rose-600">
                  {promoError}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-stone-600">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-950 font-bold text-sm pt-2 border-t border-stone-200">
                  <span>Total Due</span>
                  <span className="font-mono tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => onProceedToCheckout(discount, appliedPromo || '')}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-700" />
                <span>Encrypted 256-bit checkout · COD &amp; UPI supported</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
