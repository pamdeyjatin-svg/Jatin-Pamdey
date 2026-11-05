import React from 'react';
import { Sparkles, Layers, Cpu, Zap, Target, Palette, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const tools = [
    { name: 'Adobe Photoshop', role: 'Advanced compositing, face retouching & dynamic lighting' },
    { name: 'Blender 3D', role: 'Custom 3D typography, holographic props & stage rendering' },
    { name: 'Adobe Illustrator', role: 'Bespoke vector icons, logo marks & typography systems' },
    { name: 'Figma', role: 'Design systems, Instagram carousels & responsive layout' },
    { name: 'Adobe Lightroom', role: 'Cinematic color grading & micro-contrast tuning' },
    { name: 'After Effects', role: 'Motion thumbnails, teaser clips & animated title cards' },
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Concept & Story Psychology',
      desc: 'We analyze your video title, target audience curiosity triggers, and top competitor thumbnails to design an irresistible hook.',
    },
    {
      num: '02',
      title: '3D Modeling & Lighting',
      desc: 'Using Blender and Photoshop to build custom 3D metallic typography, directional rim lighting, and high-energy particle effects.',
    },
    {
      num: '03',
      title: 'Expressive Retouching',
      desc: 'Skin smoothing, eye contouring, and contrast amplification so the creator face pops even on tiny 300px mobile smartphone feeds.',
    },
    {
      num: '04',
      title: 'A/B Test Delivery',
      desc: 'Delivering full 1080p source files plus alternative color variants so you can test and achieve maximum click-through rates.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0a] border-t border-b border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Meet The Designer</span>
            <span aria-hidden="true">·</span>
            <span>Aman Design Studio</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Creative Graphic Designer &amp; <br />
            <span className="text-gold-gradient">Thumbnail Specialist</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            I bridge the gap between creative visual artistry and analytical YouTube algorithm psychology.
            Every thumbnail and graphic is handcrafted to command respect and spark curiosity.
          </p>
        </div>

        {/* 2-Column Split: Bio & Monogram Identity Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-heading font-bold text-2xl text-white">
              Passionate About Designing Thumbnails That Drive Real Results.
            </h3>

            <p className="text-sm text-zinc-300 leading-relaxed">
              Hello, I'm <strong className="text-white">Aman</strong>, a passionate professional graphic designer with over 5 years of specialized experience in high-impact visual design. In the crowded digital landscape, a video or brand has less than <span className="text-[#D4AF37] font-semibold">1.5 seconds</span> to make an impression.
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              I don't just assemble stock photos; I sculpt lighting, build custom 3D typography, and engineer color contrast specifically calibrated for YouTube's dark and light mode feeds. Whether you run a business documentary channel, a tech review platform, or a gaming hub, my designs are built to turn casual scrollers into loyal subscribers.
            </p>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Obsessed with Click-Through Rate (CTR)',
                '100% Custom 3D & Vector Assets',
                'Rapid 24–48h Reliable Turnaround',
                'Direct Personal Communication (No Middlemen)',
                'Zero Cookie-Cutter Templates',
                'Revisions Until You Love The Result',
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenContact}
                className="px-6 py-3 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
              >
                Work With Aman
              </button>
              <a
                href="#portfolio"
                className="text-xs font-heading font-semibold text-zinc-300 hover:text-[#D4AF37] transition-colors underline underline-offset-4"
              >
                View Selected Thumbnails →
              </a>
            </div>
          </div>

          {/* Right Column: Visual Identity & Monogram Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-[0_0_35px_rgba(212,175,55,0.12)] bg-[#111111]">
              <img
                src="/src/assets/images/branding_golden_monogram_1793822705025.jpg"
                alt="Aman Design luxury golden monogram identity"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover aspect-[4/3]"
              />

              <div className="p-5 bg-gradient-to-t from-black via-zinc-950 to-transparent space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    Official Studio Mark
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    Since 2021
                  </span>
                </div>
                <div className="font-heading font-bold text-lg text-white">
                  AMAN DESIGN · Visual Architecture
                </div>
                <p className="text-xs text-zinc-400">
                  Where creative design meets powerful, high-converting digital impressions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Creative Workflow */}
        <div className="pt-12 border-t border-zinc-900 space-y-8">
          <div className="text-left space-y-1">
            <span className="text-xs font-mono uppercase text-[#D4AF37]">
              The Proven Methodology
            </span>
            <h3 className="font-heading font-bold text-2xl text-white">
              How Aman Crafts High-Performance Designs
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="p-6 bg-[#111111] border border-zinc-800 hover:border-[#D4AF37]/40 rounded-2xl transition-all duration-300 space-y-3 group"
              >
                <div className="font-mono text-2xl font-bold text-[#D4AF37]/60 group-hover:text-[#D4AF37] transition-colors">
                  {step.num}
                </div>
                <h4 className="font-heading font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Software Mastery Grid */}
        <div className="p-8 bg-[#111111]/70 border border-[#D4AF37]/20 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-[#D4AF37]">
                Technical Toolkit
              </span>
              <h3 className="font-heading font-bold text-xl text-white mt-0.5">
                Software &amp; Creative Tools Mastered
              </h3>
            </div>
            <span className="text-xs text-zinc-500 font-mono">
              Pixel-perfect 4K production standards
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool, idx) => (
              <div
                key={idx}
                className="p-4 bg-black/60 border border-zinc-800 rounded-xl space-y-1 hover:border-[#D4AF37]/40 transition-colors"
              >
                <div className="font-heading font-bold text-sm text-[#F5D77F]">
                  {tool.name}
                </div>
                <div className="text-xs text-zinc-400">
                  {tool.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
