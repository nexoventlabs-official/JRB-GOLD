import React, { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  weight?: number;
  category?: string;
  badge?: string;
  quantity?: number;
};

type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    email: string;
    phone: string;
  };
};

type CartContextType = {
  cart: Product[];
  favorites: string[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (productId: string, productName?: string) => void;
  clearCart: () => void;
  getOrder: (orderId: string) => Order | undefined;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        // Update quantity if item already exists
        const updatedCart = prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return updatedCart;
      }
      // Add new item with quantity
      const newCart = [...prev, { ...product, quantity }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => {
      const updatedCart = prev.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const toggleFavorite = (productId: string, productName?: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const getOrder = (orderId: string): Order | undefined => {
    // First check user-specific orders
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      const userOrdersKey = `orders_${userEmail}`;
      const userOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
      const userOrder = userOrders.find((order: Order) => order.id === orderId);
      if (userOrder) return userOrder;
    }
    
    // Fallback to all orders
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    return allOrders.find((order: Order) => order.id === orderId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        favorites,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleFavorite,
        clearCart,
        getOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
