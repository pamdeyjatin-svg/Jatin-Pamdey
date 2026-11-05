import React from 'react';
import { X, ExternalLink, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PortfolioItem } from '../data/portfolioData';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderSimilar: (title: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  item,
  isOpen,
  onClose,
  onOrderSimilar,
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-[#D4AF37]/40 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(212,175,55,0.2)] overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-black/50 shrink-0">
          <div className="flex items-center gap-2.5 text-xs font-mono text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider">{item.categoryLabel}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400">{item.client}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Main Visual Presentation */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-lg">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-[500px]"
            />

            {/* Metric Tag Overlay */}
            <div className="absolute top-4 right-4 bg-black/85 backdrop-blur-md border border-[#D4AF37]/50 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#F5D77F] shadow-md">
              {item.metric}
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <div>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-[#D4AF37] mt-1">
                  Niche: {item.niche} · Client: {item.client}
                </p>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {item.description}
              </p>

              {/* Design breakdown checklist */}
              <div className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-2">
                <h4 className="text-xs font-mono uppercase text-[#D4AF37] font-semibold">
                  Why This Design Succeeded:
                </h4>
                <ul className="text-xs text-zinc-300 space-y-1.5 pl-4 list-disc marker:text-[#D4AF37]">
                  <li>Calibrated for maximum contrast against YouTube's dark and light backgrounds.</li>
                  <li>3D extruded typography with physical metallic textures and gold particle rim lighting.</li>
                  <li>Facial expression micro-contrast enhanced to pop on small smartphone screens.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Details (4 cols) */}
            <div className="md:col-span-4 bg-black/60 border border-zinc-800 p-5 rounded-xl space-y-4">
              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block">Performance Impact</span>
                <span className="font-heading font-bold text-lg text-gold-gradient block mt-0.5">
                  {item.metric}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase text-zinc-500 block mb-1.5">Software Utilized</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.software.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onOrderSimilar(item.title);
                  }}
                  className="w-full py-3 bg-gold-gradient hover:bg-gold-gradient-hover text-black font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Request Similar Design</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
