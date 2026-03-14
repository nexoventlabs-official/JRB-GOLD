import { useState, useEffect, useRef } from "react";
import { Search, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  purity: string;
  price: number;
  compareAtPrice?: number;
  weight: number;
  makingCharges: number;
  image: string;
  rating: { avg: number; count: number };
  badges: string[];
  description: string;
  sku: string;
}

interface SearchBoxProps {
  onProductSelect?: (product: Product) => void;
  placeholder?: string;
  className?: string;
  trendingProducts?: Array<{ id: string; name: string; category: string; price: number; image: string }>;
  showTrending?: boolean;
}

const SearchBox = ({
  onProductSelect,
  placeholder = "Search jewelry...",
  className = "",
  trendingProducts = [],
  showTrending = false
}: SearchBoxProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  // Mock product data - in a real app, this would come from an API
  const products: Product[] = [
    {
      id: "1",
      name: "Classic Gold Bangle",
      category: "Bangles",
      subcategory: "Traditional",
      purity: "22K",
      price: 228263, // 15.5g * ₹14,530 (22K) + ₹3,048 making charges
      compareAtPrice: 250000,
      weight: 15.5,
      makingCharges: 3048,
      image: productBangle,
      rating: { avg: 4.5, count: 128 },
      badges: ["bestseller", "new"],
      description: "Elegant 22K gold bangle with intricate traditional designs",
      sku: "GB001"
    },
    {
      id: "2",
      name: "Gold Coin 10g",
      category: "Coins",
      subcategory: "Investment",
      purity: "24K",
      price: 158820, // 10g * ₹15,862 (24K) + ₹200 making charges
      weight: 10,
      makingCharges: 200,
      image: productCoin,
      rating: { avg: 4.8, count: 89 },
      badges: ["investment"],
      description: "Pure 24K gold coin perfect for investment",
      sku: "GC010"
    },
    {
      id: "3",
      name: "Diamond Necklace Set",
      category: "Necklaces",
      subcategory: "Bridal",
      purity: "18K",
      price: 315443, // 25.8g * ₹11,897 (18K) + ₹8,500 making charges
      compareAtPrice: 350000,
      weight: 25.8,
      makingCharges: 8500,
      image: productNecklace,
      rating: { avg: 4.9, count: 45 },
      badges: ["premium", "bridal"],
      description: "Stunning diamond necklace set with matching earrings",
      sku: "DN001"
    }
  ];

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.purity.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsOpen(value.length > 0 || showTrending);
  };

  const handleInputFocus = () => {
    setIsOpen(searchQuery.length > 0 || showTrending);
  };

  const handleProductClick = (product: Product | { id: string; name: string; category: string; price: number; image: string }) => {
    setIsOpen(false);
    setSearchQuery("");
    if (onProductSelect) {
      onProductSelect(product as Product);
    }
  };

  return (
    <div className={`relative ${className}`} ref={searchBoxRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="pl-10 pr-10 h-12 text-base bg-white/90 backdrop-blur-sm border-2 border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 focus:bg-white transition-all duration-200 shadow-lg hover:shadow-xl"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-yellow-100"
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
              searchInputRef.current?.focus();
            }}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (filteredProducts.length > 0 || (showTrending && trendingProducts && trendingProducts.length > 0)) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border-2 border-yellow-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-200">
          {filteredProducts.length > 0 ? (
            <>
              <div className="px-4 py-3 text-sm font-semibold text-yellow-800 bg-yellow-50/80 border-b border-yellow-200">
                <Search className="inline h-4 w-4 mr-2" />
                Search Results
              </div>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-150 ${index === 0
                      ? 'bg-yellow-50 border-l-4 border-l-yellow-400 shadow-sm'
                      : 'hover:bg-yellow-50/50 hover:border-l-4 hover:border-l-yellow-300'
                    }`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{product.name}</div>
                      <div className="text-xs text-yellow-600 font-medium">{product.category}</div>
                    </div>
                    <div className="text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : showTrending && trendingProducts && trendingProducts.length > 0 ? (
            <>
              <div className="px-4 py-3 text-sm font-semibold text-yellow-800 bg-yellow-50/80 border-b border-yellow-200">
                <TrendingUp className="inline h-4 w-4 mr-2" />
                Trending Products
              </div>
              {trendingProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all duration-150 ${index === 0
                      ? 'bg-yellow-50 border-l-4 border-l-yellow-400 shadow-sm'
                      : 'hover:bg-yellow-50/50 hover:border-l-4 hover:border-l-yellow-300'
                    }`}
                  onClick={() => handleProductClick(product)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm border border-gray-200"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{product.name}</div>
                      <div className="text-xs text-yellow-600 font-medium">{product.category}</div>
                    </div>
                    <div className="text-sm font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md">
                      ₹{product.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}

      {/* Empty State */}
      {isOpen && searchQuery && filteredProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg">
          <div className="p-4 text-center text-sm text-muted-foreground">
            No products found for "{searchQuery}"
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
