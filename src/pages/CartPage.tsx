import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { BD_DISTRICTS } from '../data/mockData';
import { Trash2, ShoppingBag, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { language, t } = useLanguage();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    deliveryDistrict,
    setDeliveryDistrict,
    deliveryFee,
    subtotal,
    total,
  } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-full bg-ivory-200 text-craft-muted flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-bangla text-2xl font-bold text-craft-text">
          {language === 'bn' ? 'আপনার ঝুড়ি বর্তমানে খালি' : 'Your Shopping Cart is Empty'}
        </h2>
        <p className="text-xs sm:text-sm text-craft-muted max-w-sm mx-auto">
          {language === 'bn'
            ? 'খাঁটি দেশীয় হস্তশিল্পীদের তৈরি পণ্য দেখুন এবং পছন্দের কাজ ঝুড়িতে যুক্ত করুন।'
            : 'Explore genuine handcrafted items directly from independent Bangladeshi creators.'}
        </p>
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-6 rounded-full text-xs sm:text-sm shadow transition"
        >
          <span>{t('exploreCrafts')}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-craft-border">
        <div>
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text">
            {language === 'bn' ? 'আপনার কেনাকাটার ঝুড়ি' : 'Shopping Cart'}
          </h1>
          <p className="text-xs text-craft-muted mt-0.5">
            {language === 'bn' ? `${cart.length}টি স্বতন্ত্র হস্তশিল্প নির্বাচিত` : `${cart.length} items in cart`}
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-craft-muted hover:text-red-600 transition flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-craft-border shadow-craft flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover border border-craft-border flex-shrink-0"
                />

                <div className="space-y-1">
                  <span className="text-[10px] text-terracotta-600 font-semibold bg-terracotta-50 px-2 py-0.5 rounded-full">
                    {language === 'bn' ? item.product.artisanShopName : item.product.artisanShopNameEn}
                  </span>
                  <h3 className="font-semibold text-xs sm:text-sm text-craft-text line-clamp-2">
                    {language === 'bn' ? item.product.title : item.product.titleEn}
                  </h3>
                  <div className="text-xs text-craft-muted flex items-center gap-1">
                    <span>{language === 'bn' ? 'শ্রম:' : 'Labor:'} {item.product.laborHours}h</span>
                    <span>•</span>
                    <span className="font-bangla font-semibold text-craft-text">৳{item.product.price}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-craft-border/60">
                <div className="flex items-center border border-craft-border rounded-full bg-ivory-100 p-0.5">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center font-bold text-xs"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-xs">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center font-bold text-xs"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-bangla font-bold text-sm sm:text-base text-terracotta-600 block">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-1.5 rounded-lg text-craft-muted hover:text-red-600 hover:bg-red-50 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Value Note */}
          <div className="bg-sage-50/80 border border-sage-200 rounded-2xl p-4 text-xs text-sage-900 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'শিল্প বাজারে কেনাকাটা সরাসরি গ্রামীণ ও স্বাধীন কারিগরদের ক্ষমতায়ন করে। মধ্যস্বত্বভোগীহীন খাঁটি হস্তশিল্প কেনাকাটায় আপনাকে সাধুবাদ।'
                : 'Direct artisan purchase on Shilpo Bajar. Every taka directly values the human maker behind these items.'}
            </p>
          </div>
        </div>

        {/* Order Summary & District Calculation (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-5">
            <h3 className="font-bold text-sm text-craft-text pb-3 border-b border-craft-border">
              {language === 'bn' ? 'অর্ডার সারাংশ' : 'Order Summary'}
            </h3>

            {/* Delivery District Selector */}
            <div className="space-y-1.5 text-xs">
              <label className="font-semibold text-craft-text flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                <span>{language === 'bn' ? 'ডেলিভারি জেলা' : 'Delivery District'}</span>
              </label>
              <select
                value={deliveryDistrict}
                onChange={e => setDeliveryDistrict(e.target.value)}
                className="w-full bg-ivory-100 border border-craft-border rounded-xl p-2.5 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400 font-medium"
              >
                {BD_DISTRICTS.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-craft-muted block">
                {language === 'bn' ? 'ঢাকার মধ্যে ডেলিভারি ৳৭০, ঢাকার বাইরে ৳১৩০' : 'Inside Dhaka ৳70, Outside Dhaka ৳130'}
              </span>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs pt-3 border-t border-craft-border/60">
              <div className="flex justify-between text-craft-muted">
                <span>{language === 'bn' ? 'পণ্যমূল্য সাবটোটাল' : 'Subtotal'}:</span>
                <span className="font-bangla font-semibold text-craft-text">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-craft-muted">
                <span>{language === 'bn' ? 'কুরিয়ার ডেলিভারি চার্জ' : 'Courier Fee'}:</span>
                <span className="font-bangla font-semibold text-craft-text">৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-craft-text pt-2 border-t border-craft-border">
                <span>{language === 'bn' ? 'সর্বমোট প্রদেয়' : 'Total Amount'}:</span>
                <span className="font-bangla text-terracotta-600 text-lg">৳{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-4 rounded-xl text-xs sm:text-sm shadow transition flex items-center justify-center gap-2"
            >
              <span>{language === 'bn' ? 'চেকআউট ও ঠিকানা দিন' : 'Proceed to Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
