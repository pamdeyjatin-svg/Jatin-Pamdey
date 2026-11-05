import React from 'react';
import {
  Youtube,
  Instagram,
  Layout,
  Crown,
  Sparkles,
  Tv,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Youtube':
        return <Youtube className="w-6 h-6 text-[#D4AF37]" />;
      case 'Instagram':
        return <Instagram className="w-6 h-6 text-[#D4AF37]" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-[#D4AF37]" />;
      case 'Crown':
        return <Crown className="w-6 h-6 text-[#D4AF37]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
      case 'Tv':
        return <Tv className="w-6 h-6 text-[#D4AF37]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creative Solutions</span>
            <span aria-hidden="true">·</span>
            <span>What We Deliver</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            High-Impact Graphic Design <br />
            <span className="text-gold-gradient">Tailored For Creators &amp; Brands</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Every service is executed with elite visual discipline, calibrated for high click-through rates, brand authority, and unforgettable visual presence.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`p-7 rounded-2xl bg-[#111111] border transition-all duration-300 flex flex-col justify-between space-y-6 group relative ${
                service.popular
                  ? 'border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.12)]'
                  : 'border-zinc-800 hover:border-[#D4AF37]/40 hover:shadow-lg'
              }`}
            >
              {/* Top Accent Pill if popular */}
              {service.popular && (
                <div className="absolute -top-3 right-6 bg-gold-gradient text-black text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                  Most Requested
                </div>
              )}

              <div className="space-y-4">
                {/* Icon & Turnaround */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-[#D4AF37]/30 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-[#D4AF37]/80 mt-0.5">
                    {service.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables checklist */}
                <div className="pt-2 space-y-2 border-t border-zinc-800">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block">Starting at</span>
                  <span className="font-heading font-bold text-sm text-[#F5D77F]">
                    {service.startingPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(service.title)}
                  className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-[#D4AF37] text-zinc-200 hover:text-black border border-[#D4AF37]/30 hover:border-[#D4AF37] text-xs font-heading font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
