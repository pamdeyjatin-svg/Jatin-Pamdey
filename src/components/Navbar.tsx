import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (defaultService?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Brand Wordmark & Monogram */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F5D77F] via-[#D4AF37] to-[#8C6D1F] p-[1px] shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0a0a0a] rounded-[7px] flex items-center justify-center">
                <span className="font-brand font-bold text-base text-gold-gradient tracking-wider">
                  AD
                </span>
              </div>
            </div>

            <div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white block uppercase group-hover:text-[#D4AF37] transition-colors">
                AMAN DESIGN
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]/80 block -mt-1">
                Visual Architect
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors relative py-1 group whitespace-nowrap shrink-0"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action Zone */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919876543210?text=Hi%20Aman%2C%20I%20am%20interested%20in%20your%20graphic%20design%20and%20thumbnail%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-800 text-zinc-300 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenContact()}
              className="px-5 py-2.5 rounded-lg bg-gold-gradient hover:bg-gold-gradient-hover text-black font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.25)] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenContact()}
              className="px-3 py-1.5 rounded-md bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider"
            >
              Hire Me
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/98 border-b border-[#D4AF37]/30 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-[#D4AF37] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3 rounded-lg bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Contact Aman</span>
            </button>

            <a
              href="https://wa.me/919876543210?text=Hi%20Aman%2C%20I%20am%20interested%20in%20your%20graphic%20design%20and%20thumbnail%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white text-xs font-medium text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
