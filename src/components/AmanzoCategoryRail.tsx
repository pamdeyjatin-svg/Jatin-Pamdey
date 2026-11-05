import React from 'react';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { ProductCategory } from '../types/amanzo';
import { CATEGORIES_LIST } from '../data/amanzoData';

interface AmanzoCategoryRailProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  language: 'en' | 'hi';
}

export const AmanzoCategoryRail: React.FC<AmanzoCategoryRailProps> = ({
  selectedCategory,
  onSelectCategory,
  language,
}) => {
  const handleCategoryClick = (cat: ProductCategory) => {
    onSelectCategory(cat);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      {/* Section Header with Yellow Accent Bar (Exact screenshot style) */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-6 bg-[#FFC400] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            {language === 'en' ? 'Shop by Category' : 'कैटेगरी अनुसार शॉपिंग करें'}
          </h2>
        </div>

        <button
          onClick={() => handleCategoryClick('All')}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E6AC00] hover:text-[#B38600] transition-colors cursor-pointer"
        >
          <span>{language === 'en' ? 'View All' : 'सभी देखें'}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Circular Category Cards Row matching the screenshot */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-6 justify-items-center">
        {CATEGORIES_LIST.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id as ProductCategory)}
              className="flex flex-col items-center gap-2.5 group cursor-pointer text-center w-full max-w-[120px]"
            >
              {/* Circular Card Container with Soft Gray Drop Background */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center p-2 transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:-translate-y-1 ${
                  isSelected
                    ? 'ring-3 ring-[#FFC400] bg-[#FFC400]/10'
                    : 'border border-neutral-200/80 group-hover:border-[#FFC400]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain filter group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Category Label */}
              <span
                className={`text-xs sm:text-sm font-semibold transition-colors line-clamp-1 ${
                  isSelected
                    ? 'text-black font-bold'
                    : 'text-neutral-700 group-hover:text-black'
                }`}
              >
                {language === 'en' ? cat.name : cat.nameHi}
              </span>
            </button>
          );
        })}

        {/* 7th Circle: 'More' with Three Dots */}
        <button
          onClick={() => handleCategoryClick('Fashion')}
          className="flex flex-col items-center gap-2.5 group cursor-pointer text-center w-full max-w-[120px]"
        >
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center transition-all duration-300 shadow-xs group-hover:shadow-md group-hover:-translate-y-1 ${
              selectedCategory === 'Fashion' || selectedCategory === 'Other'
                ? 'ring-3 ring-[#FFC400] bg-[#FFC400]/10'
                : 'border border-neutral-200/80 group-hover:border-[#FFC400]'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-neutral-200/80 group-hover:bg-[#FFC400]/20 flex items-center justify-center transition-colors">
              <MoreHorizontal className="w-6 h-6 text-neutral-600 group-hover:text-black" />
            </div>
          </div>

          <span className="text-xs sm:text-sm font-semibold text-neutral-700 group-hover:text-black transition-colors">
            {language === 'en' ? 'More' : 'अन्य'}
          </span>
        </button>
      </div>
    </section>
  );
};
