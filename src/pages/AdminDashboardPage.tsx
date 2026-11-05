import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  ShieldCheck,
  AlertTriangle,
  Users,
  Store,
  Package,
  ShoppingBag,
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { language } = useLanguage();
  const { products, artisans, orders, updateProductStatus } = useMarketplace();

  const pendingOrFlagged = products.filter(
    p => p.status === 'pending' || p.status === 'flagged'
  );
  const approvedCount = products.filter(p => p.status === 'approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header (No Tagline) */}
      <div className="bg-gradient-to-r from-sage-700 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-mustard-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-white/20 text-mustard-300 text-xs font-semibold backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-mustard-300" />
            <span>{language === 'bn' ? 'শিল্প বাজার প্রশাসন ও অখণ্ডতা' : 'Shilpo Bajar Administration & Moderation'}</span>
          </div>
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold">
            {language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Platform Administrator Suite'}
          </h1>
          <p className="text-xs sm:text-sm text-ivory-100 max-w-xl">
            {language === 'bn'
              ? 'কৃত্রিম বুদ্ধিমত্তা জেনারেটেড ভুয়া ছবির অনুপ্রবেশ রোধ, কারিগর যাচাই এবং গ্রাহক আস্থা রক্ষা করার মূল কেন্দ্র।'
              : 'Managing anti-AI image moderation, authentic seller verification, and handmade catalog integrity.'}
          </p>
        </div>

        <Link
          to="/admin/image-review"
          className="bg-mustard-400 hover:bg-mustard-500 text-indigo-950 font-bold py-2.5 px-5 rounded-full text-xs sm:text-sm shadow-md transition flex items-center gap-2 self-start md:self-auto"
        >
          <AlertTriangle className="w-4 h-4 text-indigo-900" />
          <span>
            {language === 'bn'
              ? `ছবি সত্যানুসন্ধান প্যানেল (${pendingOrFlagged.length})`
              : `Image Forensics Queue (${pendingOrFlagged.length})`}
          </span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'নিবন্ধিত কারিগর' : 'Verified Artisans'}
            </span>
            <Store className="w-4 h-4 text-terracotta-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-craft-text font-bangla">
            {artisans.length}
          </p>
          <span className="text-[11px] text-sage-700 font-medium">✓ ১০০% জেলা যাচাইকৃত</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'মোট হস্তশিল্প' : 'Total Crafts'}
            </span>
            <Package className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-craft-text font-bangla">
            {products.length}
          </p>
          <span className="text-[11px] text-craft-muted">{approvedCount}টি প্রকাশ্যে সক্রিয়</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'ছবি যাচাই অপেক্ষমাণ' : 'Flagged for Review'}
            </span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-red-600 font-bangla">
            {pendingOrFlagged.length}
          </p>
          <span className="text-[11px] text-red-700 font-medium">ফরেনসিক সতর্কতা</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'মোট অর্ডার' : 'Total Orders'}
            </span>
            <ShoppingBag className="w-4 h-4 text-sage-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-sage-800 font-bangla">
            {orders.length}
          </p>
          <span className="text-[11px] text-craft-muted">ডেলিভারি ট্র্যাকিং সক্রিয়</span>
        </div>
      </div>

      {/* Flagged / Pending Review Queue Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-craft-border">
          <div>
            <h3 className="font-bangla text-lg sm:text-xl font-bold text-craft-text flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sage-600" />
              <span>{language === 'bn' ? 'পণ্যের ছবির সত্যানুসন্ধান ও মডারেশন কিউ' : 'Image Moderation Queue'}</span>
            </h3>
            <p className="text-xs text-craft-muted">
              {language === 'bn'
                ? 'যেসব পণ্যের ছবিতে ফরেনসিক স্ক্যানে সিন্থেটিক বৈশিষ্ট্যের ঝুঁকি পাওয়া গেছে তাদের পর্যালোচনা করুন।'
                : 'Review uploads flagged by automated multi-layer forensic detection.'}
            </p>
          </div>

          <Link
            to="/admin/image-review"
            className="text-xs font-semibold text-terracotta-600 hover:underline flex items-center gap-1"
          >
            <span>{language === 'bn' ? 'পূর্ণাঙ্গ স্ক্রিনিং টুল খুলুন' : 'Open Full Forensics Suite'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingOrFlagged.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingOrFlagged.map(prod => (
              <div
                key={prod.id}
                className="bg-ivory-50 p-4 rounded-2xl border border-craft-border flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-16 h-16 rounded-xl object-cover border border-craft-border"
                  />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                      ঝুঁকি: {prod.primaryImageAnalysis.riskScorePercent}% ({prod.primaryImageAnalysis.overallRisk})
                    </span>
                    <h4 className="font-bold text-xs text-craft-text line-clamp-1">{prod.title}</h4>
                    <p className="text-[11px] text-craft-muted">কারিগর: {prod.artisanName}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => updateProductStatus(prod.id, 'approved')}
                    className="bg-sage-600 hover:bg-sage-700 text-white text-[11px] font-semibold py-1 px-3 rounded-lg shadow-sm"
                  >
                    অনুমোদন
                  </button>
                  <button
                    onClick={() => updateProductStatus(prod.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold py-1 px-3 rounded-lg shadow-sm"
                  >
                    বাতিল (AI)
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-sage-50/70 p-6 rounded-2xl text-center border border-sage-200">
            <CheckCircle2 className="w-8 h-8 text-sage-600 mx-auto mb-1.5" />
            <p className="text-xs font-semibold text-sage-900">
              {language === 'bn' ? 'সকল পণ্যের ছবি বর্তমানে যাচাইকৃত ও অনুমোদিত!' : 'All product photographs are verified and approved!'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
