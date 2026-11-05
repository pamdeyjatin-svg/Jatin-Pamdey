import React from 'react';
import {
  Youtube,
  Instagram,
  MessageCircle,
  Twitter,
  ArrowUp,
  Sparkles,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-zinc-400 pt-16 pb-12 border-t border-[#D4AF37]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gold-gradient p-[1px]">
                <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                  <span className="font-brand font-bold text-sm text-gold-gradient">
                    AD
                  </span>
                </div>
              </div>

              <div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight uppercase block">
                  AMAN DESIGN
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block -mt-1">
                  Visual Architecture
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              <strong className="text-white">Creative Designs, Powerful Impressions.</strong>
              <br />
              Premium graphic design agency specializing in high-converting YouTube thumbnails, bespoke brand identities, and social media creative systems.
            </p>

            <div className="text-[11px] font-mono text-zinc-500 space-y-1 pt-1">
              <div>Based in India · Serving Global YouTubers &amp; Brands</div>
              <div>Turnaround: 24–48 Hours Guaranteed</div>
            </div>
          </div>

          {/* Navigation Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#home" className="hover:text-[#D4AF37] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                  About Aman
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#D4AF37] transition-colors">
                  Creative Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#D4AF37] transition-colors">
                  Thumbnail Portfolio
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#D4AF37] transition-colors">
                  Packages &amp; Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                  Contact &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Connect Across Platforms
            </h4>
            <p className="text-xs text-zinc-400">
              Follow Aman Design for weekly thumbnail breakdowns, CTR case studies, and design tips.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] transition-all"
                aria-label="YouTube"
                title="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/amandesign.visuals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] flex items-center justify-center text-zinc-400 hover:text-pink-400 transition-all"
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919876543210?text=Hi%20Aman%2C%20I%20am%20interested%20in%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] flex items-center justify-center text-zinc-400 hover:text-[#25D366] transition-all"
                aria-label="WhatsApp"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#D4AF37] flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] transition-all"
                aria-label="Twitter / X"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="text-xs font-mono text-zinc-500 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} AMAN DESIGN. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 text-[#D4AF37]/80">
            <Sparkles className="w-3 h-3" />
            <span>Creative Designs, Powerful Impressions.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
