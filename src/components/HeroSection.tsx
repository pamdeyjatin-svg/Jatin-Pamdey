import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Flame, Eye, Clock, Award } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreWork,
}) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#080808]">
      {/* Background Subtle Golden Ambient Glow & Grid Lines */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Split Grid: Left Copy & Right Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Pill-free Kicker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-[#D4AF37]/30 text-xs font-mono text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="tracking-wider uppercase">Creative Designs, Powerful Impressions</span>
            </div>

            {/* Main Heading & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                Welcome to <span className="text-gold-gradient">Aman Design</span>.
              </h1>
              <p className="font-heading font-semibold text-2xl sm:text-3xl lg:text-4xl text-zinc-300 tracking-tight leading-snug">
                We Create Designs That <span className="underline decoration-[#D4AF37]/60 underline-offset-8">Get Attention</span>.
              </p>
            </div>

            {/* Explanatory Lead Copy */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Specializing in high-CTR YouTube thumbnails, viral social media branding, and visual identities engineered to command curiosity and scale your audience.
            </p>

            {/* Dual Functional Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreWork}
                className="px-7 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black font-heading font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.3)] flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-7 py-3.5 rounded-xl bg-[#121212] hover:bg-zinc-800 border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>

            {/* Quick Guarantees (Clean unboxed text) */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                Proven CTR Psychology
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                24-Hour Rush Turnaround
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                100% Satisfaction Guarantee
              </span>
            </div>
          </div>

          {/* Right Column Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] bg-zinc-900 group">
              <img
                src="/src/assets/images/hero_aman_design_workspace_1793822703159.jpg"
                alt="Aman Design creative graphic workspace crafting high-CTR thumbnails"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover object-center aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Live Badge Overlay */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#F5D77F] font-bold">
                  Accepting New Projects
                </span>
              </div>

              {/* Bottom Card Annotation */}
              <div className="absolute bottom-4 left-4 right-4 text-left space-y-1">
                <div className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
                  <span>Professional Graphic Studio</span>
                  <span aria-hidden="true">·</span>
                  <span>Thumbnails &amp; Identity</span>
                </div>
                <div className="font-heading font-bold text-base text-white">
                  Engineered for Maximum Retention &amp; Clicks
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantitative Proof Strip (full width row below the split, adhering to Section 2.B of Portfolio skill) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#111111]/80 border border-[#D4AF37]/20 rounded-2xl backdrop-blur-sm">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-gradient font-mono tabular-nums">
              500+
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              High-CTR Thumbnails Delivered
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-gradient font-mono tabular-nums">
              45M+
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              Total Organic Views Driven
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-gradient font-mono tabular-nums">
              +14.8%
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              Average Creator CTR Lift
            </div>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <div className="font-heading font-extrabold text-2xl sm:text-3xl text-gold-gradient font-mono tabular-nums">
              24–48h
            </div>
            <div className="text-xs text-zinc-400 font-medium">
              Standard Fast Turnaround
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
