import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface AmanzoHeroProps {
  onShopNow: () => void;
  language: 'en' | 'hi';
}

export const AmanzoHero: React.FC<AmanzoHeroProps> = ({ onShopNow, language }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      titleLine1: language === 'en' ? 'Step Up' : 'स्टाइल में कदम रखें,',
      titleHighlight: language === 'en' ? 'Your Style' : 'आपका अपना स्टाइल',
      subtitle:
        language === 'en'
          ? 'Premium Quality Shoes at Best Prices'
          : 'प्रीमियम क्वालिटी जूते सबसे किफायती दामों पर',
      ctaText: language === 'en' ? 'Shop Now' : 'शॉपिंग शुरू करें',
      image: '/src/assets/images/hero_sneakers_editorial_1793854471864.jpg',
      tag: 'New Collection 2026',
    },
    {
      titleLine1: language === 'en' ? 'Unmatched Speed' : 'रफ्तार और आराम,',
      titleHighlight: language === 'en' ? 'Pro Athletic Run' : 'स्पोर्ट्स रनर',
      subtitle:
        language === 'en'
          ? 'Ultra-lightweight marathon zoom runners engineered for endurance'
          : 'अल्ट्रा-लाइटवेट ज़ूम रनर हर एक्टिविटी के लिए',
      ctaText: language === 'en' ? 'Explore Runners' : 'रनिंग शूज़ देखें',
      image: '/src/assets/images/cat_running_athletic_1793854472688.jpg',
      tag: 'Sports Series',
    },
    {
      titleLine1: language === 'en' ? 'Rugged & Refined' : 'मजबूत और क्लासिक,',
      titleHighlight: language === 'en' ? 'Heritage Leather' : 'लेदर बूट्स',
      subtitle:
        language === 'en'
          ? 'Handcrafted full-grain boots built for all seasons and terrains'
          : 'हैंडक्राफ़्टेड टैन लेदर बूट्स - हर मौसम के लिए तैयार',
      ctaText: language === 'en' ? 'View Boots' : 'बूट्स देखें',
      image: '/src/assets/images/cat_tan_leather_boots_1793854472306.jpg',
      tag: 'Artisan Heritage',
    },
  ];

  // Auto-advance slides smoothly every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[activeSlide];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-4 sm:pt-6 pb-4">
      {/* Editorial Hero Billboard (Matching the screenshot) */}
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-r from-[#0C0C0C] via-[#1A1A1A] to-[#2B230C] border border-neutral-800 shadow-xl min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-12 text-white">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#FFC400]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 flex-1">
          {/* Left Hero Content */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
            {/* Tagline / Announcement */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FFC400] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#FFC400]" />
              <span>{current.tag}</span>
            </div>

            {/* Giant Title matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              {current.titleLine1} <br />
              <span className="text-[#FFC400] drop-shadow-sm">
                {current.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-lg font-normal leading-relaxed">
              {current.subtitle}
            </p>

            {/* CTA Button matching screenshot */}
            <div className="pt-2">
              <button
                onClick={onShopNow}
                className="inline-flex items-center gap-2.5 bg-[#FFC400] hover:bg-[#F0B800] text-[#111111] font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#FFC400]/20 cursor-pointer"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Hero Visual (Sneakers Showcase Stage) */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[440px] aspect-4/3 sm:aspect-16/11 rounded-2xl overflow-hidden shadow-2xl border border-neutral-700/50 group">
              <img
                src={current.image}
                alt="AMANZO Featured Sneaker Showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots (Matching screenshot bottom center) */}
        <div className="relative z-10 flex items-center justify-center gap-2 pt-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                activeSlide === idx
                  ? 'w-7 bg-[#FFC400]'
                  : 'w-2 bg-neutral-500/70 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
