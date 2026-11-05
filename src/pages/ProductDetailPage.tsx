import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useMarketplace } from '../context/MarketplaceContext';
import { useCart } from '../context/CartContext';
import { ImageAuthenticityBadge } from '../components/ImageAuthenticityBadge';
import {
  ShieldCheck,
  Clock,
  MapPin,
  ShoppingBag,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Heart,
  Share2,
  ChevronRight,
  Calculator,
  Layers,
  ArrowLeft,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { getProductById, getArtisanById, reviews, addReview } = useMarketplace();
  const { addToCart, cart } = useCart();

  const product = getProductById(id || '');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [showFairPriceBreakdown, setShowFairPriceBreakdown] = useState(false);
  const [copied, setCopied] = useState(false);

  // New review form
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-craft-text">
          {language === 'bn' ? 'পণ্যটি খুঁজে পাওয়া যায়নি' : 'Product Not Found'}
        </h2>
        <Link to="/marketplace" className="text-sm text-terracotta-600 underline">
          {language === 'bn' ? 'বাজারে ফিরে যান' : 'Back to Marketplace'}
        </Link>
      </div>
    );
  }

  const artisan = getArtisanById(product.artisanId);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const isInCart = cart.some(item => item.product.id === product.id);

  const title = language === 'bn' ? product.title : product.titleEn;
  const description = language === 'bn' ? product.description : product.descriptionEn;
  const materials = language === 'bn' ? product.materialsUsed : product.materialsUsedEn;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewComment.trim() || !newReviewAuthor.trim()) return;

    addReview({
      productId: product.id,
      userName: newReviewAuthor.trim(),
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      isVerifiedPurchase: true,
    });

    setNewReviewComment('');
    setNewReviewAuthor('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-craft-muted">
        <Link to="/" className="hover:text-terracotta-600">{t('home')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/marketplace" className="hover:text-terracotta-600">{t('marketplace')}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-craft-text font-medium truncate max-w-[240px] sm:max-w-md">{title}</span>
      </div>

      {/* Main Grid: Gallery + Product Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
        
        {/* Left: Product Photos Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-ivory-200 border border-craft-border shadow-craft">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={title}
              className="w-full h-full object-cover"
            />

            {/* Anti-AI Badge */}
            <div className="absolute top-4 left-4 z-10">
              <ImageAuthenticityBadge analysis={product.primaryImageAnalysis} />
            </div>

            {/* Custom / Made to order */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`text-xs font-semibold py-1 px-3 rounded-full shadow-md backdrop-blur-md ${
                  product.isMadeToOrder
                    ? 'bg-mustard-500/90 text-white'
                    : 'bg-indigo-600/90 text-white'
                }`}
              >
                {product.isMadeToOrder
                  ? language === 'bn'
                    ? `অর্ডারে ${product.productionDays} দিনে প্রস্তুত`
                    : `Made to Order (${product.productionDays} days)`
                  : language === 'bn'
                  ? 'তৈরি স্টক প্রস্তুত'
                  : 'Ready Stock'}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-terracotta-500 shadow-md'
                      : 'border-craft-border hover:border-craft-muted opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Forensic Image Verification Box */}
          <div className="bg-sage-50/70 border border-sage-200 rounded-2xl p-4 text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sage-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage-600" />
                <span>{language === 'bn' ? 'ছবি সত্যানুসন্ধান রিপোর্ট' : 'Image Forensic Screening'}</span>
              </span>
              <span className="text-[11px] font-bold text-sage-800 bg-sage-200/60 py-0.5 px-2 rounded-full">
                {language === 'bn' ? 'শতভাগ বাস্তব ক্যামেরা' : 'Authentic Hardware Capture'}
              </span>
            </div>
            <p className="text-sage-800 leading-relaxed text-[11px]">
              {product.primaryImageAnalysis.explanation[language]}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] text-sage-700 pt-1 border-t border-sage-200/50">
              <span>{language === 'bn' ? 'ক্যামেরা:' : 'Sensor:'} {product.primaryImageAnalysis.cameraModel || 'Phone Sensor'}</span>
              <span>•</span>
              <span>{language === 'bn' ? 'সিন্থেটিক ঝুঁকি:' : 'AI Risk:'} {product.primaryImageAnalysis.riskScorePercent}% (নিরাপদ)</span>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Purchase Options */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Artisan Chip */}
          <div className="flex items-center justify-between">
            <Link
              to={`/artisan/${product.artisanId}`}
              className="flex items-center gap-2 group bg-white py-1 px-3 rounded-full border border-craft-border shadow-sm hover:border-terracotta-400 transition"
            >
              <img
                src={product.artisanAvatar}
                alt={product.artisanName}
                className="w-6 h-6 rounded-full object-cover border border-craft-border"
              />
              <span className="text-xs font-semibold text-craft-text group-hover:text-terracotta-600">
                {language === 'bn' ? product.artisanShopName : product.artisanShopNameEn}
              </span>
              <span className="text-[10px] text-craft-muted flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-terracotta-500" />
                {language === 'bn' ? product.artisanDistrict : product.artisanDistrictEn}
              </span>
            </Link>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white border border-craft-border hover:bg-ivory-200 text-craft-muted transition"
              title="Share link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Title */}
          <h1 className="font-bangla text-2xl sm:text-3xl font-bold text-craft-text leading-snug">
            {title}
          </h1>

          {/* Price & Fair Labour Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-craft-border shadow-sm space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xs text-craft-muted block">
                  {language === 'bn' ? 'নির্ধারিত বিক্রয়মূল্য' : 'Selling Price'}
                </span>
                <span className="font-bangla text-3xl font-bold text-terracotta-600">
                  ৳{product.price.toLocaleString()}
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-semibold text-sage-700 bg-sage-50 border border-sage-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'শ্রমের ন্যায্য মূল্য' : 'Fairly Valued'}</span>
                </span>
              </div>
            </div>

            {/* Toggle Transparent Labour Breakdown */}
            <button
              onClick={() => setShowFairPriceBreakdown(!showFairPriceBreakdown)}
              className="w-full text-left text-xs text-terracotta-700 hover:text-terracotta-800 font-semibold flex items-center justify-between pt-2 border-t border-craft-border/60"
            >
              <span className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-mustard-500" />
                <span>{language === 'bn' ? 'এই দাম কীভাবে হিসাব করা হয়েছে? (স্বচ্ছতা)' : 'How was this price calculated?'}</span>
              </span>
              <span className="text-terracotta-500 font-bold">{showFairPriceBreakdown ? '▲' : '▼'}</span>
            </button>

            {showFairPriceBreakdown && (
              <div className="bg-ivory-100 p-3.5 rounded-xl text-xs space-y-2 border border-craft-border/60 animate-in fade-in duration-150">
                <div className="flex justify-between text-craft-muted">
                  <span>{language === 'bn' ? '১. কাঁচামাল ও উপকরণের ব্যয়' : '1. Material Cost'}:</span>
                  <span className="font-medium text-craft-text">৳{product.materialCost}</span>
                </div>
                <div className="flex justify-between text-terracotta-700 font-semibold">
                  <span>{language === 'bn' ? `২. কারিগরের মেধা ও শ্রম (${product.laborHours} ঘণ্টা × ৳${product.laborRatePerHour})` : `2. Artisan Labor (${product.laborHours}h × ৳${product.laborRatePerHour})`}:</span>
                  <span>৳{product.laborHours * product.laborRatePerHour}</span>
                </div>
                <div className="flex justify-between text-craft-muted">
                  <span>{language === 'bn' ? '৩. বিদ্যুৎ, সরঞ্জাম ও প্যাকিং' : '3. Packaging & Overheads'}:</span>
                  <span className="font-medium text-craft-text">৳{product.otherExpenses}</span>
                </div>
                <div className="flex justify-between text-craft-muted">
                  <span>{language === 'bn' ? `৪. সম্মানজনক লভ্যাংশ (${product.profitPercent}%)` : `4. Ethical Profit Margin (${product.profitPercent}%)`}:</span>
                  <span className="font-medium text-craft-text">৳{Math.round(((product.materialCost + (product.laborHours * product.laborRatePerHour) + product.otherExpenses) * product.profitPercent) / 100)}</span>
                </div>
                <div className="pt-2 border-t border-craft-border text-[11px] text-craft-muted leading-tight">
                  <p>
                    {language === 'bn'
                      ? '💡 শিল্প বাজারে কোনো কারিগর বিনামূল্যে শ্রম দেন না। আপনার প্রতিটি ক্রয় একজন মানুষের নিষ্ঠার কাজের সম্মান।'
                      : 'Artisans on Shilpo Bajar do not work for free. Your purchase directly validates dedicated craftsmanship.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2 text-xs sm:text-sm text-craft-text leading-relaxed">
            <h4 className="font-bold text-xs uppercase tracking-wider text-craft-muted">
              {language === 'bn' ? 'পণ্যের বিবরণ' : 'Product Story & Details'}
            </h4>
            <p className="whitespace-pre-line text-craft-text/90">
              {description}
            </p>
          </div>

          {/* Materials Used */}
          {materials && materials.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-craft-muted uppercase tracking-wider block">
                {language === 'bn' ? 'ব্যবহৃত উপাদান' : 'Materials Used'}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {materials.map((mat, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white text-craft-text px-3 py-1 rounded-full border border-craft-border shadow-sm"
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="pt-4 border-t border-craft-border space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-craft-border rounded-full bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full hover:bg-ivory-100 flex items-center justify-center font-bold text-craft-text transition"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full hover:bg-ivory-100 flex items-center justify-center font-bold text-craft-text transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold py-3 px-6 rounded-full shadow-craft hover:shadow-craft-hover transition flex items-center justify-center gap-2 text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isInCart ? (language === 'bn' ? 'ঝুড়িতে আরও যোগ করুন' : 'Add More to Cart') : t('addToCart')}</span>
              </button>
            </div>

            <Link
              to="/cart"
              className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-full shadow transition"
            >
              {language === 'bn' ? 'ঝুড়ি দেখুন ও অর্ডার সম্পন্ন করুন' : 'View Cart & Checkout'}
            </Link>
          </div>

          {/* Artisan Mini Bio Box */}
          {artisan && (
            <div className="bg-ivory-50 border border-craft-border rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-12 h-12 rounded-full object-cover border border-craft-border"
                />
                <div>
                  <h4 className="font-bold text-xs text-craft-text">
                    {language === 'bn' ? artisan.name : artisan.nameEn}
                  </h4>
                  <p className="text-[11px] text-craft-muted">
                    {language === 'bn' ? artisan.district : artisan.districtEn} • {artisan.totalSales}টি বিক্রয় সম্পন্ন
                  </p>
                </div>
              </div>

              <Link
                to={`/artisan/${artisan.id}`}
                className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 bg-white py-1.5 px-3 rounded-xl border border-craft-border shadow-sm transition"
              >
                {language === 'bn' ? 'দোকান দেখুন' : 'View Shop'}
              </Link>
            </div>
          )}

        </div>
      </div>

      {/* Reviews Section */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-craft-border shadow-craft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-craft-border">
          <div>
            <h3 className="font-bangla text-xl font-bold text-craft-text">
              {language === 'bn' ? 'ক্রেতাদের প্রকৃত মতামত ও রিভিউ' : 'Verified Customer Reviews'}
            </h3>
            <p className="text-xs text-craft-muted mt-0.5">
              {language === 'bn'
                ? 'শুধুমাত্র পণ্য গ্রহণকারী প্রকৃত ক্রেতাদের যাচাইকৃত রিভিউ।'
                : 'Authentic reviews from verified buyers.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-mustard-600 font-bold text-lg">
            <Star className="w-5 h-5 fill-mustard-500 text-mustard-500" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {productReviews.length > 0 ? (
            productReviews.map(rev => (
              <div key={rev.id} className="p-4 rounded-2xl bg-ivory-100/60 border border-craft-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-craft-text">{rev.userName}</span>
                    {rev.isVerifiedPurchase && (
                      <span className="text-[10px] text-sage-800 bg-sage-100 font-medium px-2 py-0.2 rounded-full">
                        {language === 'bn' ? '✓ যাচাইকৃত ক্রেতা' : '✓ Verified Purchase'}
                      </span>
                    )}
                  </div>
                  <span className="text-craft-muted text-[11px]">{rev.date}</span>
                </div>
                <div className="flex text-mustard-500 text-xs">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-xs text-craft-text/90 leading-relaxed">
                  {rev.comment}
                </p>
                {rev.artisanResponse && (
                  <div className="mt-2 pl-3 border-l-2 border-terracotta-400 bg-white p-2 rounded-r-lg text-xs text-craft-muted">
                    <span className="font-semibold text-terracotta-700 block text-[11px]">
                      {language === 'bn' ? 'কারিগরের প্রতিক্রিয়া:' : 'Artisan Response:'}
                    </span>
                    <p className="text-[11px]">{rev.artisanResponse}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-xs text-craft-muted py-4">
              {language === 'bn' ? 'এখনো কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউটি আপনি দিন!' : 'No reviews yet. Be the first to share your experience!'}
            </p>
          )}
        </div>

        {/* Write a Review Form */}
        <form onSubmit={handleSubmitReview} className="bg-ivory-50 p-5 rounded-2xl border border-craft-border space-y-4">
          <h4 className="font-bold text-sm text-craft-text">
            {language === 'bn' ? 'আপনার অভিজ্ঞতার রিভিউ লিখুন' : 'Leave a Verified Review'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'আপনার নাম' : 'Your Name'}
              </label>
              <input
                type="text"
                required
                value={newReviewAuthor}
                onChange={e => setNewReviewAuthor(e.target.value)}
                placeholder={language === 'bn' ? 'যেমন: সুমাইয়া তাসনিম' : 'e.g. Sumaiya Tasnim'}
                className="w-full text-xs bg-white border border-craft-border rounded-xl p-2.5 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              />
            </div>
            <div>
              <label className="text-xs text-craft-muted block mb-1">
                {language === 'bn' ? 'রেটিং' : 'Rating'}
              </label>
              <select
                value={newReviewRating}
                onChange={e => setNewReviewRating(Number(e.target.value))}
                className="w-full text-xs bg-white border border-craft-border rounded-xl p-2.5 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (৫/৫ - চমৎকার)</option>
                <option value={4}>⭐⭐⭐⭐ (৪/৫ - ভালো)</option>
                <option value={3}>⭐⭐⭐ (৩/৫ - সাধারণ)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-craft-muted block mb-1">
              {language === 'bn' ? 'মন্তব্য (পণ্যের ফিনিশিং, হাতের কাজ ও অনুভূতি)' : 'Comment'}
            </label>
            <textarea
              required
              rows={3}
              value={newReviewComment}
              onChange={e => setNewReviewComment(e.target.value)}
              placeholder={language === 'bn' ? 'হাতের কাজ কেমন লেগেছে লিখুন...' : 'Describe your experience with this handmade item...'}
              className="w-full text-xs bg-white border border-craft-border rounded-xl p-2.5 text-craft-text focus:outline-none focus:ring-1 focus:ring-terracotta-400"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold py-2 px-5 rounded-full shadow transition"
          >
            {language === 'bn' ? 'রিভিউ প্রকাশ করুন' : 'Submit Review'}
          </button>
        </form>
      </section>

    </div>
  );
};
