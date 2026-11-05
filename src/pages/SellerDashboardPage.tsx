import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  Store,
  Package,
  ShoppingBag,
  TrendingUp,
  Calculator,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export const SellerDashboardPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { products, orders, updateOrderStatus } = useMarketplace();
  const navigate = useNavigate();

  // Current artisan demo seller (e.g. Monira Begum or active seller)
  const myProducts = products.filter(p => p.artisanId === 'artisan-1');
  const myOrders = orders; // show orders for testing

  const pendingOrders = myOrders.filter(o => o.status === 'New' || o.status === 'Accepted' || o.status === 'Preparing');
  const completedOrders = myOrders.filter(o => o.status === 'Delivered');
  const totalSalesAmount = myOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner & Welcome (No Tagline) */}
      <div className="bg-gradient-to-r from-terracotta-500 to-terracotta-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-mustard-300">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 py-0.5 px-3 rounded-full bg-white/20 text-mustard-200 text-xs font-semibold backdrop-blur-md">
            <Store className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'শিল্প বাজার কারিগর নিয়ন্ত্রণ কেন্দ্র' : 'Shilpo Bajar Artisan Hub'}</span>
          </div>
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold">
            {language === 'bn' ? 'স্বাগতম, মনিরা বেগম!' : 'Welcome, Monira Begum!'}
          </h1>
          <p className="text-xs sm:text-sm text-ivory-100 max-w-xl">
            {language === 'bn'
              ? 'আপনার দোকান "জামালপুরী নকশি কুটির" সক্রিয় রয়েছে। আপনার হাতের তৈরি খাঁটি সৃষ্টির দাম পান সম্মানের সাথে।'
              : 'Your digital shop "Jamalpuri Nakshi Kutir" is live. Fair labor recognition for your hands.'}
          </p>
        </div>

        {/* Quick Main Action */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/seller/products/new"
            className="bg-white hover:bg-ivory-100 text-terracotta-600 font-semibold py-2.5 px-5 rounded-full text-xs sm:text-sm shadow-md transition flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-terracotta-600" />
            <span>{language === 'bn' ? 'নতুন পণ্য যোগ করুন' : 'Add New Product'}</span>
          </Link>

          <Link
            to="/seller/pricing-calculator"
            className="bg-white/20 hover:bg-white/30 text-white font-medium py-2.5 px-4 rounded-full text-xs sm:text-sm backdrop-blur-md transition flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-mustard-300" />
            <span>{language === 'bn' ? 'মূল্য ক্যালকুলেটর' : 'Pricing Tool'}</span>
          </Link>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'তালিকাভুক্ত পণ্য' : 'Listed Products'}
            </span>
            <Package className="w-4 h-4 text-terracotta-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-craft-text font-bangla">
            {myProducts.length}
          </p>
          <span className="text-[11px] text-sage-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {language === 'bn' ? '১০০% আসল ছবি যাচাইকৃত' : '100% Genuine Photos'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'প্রক্রিয়াধীন অর্ডার' : 'Pending Orders'}
            </span>
            <ShoppingBag className="w-4 h-4 text-mustard-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-mustard-600 font-bangla">
            {pendingOrders.length}
          </p>
          <span className="text-[11px] text-craft-muted">
            {language === 'bn' ? 'গ্রাহক ডেলিভারির অপেক্ষায়' : 'Awaiting delivery'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'সম্পন্ন অর্ডার' : 'Delivered Orders'}
            </span>
            <CheckCircle2 className="w-4 h-4 text-sage-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-sage-700 font-bangla">
            {completedOrders.length}
          </p>
          <span className="text-[11px] text-craft-muted">
            {language === 'bn' ? 'সফল ডেলিভারি সম্পন্ন' : 'Successfully fulfilled'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-craft space-y-2">
          <div className="flex items-center justify-between text-craft-muted">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'মোট বিক্রয়মূল্য' : 'Total Revenue'}
            </span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-craft-text font-bangla">
            ৳{totalSalesAmount.toLocaleString()}
          </p>
          <span className="text-[11px] text-terracotta-600 font-medium">
            {language === 'bn' ? 'শ্রমের ন্যায্য পাওনা যুক্ত' : 'Labor wage included'}
          </span>
        </div>
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/seller/products/new"
          className="bg-ivory-100 hover:bg-terracotta-50 p-4 rounded-2xl border border-craft-border hover:border-terracotta-300 transition flex items-center gap-3 group"
        >
          <div className="p-3 bg-white rounded-xl text-terracotta-600 group-hover:bg-terracotta-500 group-hover:text-white transition shadow-sm">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-craft-text group-hover:text-terracotta-700">
              {language === 'bn' ? 'নতুন পণ্য তালিকাভুক্ত করুন' : 'Add New Craft Listing'}
            </h4>
            <p className="text-[11px] text-craft-muted">
              {language === 'bn' ? 'আসল ছবি যাচাই ও বিবরণ' : 'Upload photo & verify'}
            </p>
          </div>
        </Link>

        <Link
          to="/seller/pricing-calculator"
          className="bg-ivory-100 hover:bg-mustard-50 p-4 rounded-2xl border border-craft-border hover:border-mustard-300 transition flex items-center gap-3 group"
        >
          <div className="p-3 bg-white rounded-xl text-mustard-600 group-hover:bg-mustard-500 group-hover:text-white transition shadow-sm">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-craft-text group-hover:text-mustard-800">
              {language === 'bn' ? 'ন্যায্য মূল্য ক্যালকুলেটর' : 'Fair Price Calculator'}
            </h4>
            <p className="text-[11px] text-craft-muted">
              {language === 'bn' ? 'শ্রমঘণ্টা হিসাব করুন' : 'Factor in your artisan hours'}
            </p>
          </div>
        </Link>

        <Link
          to="/seller/assistant"
          className="bg-ivory-100 hover:bg-indigo-50 p-4 rounded-2xl border border-craft-border hover:border-indigo-300 transition flex items-center gap-3 group"
        >
          <div className="p-3 bg-white rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs sm:text-sm text-craft-text group-hover:text-indigo-800">
              {language === 'bn' ? 'দামবন্ধু AI সহকারী' : 'DaamBondhu AI Helper'}
            </h4>
            <p className="text-[11px] text-craft-muted">
              {language === 'bn' ? 'সহজ বাংলায় প্রশ্ন করুন' : 'Instant Bangla craft advice'}
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Orders Section with Status Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-craft-border">
          <div>
            <h3 className="font-bangla text-lg sm:text-xl font-bold text-craft-text">
              {language === 'bn' ? 'সাম্প্রতিক গ্রাহক অর্ডার' : 'Recent Customer Orders'}
            </h3>
            <p className="text-xs text-craft-muted">
              {language === 'bn'
                ? 'অর্ডার গ্রহণ করুন এবং ডেলিভারির স্ট্যাটাস আপডেট করুন।'
                : 'Manage incoming orders and fulfill shipments.'}
            </p>
          </div>
          <Link
            to="/seller/orders"
            className="text-xs font-semibold text-terracotta-600 hover:underline flex items-center gap-1"
          >
            <span>{language === 'bn' ? 'সকল অর্ডার দেখুন' : 'View All Orders'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-ivory-100 text-craft-muted uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3 rounded-l-xl">{language === 'bn' ? 'অর্ডার কোড' : 'Order No'}</th>
                <th className="p-3">{language === 'bn' ? 'পণ্য' : 'Product'}</th>
                <th className="p-3">{language === 'bn' ? 'গ্রাহক ও জেলা' : 'Customer'}</th>
                <th className="p-3">{language === 'bn' ? 'পেমেন্ট' : 'Payment'}</th>
                <th className="p-3">{language === 'bn' ? 'মোট' : 'Total'}</th>
                <th className="p-3">{language === 'bn' ? 'বর্তমান স্ট্যাটাস' : 'Status'}</th>
                <th className="p-3 rounded-r-xl text-right">{language === 'bn' ? 'পদক্ষেপ' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-craft-border/60">
              {myOrders.map(order => (
                <tr key={order.id} className="hover:bg-ivory-50/50">
                  <td className="p-3 font-bold text-terracotta-700">
                    {order.orderNumber}
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-craft-text line-clamp-1">
                      {order.items[0]?.productTitle}
                    </span>
                    <span className="text-[10px] text-craft-muted">
                      {order.items[0]?.quantity} পিস
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="font-medium text-craft-text block">{order.customerName}</span>
                    <span className="text-[10px] text-craft-muted">{order.deliveryDistrict}</span>
                  </td>
                  <td className="p-3">
                    <span className="uppercase text-[10px] bg-ivory-200 px-2 py-0.5 rounded font-semibold">
                      {order.paymentMethod}
                    </span>
                    {order.trxId && (
                      <span className="block text-[10px] text-sage-700 mt-0.5">Trx: {order.trxId}</span>
                    )}
                  </td>
                  <td className="p-3 font-bold font-bangla text-craft-text">
                    ৳{order.total}
                  </td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-semibold py-0.5 px-2 rounded-full ${
                        order.status === 'New'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'Preparing'
                          ? 'bg-mustard-100 text-mustard-800'
                          : order.status === 'Shipped'
                          ? 'bg-indigo-100 text-indigo-700'
                          : order.status === 'Delivered'
                          ? 'bg-sage-100 text-sage-800'
                          : 'bg-ivory-200 text-craft-muted'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {order.status === 'New' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Preparing')}
                        className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-[11px] font-semibold py-1 px-3 rounded-lg shadow-sm"
                      >
                        {language === 'bn' ? 'গ্রহণ করুন' : 'Accept'}
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Shipped')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold py-1 px-3 rounded-lg shadow-sm"
                      >
                        {language === 'bn' ? 'কুরিয়ারে পাঠান' : 'Ship Order'}
                      </button>
                    )}
                    {order.status === 'Shipped' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'Delivered')}
                        className="bg-sage-600 hover:bg-sage-700 text-white text-[11px] font-semibold py-1 px-3 rounded-lg shadow-sm"
                      >
                        {language === 'bn' ? 'ডেলিভারি সম্পন্ন' : 'Delivered'}
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <span className="text-[11px] text-sage-700 font-medium">✓ সম্পন্ন</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
