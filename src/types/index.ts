export type Language = 'bn' | 'en';

export type UserRole = 'customer' | 'seller' | 'admin';

export interface ImageMetadataAnalysis {
  fileName: string;
  fileSize: number;
  mimeType: string;
  hasExif: boolean;
  cameraModel?: string;
  softwareDetected?: string;
  aiSignaturesFound: string[];
  syntheticTextureScore: number; // 0 - 100 (higher = more synthetic)
  compressionArtifactsNormal: boolean;
  overallRisk: 'low' | 'medium' | 'high';
  riskScorePercent: number;
  explanation: {
    bn: string;
    en: string;
  };
  sellerConfirmed: boolean;
  analyzedAt: string;
}

export type ProductStatus = 'approved' | 'pending' | 'flagged' | 'rejected';

export interface Product {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  price: number;
  materialCost: number;
  laborHours: number;
  laborRatePerHour: number;
  otherExpenses: number;
  profitPercent: number;
  suggestedFairPrice: number;
  images: string[];
  primaryImageAnalysis: ImageMetadataAnalysis;
  status: ProductStatus;
  artisanId: string;
  artisanName: string;
  artisanNameEn: string;
  artisanShopName: string;
  artisanShopNameEn: string;
  artisanDistrict: string;
  artisanDistrictEn: string;
  artisanAvatar: string;
  description: string;
  descriptionEn: string;
  stock: number;
  isMadeToOrder: boolean;
  productionDays: number;
  rating: number;
  reviewCount: number;
  customizable: boolean;
  materialsUsed: string[];
  materialsUsedEn: string[];
  createdAt: string;
  featured?: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  nameEn: string;
  shopName: string;
  shopNameEn: string;
  district: string;
  districtEn: string;
  story: string;
  storyEn: string;
  craftSpecialties: string[];
  craftSpecialtiesEn: string[];
  joinedDate: string;
  avatar: string;
  coverImage: string;
  rating: number;
  totalSales: number;
  verifiedArtisan: boolean;
  phone?: string;
  email?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNote?: string;
}

export type OrderStatus = 'New' | 'Accepted' | 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  productId: string;
  productTitle: string;
  productTitleEn: string;
  image: string;
  price: number;
  quantity: number;
  artisanId: string;
  artisanName: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  deliveryDistrict: string;
  deliveryAddress: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  trxId?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  isSimulated?: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  artisanResponse?: string;
}

export interface PricingCalculationResult {
  materialCost: number;
  laborHours: number;
  laborRatePerHour: number;
  laborCost: number;
  otherExpenses: number;
  totalProductionCost: number;
  profitPercent: number;
  profitAmount: number;
  suggestedSellingPrice: number;
  currentPrice?: number;
  priceDifference?: number;
  evaluationBn: string;
  evaluationEn: string;
}

