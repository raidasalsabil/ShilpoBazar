import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Artisan, Order, ProductReview, UserRole, ProductStatus, OrderStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ARTISANS, INITIAL_ORDERS, INITIAL_REVIEWS } from '../data/mockData';

interface MarketplaceContextType {
  products: Product[];
  artisans: Artisan[];
  orders: Order[];
  reviews: ProductReview[];
  role: UserRole;
  setRole: (role: UserRole) => void;
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProductStatus: (productId: string, status: ProductStatus, note?: string) => void;
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addReview: (reviewData: Omit<ProductReview, 'id' | 'date'>) => void;
  getProductById: (id: string) => Product | undefined;
  getArtisanById: (id: string) => Artisan | undefined;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('shilpo_bajar_products') || localStorage.getItem('haater_daam_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  const [artisans, setArtisans] = useState<Artisan[]>(() => {
    const saved = localStorage.getItem('shilpo_bajar_artisans') || localStorage.getItem('haater_daam_artisans');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ARTISANS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('shilpo_bajar_orders') || localStorage.getItem('haater_daam_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('shilpo_bajar_reviews') || localStorage.getItem('haater_daam_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem('shilpo_bajar_role') || localStorage.getItem('haater_daam_role');
    return (saved as UserRole) || 'customer';
  });

  useEffect(() => {
    localStorage.setItem('shilpo_bajar_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('shilpo_bajar_artisans', JSON.stringify(artisans));
  }, [artisans]);

  useEffect(() => {
    localStorage.setItem('shilpo_bajar_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('shilpo_bajar_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    localStorage.setItem('shilpo_bajar_role', newRole);
  };

  const addProduct = (newProductData: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...newProductData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProductStatus = (productId: string, status: ProductStatus) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, status } : p))
    );
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'orderNumber'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `SB-2026-${randomSuffix}`,
      createdAt: new Date().toLocaleString('en-US', { hour12: false }),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  const addReview = (reviewData: Omit<ProductReview, 'id' | 'date'>) => {
    const newReview: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('bn-BD'),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductById = (id: string) => products.find(p => p.id === id);
  const getArtisanById = (id: string) => artisans.find(a => a.id === id);

  return (
    <MarketplaceContext.Provider
      value={{
        products,
        artisans,
        orders,
        reviews,
        role,
        setRole,
        addProduct,
        updateProductStatus,
        addOrder,
        updateOrderStatus,
        addReview,
        getProductById,
        getArtisanById,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
