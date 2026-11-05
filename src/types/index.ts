export type ProductCategory = 'kapda' | 'shoes' | 'accessories';

export type KapdaSubCategory = 'overshirts' | 'shirts' | 'trousers' | 'jackets' | 'tees' | 'kurtas';
export type ShoesSubCategory = 'sneakers' | 'boots' | 'loafers' | 'slides' | 'derbies';
export type AccessoriesSubCategory = 'bags' | 'eyewear' | 'jewelry' | 'belts' | 'caps';

export type ProductSubCategory = KapdaSubCategory | ShoesSubCategory | AccessoriesSubCategory;

export type StyleArchetype =
  | 'minimalist'
  | 'streetwear'
  | 'indo_contemporary'
  | 'quiet_luxury'
  | 'artisan_earth';

export type ColorPalette =
  | 'earth_tones'
  | 'monochrome'
  | 'jewel_tones'
  | 'pastels';

export type Silhouette =
  | 'relaxed'
  | 'tailored'
  | 'classic';

export type Occasion =
  | 'daily_commute'
  | 'weekend_leisure'
  | 'evening_social'
  | 'festive_celebration'
  | 'creative_studio';

export interface StyleProfile {
  archetype: StyleArchetype;
  palette: ColorPalette;
  silhouette: Silhouette;
  preferredCategory: 'all' | 'kapda' | 'shoes' | 'accessories';
  occasions: Occasion[];
  budgetTier: 'entry' | 'mid' | 'premium' | 'luxury';
  completedQuiz: boolean;
  name?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
  categoryLabel: string; // e.g., "Kapda · Linen Apparel"
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  material: string;
  colors: ProductColor[];
  sizes: string[];
  image: string;
  additionalImages?: string[];
  tags: string[];
  styleArchetypes: StyleArchetype[];
  palettes: ColorPalette[];
  silhouettes: Silhouette[];
  matchingItemIds: string[]; // Complementary items from other categories
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  stockStatus: 'in_stock' | 'low_stock' | 'made_to_order';
  gender: 'unisex' | 'men' | 'women';
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface OutfitLook {
  id: string;
  title: string;
  description: string;
  kapdaId: string;
  shoesId: string;
  accessoryId: string;
  occasion: Occasion;
  archetype: StyleArchetype;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'cod' | 'upi' | 'card';
  };
  createdAt: string;
}
