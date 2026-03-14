import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  weight: number;
}

// Import product images
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

// Mock product data - in a real app, this would come from your backend
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Gold Bangle",
    category: "22k",
    price: 82543,
    image: productBangle,
    weight: 8.5,
  },
  {
    id: "2",
    name: "Gold Coin",
    category: "24k",
    price: 20734,
    image: productCoin,
    weight: 2.0,
  },
  {
    id: "3",
    name: "Silver Necklace",
    category: "Pure Silver",
    price: 3200,
    image: productNecklace,
    weight: 25.0,
  },
];

export default function Favorites() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const navigate = useNavigate();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);

  // Get full product details for each favorite
  useEffect(() => {
    const products = favorites.map(productId => 
      mockProducts.find(p => p.id === productId)
    ).filter(Boolean) as Product[];
    setFavoriteProducts(products);
  }, [favorites]);

  const handleRemoveFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  if (favoriteProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your favorites is empty</h1>
        <p className="text-gray-600 mb-6">Save items you love to your favorites to view them here.</p>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorites</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden relative group">
            <div className="relative h-64 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => handleRemoveFavorite(product.id)}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                title="Remove from favorites"
              >
                <X className="h-5 w-5 text-red-500" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.category} • {product.weight}g</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
