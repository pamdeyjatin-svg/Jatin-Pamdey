import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Shuffle, RefreshCw, Check, ArrowRight } from 'lucide-react';
import { Product, StyleProfile, ProductColor } from '../types';
import { PRODUCTS, STYLE_ARCHETYPES_INFO } from '../data/products';
import { generateCuratedOutfits, calculateStyleMatch } from '../utils/styleEngine';

interface StyleStudioProps {
  styleProfile: StyleProfile;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onSelectProduct: (product: Product) => void;
  onOpenAIStylist: () => void;
}

export const StyleStudio: React.FC<StyleStudioProps> = ({
  styleProfile,
  onAddToCart,
  onSelectProduct,
  onOpenAIStylist,
}) => {
  const curatedOutfits = generateCuratedOutfits(styleProfile);

  const kapdaList = PRODUCTS.filter((p) => p.category === 'kapda');
  const shoesList = PRODUCTS.filter((p) => p.category === 'shoes');
  const accList = PRODUCTS.filter((p) => p.category === 'accessories');

  const [selectedKapdaId, setSelectedKapdaId] = useState<string>(curatedOutfits[0]?.kapdaId || kapdaList[0].id);
  const [selectedShoesId, setSelectedShoesId] = useState<string>(curatedOutfits[0]?.shoesId || shoesList[0].id);
  const [selectedAccId, setSelectedAccId] = useState<string>(curatedOutfits[0]?.accessoryId || accList[0].id);

  const [activeSlot, setActiveSlot] = useState<'kapda' | 'shoes' | 'accessories'>('kapda');
  const [bundleAdded, setBundleAdded] = useState(false);

  const selectedKapda = PRODUCTS.find((p) => p.id === selectedKapdaId) || kapdaList[0];
  const selectedShoes = PRODUCTS.find((p) => p.id === selectedShoesId) || shoesList[0];
  const selectedAcc = PRODUCTS.find((p) => p.id === selectedAccId) || accList[0];

  // Calculate synergy
  const kapdaScore = calculateStyleMatch(selectedKapda, styleProfile).score;
  const shoesScore = calculateStyleMatch(selectedShoes, styleProfile).score;
  const accScore = calculateStyleMatch(selectedAcc, styleProfile).score;
  const synergyScore = Math.round((kapdaScore * 0.45 + shoesScore * 0.35 + accScore * 0.2));

  const totalFullPrice = selectedKapda.price + selectedShoes.price + selectedAcc.price;
  const bundleDiscount = Math.round(totalFullPrice * 0.12); // 12% Studio bundle saving
  const finalBundlePrice = totalFullPrice - bundleDiscount;

  const handleShuffle = () => {
    const randomKapda = kapdaList[Math.floor(Math.random() * kapdaList.length)];
    const randomShoes = shoesList[Math.floor(Math.random() * shoesList.length)];
    const randomAcc = accList[Math.floor(Math.random() * accList.length)];

    setSelectedKapdaId(randomKapda.id);
    setSelectedShoesId(randomShoes.id);
    setSelectedAccId(randomAcc.id);
  };

  const handleApplyPreset = (kapdaId: string, shoesId: string, accId: string) => {
    setSelectedKapdaId(kapdaId);
    setSelectedShoesId(shoesId);
    setSelectedAccId(accId);
  };

  const handleAddBundleToBag = () => {
    onAddToCart(selectedKapda, selectedKapda.sizes[0], selectedKapda.colors[0]);
    onAddToCart(selectedShoes, selectedShoes.sizes[0], selectedShoes.colors[0]);
    onAddToCart(selectedAcc, selectedAcc.sizes[0], selectedAcc.colors[0]);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2400);
  };

  return (
    <section className="py-12 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Interactive Outfit Studio</span>
              <span aria-hidden="true">·</span>
              <span>Kapda + Shoes + Accessories</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
              Curate Your Head-to-Toe Look
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Mix and match pieces across all three pillars to evaluate aesthetic cohesion and unlock a 12% bundle privilege.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShuffle}
              className="px-3.5 py-2 bg-white hover:bg-stone-100 border border-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle Combination</span>
            </button>

            <button
              onClick={onOpenAIStylist}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask AI Stylist to Polish</span>
            </button>
          </div>
        </div>

        {/* Curated Pre-made Presets Strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-mono uppercase text-stone-400 shrink-0">
            Presets:
          </span>
          {curatedOutfits.map((look) => (
            <button
              key={look.id}
              onClick={() => handleApplyPreset(look.kapdaId, look.shoesId, look.accessoryId)}
              className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-800 whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span className="font-semibold">{look.title}</span>
              <span className="text-[10px] text-stone-400 font-mono">
                {look.occasion.replace('_', ' ')}
              </span>
            </button>
          ))}
        </div>

        {/* 3-Slot Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 3-Column Outfit Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* SLOT 1: KAPDA */}
              <div
                onClick={() => setActiveSlot('kapda')}
                className={`relative rounded-xl border-2 p-3 transition-all cursor-pointer ${
                  activeSlot === 'kapda'
                    ? 'border-stone-900 bg-stone-50/50 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
                  <span>1. Kapda (Apparel)</span>
                  <span className="text-stone-900 font-semibold">{kapdaScore}% match</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-200">
                  <img
                    src={selectedKapda.image}
                    alt={selectedKapda.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="font-display font-semibold text-xs text-stone-900 line-clamp-1">
                  {selectedKapda.name}
                </div>
                <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                  {selectedKapda.currency}{selectedKapda.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* SLOT 2: SHOES */}
              <div
                onClick={() => setActiveSlot('shoes')}
                className={`relative rounded-xl border-2 p-3 transition-all cursor-pointer ${
                  activeSlot === 'shoes'
                    ? 'border-stone-900 bg-stone-50/50 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
                  <span>2. Shoes (Footwear)</span>
                  <span className="text-stone-900 font-semibold">{shoesScore}% match</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-200">
                  <img
                    src={selectedShoes.image}
                    alt={selectedShoes.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="font-display font-semibold text-xs text-stone-900 line-clamp-1">
                  {selectedShoes.name}
                </div>
                <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                  {selectedShoes.currency}{selectedShoes.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* SLOT 3: ACCESSORIES */}
              <div
                onClick={() => setActiveSlot('accessories')}
                className={`relative rounded-xl border-2 p-3 transition-all cursor-pointer ${
                  activeSlot === 'accessories'
                    ? 'border-stone-900 bg-stone-50/50 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
                  <span>3. Accessories</span>
                  <span className="text-stone-900 font-semibold">{accScore}% match</span>
                </div>
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-stone-100 mb-3 border border-stone-200">
                  <img
                    src={selectedAcc.image}
                    alt={selectedAcc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="font-display font-semibold text-xs text-stone-900 line-clamp-1">
                  {selectedAcc.name}
                </div>
                <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                  {selectedAcc.currency}{selectedAcc.price.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Selection Rail for currently selected slot */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-900 uppercase font-mono">
                  Select Alternative {activeSlot.toUpperCase()}
                </span>
                <span className="text-xs text-stone-500">
                  Click any item below to swap slot
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(activeSlot === 'kapda' ? kapdaList : activeSlot === 'shoes' ? shoesList : accList).map((item) => {
                  const isCurSelected =
                    (activeSlot === 'kapda' && selectedKapdaId === item.id) ||
                    (activeSlot === 'shoes' && selectedShoesId === item.id) ||
                    (activeSlot === 'accessories' && selectedAccId === item.id);

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (activeSlot === 'kapda') setSelectedKapdaId(item.id);
                        if (activeSlot === 'shoes') setSelectedShoesId(item.id);
                        if (activeSlot === 'accessories') setSelectedAccId(item.id);
                      }}
                      className={`text-left p-2 rounded-lg border text-xs transition-all cursor-pointer flex items-center gap-2 ${
                        isCurSelected
                          ? 'border-stone-900 bg-stone-100 font-semibold'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded object-cover bg-stone-100 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[11px] text-stone-900">
                          {item.name}
                        </div>
                        <div className="font-mono text-[10px] text-stone-500">
                          {item.currency}{item.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Synergy & Bundle Checkout Card (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-stone-500">
                  Look Synergy
                </span>
                <span className="text-sm font-mono font-bold text-amber-800">
                  {synergyScore}/100 Score
                </span>
              </div>
              <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-stone-900 h-full rounded-full transition-all duration-500"
                  style={{ width: `${synergyScore}%` }}
                />
              </div>
            </div>

            {/* Critique micro note */}
            <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-xs">
              <div className="font-semibold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Aesthetic Harmony</span>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {selectedKapda.material} draped over {selectedShoes.material} creates a balanced visual weight anchored by {selectedAcc.material}.
              </p>
            </div>

            {/* Bundle Pricing */}
            <div className="pt-2 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Individual Sum (3 items):</span>
                <span className="font-mono tabular-nums line-through text-stone-400">
                  ₹{totalFullPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-emerald-700 font-semibold">
                <span>Studio Privilege (12% off):</span>
                <span className="font-mono tabular-nums">
                  -₹{bundleDiscount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between text-stone-950 font-bold text-base pt-1 border-t border-stone-200">
                <span>Complete Outfit Total:</span>
                <span className="font-mono tabular-nums">
                  ₹{finalBundlePrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAddBundleToBag}
              className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{bundleAdded ? 'Complete Look Added ✓' : 'Add Complete Outfit to Bag'}</span>
            </button>

            <p className="text-[11px] text-stone-400 text-center font-mono">
              Includes free express shipping &amp; 14-day fit trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
