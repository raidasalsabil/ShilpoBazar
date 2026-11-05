import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { ImageAuthenticityBadge } from './ImageAuthenticityBadge';
import { MapPin, Clock, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, t } = useLanguage();
  const { addToCart, cart } = useCart();

  const title = language === 'bn' ? product.title : product.titleEn;
  const artisanName = language === 'bn' ? product.artisanName : product.artisanNameEn;
  const artisanDistrict = language === 'bn' ? product.artisanDistrict : product.artisanDistrictEn;

  const isInCart = cart.some(item => item.product.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-craft-border shadow-craft hover:shadow-craft-hover hover:border-terracotta-300 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-ivory-200">
          <img
            src={product.images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Top Left: Authentic Anti-AI Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <ImageAuthenticityBadge analysis={product.primaryImageAnalysis} compact />
          </div>

          {/* Top Right: Stock / Order badge */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <span
              className={`text-[10px] font-semibold py-0.5 px-2 rounded-full shadow-sm backdrop-blur-md ${
                product.isMadeToOrder
                  ? 'bg-mustard-500/90 text-white'
                  : 'bg-indigo-600/90 text-white'
              }`}
            >
              {product.isMadeToOrder ? (
                language === 'bn' ? `${product.productionDays} দিনে তৈরি` : `${product.productionDays}d Custom`
              ) : (
                language === 'bn' ? 'স্টকে প্রস্তুত' : 'Ready Stock'
              )}
            </span>
          </div>

          {/* Bottom subtle shadow overlay */}
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
        </Link>

        {/* Content Body */}
        <div className="p-4">
          {/* Artisan & District */}
          <div className="flex items-center justify-between text-xs text-craft-muted mb-1.5">
            <Link
              to={`/artisan/${product.artisanId}`}
              className="flex items-center gap-1 hover:text-terracotta-600 font-medium truncate max-w-[65%]"
            >
              <img
                src={product.artisanAvatar}
                alt={artisanName}
                className="w-4 h-4 rounded-full object-cover border border-craft-border flex-shrink-0"
              />
              <span className="truncate">{artisanName}</span>
            </Link>

            <span className="flex items-center gap-0.5 text-[11px] text-craft-muted truncate">
              <MapPin className="w-3 h-3 text-terracotta-500 flex-shrink-0" />
              <span>{artisanDistrict}</span>
            </span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-semibold text-sm text-craft-text group-hover:text-terracotta-600 line-clamp-2 leading-snug transition-colors">
              {title}
            </h3>
          </Link>

          {/* Labor Time & Ethical Price Badge */}
          <div className="mt-2.5 flex items-center justify-between text-[11px] bg-ivory-100 py-1 px-2 rounded-md border border-craft-border/60">
            <span className="flex items-center gap-1 text-terracotta-700 font-medium">
              <Clock className="w-3 h-3" />
              <span>
                {language === 'bn'
                  ? `${product.laborHours} ঘণ্টা নিষ্ঠার শ্রম`
                  : `${product.laborHours} hrs artisan craft`}
              </span>
            </span>
            <span className="text-sage-700 font-semibold">
              {language === 'bn' ? 'ন্যায্য মূল্য' : 'Fairly Priced'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Add to Cart */}
      <div className="p-4 pt-0 mt-2">
        <div className="flex items-center justify-between pt-3 border-t border-craft-border/60">
          <div>
            <span className="text-xs text-craft-muted block leading-none">
              {language === 'bn' ? 'বিক্রয়মূল্য' : 'Price'}
            </span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className="font-bangla text-lg font-bold text-craft-text">
                ৳{product.price.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-semibold transition-all ${
              isInCart
                ? 'bg-sage-600 text-white shadow-sm'
                : 'bg-terracotta-500 hover:bg-terracotta-600 text-white shadow-sm hover:shadow'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'যোগ হয়েছে' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'কিনুন' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

