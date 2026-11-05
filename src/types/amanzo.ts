export type ProductCategory =
  | 'All'
  | 'Sneakers'
  | 'Sports Shoes'
  | 'Casual Shoes'
  | 'Running Shoes'
  | 'Boots'
  | 'Canvas Shoes'
  | 'Fashion'
  | 'Other';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string | number;
  name: string;
  nameHi?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  category: ProductCategory;
  rating: number;
  reviewsCount: number;
  desc: string;
  image: string;
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  isHotDeal?: boolean;
  isBestSeller?: boolean;
  badge?: string;
  features?: string[];
  emoji?: string;
}

export interface CartItem {
  id: string; // unique cart instance id
  productId: string | number;
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  qty: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'UPI' | 'COD' | 'Card' | 'NetBanking';
}

export interface Order {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  courier: string;
  trackingNumber: string;
  shippingAddress: ShippingAddress;
  estimatedDelivery: string;
}
