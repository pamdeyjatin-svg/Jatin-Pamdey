import React from 'react';
import { Check, X, Sparkles, Zap, MessageCircle, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/portfolioData';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
  onOpenCustomContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  onOpenCustomContact,
}) => {
  return (
    <section id="pricing" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Investment</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Fees</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            High-ROI Design Packages <br />
            <span className="text-gold-gradient">Built To Scale Your Brand</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Transparent pricing designed for individual content creators, fast-growing channels, and high-production agencies.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`p-8 rounded-2xl bg-[#111111] flex flex-col justify-between transition-all duration-300 relative ${
                plan.featured
                  ? 'border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.2)] lg:-translate-y-2'
                  : 'border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {/* Highlight Badge */}
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-gradient text-black font-heading font-extrabold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                  Most Popular · Creator Choice
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Header */}
                <div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 min-h-[34px]">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2 pb-4 border-b border-zinc-800">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl sm:text-4xl font-extrabold text-gold-gradient tabular-nums">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="font-mono text-sm text-zinc-500 line-through tabular-nums">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#D4AF37] block mt-1">
                    Deliverables: {plan.duration}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <span className="text-[11px] font-mono uppercase text-zinc-500 block">
                    What's Included:
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                      <Check className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}

                  {plan.excludedFeatures?.map((ex, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-500">
                      <X className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
                      <span className="line-through">{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8 mt-6 border-t border-zinc-800/80 space-y-3">
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.featured
                      ? 'bg-gold-gradient hover:bg-gold-gradient-hover text-black shadow-md'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 hover:border-[#D4AF37]'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-[10px] text-zinc-500 text-center font-mono">
                  Recommended for: {plan.recommendedFor}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CUSTOM PRICING CARD (Direct requirement from user: "Contact for custom pricing") */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-zinc-950 via-[#111111] to-zinc-950 border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Enterprise &amp; Monthly Retainers</span>
            </div>
            <h3 className="font-heading font-bold text-2xl text-white">
              Need a Custom Thumbnail Retainer or Production Pack?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
              We provide dedicated monthly thumbnail retainers for daily uploaders, podcast networks, and marketing agencies with guaranteed 12-hour turnarounds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919876543210?text=Hi%20Aman%2C%20I%20need%20a%20custom%20graphic%20design%20%2F%20thumbnail%20retainer%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-black text-[#25D366]" />
              <span>WhatsApp Custom Quote</span>
            </a>

            <button
              onClick={onOpenCustomContact}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#D4AF37]/40 text-white font-heading font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Inquire Custom Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
