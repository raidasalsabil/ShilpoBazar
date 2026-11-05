import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DaamBondhuWidget } from './components/DaamBondhuWidget';

// Pages
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ArtisanShopPage } from './pages/ArtisanShopPage';
import { SellerRegisterPage } from './pages/SellerRegisterPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { SellerAddProductPage } from './pages/SellerAddProductPage';
import { PricingCalculatorPage } from './pages/PricingCalculatorPage';
import { DaamBondhuAssistantPage } from './pages/DaamBondhuAssistantPage';
import { SellerOrdersPage } from './pages/SellerOrdersPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminImageReviewPage } from './pages/AdminImageReviewPage';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory-100 text-craft-text selection:bg-terracotta-100 selection:text-terracotta-700">
      {/* Top Header with Hackathon Sticker on Top Left */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/artisan/:id" element={<ArtisanShopPage />} />
          
          {/* Seller Journeys */}
          <Route path="/seller/register" element={<SellerRegisterPage />} />
          <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
          <Route path="/seller/products/new" element={<SellerAddProductPage />} />
          <Route path="/seller/products" element={<SellerDashboardPage />} />
          <Route path="/seller/pricing-calculator" element={<PricingCalculatorPage />} />
          <Route path="/seller/assistant" element={<DaamBondhuAssistantPage />} />
          <Route path="/seller/orders" element={<SellerOrdersPage />} />
          
          {/* Buyer & Cart */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/my-account" element={<MyAccountPage />} />

          {/* Admin Suite */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/image-review" element={<AdminImageReviewPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Persistent Floating DaamBondhu AI Assistant */}
      <DaamBondhuWidget />

      {/* Desi Heritage Craft Footer */}
      <Footer />
    </div>
  );
};

export default App;

