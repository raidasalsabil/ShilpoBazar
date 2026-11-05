import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { Link } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  Star,
  ChevronRight,
} from 'lucide-react';

export const MyAccountPage: React.FC = () => {
  const { language } = useLanguage();
  const { orders, products } = useMarketplace();

  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'profile'>('orders');

  const favorites = products.slice(0, 3); // demo favorites

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'New': return 1;
      case 'Accepted': return 2;
      case 'Preparing': return 3;
      case 'Shipped': return 4;
      case 'Delivered': return 5;
      default: return 1;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft flex flex-col sm:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-2xl shadow-md flex-shrink-0">
            সু
          </div>
          <div>
            <h1 className="font-bangla text-xl sm:text-2xl font-bold text-craft-text">
              সুমাইয়া তাসনিম
            </h1>
            <p className="text-xs text-craft-muted">
              sumaiya.tasnim@example.com • 01711-223344
            </p>
            <div className="flex items-center gap-1.5 text-xs text-sage-700 mt-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'যাচাইকৃত ক্রেতা অ্যাকাউন্ট' : 'Verified Buyer'}</span>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 bg-ivory-100 p-1.5 rounded-2xl border border-craft-border text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 rounded-xl font-medium transition ${
              activeTab === 'orders'
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-craft-muted hover:text-craft-text'
            }`}
          >
            {language === 'bn' ? 'আমার অর্ডারসমূহ' : 'My Orders'} ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-2 px-4 rounded-xl font-medium transition ${
              activeTab === 'favorites'
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-craft-muted hover:text-craft-text'
            }`}
          >
            {language === 'bn' ? 'পছন্দের তালিকা' : 'Saved Crafts'}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 px-4 rounded-xl font-medium transition ${
              activeTab === 'profile'
                ? 'bg-white text-terracotta-600 shadow-sm'
                : 'text-craft-muted hover:text-craft-text'
            }`}
          >
            {language === 'bn' ? 'ঠিকানা ও তথ্য' : 'Address'}
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-bangla text-lg font-bold text-craft-text">
            {language === 'bn' ? 'সাম্প্রতিক অর্ডারের লাইভ ট্র্যাকিং' : 'Live Order Tracking'}
          </h2>

          <div className="space-y-4">
            {orders.map(order => {
              const currentStep = getStatusStep(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-craft-border/60">
                    <div>
                      <span className="font-mono font-bold text-sm text-terracotta-600">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-craft-muted ml-3">
                        {order.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-craft-text">
                        মোট: <strong className="font-bangla text-terracotta-600">৳{order.total}</strong>
                      </span>
                      <span className="text-[11px] bg-ivory-200 text-craft-text px-2.5 py-0.5 rounded-full uppercase font-medium">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Status Progress Timeline */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-craft-muted uppercase tracking-wider block">
                      {language === 'bn' ? 'অগ্রগতি ট্র্যাকার' : 'Progress Timeline'}:
                    </span>

                    <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-semibold">
                      <div className={`p-2 rounded-xl border ${currentStep >= 1 ? 'bg-terracotta-50 border-terracotta-400 text-terracotta-700' : 'bg-ivory-100 text-craft-muted border-craft-border'}`}>
                        <span>১. অর্ডার প্রাপ্তি</span>
                      </div>
                      <div className={`p-2 rounded-xl border ${currentStep >= 2 ? 'bg-terracotta-50 border-terracotta-400 text-terracotta-700' : 'bg-ivory-100 text-craft-muted border-craft-border'}`}>
                        <span>২. গ্রহণ</span>
                      </div>
                      <div className={`p-2 rounded-xl border ${currentStep >= 3 ? 'bg-terracotta-50 border-terracotta-400 text-terracotta-700' : 'bg-ivory-100 text-craft-muted border-craft-border'}`}>
                        <span>৩. তৈরি হচ্ছে</span>
                      </div>
                      <div className={`p-2 rounded-xl border ${currentStep >= 4 ? 'bg-terracotta-50 border-terracotta-400 text-terracotta-700' : 'bg-ivory-100 text-craft-muted border-craft-border'}`}>
                        <span>৪. কুরিয়ারে</span>
                      </div>
                      <div className={`p-2 rounded-xl border ${currentStep >= 5 ? 'bg-sage-50 border-sage-400 text-sage-800' : 'bg-ivory-100 text-craft-muted border-craft-border'}`}>
                        <span>৫. ডেলিভারি সম্পন্ন</span>
                      </div>
                    </div>
                  </div>

                  {/* Products in this order */}
                  <div className="space-y-2 pt-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-ivory-100/70 p-3 rounded-2xl">
                        <img
                          src={item.image}
                          alt={item.productTitle}
                          className="w-14 h-14 rounded-xl object-cover border border-craft-border"
                        />
                        <div className="flex-1 text-xs">
                          <Link to={`/product/${item.productId}`} className="font-semibold text-craft-text hover:text-terracotta-600 block line-clamp-1">
                            {item.productTitle}
                          </Link>
                          <span className="text-craft-muted text-[11px]">
                            কারিগর: {item.artisanName} • {item.quantity} পিস
                          </span>
                        </div>
                        <span className="font-bangla font-semibold text-sm text-craft-text">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="space-y-6">
          <h2 className="font-bangla text-lg font-bold text-craft-text">
            {language === 'bn' ? 'সংরক্ষিত পছন্দের হস্তশিল্প' : 'Saved Handmade Crafts'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {favorites.map(fav => (
              <div key={fav.id} className="bg-white rounded-2xl overflow-hidden border border-craft-border shadow-craft p-3 space-y-2">
                <img src={fav.images[0]} alt={fav.title} className="w-full h-36 object-cover rounded-xl" />
                <h4 className="font-semibold text-xs text-craft-text line-clamp-1">{fav.title}</h4>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bangla font-bold text-terracotta-600">৳{fav.price}</span>
                  <Link to={`/product/${fav.id}`} className="text-terracotta-600 hover:underline">
                    {language === 'bn' ? 'দেখুন' : 'View'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft max-w-xl space-y-4 text-xs">
          <h3 className="font-bold text-sm text-craft-text pb-2 border-b border-craft-border">
            {language === 'bn' ? 'স্থায়ী ডেলিভারি ঠিকানা' : 'Saved Delivery Address'}
          </h3>
          <div className="space-y-2 text-craft-text">
            <p><strong>নাম:</strong> সুমাইয়া তাসনিম</p>
            <p><strong>মোবাইল:</strong> 01711-223344</p>
            <p><strong>ঠিকানা:</strong> বাড়ি ২৪, রোড ৭, ধানমন্ডি, ঢাকা</p>
            <p><strong>জেলা:</strong> Dhaka (ঢাকা)</p>
          </div>
        </div>
      )}

    </div>
  );
};

