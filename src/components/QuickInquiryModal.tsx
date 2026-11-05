import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle, ShieldCheck, MessageCircle } from 'lucide-react';

interface QuickInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  onSuccessToast: (msg: string) => void;
}

export const QuickInquiryModal: React.FC<QuickInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  onSuccessToast,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(defaultService || 'YouTube Thumbnail Design');
  const [budget, setBudget] = useState('₹5,000 – ₹10,000 ($60 - $120)');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setService(defaultService);
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast(`Inquiry for ${service} received! Aman will contact you shortly.`);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-[#D4AF37]/40 rounded-2xl w-full max-w-lg shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-heading font-bold text-base text-white">
              Start Your Project with Aman
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-heading font-bold text-xl text-white">
                Inquiry Successfully Transmitted!
              </h4>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Aman has received your project details and will connect with you via email/WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-zinc-300 font-medium block">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="creator@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium block">Service / Package</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white focus:outline-none cursor-pointer"
                >
                  <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                  <option value="Basic Thumbnail Package (3 Thumbnails)">Basic Thumbnail Package</option>
                  <option value="Professional Thumbnail Package (10 Thumbnails)">Professional Thumbnail Package</option>
                  <option value="Premium Design Package (Full Suite)">Premium Design Package</option>
                  <option value="Instagram Post & Carousel Design">Instagram Post Design</option>
                  <option value="Social Media Banner">Social Media Banner</option>
                  <option value="Logo & Brand Identity">Logo Design</option>
                  <option value="Poster Design">Poster Design</option>
                  <option value="YouTube Channel Art Suite">YouTube Channel Art</option>
                  <option value="Custom Project / Retainer">Custom Project</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-300 font-medium block">Project Message / Notes</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe your channel topic or goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black font-heading font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting...' : 'Confirm Inquiry'}</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Quick WhatsApp reply guarantee</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
