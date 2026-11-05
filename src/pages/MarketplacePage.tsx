import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/ProductCard';
import { CRAFT_CATEGORIES, BD_DISTRICTS } from '../data/mockData';
import { Search, Filter, SlidersHorizontal, Sparkles, X, ShieldCheck } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'popular'>('newest');
  const [onlyReadyMade, setOnlyReadyMade] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category state when URL query params change
  React.useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search')!);
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Only approved listings appear in public search
        if (product.status !== 'approved') return false;

        // Category filter
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // District filter
        if (selectedDistrict !== 'all') {
          const matchBn = product.artisanDistrict.includes(selectedDistrict);
          const matchEn = product.artisanDistrictEn.toLowerCase().includes(selectedDistrict.toLowerCase());
          if (!matchBn && !matchEn) return false;
        }

        // Price filter
        if (product.price > maxPrice) {
          return false;
        }

        // Ready made filter
        if (onlyReadyMade && product.isMadeToOrder) {
          return false;
        }

        // Search term
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchTitle =
            product.title.toLowerCase().includes(query) ||
            product.titleEn.toLowerCase().includes(query);
          const matchArtisan =
            product.artisanName.toLowerCase().includes(query) ||
            product.artisanNameEn.toLowerCase().includes(query);
          const matchDesc =
            product.description.toLowerCase().includes(query) ||
            product.descriptionEn.toLowerCase().includes(query);
          if (!matchTitle && !matchArtisan && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'popular') return b.rating - a.rating;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, selectedCategory, selectedDistrict, maxPrice, sortBy, onlyReadyMade, searchTerm]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedDistrict('all');
    setMaxPrice(3000);
    setSearchTerm('');
    setOnlyReadyMade(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Header (No Tagline) */}
      <div className="bg-ivory-200/60 rounded-3xl p-6 sm:p-8 border border-craft-border relative overflow-hidden">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider bg-white py-0.5 px-2.5 rounded-full border border-craft-border">
              {language === 'bn' ? 'শিল্প বাজার সংগ্রহ' : 'Shilpo Bajar Catalog'}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sage-800 bg-sage-100 py-0.5 px-2 rounded-full">
              <ShieldCheck className="w-3 h-3 text-sage-600" />
              <span>{language === 'bn' ? 'সকল ছবি যাচাইকৃত' : 'All Photos Forensics Verified'}</span>
            </span>
          </div>

          <h1 className="font-bangla text-2xl sm:text-4xl font-bold text-craft-text">
            {language === 'bn' ? 'খাঁটি হস্তশিল্পের বাজার' : 'Authentic Handmade Marketplace'}
          </h1>
          <p className="text-xs sm:text-sm text-craft-muted leading-relaxed">
            {language === 'bn'
              ? 'এখানে প্রতিটি পণ্যের দাম নির্ধারিত হয়েছে কারিগরের মেধা ও শ্রমের ঘণ্টা অনুযায়ী। কোনো ভুয়া বা AI এডিটেড ছবি নেই।'
              : 'Browse genuine creations priced to fairly compensate creator labor. Every photograph verified.'}
          </p>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-craft-border shadow-craft h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-craft-border">
            <span className="font-bold text-sm text-craft-text flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-terracotta-500" />
              <span>{language === 'bn' ? 'ফিল্টার সমূহ' : 'Filter Products'}</span>
            </span>
            <button
              onClick={clearFilters}
              className="text-xs text-terracotta-600 hover:underline"
            >
              {language === 'bn' ? 'রিসেট' : 'Reset'}
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-craft-muted uppercase tracking-wider block">
              {t('allCategories')}
            </label>
            <div className="space-y-1 text-xs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                  selectedCategory === 'all'
                    ? 'bg-terracotta-500 text-white font-medium'
                    : 'text-craft-text hover:bg-ivory-100'
                }`}
              >
                {language === 'bn' ? 'সকল পণ্য' : 'All Crafts'}
              </button>
              {CRAFT_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg transition ${
                    selectedCategory === cat.id
                      ? 'bg-terracotta-500 text-white font-medium'
                      : 'text-craft-text hover:bg-ivory-100'
                  }`}
                >
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>

          {/* District Filter */}
          <div className="space-y-2 pt-3 border-t border-craft-border">
            <label className="text-xs font-bold text-craft-muted uppercase tracking-wider block">
              {t('filterByDistrict')}
            </label>
            <select
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="w-full text-xs bg-ivory-100 border border-craft-border rounded-xl p-2.5 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
            >
              <option value="all">{t('allDistricts')}</option>
              {BD_DISTRICTS.map((dist, idx) => (
                <option key={idx} value={dist.split(' ')[0]}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Slider */}
          <div className="space-y-2 pt-3 border-t border-craft-border">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-craft-muted uppercase tracking-wider">
                {t('priceRange')}
              </span>
              <span className="font-bangla font-semibold text-terracotta-600">
                ৳{maxPrice.toLocaleString()} পর্যন্ত
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-terracotta-500 cursor-pointer"
            />
          </div>

          {/* Ready-made Checkbox */}
          <div className="pt-3 border-t border-craft-border">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-craft-text">
              <input
                type="checkbox"
                checked={onlyReadyMade}
                onChange={e => setOnlyReadyMade(e.target.checked)}
                className="rounded border-craft-border text-terracotta-500 focus:ring-terracotta-400 w-4 h-4"
              />
              <span>{language === 'bn' ? 'শুধুমাত্র প্রস্তুত স্টক' : 'Ready Stock only'}</span>
            </label>
          </div>
        </aside>

        {/* Products Grid Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="bg-white p-4 rounded-2xl border border-craft-border shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-ivory-100 pl-9 pr-4 py-2 rounded-xl border border-craft-border text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
              <Search className="w-4 h-4 text-craft-muted absolute left-3 top-1/2 -translate-y-1/2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-craft-muted hover:text-craft-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 py-2 px-3 bg-ivory-100 hover:bg-ivory-200 text-craft-text rounded-xl border border-craft-border text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-terracotta-500" />
                <span>{language === 'bn' ? 'ফিল্টার' : 'Filters'}</span>
              </button>

              {/* Sort By Dropdown */}
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="text-xs bg-ivory-100 border border-craft-border rounded-xl py-2 px-3 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400 font-medium"
              >
                <option value="newest">{t('sortNewest')}</option>
                <option value="price_low">{t('sortPriceLow')}</option>
                <option value="price_high">{t('sortPriceHigh')}</option>
                <option value="popular">{t('sortPopular')}</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'all' || selectedDistrict !== 'all' || searchTerm) && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-craft-muted">{language === 'bn' ? 'সক্রিয় ফিল্টার:' : 'Active:'}</span>
              {selectedCategory !== 'all' && (
                <span className="bg-mustard-100 text-mustard-800 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  <span>{selectedCategory}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}
              {selectedDistrict !== 'all' && (
                <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  <span>{selectedDistrict}</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDistrict('all')} />
                </span>
              )}
              {searchTerm && (
                <span className="bg-ivory-200 text-craft-text px-2.5 py-1 rounded-full flex items-center gap-1 font-medium">
                  <span>"{searchTerm}"</span>
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
                </span>
              )}
              <button onClick={clearFilters} className="text-terracotta-600 hover:underline font-semibold ml-1">
                {language === 'bn' ? 'সব মুছুন' : 'Clear all'}
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-xs text-craft-muted flex justify-between items-center">
            <span>
              {language === 'bn'
                ? `মোট ${filteredProducts.length}টি যাচাইকৃত হস্তশিল্প পাওয়া গেছে`
                : `Showing ${filteredProducts.length} verified handmade creations`}
            </span>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-craft-border space-y-4">
              <div className="w-16 h-16 rounded-full bg-ivory-200 text-craft-muted flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-bangla text-lg font-bold text-craft-text">
                {language === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No Products Found'}
              </h3>
              <p className="text-xs text-craft-muted max-w-sm mx-auto">
                {language === 'bn'
                  ? 'আপনার সার্চ বা ফিল্টার শর্ত অনুযায়ী কোনো পণ্য মেলেনি। অন্য ক্যাটাগরি বা জেলা নির্বাচন করে দেখুন।'
                  : 'Try adjusting your filters or search keywords to explore other authentic crafts.'}
              </p>
              <button
                onClick={clearFilters}
                className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold py-2 px-5 rounded-full shadow"
              >
                {language === 'bn' ? 'ফিল্টার রিসেট করুন' : 'Reset All Filters'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
