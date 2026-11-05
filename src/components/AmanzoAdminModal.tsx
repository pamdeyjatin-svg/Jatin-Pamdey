import React, { useState } from 'react';
import { X, Plus, Trash2, Edit3, Image as ImageIcon, RotateCcw } from 'lucide-react';
import { Product, ProductCategory } from '../types/amanzo';

interface AmanzoAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSaveProduct: (product: Partial<Product>) => void;
  onDeleteProduct: (id: string | number) => void;
  onResetCatalog: () => void;
  language: 'en' | 'hi';
}

export const AmanzoAdminModal: React.FC<AmanzoAdminModalProps> = ({
  isOpen,
  onClose,
  products,
  onSaveProduct,
  onDeleteProduct,
  onResetCatalog,
  language,
}) => {
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [category, setCategory] = useState<ProductCategory>('Sneakers');
  const [desc, setDesc] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['UK 7', 'UK 8', 'UK 9', 'UK 10']);

  const allAvailableSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'S', 'M', 'L', 'XL'];

  if (!isOpen) return null;

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(language === 'en' ? 'Please select a valid image file.' : 'कृपया मान्य फ़ोटो चुनें।');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert(language === 'en' ? 'Image must be under 2MB.' : 'फ़ोटो 2MB से छोटी रखें।');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setPrice(String(p.price));
    setOriginalPrice(String(p.originalPrice || p.price));
    setCategory(p.category);
    setDesc(p.desc || '');
    setImagePreview(p.image || '');
    setSelectedSizes(p.sizes || ['UK 7', 'UK 8', 'UK 9', 'UK 10']);
    const formEl = document.getElementById('admin-form-anchor');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Sneakers');
    setDesc('');
    setImagePreview('');
    setSelectedSizes(['UK 7', 'UK 8', 'UK 9', 'UK 10']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = parseFloat(price);
    if (!name.trim() || isNaN(numericPrice) || numericPrice <= 0) {
      alert(
        language === 'en'
          ? 'Please enter a valid product name and price.'
          : 'कृपया सही प्रोडक्ट नाम और मान्य कीमत दर्ज करें।'
      );
      return;
    }

    const origPriceNum = parseFloat(originalPrice) || Math.round(numericPrice * 1.35);
    const discount =
      origPriceNum > numericPrice
        ? Math.round(((origPriceNum - numericPrice) / origPriceNum) * 100)
        : 0;

    onSaveProduct({
      id: editingId || Date.now(),
      name: name.trim(),
      price: numericPrice,
      originalPrice: origPriceNum,
      discountPercent: discount,
      category,
      desc: desc.trim(),
      image: imagePreview || '/src/assets/images/product_black_sneakers_1793854472302.jpg',
      sizes: selectedSizes.length > 0 ? selectedSizes : ['UK 8'],
      colors: [{ name: 'Default', hex: '#111111' }],
      rating: 4.8,
      reviewsCount: 120,
      inStock: true,
      emoji: '👟',
    });

    resetForm();
  };

  const toggleSize = (sz: string) => {
    if (selectedSizes.includes(sz)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== sz));
    } else {
      setSelectedSizes([...selectedSizes, sz]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              {language === 'en' ? 'Store Management' : 'स्टोर मैनेजमेंट'}
            </h2>
            <p className="text-xs text-neutral-400">
              {language === 'en'
                ? 'Add, edit, and organize store products'
                : 'प्रोडक्ट्स जोड़ें, बदलें और स्टोर व्यवस्थित करें'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Demo Notice Box (Matching user's prompt) */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">
              {language === 'en' ? 'Demo Note:' : 'डेमो नोट:'}{' '}
            </span>
            {language === 'en'
              ? 'Products added or modified here are saved in your local browser storage. You can add new shoes with custom photos, set prices, and test immediate catalog updates.'
              : 'अभी जो प्रोडक्ट जोड़ोगे/बदलेगे, वे इसी ब्राउज़र और डिवाइस में सेव होंगे। आप फोटो अपलोड कर सकते हैं, कीमतें तय कर सकते हैं और तुरंत स्टोर में बदलाव देख सकते हैं।'}
          </div>

          {/* Form */}
          <form
            id="admin-form-anchor"
            onSubmit={handleSubmit}
            className="bg-neutral-50 p-5 rounded-xl border border-neutral-200 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-neutral-900">
                {editingId
                  ? language === 'en'
                    ? 'Edit Product'
                    : 'प्रोडक्ट बदलें'
                  : language === 'en'
                  ? 'Add New Product'
                  : 'नया प्रोडक्ट जोड़ें'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-neutral-500 hover:text-black underline cursor-pointer"
                >
                  {language === 'en' ? 'Cancel Edit' : 'रद्द करें'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {language === 'en' ? 'Product Name *' : 'प्रोडक्ट का नाम *'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'en' ? 'e.g. Black Sneakers' : 'जैसे Black Sneakers'}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {language === 'en' ? 'Category *' : 'कैटेगरी *'}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ProductCategory)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400] cursor-pointer"
                >
                  <option value="Sneakers">Sneakers (स्नीकर्स)</option>
                  <option value="Sports Shoes">Sports Shoes (स्पोर्ट्स शूज़)</option>
                  <option value="Casual Shoes">Casual Shoes (कैज़ुअल शूज़)</option>
                  <option value="Running Shoes">Running Shoes (रनिंग शूज़)</option>
                  <option value="Boots">Boots (बूट्स)</option>
                  <option value="Canvas Shoes">Canvas Shoes (कैनवास शूज़)</option>
                  <option value="Fashion">Fashion & Apparel (फैशन)</option>
                  <option value="Other">Other Goods (अन्य)</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {language === 'en' ? 'Selling Price (₹) *' : 'कीमत (₹) *'}
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2099"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                />
              </div>

              {/* Original Price */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  {language === 'en' ? 'Original Price (₹ MRP)' : 'एमआरपी / पुरानी कीमत (₹)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="3499"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
                />
              </div>
            </div>

            {/* Sizes Selection */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                {language === 'en' ? 'Available Sizes' : 'उपलब्ध साइज़'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allAvailableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`px-2.5 py-1 text-xs rounded-md font-bold cursor-pointer transition-colors ${
                      selectedSizes.includes(sz)
                        ? 'bg-[#111111] text-white'
                        : 'bg-white border border-neutral-300 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Upload & Preview */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'en' ? 'Upload Photo' : 'फ़ोटो अपलोड करें'}
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="text-xs text-neutral-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-200 file:text-neutral-800 hover:file:bg-neutral-300 cursor-pointer"
                />
                {imagePreview && (
                  <div className="w-12 h-12 rounded-lg border border-neutral-300 overflow-hidden bg-white shrink-0">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {language === 'en' ? 'Short Description (Optional)' : 'छोटा विवरण (वैकल्पिक)'}
              </label>
              <textarea
                rows={2}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Comfortable stylish sneakers with memory cushion...'
                    : 'आरामदायक और स्टाइलिश स्नीकर्स, हर रोज़ इस्तेमाल के लिए...'
                }
                className="w-full px-3.5 py-2 text-xs bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-[#FFC400]"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#111111] hover:bg-neutral-800 text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#FFC400]" />
                <span>
                  {editingId
                    ? language === 'en'
                      ? 'Update Product'
                      : 'प्रोडक्ट अपडेट करें'
                    : language === 'en'
                    ? 'Save Product'
                    : 'प्रोडक्ट सेव करें'}
                </span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-bold text-xs px-4 py-2.5 rounded-lg cursor-pointer"
              >
                {language === 'en' ? 'Reset Form' : 'नया फॉर्म'}
              </button>
            </div>
          </form>

          {/* Current Products List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-neutral-900">
                {language === 'en' ? 'Current Catalog' : 'आपके प्रोडक्ट्स'} ({products.length})
              </h3>
              <button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      language === 'en'
                        ? 'Reset catalog to default AMANZO products?'
                        : 'क्या आप डिफ़ॉल्ट प्रोडक्ट्स रिसेट करना चाहते हैं?'
                    )
                  ) {
                    onResetCatalog();
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-black cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'en' ? 'Restore Defaults' : 'डिफ़ॉल्ट रीसेट'}</span>
              </button>
            </div>

            <div className="border border-neutral-200 rounded-xl divide-y divide-neutral-200 overflow-hidden bg-white">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-lg">{p.emoji || '📦'}</span>
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-neutral-500 flex items-center gap-2">
                        <span className="font-semibold text-neutral-700">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        <span>•</span>
                        <span>{p.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEditClick(p)}
                      className="px-2.5 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3 h-3 text-[#E6AC00]" />
                      <span>{language === 'en' ? 'Edit' : 'बदलें'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (
                          confirm(
                            language === 'en'
                              ? `Are you sure you want to delete "${p.name}"?`
                              : `क्या आप "${p.name}" को हटाना चाहते हैं?`
                          )
                        ) {
                          onDeleteProduct(p.id);
                        }
                      }}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
