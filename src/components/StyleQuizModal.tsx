import React, { useState } from 'react';
import { X, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { StyleProfile, StyleArchetype, ColorPalette, Silhouette, Occasion } from '../types';
import { STYLE_ARCHETYPES_INFO, COLOR_PALETTES_INFO } from '../data/products';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: StyleProfile;
  onSaveProfile: (updatedProfile: StyleProfile) => void;
}

const OCCASIONS_LIST: { id: Occasion; label: string; desc: string }[] = [
  { id: 'daily_commute', label: 'Daily Commute & Work', desc: 'Functional, clean, versatile rotation' },
  { id: 'weekend_leisure', label: 'Weekend Leisure & Café', desc: 'Effortless drape, comfort, soft sneakers' },
  { id: 'evening_social', label: 'Evening Social & Gallery', desc: 'Architectural cuts, burnished leather, subtle flair' },
  { id: 'festive_celebration', label: 'Festive & Contemporary Weddings', desc: 'Artisanal khadi, structured jackets, heritage crafts' },
  { id: 'creative_studio', label: 'Creative Studio & Travel', desc: 'Raw denim, oversized layers, utility totes' },
];

export const StyleQuizModal: React.FC<StyleQuizModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
}) => {
  const [step, setStep] = useState<number>(1);
  const [archetype, setArchetype] = useState<StyleArchetype>(currentProfile.archetype);
  const [palette, setPalette] = useState<ColorPalette>(currentProfile.palette);
  const [silhouette, setSilhouette] = useState<Silhouette>(currentProfile.silhouette);
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>(currentProfile.occasions);

  if (!isOpen) return null;

  const toggleOccasion = (occ: Occasion) => {
    if (selectedOccasions.includes(occ)) {
      if (selectedOccasions.length > 1) {
        setSelectedOccasions(selectedOccasions.filter((o) => o !== occ));
      }
    } else {
      setSelectedOccasions([...selectedOccasions, occ]);
    }
  };

  const handleComplete = () => {
    onSaveProfile({
      ...currentProfile,
      archetype,
      palette,
      silhouette,
      occasions: selectedOccasions,
      completedQuiz: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h2 className="font-display font-semibold text-lg text-stone-900">
                Style Intelligence Profile
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Step {step} of 4 · Customizing your Kapda, footwear, and accessory recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator (clean, unboxed text) */}
        <div className="px-6 pt-4 pb-2 bg-stone-50 border-b border-stone-200/60 flex items-center justify-between text-xs text-stone-500">
          <span className={step === 1 ? 'font-semibold text-stone-900' : ''}>1. Archetype</span>
          <span aria-hidden="true">·</span>
          <span className={step === 2 ? 'font-semibold text-stone-900' : ''}>2. Palette</span>
          <span aria-hidden="true">·</span>
          <span className={step === 3 ? 'font-semibold text-stone-900' : ''}>3. Silhouette</span>
          <span aria-hidden="true">·</span>
          <span className={step === 4 ? 'font-semibold text-stone-900' : ''}>4. Occasion</span>
        </div>

        {/* Content Body */}
        <div className="px-6 py-6 overflow-y-auto flex-1 space-y-4">
          {/* STEP 1: Archetype */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-base font-semibold text-stone-900">
                  Select your governing style archetype
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  This sets the architectural foundation for your personalized catalog scoring and outfit curation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(Object.entries(STYLE_ARCHETYPES_INFO) as [StyleArchetype, any][]).map(([key, info]) => {
                  const isSelected = archetype === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setArchetype(key)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-stone-900">
                          {info.label}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-stone-500 mb-2">
                        {info.tag}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {info.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Color Palette */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-base font-semibold text-stone-900">
                  Which color palette anchors your wardrobe?
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  We use color harmony theory to match apparel, shoes, and leather accessories.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {(Object.entries(COLOR_PALETTES_INFO) as [ColorPalette, any][]).map(([key, info]) => {
                  const isSelected = palette === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setPalette(key)}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-stone-900">
                          {info.label}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>

                      {/* Swatch chips */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        {info.colors.map((c: string, idx: number) => (
                          <span
                            key={idx}
                            className="w-5 h-5 rounded-full border border-black/10 inline-block shadow-2xs"
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-stone-600">
                        {info.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Silhouette */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-base font-semibold text-stone-900">
                  Preferred silhouette & drape
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  How do you prefer Kapda and outerwear to fall on your frame?
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {[
                  {
                    id: 'relaxed' as Silhouette,
                    title: 'Relaxed & Dropped Shoulder',
                    sub: 'Boxy tees, wide-leg trousers, loose overshirts, unrestrictive fluid drape.',
                  },
                  {
                    id: 'tailored' as Silhouette,
                    title: 'Tailored & Structured Clean Lines',
                    sub: 'Architectural cuts, tapered trousers, unpadded blazers, intentional proportions.',
                  },
                  {
                    id: 'classic' as Silhouette,
                    title: 'Classic Regular & Timeless',
                    sub: 'Standard fit, heritage proportions, balanced versatile cut that fits everywhere.',
                  },
                ].map((s) => {
                  const isSelected = silhouette === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSilhouette(s.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div className="pr-4">
                        <span className="font-semibold text-sm text-stone-900 block">
                          {s.title}
                        </span>
                        <span className="text-xs text-stone-600 mt-0.5 block">
                          {s.sub}
                        </span>
                      </div>
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-stone-900 text-stone-50 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-stone-300 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Priority Occasions */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-base font-semibold text-stone-900">
                  Primary occasions you dress for
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  Select one or more moments to prioritize footwear comfort and styling formality.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {OCCASIONS_LIST.map((occ) => {
                  const isSelected = selectedOccasions.includes(occ.id);
                  return (
                    <button
                      key={occ.id}
                      onClick={() => toggleOccasion(occ.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-sm'
                          : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-sm text-stone-900 block">
                          {occ.label}
                        </span>
                        <span className="text-xs text-stone-500 mt-0.5 block">
                          {occ.desc}
                        </span>
                      </div>
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-stone-900 border-stone-900 text-stone-50'
                            : 'border-stone-300 bg-stone-100'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-white border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-stone-700 hover:text-stone-950 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-medium transition-colors shadow-sm ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-medium transition-colors shadow-sm ml-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Update Recommendations</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
