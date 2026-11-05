import React, { useState } from 'react';
import { X, CheckCircle2, QrCode, CreditCard, Banknote, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { CartItem, Order, ShippingAddress } from '../types/amanzo';

interface AmanzoCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onPlaceOrderSuccess: (order: Order) => void;
  language: 'en' | 'hi';
}

export const AmanzoCheckoutModal: React.FC<AmanzoCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onPlaceOrderSuccess,
  language,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Delhi NCR');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'COD' | 'Card' | 'NetBanking'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shippingFee = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      alert(language === 'en' ? 'Please fill in all address details.' : 'कृपया सभी पते की जानकारी भरें।');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedOrderId = `AMZ-${Date.now().toString().slice(-6)}`;
      const orderData: Order = {
        orderId: generatedOrderId,
        createdAt: new Date().toISOString(),
        items: [...cart],
        subtotal,
        discount: 0,
        shipping: shippingFee,
        total,
        status: 'Confirmed',
        courier: 'Delhivery Express',
        trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        shippingAddress: {
          fullName,
          phone,
          address,
          city,
          state,
          pincode,
          paymentMethod,
        },
        estimatedDelivery: '3 - 4 Business Days',
      };

      setConfirmedOrder(orderData);
      setIsSubmitting(false);
      onPlaceOrderSuccess(orderData);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[#FFC400] font-black text-lg">AMANZO</span>
            <span className="text-neutral-400">|</span>
            <h2 className="text-sm sm:text-base font-bold">
              {confirmedOrder
                ? language === 'en'
                  ? 'Order Confirmed!'
                  : 'ऑर्डर सफलतापूर्वक दर्ज!'
                : language === 'en'
                ? 'Checkout & Secure Payment'
                : 'चेकआउट एवं सुरक्षित भुगतान'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {confirmedOrder ? (
            /* Order Success State */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-neutral-900">
                  {language === 'en'
                    ? 'Thank you for your order!'
                    : 'आपके ऑर्डर के लिए धन्यवाद!'}
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  {language === 'en'
                    ? 'A confirmation SMS and receipt has been generated.'
                    : 'ऑर्डर कन्फर्मेशन और रसीद जनरेट हो गई है।'}
                </p>
              </div>

              {/* Order Card */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-5 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200">
                  <span className="text-neutral-500">Order ID:</span>
                  <span className="font-mono font-bold text-neutral-900 text-sm">
                    {confirmedOrder.orderId}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Total Paid/Payable:</span>
                  <span className="font-bold text-neutral-900 text-sm">
                    ₹{confirmedOrder.total.toLocaleString('en-IN')} ({confirmedOrder.shippingAddress.paymentMethod})
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Courier Partner:</span>
                  <span className="font-semibold text-neutral-800">
                    {confirmedOrder.courier} ({confirmedOrder.trackingNumber})
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Delivery To:</span>
                  <span className="font-medium text-neutral-800 truncate max-w-[200px]">
                    {confirmedOrder.shippingAddress.fullName}, {confirmedOrder.shippingAddress.city}
                  </span>
                </div>

                <div className="pt-2 text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Estimated Delivery: 3 to 4 business days. Free returns available for 7 days.
                  </span>
                </div>
              </div>

              <div className="pt-3 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-[#111111] hover:bg-neutral-800 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer transition-colors shadow-xs"
                >
                  {language === 'en' ? 'Continue Shopping' : 'शॉपिंग जारी रखें'}
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Summary Mini Bar */}
              <div className="bg-neutral-50 border border-neutral-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-neutral-900">
                    {cart.reduce((s, i) => s + i.qty, 0)} {language === 'en' ? 'items' : 'आइटम'}
                  </span>
                  <span className="text-neutral-500 ml-2">
                    ({cart.map((c) => c.product.name).slice(0, 2).join(', ')}
                    {cart.length > 2 ? '...' : ''})
                  </span>
                </div>
                <div className="text-sm font-black text-neutral-900">
                  Total: ₹{total.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Delivery Address Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  1. {language === 'en' ? 'Delivery Address' : 'डिलीवरी का पता'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Full Name *' : 'पूरा नाम *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Mobile Phone *' : 'मोबाइल नंबर *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Street Address / Flat / Landmark *' : 'मकान / पता व लैंडमार्क *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House 42, Sector 18, Near Metro Station"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'City / Town *' : 'शहर *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. New Delhi"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {language === 'en' ? 'Pincode (6 digits) *' : 'पिनकोड (6 अंक) *'}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="e.g. 110001"
                      className="w-full px-3 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  2. {language === 'en' ? 'Payment Method' : 'भुगतान का तरीका'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* UPI Option */}
                  <label
                    className={`border p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'UPI'
                        ? 'border-[#FFC400] bg-[#FFC400]/10 ring-1 ring-[#FFC400]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-black"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <span>UPI / QR</span>
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                            Fastest
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          GPay, PhonePe, Paytm, BHIM
                        </div>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-neutral-600" />
                  </label>

                  {/* Cash on Delivery Option */}
                  <label
                    className={`border p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'COD'
                        ? 'border-[#FFC400] bg-[#FFC400]/10 ring-1 ring-[#FFC400]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="accent-black"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          Cash on Delivery (COD)
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Pay cash at doorstep
                        </div>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-neutral-600" />
                  </label>

                  {/* Credit / Debit Card */}
                  <label
                    className={`border p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#FFC400] bg-[#FFC400]/10 ring-1 ring-[#FFC400]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Card'}
                        onChange={() => setPaymentMethod('Card')}
                        className="accent-black"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          Credit / Debit Card
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          Visa, Mastercard, RuPay
                        </div>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-neutral-600" />
                  </label>

                  {/* NetBanking */}
                  <label
                    className={`border p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'NetBanking'
                        ? 'border-[#FFC400] bg-[#FFC400]/10 ring-1 ring-[#FFC400]'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'NetBanking'}
                        onChange={() => setPaymentMethod('NetBanking')}
                        className="accent-black"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          Net Banking
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          SBI, HDFC, ICICI, Axis & all banks
                        </div>
                      </div>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-neutral-600" />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#FFC400]/25 transition-all cursor-pointer text-base disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>{language === 'en' ? 'Processing Order...' : 'ऑर्डर प्रोसेस हो रहा है...'}</span>
                  ) : (
                    <>
                      <span>
                        {paymentMethod === 'COD'
                          ? language === 'en'
                            ? `Confirm Order (Pay ₹${total.toLocaleString('en-IN')} on Delivery)`
                            : `ऑर्डर कन्फर्म करें (डिलीवरी पर ₹${total.toLocaleString('en-IN')} दें)`
                          : language === 'en'
                          ? `Pay ₹${total.toLocaleString('en-IN')} & Confirm Order`
                          : `₹${total.toLocaleString('en-IN')} पे करें एवं ऑर्डर पूरा करें`}
                      </span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
