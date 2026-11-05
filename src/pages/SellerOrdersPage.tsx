import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { OrderStatus } from '../types';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Filter,
  Search,
  MapPin,
  Phone,
  AlertCircle,
} from 'lucide-react';

export const SellerOrdersPage: React.FC = () => {
  const { language } = useLanguage();
  const { orders, updateOrderStatus } = useMarketplace();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchNo = o.orderNumber.toLowerCase().includes(q);
      const matchCust = o.customerName.toLowerCase().includes(q);
      const matchDist = o.deliveryDistrict.toLowerCase().includes(q);
      if (!matchNo && !matchCust && !matchDist) return false;
    }
    return true;
  });

  const statuses: OrderStatus[] = ['New', 'Accepted', 'Preparing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-craft-border">
        <div>
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
            {language === 'bn' ? 'অর্ডার ব্যবস্থাপনা' : 'Seller Order Management'}
          </h1>
          <p className="text-xs text-craft-muted mt-0.5">
            {language === 'bn'
              ? 'গ্রাহকদের অর্ডার পর্যালোচনা করুন এবং ধাপ অনুযায়ী স্ট্যাটাস পরিবর্তন করুন।'
              : 'Review customer orders and advance production and shipment stages.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
            {language === 'bn' ? '✓ স্ট্যাটাস সিমুলেশন সক্রিয়' : '✓ Live Status Simulation'}
          </span>
        </div>
      </div>

      {/* Filter Chips & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full font-medium transition ${
              statusFilter === 'all'
                ? 'bg-terracotta-500 text-white'
                : 'bg-white text-craft-text border border-craft-border hover:bg-ivory-100'
            }`}
          >
            {language === 'bn' ? 'সকল অর্ডার' : 'All Orders'} ({orders.length})
          </button>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-terracotta-500 text-white'
                  : 'bg-white text-craft-text border border-craft-border hover:bg-ivory-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'bn' ? 'অর্ডার নং বা নাম খুঁজুন...' : 'Search order # or name...'}
            className="w-full sm:w-64 bg-white border border-craft-border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
          />
          <Search className="w-3.5 h-3.5 text-craft-muted absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 border border-craft-border shadow-craft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-craft-border/60">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-terracotta-700 font-mono">
                    {order.orderNumber}
                  </span>
                  <span className="text-[11px] text-craft-muted">
                    {order.createdAt}
                  </span>
                  {order.isSimulated && (
                    <span className="text-[10px] bg-ivory-200 text-craft-muted px-2 py-0.2 rounded">
                      Simulated
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold py-1 px-3 rounded-full ${
                      order.status === 'New'
                        ? 'bg-blue-100 text-blue-700'
                        : order.status === 'Accepted'
                        ? 'bg-indigo-100 text-indigo-700'
                        : order.status === 'Preparing'
                        ? 'bg-mustard-100 text-mustard-800'
                        : order.status === 'Shipped'
                        ? 'bg-purple-100 text-purple-700'
                        : order.status === 'Delivered'
                        ? 'bg-sage-100 text-sage-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    স্ট্যাটাস: {order.status}
                  </span>
                </div>
              </div>

              {/* Items & Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-xs">
                {/* Items */}
                <div className="md:col-span-6 space-y-2">
                  <span className="font-bold text-craft-muted uppercase tracking-wider text-[10px] block">
                    {language === 'bn' ? 'অর্ডারকৃত সামগ্রী' : 'Items'}
                  </span>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-ivory-100 p-2.5 rounded-xl">
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-12 h-12 rounded-lg object-cover border border-craft-border"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-craft-text block line-clamp-1">
                          {item.productTitle}
                        </span>
                        <span className="text-[11px] text-craft-muted">
                          পরিমাণ: {item.quantity} পিস • ৳{item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Details */}
                <div className="md:col-span-6 space-y-2 bg-ivory-50 p-3 rounded-xl border border-craft-border/60">
                  <span className="font-bold text-craft-muted uppercase tracking-wider text-[10px] block">
                    {language === 'bn' ? 'গ্রাহক ও ডেলিভারি বিবরণ' : 'Customer Info'}
                  </span>
                  <div className="space-y-1 text-craft-text">
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="flex items-center gap-1 text-craft-muted">
                      <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>{order.customerPhone}</span>
                    </p>
                    <p className="flex items-center gap-1 text-craft-muted">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                      <span>{order.deliveryAddress}, {order.deliveryDistrict}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-craft-border/60 flex items-center justify-between text-craft-muted">
                    <span>
                      পেমেন্ট: <strong className="uppercase text-craft-text">{order.paymentMethod}</strong>
                      {order.trxId && ` (Trx: ${order.trxId})`}
                    </span>
                    <span className="font-bold text-sm text-craft-text font-bangla">
                      মোট: ৳{order.total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update Quick Buttons */}
              <div className="pt-3 border-t border-craft-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-craft-muted">
                  {language === 'bn' ? 'পরবর্তী ধাপে পরিবর্তন করুন:' : 'Advance order stage:'}
                </span>

                <div className="flex flex-wrap gap-2">
                  {order.status === 'New' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Accepted')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1.5 px-3 rounded-lg shadow-sm"
                    >
                      {language === 'bn' ? 'অর্ডার গ্রহণ করুন' : 'Accept Order'}
                    </button>
                  )}

                  {(order.status === 'New' || order.status === 'Accepted') && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Preparing')}
                      className="bg-mustard-500 hover:bg-mustard-600 text-white font-semibold py-1.5 px-3 rounded-lg shadow-sm"
                    >
                      {language === 'bn' ? 'তৈরি শুরু করুন (Preparing)' : 'Start Preparing'}
                    </button>
                  )}

                  {order.status === 'Preparing' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Shipped')}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1.5 px-3 rounded-lg shadow-sm"
                    >
                      {language === 'bn' ? 'কুরিয়ারে পাঠান (Shipped)' : 'Hand over to Courier'}
                    </button>
                  )}

                  {order.status === 'Shipped' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Delivered')}
                      className="bg-sage-600 hover:bg-sage-700 text-white font-semibold py-1.5 px-3 rounded-lg shadow-sm"
                    >
                      {language === 'bn' ? 'ডেলিভারি সফল (Delivered)' : 'Mark Delivered'}
                    </button>
                  )}

                  {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                      className="text-red-600 hover:bg-red-50 py-1.5 px-3 rounded-lg font-medium"
                    >
                      {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-craft-border">
            <ShoppingBag className="w-10 h-10 text-craft-muted mx-auto mb-2" />
            <p className="text-xs text-craft-muted">
              {language === 'bn' ? 'এই ফিল্টারে কোনো অর্ডার নেই।' : 'No orders in this filter.'}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

