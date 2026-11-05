import { Product, StyleProfile, OutfitLook } from '../types';
import { PRODUCTS, STYLE_ARCHETYPES_INFO } from '../data/products';

export interface StyleMatchResult {
  score: number; // 0 - 100
  reasons: string[];
  isTopMatch: boolean;
  matchLevel: 'Exceptional' | 'Strong' | 'Complementary' | 'Versatile';
}

/**
 * Calculates a personalized match score (0 - 100) between a Product and the user's StyleProfile.
 */
export function calculateStyleMatch(product: Product, profile: StyleProfile): StyleMatchResult {
  let score = 40; // baseline versatility
  const reasons: string[] = [];

  // 1. Archetype Match (up to +35 pts)
  if (product.styleArchetypes.includes(profile.archetype)) {
    score += 35;
    const archetypeInfo = STYLE_ARCHETYPES_INFO[profile.archetype];
    reasons.push(`Core match for your ${archetypeInfo?.label || profile.archetype} aesthetic`);
  } else {
    // Secondary compatibility
    score += 10;
  }

  // 2. Palette Match (up to +20 pts)
  if (product.palettes.includes(profile.palette)) {
    score += 20;
    reasons.push('Harmonizes with your preferred color spectrum');
  } else {
    score += 5;
  }

  // 3. Silhouette Match (up to +15 pts)
  if (product.silhouettes.includes(profile.silhouette)) {
    score += 15;
    reasons.push(`Tailored to your ${profile.silhouette} silhouette preference`);
  }

  // Cap at 99% (nothing is 100% rigid in fashion)
  const finalScore = Math.min(99, Math.max(50, score));

  let matchLevel: StyleMatchResult['matchLevel'] = 'Versatile';
  if (finalScore >= 90) matchLevel = 'Exceptional';
  else if (finalScore >= 80) matchLevel = 'Strong';
  else if (finalScore >= 70) matchLevel = 'Complementary';

  return {
    score: finalScore,
    reasons,
    isTopMatch: finalScore >= 88,
    matchLevel,
  };
}

/**
 * Assembles complete curated outfits: [1 Kapda + 1 Shoe + 1 Accessory]
 * based on profile style archetype and palette.
 */
export function generateCuratedOutfits(profile: StyleProfile): OutfitLook[] {
  const kapdaItems = PRODUCTS.filter((p) => p.category === 'kapda');
  const shoeItems = PRODUCTS.filter((p) => p.category === 'shoes');
  const accItems = PRODUCTS.filter((p) => p.category === 'accessories');

  const rank = (items: Product[]) =>
    [...items].sort((a, b) => calculateStyleMatch(b, profile).score - calculateStyleMatch(a, profile).score);

  const rankedKapda = rank(kapdaItems);
  const rankedShoes = rank(shoeItems);
  const rankedAcc = rank(accItems);

  const outfits: OutfitLook[] = [
    {
      id: 'look-1',
      title: 'Signature Daily Uniform',
      description: `Elevated daily ensemble curated for your ${STYLE_ARCHETYPES_INFO[profile.archetype].label} palette. Natural textures with grounded footwear.`,
      kapdaId: rankedKapda[0]?.id || 'kpd-01',
      shoesId: rankedShoes[0]?.id || 'sho-01',
      accessoryId: rankedAcc[0]?.id || 'acc-01',
      occasion: 'daily_commute',
      archetype: profile.archetype,
    },
    {
      id: 'look-2',
      title: 'Weekend Atelier Drape',
      description: 'Relaxed proportions and tactile breathable fabrics designed for fluid mobility and studio days.',
      kapdaId: rankedKapda[1]?.id || rankedKapda[0]?.id || 'kpd-02',
      shoesId: rankedShoes[1]?.id || rankedShoes[0]?.id || 'sho-02',
      accessoryId: rankedAcc[1]?.id || rankedAcc[0]?.id || 'acc-02',
      occasion: 'weekend_leisure',
      archetype: profile.archetype,
    },
    {
      id: 'look-3',
      title: 'Evening Gallery Social',
      description: 'Deep tones, subtle architectural structure, and burnished metallic accents for social occasions.',
      kapdaId: rankedKapda.find((k) => k.id === 'kpd-05' || k.id === 'kpd-03')?.id || rankedKapda[0].id,
      shoesId: rankedShoes.find((s) => s.id === 'sho-03' || s.id === 'sho-02')?.id || rankedShoes[0].id,
      accessoryId: rankedAcc.find((a) => a.id === 'acc-03' || a.id === 'acc-01')?.id || rankedAcc[0].id,
      occasion: 'evening_social',
      archetype: profile.archetype,
    },
  ];

  return outfits;
}

/**
 * Finds complementary items to "Complete the Look" for any specific product.
 */
export function getComplementaryItems(product: Product): Product[] {
  // First check specific matchingItemIds
  const explicitMatches = PRODUCTS.filter((p) => product.matchingItemIds.includes(p.id));
  if (explicitMatches.length >= 2) return explicitMatches.slice(0, 3);

  // If not enough, find one from each different category
  const otherCategories = (['kapda', 'shoes', 'accessories'] as const).filter((c) => c !== product.category);
  const found: Product[] = [...explicitMatches];

  for (const cat of otherCategories) {
    if (!found.some((p) => p.category === cat)) {
      const bestForCat = PRODUCTS.filter((p) => p.category === cat).sort(
        (a, b) => (b.styleArchetypes.some((s) => product.styleArchetypes.includes(s)) ? 1 : 0) -
                  (a.styleArchetypes.some((s) => product.styleArchetypes.includes(s)) ? 1 : 0)
      )[0];
      if (bestForCat) found.push(bestForCat);
    }
  }

  return found.slice(0, 3);
}
