import React from 'react';
import { AmanzoLogo } from './AmanzoLogo';

interface AmanzoFooterProps {
  onNavClick: (nav: string) => void;
  onOpenTrackOrder: () => void;
  language: 'en' | 'hi';
}

export const AmanzoFooter: React.FC<AmanzoFooterProps> = ({
  onNavClick,
  onOpenTrackOrder,
  language,
}) => {
  return (
    <footer id="footer-section" className="bg-[#111111] text-white pt-14 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-neutral-800">
          {/* Col 1: Brand & Socials */}
          <div className="lg:col-span-2 space-y-4">
            <AmanzoLogo
              isWhite={true}
              tagline={
                language === 'en'
                  ? 'Your World, Your Shopping.'
                  : 'आपका अपना स्टोर • विश्वसनीय खरीदारी'
              }
            />

            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm font-normal leading-relaxed">
              {language === 'en'
                ? 'AMANZO is India’s fast-growing premier online destination for high-comfort sneakers, sport shoes, and stylish footwear delivered directly to your doorstep.'
                : 'अमानज़ो पर पाएँ हाई-कंफर्ट स्नीकर्स, स्पोर्ट्स शूज़ और मॉडर्न फुटवियर आसान कैश ऑन डिलीवरी और फास्ट शिपिंग के साथ।'}
            </p>

            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FFC400] text-neutral-300 hover:text-black flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FFC400] text-neutral-300 hover:text-black flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FFC400] text-neutral-300 hover:text-black flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-[#FFC400] text-neutral-300 hover:text-black flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight uppercase mb-3">
              {language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  onClick={() => {
                    onNavClick('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFC400] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Home' : 'होम'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFC400] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Shop' : 'शॉप'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFC400] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Offers & Deals' : 'ऑफ़र्स व डील्स'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('products-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFC400] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Blog & Footwear Guide' : 'ब्लॉग व गाइड'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight uppercase mb-3">
              {language === 'en' ? 'Customer Care' : 'ग्राहक सेवा'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
              <li>
                <button
                  onClick={onOpenTrackOrder}
                  className="hover:text-[#FFC400] transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Track Order' : 'ऑर्डर ट्रैक करें'}
                </button>
              </li>
              <li>
                <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  {language === 'en' ? 'Return & Refund Policy' : 'रिटर्न व रिफंड'}
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  {language === 'en' ? 'Shipping Information' : 'शिपिंग जानकारी'}
                </span>
              </li>
              <li>
                <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                  {language === 'en' ? 'FAQs & Help Center' : 'अक्सर पूछे जाने वाले सवाल'}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: About Us & Payment Methods */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight uppercase mb-3">
                {language === 'en' ? 'About Us' : 'हमारे बारे में'}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-400">
                <li>
                  <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                    About AMANZO
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                    Careers
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#FFC400] transition-colors cursor-pointer">
                    Terms & Conditions
                  </span>
                </li>
              </ul>
            </div>

            {/* Payment Methods Badges matching screenshot */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-neutral-300 uppercase mb-2">
                {language === 'en' ? 'Payment Methods' : 'भुगतान के तरीके'}
              </h5>
              <div className="flex flex-wrap items-center gap-2">
                {/* UPI Badge */}
                <div className="bg-white px-2.5 py-1 rounded-md text-[11px] font-black text-emerald-700 tracking-tight flex items-center gap-1 shadow-xs">
                  <span>UPI</span>
                </div>
                {/* VISA Badge */}
                <div className="bg-[#1A1F71] text-white px-2.5 py-1 rounded-md text-[11px] font-black tracking-wider shadow-xs italic">
                  VISA
                </div>
                {/* Mastercard Badge */}
                <div className="bg-[#1E1E1E] border border-neutral-700 px-2.5 py-1 rounded-md text-[11px] font-black flex items-center gap-0.5 shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block -mr-1" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block opacity-85" />
                </div>
                {/* RuPay Badge */}
                <div className="bg-white text-orange-600 px-2 py-1 rounded-md text-[11px] font-black tracking-tight shadow-xs">
                  RuPay<span className="text-blue-600">❯</span>
                </div>
                {/* Paytm Badge */}
                <div className="bg-[#002970] text-[#00BAF2] px-2.5 py-1 rounded-md text-[11px] font-black shadow-xs">
                  Paytm
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching screenshot */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 AMANZO. All Rights Reserved.</p>
          <p className="flex items-center gap-1 text-neutral-400">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>in India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
