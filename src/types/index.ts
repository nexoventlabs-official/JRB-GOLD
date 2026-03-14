// Global type definitions for JRB Gold application

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  purity: string;
  weight: string;
  making_charges: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: Address;
  emailVerified: boolean;
  phoneVerified: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export interface GoldRates {
  gold22k: number;
  gold24k: number;
  silver: number;
  lastUpdated: string;
}

export interface PolicyContent {
  title: string;
  content: string;
}

export interface NavigationLink {
  name: string;
  href: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}
