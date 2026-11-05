import React from 'react';
import { Star, Sparkles, Quote, TrendingUp } from 'lucide-react';
import { TESTIMONIALS } from '../data/portfolioData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#080808] border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creator Testimonials</span>
            <span aria-hidden="true">·</span>
            <span>Client Satisfaction</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Trusted By High-Growth YouTubers &amp; Brands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((test, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[#111111] border border-zinc-800 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5 Golden Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-[#F5D77F] bg-black/60 px-2 py-0.5 rounded border border-[#D4AF37]/30 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    {test.metric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                  "{test.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <div className="font-heading font-bold text-sm text-white">
                  {test.author}
                </div>
                <div className="text-xs text-[#D4AF37] font-mono mt-0.5">
                  {test.channel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
