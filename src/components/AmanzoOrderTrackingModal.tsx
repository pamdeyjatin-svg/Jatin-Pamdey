import React, { useState } from 'react';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';
import { Order } from '../types/amanzo';

interface AmanzoOrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders: Order[];
  language: 'en' | 'hi';
}

export const AmanzoOrderTrackingModal: React.FC<AmanzoOrderTrackingModalProps> = ({
  isOpen,
  onClose,
  recentOrders,
  language,
}) => {
  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    recentOrders[0] || null
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toUpperCase();
    const found = recentOrders.find(
      (o) =>
        o.orderId.toUpperCase() === query ||
        o.trackingNumber.toUpperCase() === query
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      // Mock demonstration order for immediate user delight if no matching ID
      setSelectedOrder({
        orderId: query || 'AMZ-829104',
        createdAt: new Date().toISOString(),
        items: [],
        subtotal: 2099,
        discount: 0,
        shipping: 0,
        total: 2099,
        status: 'Shipped',
        courier: 'Delhivery Express',
        trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        shippingAddress: {
          fullName: 'Customer',
          phone: '+91 98765 43210',
          address: 'Connaught Place, Central Delhi',
          city: 'New Delhi',
          state: 'Delhi NCR',
          pincode: '110001',
          paymentMethod: 'UPI',
        },
        estimatedDelivery: 'Arriving Tomorrow by 7 PM',
      });
    }
  };

  const steps = [
    { title: 'Order Confirmed', time: 'Yesterday, 10:30 AM', done: true },
    { title: 'Quality Check & Packed', time: 'Yesterday, 4:15 PM', done: true },
    { title: 'Dispatched from Gurgaon Hub', time: 'Today, 6:00 AM', done: true },
    { title: 'In Transit to Destination Facility', time: 'Today, 2:30 PM', current: true },
    { title: 'Out for Delivery', time: 'Expected Tomorrow', done: false },
    { title: 'Delivered', time: 'Expected Tomorrow', done: false },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#111111] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FFC400]" />
            <h2 className="text-base font-bold">
              {language === 'en' ? 'Track Your AMANZO Order' : 'ऑर्डर ट्रैक करें'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Enter Order ID (e.g. AMZ-829104) or AWB...'
                    : 'ऑर्डर नंबर दर्ज करें...'
                }
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FFC400] hover:bg-[#F0B800] text-black font-black text-xs px-5 py-2.5 rounded-xl cursor-pointer transition-colors shadow-xs"
            >
              {language === 'en' ? 'Track' : 'ट्रैक'}
            </button>
          </form>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Meta Box */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-neutral-500">Order ID:</span>{' '}
                  <span className="font-mono font-bold text-neutral-900">
                    {selectedOrder.orderId}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Courier:</span>{' '}
                  <span className="font-semibold text-neutral-800">
                    {selectedOrder.courier} ({selectedOrder.trackingNumber})
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">ETA:</span>{' '}
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {selectedOrder.estimatedDelivery || 'In 2-3 Days'}
                  </span>
                </div>
              </div>

              {/* Step Progress Timeline */}
              <div className="px-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">
                  {language === 'en' ? 'Shipment Journey' : 'शिपमेंट यात्रा'}
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  {steps.map((st, i) => (
                    <div key={i} className="relative flex items-start gap-3">
                      {/* Status Icon */}
                      <div
                        className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          st.done
                            ? 'bg-emerald-600 text-white'
                            : st.current
                            ? 'bg-[#FFC400] text-black ring-4 ring-[#FFC400]/30 animate-pulse'
                            : 'bg-neutral-200 text-neutral-400'
                        }`}
                      >
                        {st.done ? '✓' : st.current ? '●' : '○'}
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`text-xs font-bold ${
                            st.current
                              ? 'text-[#B38600]'
                              : st.done
                              ? 'text-neutral-900'
                              : 'text-neutral-400'
                          }`}
                        >
                          {st.title}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {st.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="border border-neutral-200 rounded-xl p-4 text-xs flex items-center gap-3 bg-white">
                <MapPin className="w-5 h-5 text-neutral-500 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-900">
                    {selectedOrder.shippingAddress.fullName}
                  </div>
                  <div className="text-neutral-500">
                    {selectedOrder.shippingAddress.address},{' '}
                    {selectedOrder.shippingAddress.city} -{' '}
                    {selectedOrder.shippingAddress.pincode}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
