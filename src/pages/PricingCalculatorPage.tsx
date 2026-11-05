import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { calculateFairPrice } from '../utils/pricingEngine';
import {
  Calculator,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingCalculatorPage: React.FC = () => {
  const { language, t } = useLanguage();

  const [materialCost, setMaterialCost] = useState<number>(450);
  const [laborHours, setLaborHours] = useState<number>(8);
  const [laborRatePerHour, setLaborRatePerHour] = useState<number>(100);
  const [otherExpenses, setOtherExpenses] = useState<number>(50);
  const [profitPercent, setProfitPercent] = useState<number>(20);
  const [currentPrice, setCurrentPrice] = useState<string>('950');
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      nameBn: 'ঐতিহ্যবাহী নকশিকাঁথা',
      nameEn: 'Nakshi Kantha',
      mat: 550,
      hours: 14,
      rate: 90,
      other: 60,
      profit: 15,
      current: '1200',
    },
    {
      nameBn: 'টেরাকোটা চায়ের কাপ সেট (৪ পিস)',
      nameEn: 'Terracotta Cup Set',
      mat: 280,
      hours: 6,
      rate: 110,
      other: 70,
      profit: 20,
      current: '800',
    },
    {
      nameBn: 'ক্রুশের অ্যামিগুরুমি পুতুল',
      nameEn: 'Crochet Amigurumi Toy',
      mat: 220,
      hours: 5,
      rate: 100,
      other: 30,
      profit: 20,
      current: '650',
    },
    {
      nameBn: 'হাতে আঁকা মাটির গহনা সেট',
      nameEn: 'Terracotta Jewellery Set',
      mat: 180,
      hours: 4,
      rate: 120,
      other: 40,
      profit: 25,
      current: '500',
    },
  ];

  const result = calculateFairPrice({
    materialCost,
    laborHours,
    laborRatePerHour,
    otherExpenses,
    profitPercent,
    currentPrice: currentPrice ? Number(currentPrice) : undefined,
  });

  const loadPreset = (p: typeof presets[0]) => {
    setMaterialCost(p.mat);
    setLaborHours(p.hours);
    setLaborRatePerHour(p.rate);
    setOtherExpenses(p.other);
    setProfitPercent(p.profit);
    setCurrentPrice(p.current);
  };

  const handleCopyPrice = () => {
    navigator.clipboard?.writeText(`${result.suggestedSellingPrice}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header (No Tagline) */}
      <div className="bg-ivory-200/70 p-6 sm:p-8 rounded-3xl border border-craft-border text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-mustard-100 text-mustard-800 text-xs font-semibold border border-mustard-300">
          <Calculator className="w-4 h-4 text-mustard-600" />
          <span>{language === 'bn' ? 'শ্রমের ন্যায্য মূল্যায়ন টুল' : 'Ethical Labor Pricing Calculator'}</span>
        </div>

        <h1 className="font-bangla text-2xl sm:text-4xl font-bold text-craft-text">
          {language === 'bn' ? 'শিল্প বাজার: ন্যায্য মূল্য ক্যালকুলেটর' : 'Shilpo Bajar: Fair Price Calculator'}
        </h1>

        <p className="text-xs sm:text-sm text-craft-muted max-w-xl mx-auto leading-relaxed">
          {language === 'bn'
            ? 'আপনার মেধা, সময় ও শ্রম কখনো বিনামূল্যে নয়। উপকরণের সাথে প্রতিটি ঘণ্টার পারিশ্রমিক হিসাব করে হস্তশিল্পের সঠিক বিক্রয়মূল্য নির্ধারণ করুন।'
            : 'Factor in your skilled hours alongside raw materials. Never sell your craft without compensating your hands.'}
        </p>

        {/* Quick Presets */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-craft-muted font-medium">
            {language === 'bn' ? 'উদাহরণ দেখুন:' : 'Sample Crafts:'}
          </span>
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(p)}
              className="bg-white hover:bg-mustard-50 hover:text-mustard-800 text-craft-text py-1 px-2.5 rounded-full border border-craft-border shadow-sm transition text-[11px] font-medium"
            >
              {language === 'bn' ? p.nameBn : p.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-craft-border shadow-craft space-y-5">
          <h3 className="font-bold text-base text-craft-text flex items-center justify-between pb-3 border-b border-craft-border">
            <span>{language === 'bn' ? 'উৎপাদন ব্যয়ের উপাদানসমূহ' : 'Production Cost Inputs'}</span>
            <button
              onClick={() => {
                setMaterialCost(300);
                setLaborHours(5);
                setLaborRatePerHour(100);
                setOtherExpenses(30);
                setProfitPercent(20);
                setCurrentPrice('');
              }}
              className="text-xs text-craft-muted hover:text-terracotta-600 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'রিসেট' : 'Reset'}</span>
            </button>
          </h3>

          {/* 1. Material Cost */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-craft-text">
                {language === 'bn' ? '১. কাঁচামাল ও উপকরণের খরচ (টাকা)' : '1. Material Cost (BDT)'}
              </label>
              <span className="text-craft-muted text-[11px]">সুতা, কাপড়, মাটি, রঙ ইত্যাদি</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-craft-muted">৳</span>
              <input
                type="number"
                min="0"
                value={materialCost}
                onChange={e => setMaterialCost(Number(e.target.value))}
                className="w-full bg-ivory-100 pl-8 pr-4 py-2.5 rounded-xl border border-craft-border text-sm font-semibold text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>
          </div>

          {/* 2. Labor Time & Hourly Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-xs text-craft-text flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-terracotta-500" />
                <span>{language === 'bn' ? '২. মোট সময় (ঘণ্টা)' : '2. Craft Time (Hours)'}</span>
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={laborHours}
                onChange={e => setLaborHours(Number(e.target.value))}
                className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-sm font-semibold text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-xs text-craft-text flex items-center justify-between">
                <span>{language === 'bn' ? 'ঘণ্টাপ্রতি পারিশ্রমিক' : 'Hourly Wage Rate'}</span>
                <span className="text-[10px] text-terracotta-600 font-normal">মানসম্মত: ৳৮০-৳১৫০</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-craft-muted">৳</span>
                <input
                  type="number"
                  min="30"
                  step="10"
                  value={laborRatePerHour}
                  onChange={e => setLaborRatePerHour(Number(e.target.value))}
                  className="w-full bg-ivory-100 pl-8 pr-4 py-2.5 rounded-xl border border-craft-border text-sm font-semibold text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                />
              </div>
            </div>
          </div>

          {/* 3. Other Expenses */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-craft-text">
                {language === 'bn' ? '৩. আনুষঙ্গিক ব্যয় (টাকা)' : '3. Packaging & Overheads (BDT)'}
              </label>
              <span className="text-craft-muted text-[11px]">প্যাকেজিং, বিদ্যুৎ, সরঞ্জাম</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-craft-muted">৳</span>
              <input
                type="number"
                min="0"
                value={otherExpenses}
                onChange={e => setOtherExpenses(Number(e.target.value))}
                className="w-full bg-ivory-100 pl-8 pr-4 py-2.5 rounded-xl border border-craft-border text-sm font-semibold text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>
          </div>

          {/* 4. Profit Margin Slider */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-craft-text">
                {language === 'bn' ? '৪. কাঙ্ক্ষিত লভ্যাংশ (%)' : '4. Desired Profit Margin (%)'}
              </label>
              <span className="font-bold text-terracotta-600">{profitPercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={profitPercent}
              onChange={e => setProfitPercent(Number(e.target.value))}
              className="w-full accent-terracotta-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-craft-muted">
              <span>১০% (সাধারণ)</span>
              <span>২০% (প্রস্তাবিত)</span>
              <span>৪০% (প্রিমিয়াম আর্ট)</span>
            </div>
          </div>

          {/* 5. Current Selling Price (Optional comparison) */}
          <div className="space-y-1.5 pt-3 border-t border-craft-border">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-craft-text">
                {language === 'bn' ? '৫. আপনার বর্তমান নির্ধারিত দাম (যদি থাকে)' : '5. Your Current Price (Optional)'}
              </label>
              <span className="text-terracotta-600 text-[10px]">মূল্যায়ন দেখতে লিখুন</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-craft-muted">৳</span>
              <input
                type="number"
                placeholder="যেমন: ১০০০"
                value={currentPrice}
                onChange={e => setCurrentPrice(e.target.value)}
                className="w-full bg-ivory-100 pl-8 pr-4 py-2.5 rounded-xl border border-craft-border text-sm font-semibold text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>
          </div>

        </div>

        {/* Right: Results Card & Bangla Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-300 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-terracotta-500 text-white text-[10px] uppercase font-bold py-1 px-4 rounded-bl-xl tracking-wider">
              {language === 'bn' ? 'সঠিক হিসাব' : 'Fair Result'}
            </div>

            <div>
              <span className="text-xs text-craft-muted font-medium block">
                {language === 'bn' ? 'শিল্প বাজার প্রস্তাবিত ন্যায্য বিক্রয়মূল্য' : 'Suggested Fair Selling Price'}
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="font-bangla text-4xl font-bold text-terracotta-600">
                  ৳{result.suggestedSellingPrice.toLocaleString()}
                </span>
                <button
                  onClick={handleCopyPrice}
                  className="flex items-center gap-1 text-xs bg-ivory-100 hover:bg-mustard-50 text-terracotta-700 py-1.5 px-3 rounded-lg border border-craft-border transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (language === 'bn' ? 'কপি হয়েছে' : 'Copied') : (language === 'bn' ? 'কপি করুন' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Breakdown itemization */}
            <div className="bg-ivory-100 p-4 rounded-2xl text-xs space-y-2.5 border border-craft-border/60">
              <div className="flex justify-between items-center text-craft-muted">
                <span>{language === 'bn' ? 'উপকরণের দাম' : 'Material Cost'}:</span>
                <span className="font-medium text-craft-text">৳{result.materialCost}</span>
              </div>

              <div className="flex justify-between items-center text-terracotta-700 font-bold bg-white p-2 rounded-xl border border-terracotta-200">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-mustard-500" />
                  <span>{language === 'bn' ? `আপনার শ্রমের মূল্য (${result.laborHours}h × ৳${result.laborRatePerHour})` : `Artisan Labor Value (${result.laborHours}h × ৳${result.laborRatePerHour})`}:</span>
                </span>
                <span>৳{result.laborCost}</span>
              </div>

              <div className="flex justify-between items-center text-craft-muted">
                <span>{language === 'bn' ? 'আনুষঙ্গিক ও প্যাকিং খরচ' : 'Packaging & Overhead'}:</span>
                <span className="font-medium text-craft-text">৳{result.otherExpenses}</span>
              </div>

              <div className="flex justify-between items-center text-craft-muted pt-1 border-t border-craft-border/60">
                <span>{language === 'bn' ? 'মোট উৎপাদন ব্যয়' : 'Total Production Cost'}:</span>
                <span className="font-semibold text-craft-text">৳{result.totalProductionCost}</span>
              </div>

              <div className="flex justify-between items-center text-craft-muted">
                <span>{language === 'bn' ? `কাঙ্ক্ষিত লভ্যাংশ (${result.profitPercent}%)` : `Profit Amount (${result.profitPercent}%)`}:</span>
                <span className="font-semibold text-craft-text">৳{result.profitAmount}</span>
              </div>
            </div>

            {/* Comparison evaluation */}
            {result.priceDifference !== undefined && (
              <div
                className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                  result.priceDifference > 0
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-sage-50 border-sage-200 text-sage-900'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  {result.priceDifference > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-sage-600" />
                  )}
                  <span>
                    {result.priceDifference > 0
                      ? language === 'bn'
                        ? `আপনার ক্ষতি: ৳${result.priceDifference}`
                        : `Deficit: ৳${result.priceDifference}`
                      : language === 'bn'
                      ? 'মূল্য ভারসাম্যপূর্ণ'
                      : 'Fair Price Achieved'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {language === 'bn' ? result.evaluationBn : result.evaluationEn}
                </p>
              </div>
            )}

            {/* DaamBondhu Advice Box */}
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-2xl text-xs space-y-2">
              <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>{language === 'bn' ? 'দামবন্ধু AI-এর পরামর্শ' : 'DaamBondhu Guidance'}</span>
              </span>
              <p className="text-indigo-800 text-[11px] leading-relaxed">
                {language === 'bn'
                  ? 'ডেলিভারি চার্জ কখনোই পণ্যের দামের ভেতর অন্তর্ভুক্ত করবেন না। ক্রেতাদের আলাদাভাবে ঢাকার মধ্যে ৳৭০ ও বাইরে ৳১৩০ কুরিয়ার চার্জ প্রদর্শন করুন।'
                  : 'Always charge courier and shipping separately from your handmade craft price so customers understand your true labor worth.'}
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/seller/products/new"
                className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition"
              >
                <span>{language === 'bn' ? 'এই দামে নতুন পণ্য আপলোড করুন' : 'Apply Price to New Product Listing'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
