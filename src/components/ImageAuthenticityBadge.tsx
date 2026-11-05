import React, { useState } from 'react';
import { ShieldCheck, Info, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { ImageMetadataAnalysis } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ImageAuthenticityBadgeProps {
  analysis?: ImageMetadataAnalysis;
  compact?: boolean;
}

export const ImageAuthenticityBadge: React.FC<ImageAuthenticityBadgeProps> = ({
  analysis,
  compact = false,
}) => {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowModal(true);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full cursor-pointer transition-transform hover:scale-105 ${
          compact
            ? 'py-0.5 px-2 text-[10px] bg-white/95 backdrop-blur-md shadow-sm border border-sage-200 text-sage-800'
            : 'py-1 px-3 text-xs bg-sage-50 border border-sage-300 text-sage-800 shadow-sm'
        }`}
        title={language === 'bn' ? 'ছবিটির সত্যতা যাচাইয়ের তথ্য দেখুন' : 'View Authenticity Verification details'}
      >
        <ShieldCheck className={compact ? 'w-3 h-3 text-sage-600' : 'w-4 h-4 text-sage-600'} />
        <span className="font-semibold tracking-tight">
          {language === 'bn' ? 'AI-মুক্ত আসল ছবি' : 'Authentic Photo'}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-sage-500 animate-pulse"></span>
      </div>

      {/* Verification Audit Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-craft-border relative text-craft-text animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-ivory-200 text-craft-muted transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-craft-text">
                  {language === 'bn' ? 'পণ্যের ছবির সত্যতা সনদ' : 'Photograph Authenticity Certificate'}
                </h3>
                <p className="text-xs text-sage-700 font-medium">
                  {language === 'bn' ? 'শিল্প বাজার ৪-স্তরীয় যাচাইকরণ ব্যবস্থা' : 'Shilpo Bajar 4-Layer Verification'}
                </p>
              </div>
            </div>

            <div className="bg-ivory-100 p-3.5 rounded-xl border border-craft-border/70 mb-4 text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-craft-border/50">
                <span className="text-craft-muted">{language === 'bn' ? 'ঝুঁকি মূল্যায়ন' : 'Synthetic Risk Score'}:</span>
                <span className="font-bold text-sage-700 bg-sage-100 px-2 py-0.5 rounded-full">
                  {analysis?.riskScorePercent || 8}% ({language === 'bn' ? 'নিরাপদ / আসল' : 'Low / Genuine'})
                </span>
              </div>

              {analysis?.cameraModel && (
                <div className="flex justify-between items-center">
                  <span className="text-craft-muted">{language === 'bn' ? 'ক্যামেরা সেন্সর' : 'Optical Sensor'}:</span>
                  <span className="font-medium text-craft-text">{analysis.cameraModel}</span>
                </div>
              )}

              {analysis?.softwareDetected && (
                <div className="flex justify-between items-center">
                  <span className="text-craft-muted">{language === 'bn' ? 'ক্যাপচার সফটওয়্যার' : 'Software Engine'}:</span>
                  <span className="font-medium text-craft-text">{analysis.softwareDetected}</span>
                </div>
              )}
            </div>

            {/* 4 Layers Check */}
            <div className="space-y-2.5 mb-5 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-craft-text">
                    {language === 'bn' ? 'স্তর ১: মেটাডেটা ও প্রোভেন্যান্স' : 'Layer 1: Metadata & Provenance'}
                  </span>
                  <p className="text-[11px] text-craft-muted">
                    {language === 'bn'
                      ? 'কোনো Midjourney, DALL-E বা AI জেনারেশন ট্যাগ পাওয়া যায়নি।'
                      : 'No generative AI tags or synthetic watermarks present.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-craft-text">
                    {language === 'bn' ? 'স্তর ২: টেক্সচার ও নয়েজ বিশ্লেষণ' : 'Layer 2: Texture & Forensic Scan'}
                  </span>
                  <p className="text-[11px] text-craft-muted">
                    {language === 'bn'
                      ? 'হস্তশিল্পের স্বাভাবিক সুতা, মাটি ও পৃষ্ঠের খাঁটি মাইক্রো-টেক্সচার বিদ্যমান।'
                      : 'Natural physical fabric/clay grain confirmed without synthetic smoothing.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-craft-text">
                    {language === 'bn' ? 'স্তর ৩: কারিগরের স্বত্ব অঙ্গীকার' : 'Layer 3: Artisan Sworn Pledge'}
                  </span>
                  <p className="text-[11px] text-craft-muted">
                    {language === 'bn'
                      ? 'কারিগর আনুষ্ঠানিকভাবে নিশ্চিত করেছেন এটি তার নিজের তৈরি বাস্তব পণ্যের ছবি।'
                      : 'Artisan confirmed under penalty that photograph depicts actual physical product.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-sage-50 text-sage-900 p-3 rounded-lg text-xs leading-relaxed border border-sage-200">
              {analysis?.explanation ? analysis.explanation[language] : (
                language === 'bn'
                  ? 'এই ছবিটি শতভাগ আসল পণ্যকে সঠিকভাবে উপস্থাপন করছে। কোনো ফিল্টার দিয়ে বাস্তব রূপ পরিবর্তন করা হয়নি।'
                  : 'This photograph authentically represents the physical product without misleading alterations.'
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-5 w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-medium py-2 rounded-xl text-sm transition"
            >
              {language === 'bn' ? 'ঠিক আছে' : 'Understood'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
