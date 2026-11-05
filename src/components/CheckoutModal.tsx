import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, ArrowLeft, PackageCheck } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discount: number;
  promoCode: string;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discount,
  promoCode,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: 'Jatin Pandey',
    email: 'pamdeyjatin@gmail.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Shanti Vihar, Indiranagar',
    city: 'Bengaluru',
    postalCode: '560038',
    paymentMethod: 'upi' as 'cod' | 'upi' | 'card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 250;
  const total = subtotal - discount + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderDetails = {
        orderId: `KPD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        subtotal,
        discount,
        shipping,
        total,
        shippingAddress: { ...formData },
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      setConfirmedOrder(order);
      setIsSubmitting(false);
      onOrderSuccess(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <h3 className="font-display font-bold text-base text-stone-900">
              {confirmedOrder ? 'Order Confirmation' : 'Secure Express Checkout'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {confirmedOrder ? (
            /* ORDER CONFIRMATION VIEW */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-emerald-800 font-semibold uppercase tracking-wider">
                  Payment Verified
                </span>
                <h2 className="font-display text-2xl font-bold text-stone-900 mt-1">
                  Order #{confirmedOrder.orderId} Confirmed
                </h2>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  A receipt has been dispatched to{' '}
                  <span className="font-semibold text-stone-900">{confirmedOrder.shippingAddress.email}</span>.
                  Your curated pieces are being prepared for express dispatch.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-white border border-stone-200 rounded-xl p-5 text-left text-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <span className="text-stone-500 font-mono">Date: {confirmedOrder.createdAt}</span>
                  <span className="text-stone-900 font-semibold font-mono">
                    Method: {confirmedOrder.shippingAddress.paymentMethod.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-semibold text-stone-900 block">Ordered Items:</span>
                  {confirmedOrder.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-stone-700">
                      <span className="truncate pr-4">
                        {it.quantity}x {it.product.name} ({it.selectedSize})
                      </span>
                      <span className="font-mono tabular-nums shrink-0 font-medium text-stone-950">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-stone-200 space-y-1.5 font-mono">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal:</span>
                    <span>₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {confirmedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({promoCode}):</span>
                      <span>-₹{confirmedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Shipping:</span>
                    <span>{confirmedOrder.shipping === 0 ? 'FREE' : `₹${confirmedOrder.shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-950 font-bold text-sm pt-2 border-t border-stone-200">
                    <span>Total Paid:</span>
                    <span>₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-stone-500">
                  <span className="font-semibold text-stone-700">Shipping To: </span>
                  {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city} - {confirmedOrder.shippingAddress.postalCode}
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* CHECKOUT FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Details */}
              <div className="space-y-4">
                <h4 className="font-display font-semibold text-sm text-stone-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-stone-700" />
                  <span>1. Delivery Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Postal PIN Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-700 font-medium mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">City / Region</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-stone-200">
                <h4 className="font-display font-semibold text-sm text-stone-900">
                  2. Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-2.5 text-xs">
                  {[
                    { id: 'upi', label: 'Instant UPI', sub: 'Google Pay / PhonePe' },
                    { id: 'card', label: 'Card / NetBanking', sub: 'Visa / Mastercard' },
                    { id: 'cod', label: 'Cash on Delivery', sub: 'Pay upon delivery' },
                  ].map((m) => {
                    const isSelected = formData.paymentMethod === m.id;
                    return (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: m.id as any })}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-2xs font-semibold'
                            : 'border-stone-200 bg-white/70 hover:border-stone-300'
                        }`}
                      >
                        <span className="block text-stone-900">{m.label}</span>
                        <span className="block text-[10px] text-stone-500 font-mono mt-0.5">{m.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Total Overview */}
              <div className="p-4 bg-stone-100 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Items Total ({items.length} pieces):</span>
                  <span className="font-mono tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount Privilege:</span>
                    <span className="font-mono tabular-nums">-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Express Delivery:</span>
                  <span className="font-mono tabular-nums">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-stone-950 font-bold text-sm pt-2 border-t border-stone-200">
                  <span>Grand Total:</span>
                  <span className="font-mono tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-50 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <PackageCheck className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'Securing Order...' : `Authorize & Place Order (₹${total.toLocaleString('en-IN')})`}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
