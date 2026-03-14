import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

// Mock product data - in a real app, this would come from your backend
const mockProducts = [
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

export default function Wishlist() {
  const { favorites, toggleFavorite, addToCart } = useCart();
  const navigate = useNavigate();
  
  // Get full product details for each favorite
  const wishlistProducts = favorites.map(productId => 
    mockProducts.find(p => p.id === productId)
  ).filter(Boolean); // Filter out any undefined products

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-6">Save items you love to your wishlist to view them later.</p>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative h-64 w-full">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 rounded-full p-2 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id, product.name);
                  }}
                >
                  <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-white/80 rounded-full p-2 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  <ShoppingBag className="h-5 w-5 text-gray-700" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-gray-600">{product.category} • {product.weight}g</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => toggleFavorite(product.id, product.name)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
