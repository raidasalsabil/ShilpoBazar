import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { ProductCard } from '../components/ProductCard';
import { CRAFT_CATEGORIES } from '../data/mockData';
import {
  Sparkles,
  Calculator,
  ShieldCheck,
  Heart,
  ArrowRight,
  Clock,
  Layers,
  MapPin,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, artisans } = useMarketplace();

  const approvedProducts = products.filter(p => p.status === 'approved');
  const featuredProducts = approvedProducts.slice(0, 4);
  const recentProducts = approvedProducts.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION (No Tagline) */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-craft-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Column: Brand Platform Introduction */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full bg-mustard-100 text-mustard-800 text-xs font-semibold border border-mustard-300">
                <span className="w-2 h-2 rounded-full bg-terracotta-500"></span>
                <span>{language === 'bn' ? 'শিল্প বাজার — হস্তশিল্পীদের ডিজিটাল প্ল্যাটফর্ম' : 'Shilpo Bajar — Artisan Craft Platform'}</span>
              </div>

              {/* Main Headline (Clean, No Tagline) */}
              <h1 className="font-bangla text-3xl sm:text-5xl lg:text-6xl font-bold text-craft-text leading-[1.15] tracking-tight">
                <span>{t('heroTitlePart1')}</span>
                <br />
                <span className="text-terracotta-600 underline decoration-mustard-400 decoration-wavy decoration-2">
                  {t('heroTitlePart2')}
                </span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-craft-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t('heroDesc')}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/marketplace"
                  className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium py-3 px-6 rounded-full shadow-craft hover:shadow-craft-hover transition flex items-center gap-2 text-sm"
                >
                  <span>{t('exploreCrafts')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/seller/pricing-calculator"
                  className="bg-white hover:bg-ivory-200 text-terracotta-700 border border-terracotta-300 font-medium py-3 px-5 rounded-full shadow-sm transition flex items-center gap-2 text-sm"
                >
                  <Calculator className="w-4 h-4 text-mustard-500" />
                  <span>{t('calculateFairPrice')}</span>
                </Link>

                <Link
                  to="/seller/register"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-800 py-2 px-3.5 rounded-full hover:bg-indigo-50 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'কারিগর হিসেবে যোগ দিন' : 'Join as Artisan'}</span>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-craft-muted">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  <span>{language === 'bn' ? 'শতভাগ বাস্তব ছবি' : '100% Real Camera Photos'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  <span>{language === 'bn' ? 'ন্যায্য পারিশ্রমিক মডেল' : 'Ethical Labor Pricing'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  <span>{language === 'bn' ? 'সরাসরি কারিগরের আয়' : 'Direct Artisan Earnings'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Artisan Visual Card */}
                <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-xl border border-craft-border relative z-10">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-200 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=1000&q=80"
                      alt="Artisan stitching Nakshi Kantha"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-sage-800 flex items-center gap-1.5 shadow-sm border border-sage-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
                      <span>{language === 'bn' ? 'AI-মুক্ত আসল ছবি যাচাইকৃত' : 'Camera-verified Real Image'}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1 shadow">
                      <Clock className="w-3.5 h-3.5 text-mustard-300" />
                      <span>{language === 'bn' ? '১২ ঘণ্টা নিখুঁত সূঁচের কাজ' : '12 Hours Skilled Needlecraft'}</span>
                    </div>
                  </div>

                  {/* Card detail */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full">
                        {language === 'bn' ? 'জামালপুরী নকশিকাঁথা' : 'Jamalpuri Nakshi Kantha'}
                      </span>
                      <span className="font-bangla font-bold text-lg text-craft-text">৳১,৮৫০</span>
                    </div>

                    {/* Labour price breakdown */}
                    <div className="bg-ivory-100 p-2.5 rounded-xl text-xs space-y-1 border border-craft-border/60">
                      <div className="flex justify-between text-craft-muted text-[11px]">
                        <span>{language === 'bn' ? 'উপকরণের খরচ (সুতি কাপড় ও সুতা)' : 'Materials (Fabric & skeins)'}:</span>
                        <span>৳৫৫০</span>
                      </div>
                      <div className="flex justify-between text-terracotta-700 font-semibold text-[11px]">
                        <span>{language === 'bn' ? 'কারিগরের শ্রমমূল্য (১২ ঘণ্টা × ৳৮৫)' : 'Artisan Labor (12h × ৳85)'}:</span>
                        <span>৳১,০২০</span>
                      </div>
                      <div className="flex justify-between text-craft-muted text-[11px]">
                        <span>{language === 'bn' ? 'প্রস্তুতি ও প্যাকিং লভ্যাংশ' : 'Packaging & Fair Profit'}:</span>
                        <span>৳২৮০</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative terracotta floating badge */}
                <div className="hidden sm:block absolute -bottom-6 -left-6 bg-terracotta-500 text-white p-4 rounded-2xl shadow-lg z-20 max-w-[210px] text-xs border border-mustard-300">
                  <p className="font-bangla font-semibold text-mustard-200 text-sm">
                    {language === 'bn' ? 'শিল্প বাজার নীতি' : 'Shilpo Bajar Values'}
                  </p>
                  <p className="mt-1 text-ivory-100 text-[11px] leading-tight">
                    {language === 'bn'
                      ? 'কারিগরের প্রতিটি কাজের ঘণ্টার মূল্যায়ন ও শতভাগ আসল পণ্য।'
                      : 'Artisan hours valued with pride and 100% genuine products.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FAIR PRICING PHILOSOPHY & WHY IT MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-terracotta-50 via-ivory-50 to-mustard-50 rounded-3xl p-6 sm:p-10 border border-terracotta-200/70 shadow-sm">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <span className="text-xs font-bold text-terracotta-600 uppercase tracking-wider bg-white py-1 px-3 rounded-full border border-terracotta-200">
              {language === 'bn' ? 'আমাদের দর্শন' : 'Our Approach'}
            </span>
            <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
              {t('fairPricingBannerTitle')}
            </h2>
            <p className="text-sm text-craft-muted leading-relaxed">
              {t('fairPricingBannerDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
                ✕
              </div>
              <h4 className="font-semibold text-sm text-craft-text">
                {language === 'bn' ? 'প্রচলিত ভ্রান্ত হিসাব' : 'The Common Mistake'}
              </h4>
              <p className="text-xs text-craft-muted leading-relaxed">
                {language === 'bn'
                  ? 'শুধু সুতা, মাটি বা পুতির খরচে পণ্য বিক্রি করা হয়। কারিগরের দিনের পর দিন সময় ব্যয় হওয়া সত্ত্বেও তারা শূন্য টাকা লাভ পান।'
                  : 'Pricing only by yarn, clay or bead cost. The maker works for 15 hours and earns practically zero labor return.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-terracotta-200 shadow-sm space-y-2 relative">
              <div className="w-9 h-9 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center font-bold text-sm">
                =
              </div>
              <h4 className="font-semibold text-sm text-terracotta-700">
                {language === 'bn' ? 'শিল্প বাজার সমাধান সূত্র' : 'Shilpo Bajar Formula'}
              </h4>
              <p className="text-xs text-craft-muted leading-relaxed">
                {language === 'bn'
                  ? 'মোট ব্যয় = উপকরণ খরচ + (মোট সময় × ন্যায্য পারিশ্রমিক) + প্যাকিং ও সরঞ্জাম। এর সাথে যুক্ত হয় সম্মানজনক লভ্যাংশ।'
                  : 'Total Fair Cost = Materials + (Artisan Hours × Hourly Rate) + Overhead + Profit Margin.'}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-sage-200 shadow-sm space-y-2">
              <div className="w-9 h-9 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h4 className="font-semibold text-sm text-sage-800">
                {language === 'bn' ? 'স্বাবলম্বী কারিগর সমাজ' : 'Empowered Creators'}
              </h4>
              <p className="text-xs text-craft-muted leading-relaxed">
                {language === 'bn'
                  ? 'গৃহিণী ও গ্রামীণ নারী কারিগররা তাদের হাতের দক্ষতার মর্যাদা পান এবং টেকসই ব্যবসা গড়ে তুলতে পারেন।'
                  : 'Home-based women and traditional artisans earn sustainable livelihoods with pride and digital autonomy.'}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/seller/pricing-calculator"
              className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold py-2.5 px-5 rounded-full shadow transition"
            >
              <Calculator className="w-4 h-4 text-mustard-300" />
              <span>{language === 'bn' ? 'নিজের কাজের দাম হিসাব করে দেখুন' : 'Try the Fair Price Calculator'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CRAFT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider block mb-1">
              {language === 'bn' ? 'বাংলার ঐতিহ্য' : 'Heritage Crafts'}
            </span>
            <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
              {t('featuredCategories')}
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1 group"
          >
            <span>{language === 'bn' ? 'সবগুলো বিভাগ দেখুন' : 'Browse All Categories'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CRAFT_CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/marketplace?category=${cat.id}`}
              className="group bg-white p-4 sm:p-5 rounded-2xl border border-craft-border shadow-craft hover:shadow-craft-hover hover:border-terracotta-400 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-ivory-200 group-hover:bg-terracotta-100 text-terracotta-600 flex items-center justify-center transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-craft-muted group-hover:text-terracotta-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-craft-text group-hover:text-terracotta-600 transition-colors">
                  {language === 'bn' ? cat.nameBn : cat.nameEn}
                </h3>
                <p className="text-[11px] text-craft-muted mt-0.5">
                  {language === 'bn' ? 'হাতে তৈরি খাঁটি সৃষ্টি' : 'Genuine handcrafted'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. ANTI-AI AUTHENTICITY PROMISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-white/10 text-mustard-300 text-xs font-medium border border-white/20">
                <ShieldCheck className="w-4 h-4 text-mustard-300" />
                <span>{language === 'bn' ? 'সততার অঙ্গীকার' : 'Zero Synthetic Misrepresentation'}</span>
              </div>

              <h2 className="font-bangla text-2xl sm:text-3xl font-bold leading-snug">
                {language === 'bn'
                  ? 'কেন শিল্প বাজারে AI-জেনারেটেড ছবি কঠোরভাবে নিষিদ্ধ?'
                  : 'Why Shilpo Bajar Strictly Rejects AI-Generated Product Photos'}
              </h2>

              <p className="text-xs sm:text-sm text-ivory-200 leading-relaxed max-w-2xl">
                {language === 'bn'
                  ? 'আজকাল বিভিন্ন অনলাইন শপে কৃত্রিম বুদ্ধিমত্তা দিয়ে অতি-উজ্জ্বল কাল্পনিক পণ্য সাজিয়ে ক্রেতাদের প্রতারিত করা হচ্ছে। শিল্প বাজারে আমরা ৪-স্তরীয় ফরেনসিক স্ক্যানিং ও কারিগরের স্বত্ব সনদের মাধ্যমে প্রতিটি ছবি যাচাই করি, যাতে আপনি যা দেখছেন, ঠিক সেই খাঁটি পণ্যটিই হাতে পান।'
                  : 'AI-generated mockups distort authentic fabric textures, misleading buyers with artificial finishes. We utilize 4-layer optical forensics and artisan declarations to ensure honest, transparent handmade discovery.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-mustard-300 text-xs block">১. মেটাডেটা স্ক্যান</span>
                  <span className="text-[11px] text-ivory-200">EXIF ও সফটওয়্যার চেক</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-mustard-300 text-xs block">২. ফরেনসিক বিশ্লেষণ</span>
                  <span className="text-[11px] text-ivory-200">স্বাভাবিক আলো ও টেক্সচার</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-mustard-300 text-xs block">৩. কারিগরের অঙ্গীকার</span>
                  <span className="text-[11px] text-ivory-200">বাস্তব পণ্যের শপথ</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                  <span className="font-bold text-mustard-300 text-xs block">৪. অ্যাডমিন রিভিউ</span>
                  <span className="text-[11px] text-ivory-200">মানুষ দ্বারা যাচাই</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white text-craft-text p-5 rounded-2xl shadow-xl max-w-xs w-full text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-sm text-craft-text">
                  {language === 'bn' ? 'যাচাইকরণ প্রক্রিয়া সক্রিয়' : 'Live Forensic Screen'}
                </h4>
                <p className="text-xs text-craft-muted">
                  {language === 'bn'
                    ? 'আমাদের সিস্টেমে এখন পর্যন্ত শতভাগ পণ্য যাচাই প্রক্রিয়ার মধ্য দিয়ে অনুমোদিত হয়েছে।'
                    : 'All listed items pass our rigorous four-stage authenticity protocol.'}
                </p>
                <Link
                  to="/admin/image-review"
                  className="block text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 bg-ivory-100 py-2 rounded-lg"
                >
                  {language === 'bn' ? 'অ্যাডমিন মডারেশন প্যানেল দেখুন' : 'Explore Moderation Suite'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RECENTLY ADDED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider block mb-1">
              {language === 'bn' ? 'নতুন হস্তশিল্প' : 'Fresh Handiwork'}
            </span>
            <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
              {t('recentProducts')}
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 flex items-center gap-1 group"
          >
            <span>{language === 'bn' ? 'সকল হস্তশিল্প দেখুন' : 'View Marketplace'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. FEATURED ARTISANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider bg-terracotta-100 py-1 px-3 rounded-full">
            {language === 'bn' ? 'আমাদের অহংকার' : 'Human Creators'}
          </span>
          <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
            {t('featuredArtisans')}
          </h2>
          <p className="text-xs sm:text-sm text-craft-muted">
            {language === 'bn'
              ? 'যাঁদের হাতের স্পর্শে ও ধৈর্যে রূপ নেয় আমাদের চিরায়ত ঐতিহ্য।'
              : 'Meet the resilient creators preserving timeless Bangladeshi heritage crafts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisans.slice(0, 3).map(artisan => (
            <div
              key={artisan.id}
              className="bg-white rounded-3xl overflow-hidden border border-craft-border shadow-craft hover:shadow-craft-hover transition flex flex-col justify-between"
            >
              <div>
                {/* Cover & Avatar */}
                <div className="relative h-28 bg-ivory-200">
                  <img
                    src={artisan.coverImage}
                    alt={artisan.shopName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-6 left-5">
                    <img
                      src={artisan.avatar}
                      alt={artisan.name}
                      className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-md"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 px-5 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-base text-craft-text">
                      {language === 'bn' ? artisan.shopName : artisan.shopNameEn}
                    </h3>
                    <span className="flex items-center gap-1 text-xs text-mustard-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-mustard-500 text-mustard-500" />
                      <span>{artisan.rating}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-craft-muted mb-3">
                    <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                    <span>{language === 'bn' ? artisan.district : artisan.districtEn}</span>
                    <span>•</span>
                    <span>{artisan.joinedDate}</span>
                  </div>

                  <p className="text-xs text-craft-muted line-clamp-3 leading-relaxed mb-4">
                    {language === 'bn' ? artisan.story : artisan.storyEn}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'bn' ? artisan.craftSpecialties : artisan.craftSpecialtiesEn).map((sp, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-ivory-100 text-craft-text px-2 py-0.5 rounded-full border border-craft-border/60"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/artisan/${artisan.id}`}
                  className="block w-full text-center bg-ivory-100 hover:bg-terracotta-50 hover:text-terracotta-700 text-craft-text text-xs font-semibold py-2 rounded-xl border border-craft-border transition"
                >
                  {language === 'bn' ? 'দোকান ও কাজ দেখুন' : 'Visit Storefront'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-terracotta-600 uppercase tracking-wider bg-terracotta-100 py-1 px-3 rounded-full">
            {language === 'bn' ? 'সহজ প্রক্রিয়া' : 'Simple Steps'}
          </span>
          <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
            {t('howItWorks')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-terracotta-100 text-terracotta-600 flex items-center justify-center font-bold text-sm mx-auto">
              ১
            </div>
            <h4 className="font-semibold text-sm text-craft-text">
              {language === 'bn' ? 'ক্যামেরায় ছবি তুলুন' : 'Capture Real Photo'}
            </h4>
            <p className="text-xs text-craft-muted leading-relaxed">
              {language === 'bn'
                ? 'দিনের স্বাভাবিক আলোয় তৈরি পণ্যের ছবি তুলুন। কোনো ফিল্টার বা কৃত্রিম AI ব্যবহার ছাড়াই।'
                : 'Photograph your finished work in natural daylight without synthetic AI alters.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-mustard-100 text-mustard-700 flex items-center justify-center font-bold text-sm mx-auto">
              ২
            </div>
            <h4 className="font-semibold text-sm text-craft-text">
              {language === 'bn' ? 'শ্রমঘণ্টা যোগ করে সঠিক দাম' : 'Calculate Fair Worth'}
            </h4>
            <p className="text-xs text-craft-muted leading-relaxed">
              {language === 'bn'
                ? 'উপকরণের সাথে আপনার ব্যয়িত কাজের ঘণ্টা ও প্রতি ঘণ্টার পারিশ্রমিক হিসাব করে বিক্রয়মূল্য নির্ধারণ করুন।'
                : 'Factor in your hours and skilled hourly wage alongside materials cost.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center font-bold text-sm mx-auto">
              ৩
            </div>
            <h4 className="font-semibold text-sm text-craft-text">
              {language === 'bn' ? 'দামবন্ধু AI দিয়ে বিবরণ' : 'Draft Narrative'}
            </h4>
            <p className="text-xs text-craft-muted leading-relaxed">
              {language === 'bn'
                ? 'সহজ বাংলায় দামবন্ধু AI আপনার পণ্যের ইতিহাস ও উপকরণের বিবরণ তৈরি করে দেবে।'
                : 'Let DaamBondhu AI help you express your craft story in rich, respectful Bengali.'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mx-auto">
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mx-auto">
              ৪
            </div>
            <h4 className="font-semibold text-sm text-craft-text">
              {language === 'bn' ? 'ন্যায্য মূল্যে সারা দেশে বিক্রয়' : 'Sell with Pride'}
            </h4>
            <p className="text-xs text-craft-muted leading-relaxed">
              {language === 'bn'
                ? 'ক্রেতারা পণ্যের মেধার গুরুত্ব বুঝে ন্যায্য মূল্যে কেনাকাটা করেন এবং নিরাপদ ডেলিভারি পান।'
                : 'Connect directly with buyers who appreciate true craftsmanship.'}
            </p>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION - START SELLING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-terracotta-500 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-mustard-300">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-semibold text-mustard-200 uppercase tracking-widest bg-white/10 py-1 px-3 rounded-full">
              {language === 'bn' ? 'স্বাধীন উদ্যোগ' : 'Artisan Empowerment'}
            </span>
            <h2 className="font-bangla text-2xl sm:text-4xl font-bold leading-tight">
              {t('startSellingCtaTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-ivory-100 leading-relaxed">
              {t('startSellingCtaDesc')}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/seller/register"
                className="bg-white text-terracotta-600 hover:bg-ivory-100 font-semibold py-3 px-6 rounded-full text-sm shadow-md transition"
              >
                {t('openShopNow')}
              </Link>
              <Link
                to="/seller/assistant"
                className="bg-terracotta-600 hover:bg-terracotta-700 text-white border border-white/30 font-medium py-3 px-5 rounded-full text-sm transition"
              >
                {language === 'bn' ? 'দামবন্ধু-কে জিজ্ঞেস করুন' : 'Ask DaamBondhu AI'}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
