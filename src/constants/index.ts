// Application constants for JRB Gold Pvt Limited

export const APP_CONFIG = {
  name: 'JRB Gold Pvt Limited',
  tagline: 'Premium Gold & Silver Jewelry',
  description: 'Trusted Gold & Silver — Fair Prices, Fine Craft. Low making charges, no wastage, certified hallmark jewelry.',
  version: '1.0.0',
  author: 'JRB Gold Pvt Limited'
};

export const CONTACT_INFO = {
  address: {
    line1: 'No: 1539, 1st Floor',
    line2: 'Soundar Complex, Vellore Road',
    line3: 'Near Anna Arch',
    city: 'Thiruvannamalai',
    state: 'Tamil Nadu',
    pincode: '606604',
    country: 'India'
  },
  phone: '82204 21317',
  email: 'jrbgoldprivateltd@gmail.com, inforjrb@gmail.com',
  website: 'https://www.jrbgold.co.in'
};

export const NAVIGATION_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
];

export const PRODUCT_CATEGORIES = [
  'Rings',
  'Necklaces',
  'Earrings',
  'Bangles',
  'Chains',
  'Pendants',
  'Bracelets',
  'Coins',
  'Bars'
];

export const PURITY_OPTIONS = [
  '22K Gold',
  '24K Gold',
  '18K Gold',
  '925 Silver',
  '999 Silver'
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed'
} as const;

export const DEFAULT_GOLD_RATES = {
  "22K": 14970,
  "24K": 16343,
  "18K": 12257,
  "14K": 9533
};

export const DEFAULT_SILVER_RATE = 300;

export const API_ENDPOINTS = {
  GOLD_RATES: '/api/gold-rates',
  PRODUCTS: '/api/products',
  ORDERS: '/api/orders',
  AUTH: '/api/auth'
};

export const LOCAL_STORAGE_KEYS = {
  CART: 'jrb_cart',
  FAVORITES: 'jrb_favorites',
  USER: 'jrb_user',
  AUTH_TOKEN: 'authToken',
  USER_EMAIL: 'userEmail',
  USER_NAME: 'userName',
  USER_PHONE: 'userPhone'
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500
};

export const TOAST_DURATION = 3000;

export const SEARCH_DEBOUNCE_DELAY = 300;

export const MAX_CART_ITEMS = 50;

export const CURRENCY_SYMBOL = '₹';

export const COMPANY_ESTABLISHED = 2016;
