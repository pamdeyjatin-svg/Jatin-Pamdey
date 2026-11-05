import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Mail,
  Send,
  Sparkles,
  CheckCircle,
  Copy,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface ContactSectionProps {
  preSelectedService?: string;
  onSuccessToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preSelectedService,
  onSuccessToast,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preSelectedService || 'YouTube Thumbnail Design',
    budget: '₹5,000 – ₹10,000 ($60 - $120)',
    channelLink: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync if preSelectedService changes
  React.useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@amandesign.pro');
    setCopiedEmail(true);
    onSuccessToast('Email copied to clipboard: contact@amandesign.pro');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onSuccessToast('Inquiry sent successfully! Aman will reply within 4 hours.');
      setFormData({
        name: '',
        email: '',
        service: 'YouTube Thumbnail Design',
        budget: '₹5,000 – ₹10,000 ($60 - $120)',
        channelLink: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Access</span>
            <span aria-hidden="true">·</span>
            <span>Let's Build Something Powerful</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Ready To Upgrade Your Visuals? <br />
            <span className="text-gold-gradient">Contact Aman Today</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Reach out directly through WhatsApp, Instagram, or submit your project inquiry below.
            Standard response time is under 4 hours.
          </p>
        </div>

        {/* 2-Column Layout: Direct Contact Channels & Customer Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Action Buttons & Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-heading font-bold text-2xl text-white">
              Connect Directly
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Prefer instant messaging? Click below to chat directly with Aman on WhatsApp or Instagram.
            </p>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919876543210?text=Hi%20Aman%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20design%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] border border-zinc-800 hover:border-[#25D366]/50 flex items-center justify-between group transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-white group-hover:text-[#25D366] transition-colors block">
                      Chat on WhatsApp
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      +91 98765 43210 · Instant Reply
                    </span>
                  </div>
                </div>
                <span className="text-xs font-heading font-semibold text-[#25D366] group-hover:translate-x-1 transition-transform">
                  Open Chat →
                </span>
              </a>

              {/* Instagram Button */}
              <a
                href="https://instagram.com/amandesign.visuals"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-[#111111] border border-zinc-800 hover:border-pink-500/50 flex items-center justify-between group transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-white group-hover:text-pink-400 transition-colors block">
                      Instagram Profile
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      @amandesign.visuals · Daily Works
                    </span>
                  </div>
                </div>
                <span className="text-xs font-heading font-semibold text-pink-400 group-hover:translate-x-1 transition-transform">
                  Follow &amp; DM →
                </span>
              </a>

              {/* Email Contact Card with Copy */}
              <div className="p-4 rounded-xl bg-[#111111] border border-zinc-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-sm text-white block">
                      Official Studio Email
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      contact@amandesign.pro
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Studio Availability Notice */}
            <div className="p-4 rounded-xl bg-black/60 border border-zinc-800/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#D4AF37] font-semibold">
                <Clock className="w-4 h-4" />
                <span>Current Availability</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Currently taking on <strong>3 new channel clients</strong> for thumbnail packages and complete visual rebranding this month.
              </p>
            </div>
          </div>

          {/* Right Column: Customer Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-[#111111] border border-zinc-800 shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
                Send Project Inquiry
              </h3>
              <p className="text-xs text-zinc-400">
                Fill in your project specifications and receive a customized concept proposal within hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-black/60 border border-[#D4AF37]/40 rounded-xl animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-heading font-bold text-xl text-white">
                  Inquiry Received!
                </h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Aman Design. I will review your requirements and get back to you with ideas and turnaround options shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium block">
                      Your Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium block">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="creator@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Requested */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium block">
                      Service Requested <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="YouTube Thumbnail Design">YouTube Thumbnail Design</option>
                      <option value="Basic Thumbnail Package (3 Thumbnails)">Basic Thumbnail Package</option>
                      <option value="Professional Thumbnail Package (10 Thumbnails)">Professional Thumbnail Package</option>
                      <option value="Premium Design Package (Full Brand Suite)">Premium Design Package</option>
                      <option value="Instagram Post & Carousel Design">Instagram Post Design</option>
                      <option value="Social Media Banner / Header">Social Media Banner</option>
                      <option value="Logo & Brand Identity">Logo Design</option>
                      <option value="Poster Design">Poster Design</option>
                      <option value="YouTube Channel Art Suite">YouTube Channel Art Suite</option>
                      <option value="Custom Project / Retainer">Custom Project / Monthly Retainer</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-300 font-medium block">
                      Target Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="₹2,500 – ₹5,000 ($30 - $60)">₹2,500 – ₹5,000 (Starter)</option>
                      <option value="₹5,000 – ₹10,000 ($60 - $120)">₹5,000 – ₹10,000 (Growth)</option>
                      <option value="₹10,000 – ₹25,000 ($120 - $300)">₹10,000 – ₹25,000 (Pro Retainer)</option>
                      <option value="₹25,000+ ($300+)">₹25,000+ (Full Suite / Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Channel / Portfolio Link */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium block">
                    YouTube Channel, Social Link, or Reference URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/@yourchannel"
                    value={formData.channelLink}
                    onChange={(e) => setFormData({ ...formData, channelLink: e.target.value })}
                    className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium block">
                    Project Details &amp; Vision <span className="text-[#D4AF37]">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your video topic, target vibe, deadlines, or specific visual preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/80 border border-zinc-800 focus:border-[#D4AF37] rounded-xl px-3.5 py-3 text-white placeholder:text-zinc-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black font-heading font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Details...' : 'Send Inquiry To Aman'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-zinc-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>100% Confidential · Strict NDA Guaranteed</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
