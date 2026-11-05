import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-ivory-200 border-t-2 border-dashed border-mustard-300 text-craft-text pt-12 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Highlights: The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-craft-border">
          <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-craft-border/60">
            <div className="p-2.5 bg-terracotta-100 text-terracotta-600 rounded-lg">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-terracotta-700">
                {language === 'bn' ? 'শ্রমের ন্যায্য মূল্যায়ন' : 'Fair Labor Recognition'}
              </h4>
              <p className="text-xs text-craft-muted mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'শুধু কাপড়ের খরচ নয়, ঘণ্টার পর ঘণ্টা নিখুঁত মেধা ও হাতের কাজের পারিশ্রমিক যুক্ত।'
                  : 'Every listing factors in true artisan hours and skilled labor, not just materials.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-craft-border/60">
            <div className="p-2.5 bg-sage-100 text-sage-700 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-sage-800">
                {language === 'bn' ? 'AI-মুক্ত খাঁটি পণ্যের ছবি' : 'Zero AI Image Deception'}
              </h4>
              <p className="text-xs text-craft-muted mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'কৃত্রিম বা জেনারেটিভ AI দিয়ে সাজানো কোনো ছবি নয়, শতভাগ ক্যামেরায় তোলা আসল সৃষ্টি।'
                  : 'Multi-layer authenticity screening rejecting synthetic or misleading product photos.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl border border-craft-border/60">
            <div className="p-2.5 bg-mustard-100 text-mustard-700 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-mustard-800">
                {language === 'bn' ? 'দামবন্ধু বাংলা AI সহকারী' : 'DaamBondhu AI Assistant'}
              </h4>
              <p className="text-xs text-craft-muted mt-1 leading-relaxed">
                {language === 'bn'
                  ? 'সহজ বাংলায় কারিগরের পাশে থেকে সঠিক দাম নির্ধারণ ও পণ্যের বিবরণ লেখার অকৃত্রিম বন্ধু।'
                  : 'Bangla-first conversational AI helping home artisans price fairly and write listings.'}
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-sm border border-mustard-400">
                শি
              </div>
              <span className="font-bangla font-bold text-lg text-terracotta-700">
                {language === 'bn' ? 'শিল্প বাজার' : 'Shilpo Bajar'}
              </span>
            </div>
            <p className="text-xs text-craft-muted leading-relaxed mb-4">
              {t('footerPhilosophy')}
            </p>
            <div className="text-xs text-craft-muted flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
              <span>ঢাকা • জামালপুর • বগুড়া • কুমিল্লা • সিলেট</span>
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-xs text-indigo-700 uppercase tracking-wider mb-3">
              {language === 'bn' ? 'বাজার ও কারুশিল্প' : 'Craft Marketplace'}
            </h5>
            <ul className="space-y-2 text-xs text-craft-muted">
              <li><Link to="/marketplace?category=embroidery" className="hover:text-terracotta-600 transition">নকশিকাঁথা ও সূচিকর্ম</Link></li>
              <li><Link to="/marketplace?category=pottery" className="hover:text-terracotta-600 transition">রায়েরবাজার মৃৎশিল্প</Link></li>
              <li><Link to="/marketplace?category=crochet" className="hover:text-terracotta-600 transition">ক্রুশের খেলনা ও অ্যামিগুরুমি</Link></li>
              <li><Link to="/marketplace?category=jewellery" className="hover:text-terracotta-600 transition">টেরাকোটা ও পিতলের গহনা</Link></li>
              <li><Link to="/marketplace?category=jute_paper" className="hover:text-terracotta-600 transition">সোনালী পাট ও বাঁশের সামগ্রী</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-xs text-indigo-700 uppercase tracking-wider mb-3">
              {language === 'bn' ? 'কারিগরদের সরঞ্জাম' : 'Artisan Tools'}
            </h5>
            <ul className="space-y-2 text-xs text-craft-muted">
              <li><Link to="/seller/pricing-calculator" className="hover:text-terracotta-600 transition">ন্যায্য মূল্য ক্যালকুলেটর</Link></li>
              <li><Link to="/seller/assistant" className="hover:text-terracotta-600 transition">দামবন্ধু AI সহকারী</Link></li>
              <li><Link to="/seller/register" className="hover:text-terracotta-600 transition">নতুন শপ রেজিস্ট্রেশন</Link></li>
              <li><Link to="/seller/products/new" className="hover:text-terracotta-600 transition">আসল ছবি আপলোড ও যাচাই</Link></li>
              <li><Link to="/seller/orders" className="hover:text-terracotta-600 transition">অর্ডার ব্যবস্থাপনা</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-xs text-indigo-700 uppercase tracking-wider mb-3">
              {language === 'bn' ? 'নীতিমালা ও বিশ্বাস' : 'Integrity & Policies'}
            </h5>
            <ul className="space-y-2 text-xs text-craft-muted">
              <li><span className="text-sage-700 font-medium">✓ অ্যান্টি-AI ছবি যাচাই নীতি</span></li>
              <li><span>✓ নগদ ও বিকাশ ভেরিফিকেশন</span></li>
              <li><span>✓ সরাসরি কারিগরদের সাথে সংযোগ</span></li>
              <li><Link to="/admin/image-review" className="text-terracotta-600 hover:underline">অ্যাডমিন ছবির মডারেশন ডেমো</Link></li>
            </ul>
            <div className="mt-4 pt-3 border-t border-craft-border/60 text-[11px] text-craft-muted">
              <p className="font-medium text-terracotta-700">AIgnite Buildathon 2026</p>
              <p>Ostad presents YUNet AIgnite</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar (No Tagline) */}
        <div className="pt-6 border-t border-craft-border flex flex-col sm:flex-row items-center justify-between text-xs text-craft-muted gap-2">
          <p>
            © {new Date().getFullYear()} {language === 'bn' ? 'শিল্প বাজার' : 'Shilpo Bajar'}. {t('footerRights')}
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{language === 'bn' ? 'খাঁটি হস্তশিল্পের ডিজিটাল হাট' : 'Authentic Bangladeshi Crafts'}</span>
            <span>•</span>
            <span className="text-terracotta-600 font-medium">{language === 'bn' ? 'শিল্প বাজার' : 'Shilpo Bajar'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
