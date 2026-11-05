import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { Product } from '../types';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileQuestion,
  ZoomIn,
  Camera,
  Info,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const AdminImageReviewPage: React.FC = () => {
  const { language } = useLanguage();
  const { products, updateProductStatus } = useMarketplace();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0] || null
  );
  const [moderationReason, setModerationReason] = useState('');
  const [successNote, setSuccessNote] = useState<string | null>(null);

  const handleApprove = (product: Product) => {
    updateProductStatus(product.id, 'approved', moderationReason);
    setSuccessNote(`পণ্য "${product.title}" অনুমোদিত হয়েছে এবং বাজারে সক্রিয় করা হয়েছে।`);
    setTimeout(() => setSuccessNote(null), 3000);
  };

  const handleReject = (product: Product) => {
    updateProductStatus(product.id, 'rejected', moderationReason);
    setSuccessNote(`পণ্য "${product.title}" জেনারেটিভ AI অসংগতির কারণে বাতিল করা হয়েছে।`);
    setTimeout(() => setSuccessNote(null), 3000);
  };

  const handleRequestEvidence = (product: Product) => {
    updateProductStatus(product.id, 'pending', 'হাতে লেখা কোড সহ নতুন কোণ থেকে ছবি চাওয়া হয়েছে');
    setSuccessNote(`কারিগরকে হাতে লেখা কোড কার্ড সহ বাস্তব ছবি পুনঃপাঠানোর নোটিফিকেশন পাঠানো হয়েছে।`);
    setTimeout(() => setSuccessNote(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header (No Tagline) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-craft-border">
        <div>
          <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>{language === 'bn' ? 'শিল্প বাজার ইমেজ ফরেনসিক্স সেন্টার' : 'Shilpo Bajar Image Forensics Center'}</span>
          </div>
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
            {language === 'bn' ? 'পণ্যের ছবির সত্যতা পর্যালোচনা ও মডারেশন' : 'Photograph Authenticity Moderation'}
          </h1>
          <p className="text-xs text-craft-muted">
            {language === 'bn'
              ? '৪-স্তরীয় ফরেনসিক বিশ্লেষণ ও স্বচ্ছ সিদ্ধান্ত গ্রহণ প্যানেল।'
              : 'Multi-layer optical forensic inspection suite with provenance logging.'}
          </p>
        </div>

        {/* Warning notification about 100% limitation */}
        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs max-w-sm flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-snug text-[11px]">
            {language === 'bn'
              ? 'নীতি অনুস্মারক: কোনো ডিটেক্টর ১০০% নিখুঁত নয়। তাই স্বয়ংক্রিয় স্কোরের ওপর ভিত্তি করে কারিগরকে ব্যান না করে বাস্তব ছবি পুনরায় জমা দেওয়ার সুযোগ দিন।'
              : 'Ethical Rule: Automated detector scores are probabilistic indicators. Always offer honest artisans an appeal and resubmission window.'}
          </p>
        </div>
      </div>

      {successNote && (
        <div className="bg-sage-100 border border-sage-300 text-sage-900 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-sage-600" />
          <span>{successNote}</span>
        </div>
      )}

      {/* Main Workspace: Left List + Right Deep Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Product Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <span className="font-bold text-xs uppercase tracking-wider text-craft-muted block">
            {language === 'bn' ? 'পর্যালোচনার জন্য তালিকা' : 'Products Queue'} ({products.length})
          </span>

          <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
            {products.map(p => {
              const isSelected = selectedProduct?.id === p.id;
              const isHigh = p.primaryImageAnalysis.overallRisk === 'high';
              const isMed = p.primaryImageAnalysis.overallRisk === 'medium';

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-white border-terracotta-500 shadow-md ring-2 ring-terracotta-200'
                      : 'bg-white/80 border-craft-border hover:bg-white hover:border-craft-muted'
                  }`}
                >
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-16 h-16 rounded-xl object-cover border border-craft-border flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                          isHigh
                            ? 'bg-red-100 text-red-700'
                            : isMed
                            ? 'bg-mustard-100 text-mustard-800'
                            : 'bg-sage-100 text-sage-800'
                        }`}
                      >
                        {isHigh ? 'উচ্চ ঝুঁকি (AI)' : isMed ? 'পর্যালোচনা প্রয়োজন' : 'আসল ক্যামেরা'}
                      </span>
                      <span className="text-[11px] font-semibold text-craft-muted">
                        {p.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-craft-text truncate">{p.title}</h4>
                    <p className="text-[11px] text-craft-muted truncate">কারিগর: {p.artisanName}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Deep Dive Inspector (7 cols) */}
        <div className="lg:col-span-7">
          {selectedProduct ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-6">
              
              {/* Product Header in Inspector */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-craft-border">
                <div>
                  <h3 className="font-bangla font-bold text-lg text-craft-text">
                    {selectedProduct.title}
                  </h3>
                  <p className="text-xs text-craft-muted">
                    কারিগর: {selectedProduct.artisanName} • {selectedProduct.artisanDistrict} • বিক্রয়মূল্য: ৳{selectedProduct.price}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    selectedProduct.status === 'approved'
                      ? 'bg-sage-100 text-sage-800'
                      : selectedProduct.status === 'flagged'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-ivory-200 text-craft-text'
                  }`}
                >
                  স্ট্যাটাস: {selectedProduct.status}
                </span>
              </div>

              {/* Photo Large Preview */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-ivory-200 border border-craft-border group">
                <img
                  src={selectedProduct.images[0]}
                  alt="High res preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{selectedProduct.primaryImageAnalysis.fileName}</span>
                </div>
              </div>

              {/* 4 Layers Diagnostic Breakdown */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-craft-muted">
                  {language === 'bn' ? '৪-স্তরীয় স্বয়ংক্রিয় ফরেনসিক অডিট রিপোর্ট' : 'Forensic Audit Report'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Layer 1 */}
                  <div className="bg-ivory-100 p-3.5 rounded-xl border border-craft-border/70 space-y-1">
                    <span className="font-bold text-craft-text block">স্তর ১: মেটাডেটা ও সফটওয়্যার</span>
                    <p className="text-craft-muted text-[11px]">
                      ক্যামেরা: {selectedProduct.primaryImageAnalysis.cameraModel || 'EXIF Strip / Mobile Sensor'}
                    </p>
                    <p className="text-craft-muted text-[11px]">
                      সফটওয়্যার: {selectedProduct.primaryImageAnalysis.softwareDetected || 'Normal ISP Pipeline'}
                    </p>
                  </div>

                  {/* Layer 2 */}
                  <div className="bg-ivory-100 p-3.5 rounded-xl border border-craft-border/70 space-y-1">
                    <span className="font-bold text-craft-text block">স্তর ২: সিন্থেটিক টেক্সচার বিশ্লেষণ</span>
                    <p className="text-craft-muted text-[11px]">
                      সিন্থেটিক স্কোর: {selectedProduct.primaryImageAnalysis.riskScorePercent}%
                    </p>
                    <p className="text-craft-muted text-[11px]">
                      ফলাফল: {selectedProduct.primaryImageAnalysis.overallRisk === 'low' ? 'খাঁটি ফাইবার ও স্বাভাবিক নয়েজ' : 'অস্বাভাবিক মসৃণতা সনাক্ত'}
                    </p>
                  </div>

                  {/* Layer 3 */}
                  <div className="bg-ivory-100 p-3.5 rounded-xl border border-craft-border/70 space-y-1">
                    <span className="font-bold text-craft-text block">স্তর ৩: কারিগরের স্বত্ব অঙ্গীকার</span>
                    <p className="text-sage-700 font-semibold text-[11px]">
                      ✓ কারিগর স্বহস্তে শপথপত্রে সম্মতি দিয়েছেন
                    </p>
                  </div>

                  {/* Layer 4 */}
                  <div className="bg-ivory-100 p-3.5 rounded-xl border border-craft-border/70 space-y-1">
                    <span className="font-bold text-craft-text block">স্তর ৪: অ্যাডমিন পর্যবেক্ষণ</span>
                    <p className="text-craft-muted text-[11px]">
                      মানুষ দ্বারা চূড়ান্ত সত্যানুসন্ধান সক্রিয়
                    </p>
                  </div>
                </div>

                <div className="bg-sage-50 text-sage-900 p-3.5 rounded-xl text-xs leading-relaxed border border-sage-200">
                  <p className="font-semibold mb-0.5">অডিট ফাইন্ডিংস ব্যাখ্যা:</p>
                  <p className="text-[11px]">{selectedProduct.primaryImageAnalysis.explanation[language]}</p>
                </div>
              </div>

              {/* Moderation Actions */}
              <div className="pt-4 border-t border-craft-border space-y-4">
                <div>
                  <label className="text-xs font-semibold text-craft-text block mb-1">
                    {language === 'bn' ? 'মডারেশন নোট / কারিগরের জন্য বার্তা' : 'Moderation Log / Message to Seller'}
                  </label>
                  <input
                    type="text"
                    value={moderationReason}
                    onChange={e => setModerationReason(e.target.value)}
                    placeholder={
                      language === 'bn'
                        ? 'যেমন: ছবি খাঁটি হস্তশিল্পের প্রমাণিত হয়েছে / ভিন্ন কোণ থেকে বাস্তব ছবি প্রয়োজন...'
                        : 'e.g. Validated genuine texture / Request real reshoot...'
                    }
                    className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleApprove(selectedProduct)}
                    className="flex-1 bg-sage-600 hover:bg-sage-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === 'bn' ? 'ছবি অনুমোদন করুন (Approve)' : 'Approve Photograph'}</span>
                  </button>

                  <button
                    onClick={() => handleRequestEvidence(selectedProduct)}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <FileQuestion className="w-4 h-4" />
                    <span>{language === 'bn' ? 'কোড কার্ড সহ আসল ছবি চান' : 'Request Real Re-shoot'}</span>
                  </button>

                  <button
                    onClick={() => handleReject(selectedProduct)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>{language === 'bn' ? 'AI ছবি হিসেবে বাতিল' : 'Reject as AI Mockup'}</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-craft-border text-xs text-craft-muted">
              পর্যালোচনার জন্য বামের তালিকা থেকে একটি পণ্য নির্বাচন করুন।
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
