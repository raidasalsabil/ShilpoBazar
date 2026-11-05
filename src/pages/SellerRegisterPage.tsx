import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { CRAFT_CATEGORIES, BD_DISTRICTS } from '../data/mockData';
import { Sparkles, Store, CheckCircle2, User, Phone, MapPin, ArrowRight } from 'lucide-react';

export const SellerRegisterPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { setRole } = useMarketplace();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    district: 'Jamalpur (জামালপুর)',
    craftCategory: 'embroidery',
    shopName: '',
    story: '',
    agreeToAuthenticityPledge: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    // Complete onboarding and switch to seller mode
    setRole('seller');
    navigate('/seller/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header (No Tagline) */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-mustard-100 text-mustard-800 text-xs font-semibold border border-mustard-300">
          <Store className="w-4 h-4 text-terracotta-600" />
          <span>{language === 'bn' ? 'শিল্প বাজার কারিগর নিবন্ধন' : 'Shilpo Bajar Artisan Onboarding'}</span>
        </div>
        <h1 className="font-bangla text-2xl sm:text-4xl font-bold text-craft-text">
          {language === 'bn' ? 'আপনার ডিজিটাল শপ খুলুন' : 'Open Your Craft Storefront'}
        </h1>
        <p className="text-xs sm:text-sm text-craft-muted max-w-lg mx-auto">
          {language === 'bn'
            ? 'বিনা খরচে দোকান তৈরি করুন, দামবন্ধু AI দিয়ে পণ্যের বিবরণ লিখুন এবং সারা দেশে পৌঁছে দিন।'
            : 'Register your independent craft shop in minutes with Bangla-first guidance.'}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 text-xs">
        <div className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-terracotta-600' : 'text-craft-muted'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 1 ? 'bg-terracotta-500 text-white' : 'bg-ivory-200'}`}>1</span>
          <span>{language === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Details'}</span>
        </div>
        <div className="w-8 h-[2px] bg-craft-border"></div>
        <div className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-terracotta-600' : 'text-craft-muted'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step >= 2 ? 'bg-terracotta-500 text-white' : 'bg-ivory-200'}`}>2</span>
          <span>{language === 'bn' ? 'দোকান ও কারুশিল্প' : 'Shop & Craft Story'}</span>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-craft-border shadow-craft">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'আপনার পুরো নাম *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-craft-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'bn' ? 'যেমন: মনিরা বেগম' : 'e.g. Monira Begum'}
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-ivory-100 pl-10 pr-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'মোবাইল নম্বর (বিকাশ / নগদ যুক্ত) *' : 'Mobile Number (bKash/Nagad) *'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-craft-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="017XX-XXXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-ivory-100 pl-10 pr-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>
                <p className="text-[11px] text-craft-muted mt-1">
                  {language === 'bn' ? 'এই নম্বরে গ্রাহকের পেমেন্ট ও অর্ডার নোটিফিকেশন আসবে।' : 'Used for order coordination and payments.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-craft-text block mb-1.5">
                    {language === 'bn' ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-craft-text block mb-1.5">
                    {language === 'bn' ? 'পাসওয়ার্ড *' : 'Password *'}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'আপনার জেলা *' : 'District *'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-craft-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-ivory-100 pl-10 pr-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  >
                    {BD_DISTRICTS.map((dist, idx) => (
                      <option key={idx} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm shadow transition flex items-center justify-center gap-2"
                >
                  <span>{language === 'bn' ? 'পরবর্তী ধাপ (দোকানের তথ্য)' : 'Next Step (Shop Setup)'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'দোকানের নাম (Shop Name) *' : 'Shop Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'bn' ? 'যেমন: জামালপুরী নকশি কুটির' : 'e.g. Jamalpuri Nakshi Kutir'}
                  value={formData.shopName}
                  onChange={e => setFormData({ ...formData, shopName: e.target.value })}
                  className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'প্রধান হস্তশিল্পের ধরণ *' : 'Primary Craft Category *'}
                </label>
                <select
                  value={formData.craftCategory}
                  onChange={e => setFormData({ ...formData, craftCategory: e.target.value })}
                  className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                >
                  {CRAFT_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {language === 'bn' ? cat.nameBn : cat.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-craft-text block mb-1.5">
                  {language === 'bn' ? 'আপনার হাতের কাজের গল্প ও অভিজ্ঞতা' : 'Your Craft Narrative'}
                </label>
                <textarea
                  rows={3}
                  placeholder={
                    language === 'bn'
                      ? 'কবে থেকে কাজ করছেন, কার কাছে শিখেছেন তা সংক্ষেপে লিখুন...'
                      : 'Tell buyers how you learned this craft and what makes your handwork special...'
                  }
                  value={formData.story}
                  onChange={e => setFormData({ ...formData, story: e.target.value })}
                  className="w-full bg-ivory-100 px-4 py-2.5 rounded-xl border border-craft-border text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                ></textarea>
              </div>

              {/* Anti-AI Pledge */}
              <div className="bg-sage-50 border border-sage-200 p-4 rounded-xl space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeToAuthenticityPledge}
                    onChange={e => setFormData({ ...formData, agreeToAuthenticityPledge: e.target.checked })}
                    className="rounded border-craft-border text-sage-600 focus:ring-sage-500 w-4 h-4 mt-0.5"
                  />
                  <span className="text-xs text-sage-900 leading-snug">
                    {language === 'bn'
                      ? 'আমি অঙ্গীকার করছি যে, আমার শপে শুধুমাত্র আমার হাতে তৈরি বাস্তব পণ্যের আসল ক্যামেরা ছবি দেব। কোনো কৃত্রিম বুদ্ধিমত্তা (AI) বা অন্যের ছবি ব্যবহার করে ক্রেতাকে বিভ্রান্ত করব না।'
                      : 'I solemnly confirm that all my product photographs will depict actual physical handmade items captured by camera without generative AI alteration.'}
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-ivory-200 hover:bg-ivory-300 text-craft-text font-medium py-3 px-5 rounded-xl text-xs transition"
                >
                  {language === 'bn' ? 'আগের ধাপ' : 'Back'}
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm shadow transition"
                >
                  {language === 'bn' ? 'দোকান প্রস্তুত করুন ও ড্যাশবোর্ডে প্রবেশ করুন' : 'Launch Shop & Open Hub'}
                </button>
              </div>
            </div>
          )}

        </form>
      </div>

    </div>
  );
};
