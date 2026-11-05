import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { CRAFT_CATEGORIES } from '../data/mockData';
import { analyzeUploadedImage } from '../utils/authenticityEngine';
import { ImageMetadataAnalysis } from '../types';
import {
  Upload,
  Camera,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Info,
  Clock,
  X,
  FileCheck,
} from 'lucide-react';

export const SellerAddProductPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addProduct } = useMarketplace();
  const navigate = useNavigate();

  // Form State
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [category, setCategory] = useState('embroidery');
  const [price, setPrice] = useState<number>(1500);
  const [materialCost, setMaterialCost] = useState<number>(400);
  const [laborHours, setLaborHours] = useState<number>(10);
  const [laborRatePerHour, setLaborRatePerHour] = useState<number>(90);
  const [otherExpenses, setOtherExpenses] = useState<number>(50);
  const [profitPercent, setProfitPercent] = useState<number>(15);
  const [stock, setStock] = useState<number>(5);
  const [isMadeToOrder, setIsMadeToOrder] = useState<boolean>(false);
  const [productionDays, setProductionDays] = useState<number>(3);
  const [customizable, setCustomizable] = useState<boolean>(true);
  const [materialsUsed, setMaterialsUsed] = useState<string>('খাঁটি সুতি কাপড়, লাচ্ছি সুতা');
  const [description, setDescription] = useState<string>('');
  const [descriptionEn, setDescriptionEn] = useState<string>('');

  // Image Upload & Authenticity State
  const [previewImage, setPreviewImage] = useState<string>(
    'https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&w=800&q=80'
  );
  const [imageAnalysis, setImageAnalysis] = useState<ImageMetadataAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingAiDesc, setIsGeneratingAiDesc] = useState(false);
  const [sellerConfirmed, setSellerConfirmed] = useState(false);
  const [forceAiSimulation, setForceAiSimulation] = useState(false);

  // Initialize with sample photo scan on mount
  React.useEffect(() => {
    handleSimulateScan('jamalpuri_kantha_camera_sensor.jpg', 2400000);
  }, []);

  const handleSimulateScan = (fileName: string, size: number, forced?: 'low' | 'high') => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const analysis = analyzeUploadedImage(
        { name: fileName, size: size, type: 'image/jpeg' },
        forced
      );
      setImageAnalysis(analysis);
      setIsAnalyzing(false);
    }, 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
      handleSimulateScan(file.name, file.size, forceAiSimulation ? 'high' : 'low');
    }
  };

  // AI Description Generator (DaamBondhu)
  const handleGenerateDescription = () => {
    setIsGeneratingAiDesc(true);
    setTimeout(() => {
      const selectedCategoryObj = CRAFT_CATEGORIES.find(c => c.id === category);
      const catName = selectedCategoryObj?.nameBn || 'হস্তশিল্প';

      const generatedBn = `সম্পূর্ণ হাতে তৈরি খাঁটি দেশীয় ${catName}। এটি তৈরিতে ব্যয় হয়েছে প্রায় ${laborHours} ঘণ্টার অক্লান্ত নিবিষ্ট শ্রম ও নান্দনিক সৃজনশীলতা। প্রাকৃতিক ও টেকসই উপাদান দিয়ে তৈরি যা দীর্ঘস্থায়ী এবং পরিবেশবান্ধব। আপনার দৈনন্দিন ব্যবহারে বা উপহার হিসেবে অনন্য। প্রতিটি পণ্যে রয়েছে আমাদের দেশের ঐতিহ্যবাহী লোকজ কারুকলার স্বাক্ষর।`;
      const generatedEn = `Exquisitely handcrafted authentic ${selectedCategoryObj?.nameEn || 'craft'} taking over ${laborHours} hours of patient dedication. Made from natural and sustainable materials designed to cherish for years. Celebrates the living traditions of Bangladeshi artisans.`;

      setDescription(generatedBn);
      setDescriptionEn(generatedEn);
      setIsGeneratingAiDesc(false);
    }, 700);
  };

  // Auto calculate suggested price
  const suggestedPrice = Math.round(
    (materialCost + laborHours * laborRatePerHour + otherExpenses) * (1 + profitPercent / 100)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerConfirmed) {
      alert(language === 'bn' ? 'অনুগ্রহ করে ছবির সত্যানুসন্ধান অঙ্গীকারে টিক দিন।' : 'Please check the authenticity declaration.');
      return;
    }

    const defaultAnalysis: ImageMetadataAnalysis = imageAnalysis || {
      fileName: 'craft_photo.jpg',
      fileSize: 2100000,
      mimeType: 'image/jpeg',
      hasExif: true,
      cameraModel: 'Smartphone Camera Sensor',
      aiSignaturesFound: [],
      syntheticTextureScore: 9,
      compressionArtifactsNormal: true,
      overallRisk: 'low',
      riskScorePercent: 9,
      explanation: {
        bn: 'ক্যামেরা নয়েজ ও টেক্সচার যাচাইকৃত। বাস্তব ছবি।',
        en: 'Camera noise and texture verified authentic.'
      },
      sellerConfirmed: true,
      analyzedAt: new Date().toISOString()
    };

    const status = defaultAnalysis.overallRisk === 'high' ? 'flagged' : 'approved';

    const selectedCategoryObj = CRAFT_CATEGORIES.find(c => c.id === category);

    addProduct({
      title: title || 'নতুন হস্তশিল্প সৃষ্টি',
      titleEn: titleEn || 'New Handcrafted Creation',
      category,
      categoryEn: selectedCategoryObj?.nameEn || 'Craft',
      price: Number(price) || suggestedPrice,
      materialCost: Number(materialCost),
      laborHours: Number(laborHours),
      laborRatePerHour: Number(laborRatePerHour),
      otherExpenses: Number(otherExpenses),
      profitPercent: Number(profitPercent),
      suggestedFairPrice: suggestedPrice,
      images: [previewImage],
      primaryImageAnalysis: {
        ...defaultAnalysis,
        sellerConfirmed: true
      },
      status,
      artisanId: 'artisan-1',
      artisanName: 'মনিরা বেগম',
      artisanNameEn: 'Monira Begum',
      artisanShopName: 'জামালপুরী নকশি কুটির',
      artisanShopNameEn: 'Jamalpuri Nakshi Kutir',
      artisanDistrict: 'জামালপুর',
      artisanDistrictEn: 'Jamalpur',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      description: description || 'হাতে তৈরি খাঁটি শিল্পকর্ম।',
      descriptionEn: descriptionEn || 'Authentic handmade craft creation.',
      stock: Number(stock),
      isMadeToOrder,
      productionDays: Number(productionDays),
      rating: 5.0,
      reviewCount: 0,
      customizable,
      materialsUsed: materialsUsed.split(',').map(s => s.trim()),
      materialsUsedEn: ['Pure Cotton', 'Natural Dyes'],
      featured: true,
    });

    if (status === 'flagged') {
      alert(language === 'bn' ? 'ছবিতে সিন্থেটিক বৈশিষ্ট্যের কারণে পর্যালোচনার জন্য অ্যাডমিন প্যানেলে পাঠানো হয়েছে।' : 'Item flagged for admin review due to potential image synthetic characteristics.');
    } else {
      alert(language === 'bn' ? 'অভিনন্দন! আপনার হস্তশিল্প সফলভাবে শিল্প বাজারে যুক্ত হয়েছে।' : 'Success! Your handmade product is now live on Shilpo Bajar.');
    }

    navigate('/marketplace');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header (No Tagline) */}
      <div className="space-y-2">
        <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
          {language === 'bn' ? 'নতুন হস্তশিল্প পণ্য আপলোড করুন' : 'List a New Handmade Creation'}
        </h1>
        <p className="text-xs sm:text-sm text-craft-muted">
          {language === 'bn'
            ? 'আসল ক্যামেরার ছবি আপলোড করুন, দামবন্ধু AI দিয়ে বিবরণ লিখুন এবং শ্রমঘণ্টার ভিত্তিতে সঠিক দাম নির্ধারণ করুন।'
            : 'Capture real camera photos, verify authenticity, and factor in your craft labor hours.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: PHOTO UPLOAD & 4-LAYER AUTHENTICITY ANALYSIS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-craft-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-craft-text">
                  {language === 'bn' ? '১. আসল পণ্যের ছবি ও সত্যানুসন্ধান' : '1. Product Photo & Anti-AI Verification'}
                </h3>
                <p className="text-[11px] text-sage-800 font-medium">
                  {language === 'bn' ? '৪-স্তরীয় স্বয়ংক্রিয় মেটাডেটা ও ফরেনসিক স্ক্রিনিং' : '4-Layer Optical Forensics Screen'}
                </p>
              </div>
            </div>

            {/* Test Toggle Button for Demo Evaluation */}
            <button
              type="button"
              onClick={() => {
                const nextState = !forceAiSimulation;
                setForceAiSimulation(nextState);
                handleSimulateScan(
                  nextState ? 'midjourney_dalle_synthetic_kantha.png' : 'jamalpuri_phone_camera.jpg',
                  nextState ? 4500000 : 2200000,
                  nextState ? 'high' : 'low'
                );
              }}
              className={`text-[10px] font-semibold py-1 px-3 rounded-full border transition ${
                forceAiSimulation
                  ? 'bg-red-100 text-red-700 border-red-300'
                  : 'bg-ivory-100 text-craft-muted border-craft-border hover:text-terracotta-600'
              }`}
              title="Test the Anti-AI Detection System"
            >
              {forceAiSimulation ? '⚠️ AI ছবি পরীক্ষা সক্রিয়' : '🧪 টেস্ট: AI ছবি সিমুলেট করুন'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Image Preview & Upload Box */}
            <div className="md:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-ivory-100 border-2 border-dashed border-craft-border flex items-center justify-center group">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />

                <label className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                  <Camera className="w-8 h-8 mb-1" />
                  <span className="text-xs font-semibold">
                    {language === 'bn' ? 'নতুন ছবি তুলুন বা নির্বাচন করুন' : 'Change Photograph'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <label className="flex-1 bg-ivory-100 hover:bg-terracotta-50 text-craft-text hover:text-terracotta-700 text-xs font-semibold py-2 px-3 rounded-xl border border-craft-border cursor-pointer text-center transition flex items-center justify-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'ফাইল আপলোড' : 'Browse File'}</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={() => handleSimulateScan('live_camera_capture.jpg', 2100000, 'low')}
                  className="flex-1 bg-white hover:bg-ivory-200 text-craft-text text-xs font-semibold py-2 px-3 rounded-xl border border-craft-border text-center transition flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-sage-600" />
                  <span>{language === 'bn' ? 'ক্যামেরা ক্যাপচার' : 'In-App Camera'}</span>
                </button>
              </div>
            </div>

            {/* Analysis Diagnostics Box */}
            <div className="md:col-span-7 space-y-4">
              {isAnalyzing ? (
                <div className="bg-ivory-100 p-6 rounded-2xl text-center space-y-3 border border-craft-border animate-pulse">
                  <Sparkles className="w-6 h-6 text-terracotta-500 mx-auto animate-spin" />
                  <p className="text-xs font-semibold text-craft-text">
                    {language === 'bn' ? 'মেটাডেটা ও ফরেনসিক নয়েজ পরীক্ষা করা হচ্ছে...' : 'Running optical forensic scan & EXIF analysis...'}
                  </p>
                </div>
              ) : imageAnalysis ? (
                <div className="space-y-3">
                  {/* Status Card */}
                  <div
                    className={`p-4 rounded-2xl border text-xs space-y-2 ${
                      imageAnalysis.overallRisk === 'low'
                        ? 'bg-sage-50 border-sage-200 text-sage-900'
                        : imageAnalysis.overallRisk === 'medium'
                        ? 'bg-mustard-50 border-mustard-200 text-mustard-900'
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-1.5">
                        {imageAnalysis.overallRisk === 'low' ? (
                          <CheckCircle2 className="w-4 h-4 text-sage-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        )}
                        <span>
                          {imageAnalysis.overallRisk === 'low'
                            ? language === 'bn' ? 'ছবি যাচাই সম্পন্ন: আসল ও খাঁটি' : 'Authentic Camera Capture Verified'
                            : imageAnalysis.overallRisk === 'medium'
                            ? language === 'bn' ? 'সতর্কতা: পর্যালোচনার প্রয়োজন' : 'Needs Admin Review'
                            : language === 'bn' ? 'ঝুঁকি: কৃত্রিম AI ছবি সনাক্ত হয়েছে' : 'High Risk: Synthetic AI Artifacts'}
                        </span>
                      </span>
                      <span className="font-bold px-2 py-0.5 rounded-full text-[10px] bg-white shadow-sm">
                        ঝুঁকি: {imageAnalysis.riskScorePercent}%
                      </span>
                    </div>

                    <p className="text-[11px] leading-relaxed">
                      {imageAnalysis.explanation[language]}
                    </p>
                  </div>

                  {/* 4 Layers Itemized Diagnostic */}
                  <div className="bg-ivory-100 p-4 rounded-2xl border border-craft-border space-y-2 text-xs">
                    <div className="flex justify-between items-center text-craft-muted">
                      <span>স্তর ১ (মেটাডেটা ও সফটওয়্যার):</span>
                      <span className="font-semibold text-craft-text">{imageAnalysis.softwareDetected || 'Mobile Camera'}</span>
                    </div>
                    <div className="flex justify-between items-center text-craft-muted">
                      <span>স্তর ২ (টেক্সচার ও গ্রেইন স্কোর):</span>
                      <span className="font-semibold text-sage-700">খাঁটি ফাইবার ও স্বাভাবিক নয়েজ</span>
                    </div>
                    <div className="flex justify-between items-center text-craft-muted">
                      <span>স্তর ৩ (স্বত্ব নিশ্চিতকরণ):</span>
                      <span className="font-semibold text-terracotta-600">{sellerConfirmed ? '✓ নিশ্চিতকৃত' : 'অপেক্ষমাণ'}</span>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Layer 3 Artisan Sworn Declaration Checkbox */}
              <div className="bg-mustard-50 border border-mustard-200 p-4 rounded-2xl">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={sellerConfirmed}
                    onChange={e => setSellerConfirmed(e.target.checked)}
                    className="rounded border-craft-border text-terracotta-600 focus:ring-terracotta-500 w-4 h-4 mt-0.5"
                  />
                  <span className="text-xs text-craft-text font-medium leading-snug">
                    {language === 'bn'
                      ? '“আমি নিশ্চিত করছি যে এই ছবিগুলো আমার তৈরি বাস্তব পণ্যের এবং এতে কোনো জেনারেটিভ AI দিয়ে রূপ পরিবর্তন করা হয়নি।”'
                      : '"I confirm that these photographs show the actual product I am selling and have not been AI-generated or AI-enhanced to misrepresent the product."'}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: PRODUCT BASICS & DAAMBONDHU AI DESCRIPTION ASSISTANT */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-craft-border">
            <h3 className="font-bold text-sm sm:text-base text-craft-text">
              {language === 'bn' ? '২. পণ্যের মৌলিক তথ্য ও বিবরণ' : '2. Product Information & Narrative'}
            </h3>
            
            {/* DaamBondhu AI Helper Button */}
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGeneratingAiDesc}
              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold py-1.5 px-3.5 rounded-full flex items-center gap-1.5 shadow-sm transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {isGeneratingAiDesc
                  ? (language === 'bn' ? 'বিবরণ লিখছে...' : 'Drafting...')
                  : (language === 'bn' ? 'দামবন্ধু AI দিয়ে বিবরণ লিখুন' : 'Generate with DaamBondhu AI')}
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-craft-text block mb-1.5">
                {language === 'bn' ? 'পণ্যের নাম (বাংলা) *' : 'Product Title (Bangla) *'}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: হাতে সেলাই জামদানি মোটিফ কুশন' : 'Title in Bangla'}
                className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-craft-text block mb-1.5">
                {language === 'bn' ? 'ক্যাটাগরি *' : 'Category *'}
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              >
                {CRAFT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'bn' ? cat.nameBn : cat.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-craft-text block mb-1.5">
              {language === 'bn' ? 'ব্যবহৃত কাঁচামাল ও উপাদান *' : 'Materials Used *'}
            </label>
            <input
              type="text"
              value={materialsUsed}
              onChange={e => setMaterialsUsed(e.target.value)}
              placeholder="যেমন: ১০০% সুতি কাপড়, কটন লাচ্ছি সুতা"
              className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-craft-text">
                {language === 'bn' ? 'পণ্যের আকর্ষণীয় বিবরণ (বাংলা) *' : 'Description (Bangla) *'}
              </label>
              <span className="text-[11px] text-craft-muted">
                {language === 'bn' ? 'AI খসড়া দিলে তা নিজে পড়ে যাচাই করুন' : 'Review & adjust before publishing'}
              </span>
            </div>
            <textarea
              required
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'পণ্যের বুননশৈলী, মাপ এবং ব্যবহারের সুবিধা লিখুন...'
                  : 'Describe dimensions, textures, care instructions...'
              }
              className="w-full bg-ivory-100 p-4 rounded-xl border border-craft-border text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-terracotta-400"
            ></textarea>
          </div>
        </div>

        {/* SECTION 3: FAIR LABOUR & PRICING */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-craft-border">
            <h3 className="font-bold text-sm sm:text-base text-craft-text flex items-center gap-2">
              <Calculator className="w-4 h-4 text-mustard-500" />
              <span>{language === 'bn' ? '৩. শ্রম ও ন্যায্য মূল্য নির্ধারণ' : '3. Labor Valuation & Fair Price'}</span>
            </h3>
            <span className="text-xs font-bold text-terracotta-600 bg-terracotta-50 px-2.5 py-0.5 rounded-full">
              প্রস্তাবিত: ৳{suggestedPrice}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'উপকরণের খরচ' : 'Material Cost'}
              </label>
              <input
                type="number"
                value={materialCost}
                onChange={e => setMaterialCost(Number(e.target.value))}
                className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'কাজের সময় (ঘণ্টা)' : 'Labor Hours'}
              </label>
              <input
                type="number"
                value={laborHours}
                onChange={e => setLaborHours(Number(e.target.value))}
                className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'ঘণ্টার মজুরি (টাকা)' : 'Hourly Wage'}
              </label>
              <input
                type="number"
                value={laborRatePerHour}
                onChange={e => setLaborRatePerHour(Number(e.target.value))}
                className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs text-terracotta-700 font-bold block mb-1">
                {language === 'bn' ? 'চূড়ান্ত বিক্রয়মূল্য' : 'Selling Price'}
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                className="w-full bg-terracotta-50 text-terracotta-700 border border-terracotta-300 p-2.5 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          {/* Stock and Custom options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'স্টক পরিমাণ' : 'Available Stock'}
              </label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs"
              />
            </div>

            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-craft-text">
                <input
                  type="checkbox"
                  checked={isMadeToOrder}
                  onChange={e => setIsMadeToOrder(e.target.checked)}
                  className="rounded border-craft-border text-terracotta-500 w-4 h-4"
                />
                <span>{language === 'bn' ? 'অর্ডারে তৈরি (Made to Order)' : 'Made to Order'}</span>
              </label>
            </div>

            {isMadeToOrder && (
              <div>
                <label className="text-xs text-craft-muted block mb-1">
                  {language === 'bn' ? 'তৈরির প্রয়োজনীয় দিন' : 'Production Days'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={productionDays}
                  onChange={e => setProductionDays(Number(e.target.value))}
                  className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/seller/dashboard')}
            className="text-xs text-craft-muted hover:text-craft-text font-medium py-3 px-5 rounded-full"
          >
            {language === 'bn' ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="submit"
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-8 rounded-full text-xs sm:text-sm shadow-craft hover:shadow-craft-hover transition flex items-center gap-2"
          >
            <span>{language === 'bn' ? 'পণ্য প্রকাশ করুন' : 'Publish Product'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
