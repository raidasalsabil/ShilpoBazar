import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/ProductCard';
import {
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Phone,
  Calendar,
  CheckCircle2,
  Package,
} from 'lucide-react';

export const ArtisanShopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const { getArtisanById, products } = useMarketplace();

  const artisan = getArtisanById(id || '');

  if (!artisan) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-craft-text">
          {language === 'bn' ? 'কারিগর খুঁজে পাওয়া যায়নি' : 'Artisan Not Found'}
        </h2>
        <Link to="/marketplace" className="text-sm text-terracotta-600 underline">
          {language === 'bn' ? 'বাজারে ফিরে যান' : 'Back to Marketplace'}
        </Link>
      </div>
    );
  }

  const shopProducts = products.filter(
    p => p.artisanId === artisan.id && p.status === 'approved'
  );

  const shopName = language === 'bn' ? artisan.shopName : artisan.shopNameEn;
  const artisanName = language === 'bn' ? artisan.name : artisan.nameEn;
  const district = language === 'bn' ? artisan.district : artisan.districtEn;
  const story = language === 'bn' ? artisan.story : artisan.storyEn;
  const specialties = language === 'bn' ? artisan.craftSpecialties : artisan.craftSpecialtiesEn;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Shop Header Banner */}
      <div className="bg-white rounded-3xl overflow-hidden border border-craft-border shadow-craft">
        {/* Cover */}
        <div className="h-48 sm:h-64 relative bg-ivory-200">
          <img
            src={artisan.coverImage}
            alt={shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 sm:left-10 text-white flex items-center gap-2">
            <span className="text-xs bg-sage-600/90 backdrop-blur-md px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'যাচাইকৃত কারিগর' : 'Verified Artisan'}</span>
            </span>
          </div>
        </div>

        {/* Profile Card Info */}
        <div className="p-6 sm:p-10 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={artisan.avatar}
                alt={artisanName}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white object-cover shadow-xl flex-shrink-0"
              />
              <div className="space-y-1">
                <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
                  {shopName}
                </h1>
                <p className="text-sm font-semibold text-terracotta-600">
                  {artisanName}
                </p>
                <div className="flex items-center gap-2 text-xs text-craft-muted">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{district}</span>
                  </span>
                  <span>•</span>
                  <span>{artisan.joinedDate}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-4 bg-ivory-100 p-3 rounded-2xl border border-craft-border self-stretch sm:self-auto justify-around">
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-terracotta-600 font-bangla">{shopProducts.length}</span>
                <span className="text-[11px] text-craft-muted">{language === 'bn' ? 'পণ্য' : 'Items'}</span>
              </div>
              <div className="h-8 w-[1px] bg-craft-border"></div>
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-craft-text font-bangla">{artisan.totalSales}</span>
                <span className="text-[11px] text-craft-muted">{language === 'bn' ? 'বিক্রয়' : 'Sales'}</span>
              </div>
              <div className="h-8 w-[1px] bg-craft-border"></div>
              <div className="text-center px-2">
                <span className="block text-lg font-bold text-mustard-600 font-bangla">★ {artisan.rating}</span>
                <span className="text-[11px] text-craft-muted">{language === 'bn' ? 'রেটিং' : 'Rating'}</span>
              </div>
            </div>
          </div>

          {/* Artisan Craft Story */}
          <div className="bg-ivory-50 p-6 rounded-2xl border border-craft-border space-y-3">
            <h3 className="font-bold text-sm text-craft-text flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-mustard-500" />
              <span>{language === 'bn' ? 'কারিগরের গল্প ও আত্মকথা' : 'The Artisan’s Craft Narrative'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-craft-text/90 leading-relaxed whitespace-pre-line">
              {story}
            </p>

            {/* Craft Specialties */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-craft-muted">
                {language === 'bn' ? 'দক্ষতার ক্ষেত্রসমূহ:' : 'Craft Specialties:'}
              </span>
              {specialties.map((spec, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white text-terracotta-700 px-3 py-1 rounded-full border border-terracotta-200 font-medium"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shop's Products Catalogue */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bangla text-xl sm:text-2xl font-bold text-craft-text">
            {language === 'bn' ? `${shopName}-এর হস্তশিল্প সংগ্রহ` : `${shopName} Catalog`}
          </h2>
          <span className="text-xs text-craft-muted">
            {language === 'bn' ? `মোট ${shopProducts.length}টি সৃষ্টি` : `${shopProducts.length} creations`}
          </span>
        </div>

        {shopProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-craft-border">
            <Package className="w-12 h-12 text-craft-muted mx-auto mb-2" />
            <p className="text-sm text-craft-muted">
              {language === 'bn' ? 'বর্তমানে কোনো স্টক নেই।' : 'No active products at this moment.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

