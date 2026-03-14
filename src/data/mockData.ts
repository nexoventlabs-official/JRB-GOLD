// Mock data for development and testing
import { Product, TestimonialData, ServiceFeature } from '@/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Traditional Gold Bangle',
    category: 'Bangles',
    subcategory: 'Traditional',
    price: 125553, // 8.5g * ₹14,530 (22K) + ₹2,048 making charges
    originalPrice: 130000,
    image: '/product-bangle.jpg',
    images: ['/product-bangle.jpg'],
    description: 'Exquisite traditional gold bangle crafted with intricate designs',
    purity: '22K Gold',
    weight: '8.5g',
    making_charges: '₹2,048',
    rating: 4.8,
    reviews: 24,
    inStock: true,
    isBestSeller: true,
    discount: 5
  },
  {
    id: 'prod-002',
    name: 'Silver Necklace',
    category: 'Necklaces',
    subcategory: 'Silver',
    price: 8000, // 25g * ₹300 (Pure Silver) + ₹500 making charges
    originalPrice: 8500,
    image: '/silver necklace.jpg',
    images: ['/silver necklace.jpg'],
    description: 'Elegant pure silver necklace with contemporary design',
    purity: 'Pure Silver (999)',
    weight: '25g',
    making_charges: '₹500',
    rating: 4.7,
    reviews: 43,
    inStock: true,
    isNew: true,
    discount: 5
  },
  {
    id: 'prod-003',
    name: 'Gold Ring Set',
    category: 'Rings',
    subcategory: 'Sets',
    price: 91286, // 6.2g * ₹14,530 (22K) + ₹1,200 making charges
    originalPrice: 95000,
    image: '/gold ring set.jpg',
    images: ['/gold ring set.jpg'],
    description: 'Beautiful 22K gold ring set with elegant craftsmanship',
    purity: '22K Gold',
    weight: '6.2g',
    making_charges: '₹1,200',
    rating: 4.8,
    reviews: 67,
    inStock: true,
    isBestSeller: true,
    discount: 8
  },
  {
    id: 'prod-004',
    name: 'Gold Chain',
    category: 'Chains',
    subcategory: 'Traditional',
    price: 154365, // 10.5g * ₹14,530 (22K) + ₹1,800 making charges
    originalPrice: 160000,
    image: '/Gold Chain - Rope Design.jpg',
    images: ['/Gold Chain - Rope Design.jpg'],
    description: 'Elegant 22K gold chain with premium rope design',
    purity: '22K Gold',
    weight: '10.5g',
    making_charges: '₹1,800',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isBestSeller: true,
    discount: 5
  },
  {
    id: 'prod-005',
    name: 'Gold Coin - Lakshmi',
    category: 'Coins',
    subcategory: 'Religious',
    price: 31924, // 2g * ₹15,862 (24K) + ₹200 making charges
    image: '/product-coin.jpg',
    images: ['/product-coin.jpg'],
    description: 'Pure gold coin featuring Goddess Lakshmi design',
    purity: '24K Gold',
    weight: '2g',
    making_charges: '₹200',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    isNew: true
  },
  {
    id: 'prod-006',
    name: 'Diamond Studded Necklace',
    category: 'Necklaces',
    subcategory: 'Diamond',
    price: 424895, // 35g * ₹11,897 (18K) + ₹8,500 making charges
    originalPrice: 450000,
    image: '/product-necklace.jpg',
    images: ['/product-necklace.jpg'],
    description: 'Elegant diamond studded gold necklace for special occasions',
    purity: '18K Gold',
    weight: '35g',
    making_charges: '₹8,500',
    rating: 4.7,
    reviews: 234,
    inStock: true,
    isBestSeller: true,
    discount: 6
  }
];

export const testimonials: TestimonialData[] = [
  {
    id: 'test-001',
    name: 'Priya Sharma',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    comment: 'Excellent quality jewelry with transparent pricing. Very satisfied with my purchase!',
    avatar: '/avatar-1.jpg'
  },
  {
    id: 'test-002',
    name: 'Rajesh Kumar',
    location: 'Bangalore, Karnataka',
    rating: 5,
    comment: 'Best gold rates in the market. Professional service and genuine products.',
    avatar: '/avatar-2.jpg'
  },
  {
    id: 'test-003',
    name: 'Meera Patel',
    location: 'Mumbai, Maharashtra',
    rating: 4,
    comment: 'Beautiful designs and excellent craftsmanship. Highly recommended!',
    avatar: '/avatar-3.jpg'
  }
];

export const serviceFeatures: ServiceFeature[] = [
  {
    icon: 'Shield',
    title: 'Certified Hallmark',
    description: 'All jewelry comes with BIS hallmark certification'
  },
  {
    icon: 'Truck',
    title: 'Free Shipping',
    description: 'Complimentary insured shipping across India'
  },
  {
    icon: 'RefreshCw',
    title: '30-Day Returns',
    description: 'Easy returns and exchanges within 30 days'
  },
  {
    icon: 'Award',
    title: 'Quality Assured',
    description: 'Premium quality with lifetime maintenance'
  }
];
