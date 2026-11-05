import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Brand
    brandName: 'শিল্প বাজার',
    hackathonTitle: 'Built for AIgnite BUILDATHON 2026',

    // Nav
    home: 'নীড়পাতা',
    marketplace: 'বাজার ও মেলা',
    artisans: 'কারিগরবৃন্দ',
    pricingCalculator: 'দামের সঠিক হিসাব',
    daamBondhu: 'দামবন্ধু (AI)',
    startSelling: 'দোকান খুলুন',
    cart: 'ঝুড়ি',
    myAccount: 'আমার অ্যাকাউন্ট',
    sellerDashboard: 'কারিগর ড্যাশবোর্ড',
    adminPanel: 'অ্যাডমিন প্যানেল',
    switchRole: 'মোড পরিবর্তন',
    customer: 'ক্রেতা',
    seller: 'কারিগর',
    admin: 'অ্যাডমিন',

    // Hero
    heroTitlePart1: 'বাংলার খাঁটি হস্তশিল্পের',
    heroTitlePart2: 'অনন্য ডিজিটাল হাট',
    heroDesc: 'বাংলাদেশের প্রত্যন্ত অঞ্চলের স্বাধীন নারী কারিগর, মৃৎশিল্পী ও সূচিশিল্পীদের সরাসরি ক্রেতার সাথে সেতুবন্ধন। যেখানে কোনো কৃত্রিম AI ছবির ছলচাতুরি নেই, আছে আসল হাতের ছোঁয়া।',
    exploreCrafts: 'হস্তশিল্প অন্বেষণ করুন',
    calculateFairPrice: 'ন্যায্য মূল্য নির্ধারণ করুন',

    // Authenticity badge
    verifiedHandmade: 'যাচাইকৃত আসল ছবি',
    noAiGenerated: 'AI মুক্ত খাঁটি হস্তশিল্প',
    authenticityGuarantee: 'প্রাকৃতিক ক্যামেরায় তোলা ও সত্যানুসন্ধানকৃত',

    // Fair Price banner
    fairPricingBannerTitle: 'কেন শুধু উপকরণের দাম নয়? শ্রমের মূল্যও অপরিহার্য!',
    fairPricingBannerDesc: 'সাধারণত কারিগররা সুতা ও কাপড়ের খরচ যোগ করে পণ্য বিক্রি করেন, ফলে তাদের ঘণ্টার পর ঘণ্টা নিঃস্বার্থ পরিশ্রম পারিশ্রমিকহীন রয়ে যায়। শিল্প বাজার ক্যালকুলেটর শ্রমঘণ্টার ন্যায্য মূল্যায়ন নিশ্চিত করে।',

    // Sections
    featuredCategories: 'হস্তশিল্পের ধারা ও বিভাগ',
    featuredArtisans: 'আমাদের গুণী কারিগরগণ',
    recentProducts: 'সম্প্রতি তৈরি নতুন হস্তশিল্প',
    howItWorks: 'কীভাবে কাজ করে শিল্প বাজার?',
    startSellingCtaTitle: 'আপনি কি ঘরে বসে হস্তশিল্প তৈরি করেন?',
    startSellingCtaDesc: 'আজই বিনা খরচে আপনার ডিজিটাল শপ তৈরি করুন, দামবন্ধু AI-এর সাহায্য নিন এবং সারা বাংলাদেশে আপনার কাজ পৌঁছে দিন।',
    openShopNow: 'এখনই শপ চালু করুন',

    // Filters
    searchPlaceholder: 'পণ্য বা কারিগরের নাম খুঁজুন...',
    allCategories: 'সকল বিভাগ',
    filterByDistrict: 'জেলা অনুযায়ী খুঁজুন',
    allDistricts: 'সমগ্র বাংলাদেশ',
    priceRange: 'মূল্যের পরিসর',
    sortBy: 'সাজান',
    sortNewest: 'নতুন সংযোজিত',
    sortPriceLow: 'মূল্য: কম থেকে বেশি',
    sortPriceHigh: 'মূল্য: বেশি থেকে কম',
    sortPopular: 'জনপ্রিয়তা',

    // Product Card
    craftHours: 'শ্রম সময়',
    hours: 'ঘণ্টা',
    bdt: '৳',
    addToCart: 'ঝুড়িতে নিন',
    viewDetails: 'বিস্তারিত দেখুন',
    madeToOrder: 'অর্ডারে তৈরি হবে',
    inStock: 'তৈরি আছে',

    // Common
    loading: 'লোড হচ্ছে...',
    currency: '৳',
    footerRights: 'সর্বস্বত্ব সংরক্ষিত। খাঁটি দেশীয় হস্তশিল্প মার্কেটপ্লেস।',
    footerPhilosophy: 'শিল্প বাজার হলো কৃত্রিমতা মুক্ত এমন এক প্ল্যাটফর্ম যা বাংলার লোকশিল্পীদের রক্ত-ঘাম জড়ানো মেধার সঠিক মূল্যায়ন প্রতিষ্ঠা করতে বদ্ধপরিকর।',
  },
  en: {
    // Brand
    brandName: 'Shilpo Bajar',
    hackathonTitle: 'Built for AIgnite BUILDATHON 2026',

    // Nav
    home: 'Home',
    marketplace: 'Marketplace',
    artisans: 'Artisans',
    pricingCalculator: 'Fair Pricing',
    daamBondhu: 'DaamBondhu (AI)',
    startSelling: 'Start Selling',
    cart: 'Cart',
    myAccount: 'My Account',
    sellerDashboard: 'Artisan Hub',
    adminPanel: 'Admin Panel',
    switchRole: 'Switch Role',
    customer: 'Customer',
    seller: 'Artisan',
    admin: 'Admin',

    // Hero
    heroTitlePart1: 'Authentic Bangladeshi Craft,',
    heroTitlePart2: 'Direct from Artisan Hands.',
    heroDesc: 'Connecting independent Bangladeshi women artisans, potters, and weavers with authentic craft admirers. Zero AI-generated deception — purely real hands and real stories.',
    exploreCrafts: 'Explore Marketplace',
    calculateFairPrice: 'Calculate Fair Price',

    // Authenticity badge
    verifiedHandmade: 'Verified Authentic Photo',
    noAiGenerated: '100% Genuine Handcrafted',
    authenticityGuarantee: 'Camera-verified & forensics screened',

    // Fair Price banner
    fairPricingBannerTitle: 'Why Materials Alone Aren’t Enough: Factor In Your Labor!',
    fairPricingBannerDesc: 'Too often handmade creators calculate only yarn and cloth costs, leaving endless hours of patient labour unpaid. Shilpo Bajar makes artisan time visible and respected.',

    // Sections
    featuredCategories: 'Craft Traditions & Categories',
    featuredArtisans: 'Featured Artisans',
    recentProducts: 'Recently Added Creations',
    howItWorks: 'How Shilpo Bajar Works',
    startSellingCtaTitle: 'Do you create handmade crafts at home?',
    startSellingCtaDesc: 'Open your digital storefront in minutes, get guided by DaamBondhu AI, and reach buyers who genuinely value your craft.',
    openShopNow: 'Open Shop Today',

    // Filters
    searchPlaceholder: 'Search products, crafts or artisans...',
    allCategories: 'All Categories',
    filterByDistrict: 'Filter by District',
    allDistricts: 'All Bangladesh',
    priceRange: 'Price Range',
    sortBy: 'Sort by',
    sortNewest: 'Newest Arrivals',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    sortPopular: 'Most Popular',

    // Product Card
    craftHours: 'Labor Time',
    hours: 'hrs',
    bdt: '৳',
    addToCart: 'Add to Cart',
    viewDetails: 'View Details',
    madeToOrder: 'Made to Order',
    inStock: 'In Stock',

    // Common
    loading: 'Loading...',
    currency: '৳',
    footerRights: 'All rights reserved. Authentic Bangladeshi Handmade Marketplace.',
    footerPhilosophy: 'Shilpo Bajar is an anti-deception marketplace committed to fair compensation and digital visibility for rural and independent craft makers across Bangladesh.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('shilpo_bajar_lang') || localStorage.getItem('haater_daam_lang');
    return (saved === 'en' || saved === 'bn') ? (saved as Language) : 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shilpo_bajar_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
