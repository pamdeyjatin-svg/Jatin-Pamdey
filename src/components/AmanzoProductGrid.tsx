import React, { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Product, ProductCategory } from '../types/amanzo';
import { AmanzoProductCard } from './AmanzoProductCard';

interface AmanzoProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  searchQuery: string;
  onAddToCart: (product: Product, size?: string) => void;
  onViewDetail: (product: Product) => void;
  onToggleWishlist: (productId: string | number) => void;
  wishlistIds: (string | number)[];
  language: 'en' | 'hi';
}

export const AmanzoProductGrid: React.FC<AmanzoProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onAddToCart,
  onViewDetail,
  onToggleWishlist,
  wishlistIds,
  language,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Filter categories chips
  const categoryChips: { label: string; labelHi: string; value: ProductCategory }[] = [
    { label: 'All', labelHi: 'सभी', value: 'All' },
    { label: 'Sneakers', labelHi: 'स्नीकर्स', value: 'Sneakers' },
    { label: 'Sports', labelHi: 'स्पोर्ट्स', value: 'Sports Shoes' },
    { label: 'Casual', labelHi: 'कैज़ुअल', value: 'Casual Shoes' },
    { label: 'Running', labelHi: 'रनिंग', value: 'Running Shoes' },
    { label: 'Boots', labelHi: 'बूट्स', value: 'Boots' },
    { label: 'Canvas', labelHi: 'कैनवास', value: 'Canvas Shoes' },
    { label: 'Fashion', labelHi: 'फैशन', value: 'Fashion' },
    { label: 'Other', labelHi: 'अन्य', value: 'Other' },
  ];

  // Filter items by category & search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      (p.nameHi && p.nameHi.toLowerCase().includes(q)) ||
      (p.desc && p.desc.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  // Sort filtered items
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-[#FFC400] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            {language === 'en' ? 'Our Products' : 'सभी प्रोडक्ट्स'}
          </h2>
          <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-0.5 rounded-full">
            {sortedProducts.length} {language === 'en' ? 'Items' : 'प्रोडक्ट'}
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
          <span className="text-xs font-bold text-neutral-600">
            {language === 'en' ? 'Sort By:' : 'क्रमबद्ध:'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-white border border-neutral-300 rounded-lg py-1.5 px-2.5 text-neutral-700 focus:outline-hidden focus:border-[#FFC400] cursor-pointer"
          >
            <option value="featured">
              {language === 'en' ? 'Featured / Trending' : 'लोकप्रिय / ट्रेंडिंग'}
            </option>
            <option value="price-asc">
              {language === 'en' ? 'Price: Low to High' : 'कीमत: कम से ज़्यादा'}
            </option>
            <option value="price-desc">
              {language === 'en' ? 'Price: High to Low' : 'कीमत: ज़्यादा से कम'}
            </option>
            <option value="rating">
              {language === 'en' ? 'Customer Rating' : 'ग्राहक रेटिंग'}
            </option>
          </select>
        </div>
      </div>

      {/* Category Chips Bar matching prompt's .chip styling */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
        {categoryChips.map((chip) => {
          const isActive = selectedCategory === chip.value;
          return (
            <button
              key={chip.value}
              onClick={() => onSelectCategory(chip.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
              }`}
            >
              {language === 'en' ? chip.label : chip.labelHi}
            </button>
          );
        })}
      </div>

      {/* Search Result Kicker */}
      {searchQuery && (
        <div className="mb-4 text-xs text-neutral-600 font-medium">
          {language === 'en' ? 'Search results for:' : 'खोज परिणाम:'}{' '}
          <span className="font-bold text-neutral-900">"{searchQuery}"</span>
        </div>
      )}

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedProducts.map((p) => (
            <AmanzoProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onViewDetail={onViewDetail}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlistIds.includes(p.id)}
              language={language}
            />
          ))}
        </div>
      ) : (
        /* Empty State matching prompt */
        <div className="p-12 text-center text-neutral-500 border border-dashed border-neutral-300 rounded-2xl bg-white space-y-3">
          <div className="text-4xl">🔍</div>
          <p className="text-sm font-semibold text-neutral-700">
            {language === 'en'
              ? 'No products found matching your search or category.'
              : 'इस खोज या कैटेगरी में कोई प्रोडक्ट नहीं मिला।'}
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
            }}
            className="text-xs font-bold text-[#E6AC00] hover:underline cursor-pointer"
          >
            {language === 'en' ? 'Reset Filters' : 'सभी फ़िल्टर हटाएं'}
          </button>
        </div>
      )}
    </section>
  );
};
