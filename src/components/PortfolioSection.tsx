import React, { useState } from 'react';
import { Eye, Sparkles, Flame, ArrowUpRight, CheckCircle, ExternalLink } from 'lucide-react';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/portfolioData';
import { PortfolioModal } from './PortfolioModal';

interface PortfolioSectionProps {
  onOpenContact: (defaultMessage?: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'thumbnails', label: 'YouTube Thumbnails' },
    { id: 'social', label: 'Instagram & Social' },
    { id: 'branding', label: 'Branding & Logos' },
    { id: 'posters', label: 'Posters & Art' },
  ];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a] border-t border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works</span>
              <span aria-hidden="true">·</span>
              <span>Proven Track Record</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
              Designs That Command <br />
              <span className="text-gold-gradient">Millions of Clicks</span>
            </h2>

            <p className="text-sm text-zinc-400 max-w-xl">
              Click any project below for high-resolution inspection, client CTR statistics, and software breakdown.
            </p>
          </div>

          {/* Category Filter Tabs (Functional segmented controls) */}
          <div className="flex flex-wrap items-center gap-2 bg-[#141414] p-1.5 rounded-xl border border-zinc-800">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-gold-gradient text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-[#111111] border border-zinc-800 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] cursor-pointer flex flex-col"
            >
              {/* Image Container with high visual weight */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Vignette Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-40 transition-opacity" />

                {/* Top Floating Metric Tag */}
                <div className="absolute top-3 right-3 bg-black/85 backdrop-blur-md border border-[#D4AF37]/40 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-[#F5D77F] shadow-md">
                  {item.metric}
                </div>

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-[10px] font-mono uppercase tracking-wider text-zinc-300 px-2.5 py-1 rounded">
                  {item.categoryLabel}
                </div>

                {/* Hover Quick Action Eye Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <span className="px-4 py-2 rounded-lg bg-gold-gradient text-black font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
                    <Eye className="w-4 h-4" />
                    <span>View Project</span>
                  </span>
                </div>
              </div>

              {/* Text Meta Container */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    {item.client}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Row */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono text-[11px]">
                    {item.software.join(' · ')}
                  </span>
                  <span className="text-zinc-300 font-semibold flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTR TRANSFORMATION COMPARISON SHOWCASE */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#111111] border border-[#D4AF37]/30 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>Aman Design Case Study</span>
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white">
              The CTR Multiplier: Before &amp; After Optimization
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              When a creator switched from flat, amateur screenshots to our 3D metallic lighting system, click-through rate surged from <strong>4.8% to 15.7%</strong>—producing an additional 1.8 million views on the exact same video.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Standard Thumbnail Side */}
            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 opacity-75">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-semibold uppercase">Standard Amateur Thumbnail</span>
                <span className="text-zinc-500">4.8% CTR</span>
              </div>
              <div className="aspect-[16/9] rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-6 text-center text-zinc-600">
                <span className="text-xs font-mono">Flat lighting · illegible small text · low contrast</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Fails to command curiosity on mobile; blend in with YouTube algorithm clutter.
              </p>
            </div>

            {/* Aman Design Thumbnail Side */}
            <div className="p-5 rounded-xl bg-black border border-[#D4AF37]/60 shadow-[0_0_30px_rgba(212,175,55,0.15)] space-y-3 relative">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-gold-gradient font-bold uppercase">Aman Design Re-Engineered</span>
                <span className="text-emerald-400 font-bold font-mono">+227% CTR Lift</span>
              </div>
              <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#D4AF37]/40 relative">
                <img
                  src="/src/assets/images/thumb_tech_ai_concept_1793822704883.jpg"
                  alt="Aman Design re-engineered thumbnail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[11px] text-[#F5D77F]">
                Volumetric gold lighting, 3D extruded typography, curiosity hook, instant click trigger.
              </p>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        <PortfolioModal
          item={selectedItem}
          isOpen={Boolean(selectedItem)}
          onClose={() => setSelectedItem(null)}
          onOrderSimilar={(title) => {
            onOpenContact(`I'd like to order a design inspired by: "${title}"`);
          }}
        />
      </div>
    </section>
  );
};
