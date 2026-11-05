import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useMarketplace } from '../context/MarketplaceContext';
import {
  ShoppingBag,
  Search,
  Sparkles,
  Calculator,
  User,
  ShieldCheck,
  Store,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import stickerImg from '../assets/hackathon-sticker.jpg';

export const Header: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { role, setRole, products } = useMarketplace();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const pendingApprovalsCount = products.filter(p => p.status === 'pending' || p.status === 'flagged').length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ivory-100/95 backdrop-blur-md border-b border-craft-border transition-all">
      {/* Top Banner with Hackathon Recognition (No Tagline) */}
      <div className="bg-indigo-600 text-ivory-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-mustard-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">
              {language === 'bn'
                ? 'শিল্প বাজার — জাতীয় এআই হ্যাকাথন AIgnite ২০২৬ এর জন্য নির্মিত'
                : 'Shilpo Bajar — Built for AIgnite Buildathon 2026'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-ivory-200">
            <span className="hidden sm:inline">
              {language === 'bn' ? '✓ AI-মুক্ত আসল ছবির নিশ্চয়তা' : '✓ Genuine Handmade Authenticity Guaranteed'}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">
              {language === 'bn' ? '✓ ক্যাশ অন ডেলিভারি ও বিকাশ' : '✓ Cash on Delivery & bKash'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          
          {/* Left: Hackathon Sticker + Brand Logo (No Tagline) */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            {/* Hackathon Sticker - Fixed at top-left as requested */}
            <div className="relative group flex-shrink-0">
              <img
                src={stickerImg}
                alt="AIgnite Buildathon 2026 - Ostad & YUNet"
                className="h-10 sm:h-12 w-auto object-contain rounded-md shadow-sm border border-indigo-200/60 bg-white p-0.5 hover:shadow-md transition-shadow"
                title="Built for AIgnite Buildathon 2026"
              />
              <span className="absolute -bottom-8 left-0 hidden group-hover:block bg-indigo-700 text-white text-[10px] py-0.5 px-2 rounded shadow-lg whitespace-nowrap z-50">
                AIgnite Buildathon 2026
              </span>
            </div>

            <div className="h-8 w-[1px] bg-craft-border hidden sm:block"></div>

            {/* Logo: Shilpo Bajar / শিল্প বাজার (No Tagline) */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-bold text-xl shadow-craft border-2 border-mustard-400 group-hover:bg-terracotta-600 transition-colors">
                <span className="font-bangla font-bold">শি</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bangla text-2xl font-bold text-terracotta-600 tracking-tight leading-none group-hover:text-terracotta-700">
                    {language === 'bn' ? 'শিল্প বাজার' : 'Shilpo Bajar'}
                  </span>
                  <span className="text-[10px] font-semibold bg-mustard-100 text-mustard-800 px-1.5 py-0.5 rounded uppercase tracking-wider">
                    {language === 'bn' ? 'হস্তশিল্প' : 'Bazaar'}
                  </span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center: Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-craft-border text-sm text-craft-text placeholder-craft-muted/70 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-transparent transition"
            />
            <Search className="w-4 h-4 text-craft-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          {/* Right: Navigation, Role Switcher, Language & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-craft-text mr-2">
              <Link to="/marketplace" className="hover:text-terracotta-600 transition">
                {t('marketplace')}
              </Link>
              <Link to="/seller/pricing-calculator" className="flex items-center gap-1.5 hover:text-terracotta-600 transition">
                <Calculator className="w-4 h-4 text-mustard-500" />
                <span>{t('pricingCalculator')}</span>
              </Link>
              <Link to="/seller/assistant" className="flex items-center gap-1.5 hover:text-terracotta-600 transition">
                <Sparkles className="w-4 h-4 text-tangerine-500" />
                <span>{t('daamBondhu')}</span>
              </Link>
            </nav>

            {/* Role Switcher Pill (Evaluator Switcher) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold py-1.5 px-2.5 rounded-full bg-white border border-craft-border text-craft-text hover:border-terracotta-400 shadow-sm transition"
                title="Switch persona for evaluation"
              >
                {role === 'customer' && <span className="text-indigo-600 flex items-center gap-1"><User className="w-3.5 h-3.5" /> {language === 'bn' ? 'ক্রেতা' : 'Buyer'}</span>}
                {role === 'seller' && <span className="text-terracotta-600 flex items-center gap-1"><Store className="w-3.5 h-3.5" /> {language === 'bn' ? 'কারিগর' : 'Artisan'}</span>}
                {role === 'admin' && (
                  <span className="text-sage-600 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {language === 'bn' ? 'অ্যাডমিন' : 'Admin'}
                    {pendingApprovalsCount > 0 && (
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    )}
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-craft-muted" />
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-craft-hover border border-craft-border py-1.5 z-50 text-xs"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1 font-bold text-craft-muted uppercase tracking-wider text-[10px] border-b border-craft-border/60">
                    {language === 'bn' ? 'ভূমিকা নির্বাচন (ডেমো)' : 'Select Mode (Demo)'}
                  </div>
                  
                  <button
                    onClick={() => { setRole('customer'); navigate('/'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'customer' ? 'font-bold text-terracotta-600 bg-terracotta-50' : 'text-craft-text'}`}
                  >
                    <span className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-500" /> {language === 'bn' ? 'ক্রেতা (Customer)' : 'Customer Mode'}</span>
                    {role === 'customer' && '✓'}
                  </button>

                  <button
                    onClick={() => { setRole('seller'); navigate('/seller/dashboard'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'seller' ? 'font-bold text-terracotta-600 bg-terracotta-50' : 'text-craft-text'}`}
                  >
                    <span className="flex items-center gap-2"><Store className="w-4 h-4 text-terracotta-500" /> {language === 'bn' ? 'কারিগর (Artisan/Seller)' : 'Artisan Mode'}</span>
                    {role === 'seller' && '✓'}
                  </button>

                  <button
                    onClick={() => { setRole('admin'); navigate('/admin/dashboard'); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-ivory-100 ${role === 'admin' ? 'font-bold text-terracotta-600 bg-terracotta-50' : 'text-craft-text'}`}
                  >
                    <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-sage-600" /> {language === 'bn' ? 'অ্যাডমিন (Admin Panel)' : 'Admin Mode'}</span>
                    {role === 'admin' && '✓'}
                  </button>
                </div>
              )}
            </div>

            {/* Language Toggle (Bangla / English) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-semibold py-1.5 px-2.5 rounded-full bg-mustard-100 text-mustard-800 hover:bg-mustard-200 transition"
              title="Toggle Bangla / English"
            >
              <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full text-craft-text hover:bg-white hover:text-terracotta-600 transition"
              title={t('cart')}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Contextual Action Button based on Role */}
            {role === 'seller' ? (
              <Link
                to="/seller/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold py-2 px-3.5 rounded-full shadow-sm transition"
              >
                <Store className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ড্যাশবোর্ড' : 'Seller Hub'}</span>
              </Link>
            ) : role === 'admin' ? (
              <Link
                to="/admin/image-review"
                className="hidden sm:inline-flex items-center gap-1.5 bg-sage-600 hover:bg-sage-700 text-white text-xs font-semibold py-2 px-3.5 rounded-full shadow-sm transition"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'ছবি যাচাই' : 'AI Review'}</span>
              </Link>
            ) : (
              <Link
                to="/seller/register"
                className="hidden sm:inline-flex items-center gap-1.5 bg-terracotta-500 hover:bg-terracotta-600 text-white text-xs font-semibold py-2 px-4 rounded-full shadow-sm transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-mustard-300" />
                <span>{t('startSelling')}</span>
              </Link>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-craft-text hover:bg-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-craft-border space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-white pl-10 pr-4 py-2 rounded-full border border-craft-border text-sm"
              />
              <Search className="w-4 h-4 text-craft-muted absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link
                to="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white border border-craft-border hover:text-terracotta-600"
              >
                {t('marketplace')}
              </Link>
              <Link
                to="/seller/pricing-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white border border-craft-border hover:text-terracotta-600"
              >
                {t('pricingCalculator')}
              </Link>
              <Link
                to="/seller/assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white border border-craft-border hover:text-terracotta-600"
              >
                {t('daamBondhu')}
              </Link>
              <Link
                to="/my-account"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white border border-craft-border hover:text-terracotta-600"
              >
                {t('myAccount')}
              </Link>
            </div>

            <div className="pt-2 border-t border-craft-border flex items-center justify-between">
              <Link
                to="/seller/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-terracotta-500 text-white py-2 rounded-lg text-sm font-semibold"
              >
                {t('startSelling')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
