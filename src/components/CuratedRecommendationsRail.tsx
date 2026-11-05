import React, { useState } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Eye, ShoppingBag } from 'lucide-react';
import { Product, StyleProfile, ProductColor } from '../types';
import { calculateStyleMatch } from '../utils/styleEngine';
import { STYLE_ARCHETYPES_INFO } from '../data/products';

interface CuratedRecommendationsRailProps {
  products: Product[];
  styleProfile: StyleProfile;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
  onOpenStyleQuiz: () => void;
  onOpenAIStylist: () => void;
}

export const CuratedRecommendationsRail: React.FC<CuratedRecommendationsRailProps> = ({
  products,
  styleProfile,
  onSelectProduct,
  onAddToCart,
  onOpenStyleQuiz,
  onOpenAIStylist,
}) => {
  const [aiAdvice, setAiAdvice] = useState<{
    headline?: string;
    advice?: string;
    stylingTips?: string[];
  } | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // Score all products and take top 4 matches
  const scoredProducts = products
    .map((product) => ({
      product,
      match: calculateStyleMatch(product, styleProfile),
    }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 4);

  const fetchAIStylistAdvice = async () => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/stylist/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: styleProfile,
          occasion: styleProfile.occasions[0] || 'daily_commute',
        }),
      });
      const data = await res.json();
      setAiAdvice(data);
    } catch (err) {
      console.error(err);
      setAiAdvice({
        headline: 'Tactile Balance Strategy',
        advice: `For your ${STYLE_ARCHETYPES_INFO[styleProfile.archetype].label} preference, anchor your look with relaxed natural textures and grounded monochrome footwear.`,
        stylingTips: [
          'Pair the washed linen overshirt with selvedge denim for intentional drape.',
          'Add chalk calfskin sneakers to maintain low-visual-clutter.',
        ],
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Personalized Capsule</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-stone-900">
                {STYLE_ARCHETYPES_INFO[styleProfile.archetype].label}
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
              Recommended For Your Aesthetic
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
              Hand-ranked across Kapda, shoes, and accessories by compatibility with your silhouette and palette preferences.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={fetchAIStylistAdvice}
              disabled={isLoadingAI}
              className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin' : ''}`} />
              <span>{aiAdvice ? 'Refresh AI Critique' : 'Generate AI Styling Advice'}</span>
            </button>

            <button
              onClick={onOpenAIStylist}
              className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Consult Stylist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Stylist Note Drawer / Card if generated */}
        {aiAdvice && (
          <div className="p-5 bg-stone-50 border border-stone-200 rounded-xl space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600" />
                <h3 className="font-display text-sm font-semibold text-stone-900">
                  {aiAdvice.headline || 'Creative Director Notes'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                KAPDA &amp; CO. Intelligence
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              {aiAdvice.advice}
            </p>
            {aiAdvice.stylingTips && aiAdvice.stylingTips.length > 0 && (
              <ul className="text-xs text-stone-600 space-y-1 pl-4 list-disc marker:text-stone-400">
                {aiAdvice.stylingTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 4-Item Curated Recommendations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scoredProducts.map(({ product, match }) => {
            const defaultColor = product.colors[0];
            const defaultSize = product.sizes[0];

            return (
              <div
                key={product.id}
                className="group relative bg-stone-50 border border-stone-200/90 rounded-xl overflow-hidden flex flex-col transition-all hover:border-stone-400 hover:shadow-sm"
              >
                {/* Image Container with high image ratio */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Clean unboxed match badge (top-right) */}
                  <div className="absolute top-2.5 right-2.5 bg-stone-900/90 text-stone-50 text-[11px] font-mono px-2 py-0.5 rounded backdrop-blur-xs font-semibold">
                    {match.score}% Match
                  </div>

                  {/* Category label (top-left) */}
                  <div className="absolute top-2.5 left-2.5 text-[10px] font-mono uppercase tracking-wider text-stone-700 bg-white/90 px-2 py-0.5 rounded backdrop-blur-xs">
                    {product.category}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="text-[11px] text-stone-500 font-mono flex items-center gap-1.5 mb-1">
                      <span>{product.material}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-medium">{match.matchLevel}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-display font-semibold text-sm text-stone-900 line-clamp-1 hover:text-stone-700 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-[11px] text-stone-600 line-clamp-1 mt-1">
                      {match.reasons[0] || 'Matches your silhouette profile'}
                    </p>
                  </div>

                  {/* Price baseline & Actions */}
                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="font-mono text-sm font-semibold text-stone-950 tabular-nums">
                        {product.currency}
                        {product.price.toLocaleString('en-IN')}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 font-mono text-xs text-stone-400 line-through tabular-nums">
                          {product.currency}
                          {product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-200 rounded-lg transition-colors"
                        title="View details"
                        aria-label="View product details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onAddToCart(product, defaultSize, defaultColor)}
                        className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                        title="Add to bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
