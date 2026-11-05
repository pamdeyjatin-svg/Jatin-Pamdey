import React from 'react';
import { ArrowDown, Sparkles, SlidersHorizontal } from 'lucide-react';
import { StyleProfile, ProductCategory } from '../types';
import { STYLE_ARCHETYPES_INFO } from '../data/products';

interface HeroBannerProps {
  styleProfile: StyleProfile;
  onOpenStyleQuiz: () => void;
  onSelectCategory: (cat: ProductCategory | 'all' | 'curated' | 'studio') => void;
  onScrollToCatalog: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  styleProfile,
  onOpenStyleQuiz,
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const currentArchetype = STYLE_ARCHETYPES_INFO[styleProfile.archetype];

  return (
    <section className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial & Recommendation Match */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-500">
              <span>Collection 2026</span>
              <span aria-hidden="true">·</span>
              <span>Apparel &amp; Footwear</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-900 font-semibold">Tuned to {currentArchetype.label}</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-950 leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Kapda, Footwear &amp; Objects Aligned to Your Aesthetic.
            </h1>

            {/* Subtitle measure 65-75ch */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              From enzyme-washed Belgian linen overshirts to Tuscan calfskin sneakers and solid brass objects.
              Every item in our collection is algorithmically scored against your silhouette and palette preferences.
            </p>

            {/* Style Profile Alignment Callout (Unboxed, clean hairline) */}
            <div className="p-4 bg-white/80 border border-stone-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
                    Active Style Intelligence: {currentArchetype.label}
                  </span>
                </div>
                <button
                  onClick={onOpenStyleQuiz}
                  className="text-xs text-stone-700 hover:text-stone-950 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Retune Profile</span>
                </button>
              </div>
              <p className="text-xs text-stone-600">
                {currentArchetype.description}
              </p>
            </div>

            {/* CTAs & Filter Shortcuts */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-50 text-sm font-medium rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Curated Catalog</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectCategory('studio')}
                className="px-5 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-sm font-medium rounded-xl transition-all cursor-pointer"
              >
                Open Outfit Studio
              </button>
            </div>

            {/* Trust Markers / Quantitative Precision */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 font-mono">
              <span>Small-Batch Craftsmanship</span>
              <span aria-hidden="true">·</span>
              <span>100% Natural Fibres</span>
              <span aria-hidden="true">·</span>
              <span>Complimentary Returns</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] shadow-lg border border-stone-200/90 bg-stone-200">
              <img
                src="/src/assets/images/hero_kapda_shoes_editorial_1793821441366.jpg"
                alt="Contemporary urban models wearing Kapda apparel, leather sneakers, and crossbody bags"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

              {/* Scrim Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-mono uppercase tracking-wider text-stone-300">
                  Featured Editorial
                </div>
                <div className="font-display text-base font-semibold text-white">
                  Contemporary Indo-Streetwear &amp; Essential Footwear
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
