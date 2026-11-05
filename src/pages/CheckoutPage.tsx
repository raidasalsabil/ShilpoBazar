import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { BD_DISTRICTS } from '../data/mockData';
import {
  CreditCard,
  Truck,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Phone,
  User,
  MapPin,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { cart, subtotal, deliveryFee, total, deliveryDistrict, clearCart } = useCart();
  const { addOrder } = useMarketplace();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(deliveryDistrict);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [trxId, setTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState<any | null>(null);

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-craft-text">
          {language === 'bn' ? 'ঝুড়িতে কোনো পণ্য নেই' : 'No items in cart'}
        </h2>
        <Link to="/marketplace" className="text-xs text-terracotta-600 underline">
          {language === 'bn' ? 'বাজারে যান' : 'Go to Marketplace'}
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert(language === 'bn' ? 'দয়া করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।' : 'Please fill all required delivery details.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !trxId.trim()) {
      alert(language === 'bn' ? 'দয়া করে আপনার বিকাশ বা নগদ ট্রানজ্যাকশন আইডি (TrxID) লিখুন।' : 'Please enter your Transaction ID (TrxID).');
      return;
    }

    setIsSubmitting(true);

    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productTitle: item.product.title,
      productTitleEn: item.product.titleEn,
      image: item.product.images[0],
      price: item.product.price,
      quantity: item.quantity,
      artisanId: item.product.artisanId,
      artisanName: item.product.artisanName,
    }));

    setTimeout(() => {
      const created = addOrder({
        items: orderItems,
        customerName,
        customerPhone,
        deliveryDistrict: selectedDistrict,
        deliveryAddress,
        paymentMethod,
        trxId: trxId.trim() || undefined,
        subtotal,
        deliveryFee,
        total,
        status: 'New',
        isSimulated: true,
      });

      setOrderPlaced(created);
      clearCart();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {orderPlaced ? (
        /* Order Success Confirmation */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-craft-border shadow-craft text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
              {language === 'bn' ? 'আপনার অর্ডারটি সফলভাবে গৃহীত হয়েছে!' : 'Order Placed Successfully!'}
            </h2>
            <p className="text-xs text-craft-muted">
              {language === 'bn' ? 'কারিগরকে অবহিত করা হয়েছে এবং প্রস্তুতি শুরু হচ্ছে।' : 'The artisan has been notified and craft preparation begins.'}
            </p>
          </div>

          <div className="bg-ivory-100 p-5 rounded-2xl max-w-md mx-auto text-xs space-y-2.5 border border-craft-border/60 text-left">
            <div className="flex justify-between">
              <span className="text-craft-muted">{language === 'bn' ? 'অর্ডার নম্বর' : 'Order Tracking ID'}:</span>
              <span className="font-bold font-mono text-terracotta-700">{orderPlaced.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-craft-muted">{language === 'bn' ? 'গ্রাহক' : 'Customer'}:</span>
              <span className="font-medium text-craft-text">{orderPlaced.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-craft-muted">{language === 'bn' ? 'ডেলিভারি ঠিকানা' : 'Address'}:</span>
              <span className="font-medium text-craft-text text-right">{orderPlaced.deliveryAddress}, {orderPlaced.deliveryDistrict}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-craft-muted">{language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment'}:</span>
              <span className="font-semibold uppercase text-craft-text">{orderPlaced.paymentMethod}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-craft-border/60 font-bold text-sm">
              <span>{language === 'bn' ? 'সর্বমোট' : 'Total'}:</span>
              <span className="text-terracotta-600 font-bangla">৳{orderPlaced.total}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/my-account"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-2.5 px-6 rounded-full text-xs sm:text-sm shadow transition"
            >
              {language === 'bn' ? 'অর্ডার ট্র্যাক করুন' : 'Track Order in My Account'}
            </Link>
            <Link
              to="/marketplace"
              className="bg-ivory-200 hover:bg-ivory-300 text-craft-text font-medium py-2.5 px-5 rounded-full text-xs transition"
            >
              {language === 'bn' ? 'আরও কেনাকাটা করুন' : 'Continue Shopping'}
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="space-y-1">
            <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
              {language === 'bn' ? 'ডেলিভারি ঠিকানা ও পেমেন্ট' : 'Delivery & Payment'}
            </h1>
            <p className="text-xs text-craft-muted">
              {language === 'bn'
                ? 'আপনার খাঁটি হস্তশিল্প পণ্য নিরাপদে পৌঁছাতে সঠিক তথ্য প্রদান করুন।'
                : 'Provide your accurate shipping and payment information.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Shipping & Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Address */}
              <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-4">
                <h3 className="font-bold text-sm text-craft-text pb-2 border-b border-craft-border flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-terracotta-500" />
                  <span>{language === 'bn' ? '১. গ্রাহকের ডেলিভারি তথ্য' : '1. Shipping Details'}</span>
                </h3>

                <div>
                  <label className="text-xs font-semibold text-craft-text block mb-1">
                    {language === 'bn' ? 'আপনার পুরো নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="যেমন: ফারজানা হক"
                    className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-craft-text block mb-1">
                    {language === 'bn' ? 'মোবাইল নম্বর (ডেলিভারির জন্য) *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="017XX-XXXXXX"
                    className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-craft-text block mb-1">
                    {language === 'bn' ? 'জেলা *' : 'District *'}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={e => setSelectedDistrict(e.target.value)}
                    className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs"
                  >
                    {BD_DISTRICTS.map((d, idx) => (
                      <option key={idx} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-craft-text block mb-1">
                    {language === 'bn' ? 'সম্পূর্ণ ঠিকানা (বাসা/রোড/এলাকা) *' : 'Full Detailed Address *'}
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    placeholder="যেমন: বাড়ি ১২, রোড ৪, সেক্টর ৭, উত্তরা, ঢাকা"
                    className="w-full bg-ivory-100 p-2.5 rounded-xl border border-craft-border text-xs focus:outline-none focus:ring-1 focus:ring-terracotta-400"
                  ></textarea>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-4">
                <h3 className="font-bold text-sm text-craft-text pb-2 border-b border-craft-border flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-mustard-500" />
                  <span>{language === 'bn' ? '২. পেমেন্ট পদ্ধতি নির্বাচন' : '2. Payment Method'}</span>
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'bg-terracotta-50/70 border-terracotta-400'
                        : 'bg-ivory-100 border-craft-border hover:bg-ivory-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-terracotta-500"
                    />
                    <div>
                      <span className="font-bold text-xs text-craft-text block">
                        {language === 'bn' ? 'ক্যাশ অন ডেলিভারি (Cash on Delivery)' : 'Cash on Delivery (COD)'}
                      </span>
                      <p className="text-[11px] text-craft-muted">
                        {language === 'bn'
                          ? 'পণ্য হাতে পেয়ে দেখে ডেলিভারি ম্যানের কাছে মূল্য পরিশোধ করুন।'
                          : 'Pay in cash directly when courier brings the handcrafted piece to your doorstep.'}
                      </p>
                    </div>
                  </label>

                  {/* bKash */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'bkash'
                        ? 'bg-pink-50 border-pink-400'
                        : 'bg-ivory-100 border-craft-border hover:bg-ivory-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 text-pink-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-xs text-craft-text block">
                        {language === 'bn' ? 'বিকাশ (bKash Send Money / Merchant)' : 'bKash'}
                      </span>
                      <p className="text-[11px] text-craft-muted">
                        {language === 'bn'
                          ? 'আমাদের নির্ধারিত পার্সোনাল বিকাশ নম্বরে 01712-345678 পাঠিয়ে TrxID লিখুন।'
                          : 'Send total amount to bKash 01712-345678 and enter Transaction ID below.'}
                      </p>

                      {paymentMethod === 'bkash' && (
                        <div className="mt-3 pt-2 border-t border-pink-200 space-y-1.5 animate-in fade-in">
                          <label className="text-[11px] font-semibold text-pink-900 block">
                            {language === 'bn' ? 'বিকাশ ট্রানজ্যাকশন আইডি (TrxID) লিখুন *' : 'Enter bKash TrxID *'}
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'bkash'}
                            value={trxId}
                            onChange={e => setTrxId(e.target.value)}
                            placeholder="যেমন: BK9X2M7LP0"
                            className="w-full bg-white p-2 rounded-lg border border-pink-300 text-xs font-mono uppercase focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition ${
                      paymentMethod === 'nagad'
                        ? 'bg-amber-50 border-amber-400'
                        : 'bg-ivory-100 border-craft-border hover:bg-ivory-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 text-amber-500"
                    />
                    <div className="flex-1">
                      <span className="font-bold text-xs text-craft-text block">
                        {language === 'bn' ? 'নগদ (Nagad)' : 'Nagad'}
                      </span>
                      <p className="text-[11px] text-craft-muted">
                        {language === 'bn'
                          ? 'নগদ পার্সোনাল 01819-987654 নম্বরে পাঠিয়ে ট্রানজ্যাকশন আইডি দিন।'
                          : 'Send to Nagad 01819-987654 and enter TrxID below.'}
                      </p>

                      {paymentMethod === 'nagad' && (
                        <div className="mt-3 pt-2 border-t border-amber-200 space-y-1.5 animate-in fade-in">
                          <label className="text-[11px] font-semibold text-amber-900 block">
                            {language === 'bn' ? 'নগদ ট্রানজ্যাকশন আইডি (TrxID) লিখুন *' : 'Enter Nagad TrxID *'}
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'nagad'}
                            value={trxId}
                            onChange={e => setTrxId(e.target.value)}
                            placeholder="যেমন: NG7K9P2X1"
                            className="w-full bg-white p-2 rounded-lg border border-amber-300 text-xs font-mono uppercase focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right: Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-4">
                <h3 className="font-bold text-sm text-craft-text pb-2 border-b border-craft-border">
                  {language === 'bn' ? 'অর্ডারকৃত পণ্যসমূহ' : 'Order Items'}
                </h3>

                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-12 h-12 rounded-lg object-cover border border-craft-border"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-craft-text line-clamp-1">
                          {language === 'bn' ? item.product.title : item.product.titleEn}
                        </span>
                        <span className="text-[10px] text-craft-muted">
                          {item.quantity} পিস × ৳{item.product.price}
                        </span>
                      </div>
                      <span className="font-bangla font-semibold text-craft-text">
                        ৳{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-craft-border space-y-1.5 text-xs">
                  <div className="flex justify-between text-craft-muted">
                    <span>{language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}:</span>
                    <span className="font-bangla font-semibold text-craft-text">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-craft-muted">
                    <span>{language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery'}:</span>
                    <span className="font-bangla font-semibold text-craft-text">৳{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-craft-text pt-2 border-t border-craft-border">
                    <span>{language === 'bn' ? 'মোট প্রদেয়' : 'Total'}:</span>
                    <span className="font-bangla text-terracotta-600 text-base">৳{total}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? (language === 'bn' ? 'অর্ডার জমা হচ্ছে...' : 'Processing...') : (language === 'bn' ? 'অর্ডার নিশ্চিত করুন' : 'Confirm Order')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

    </div>
  );
};

