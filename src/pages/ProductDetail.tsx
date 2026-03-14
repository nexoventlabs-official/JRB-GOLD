import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
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

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Sample products data (same as SearchBox)
  const products: Product[] = [
    {
      id: "1",
      name: "Elegant Gold Bangle",
      category: "gold",
      subcategory: "bangles",
      purity: "22k",
      price: 125553,
      compareAtPrice: 130000,
      weight: 8.5,
      makingCharges: 2048,
      image: productBangle,
      rating: { avg: 4.8, count: 24 },
      badges: ["no-wastage", "new"],
      description: "Exquisite handcrafted gold bangle with traditional motifs. This stunning piece showcases the finest craftsmanship with intricate designs that reflect our rich heritage. Perfect for special occasions and daily wear.",
      sku: "JRB-GB-001",
    },
    {
      id: "2",
      name: "Pure Gold Coin - Lakshmi",
      category: "coins",
      subcategory: "religious",
      purity: "24k",
      price: 31924,
      weight: 2.0,
      makingCharges: 200,
      image: productCoin,
      rating: { avg: 4.9, count: 156 },
      badges: ["certified"],
      description: "24k pure gold coin with Goddess Lakshmi design. Certified hallmark gold coin perfect for gifting and investment. Each coin comes with authenticity certificate.",
      sku: "JRB-GC-002",
    },
    {
      id: "3",
      name: "Silver Designer Necklace",
      category: "silver",
      subcategory: "necklaces",
      purity: "pure-silver",
      price: 8000,
      weight: 25.0,
      makingCharges: 500,
      image: productNecklace,
      rating: { avg: 4.7, count: 43 },
      badges: ["handcrafted"],
      description: "Contemporary silver necklace with oxidized finish. Modern design meets traditional craftsmanship in this unique piece that complements both ethnic and western outfits.",
      sku: "JRB-SN-003",
    },
    {
      id: "4",
      name: "Bridal Gold Ring Set",
      category: "gold",
      subcategory: "rings",
      purity: "22k",
      price: 91286,
      compareAtPrice: 95000,
      weight: 6.2,
      makingCharges: 1200,
      image: productBangle,
      rating: { avg: 4.8, count: 67 },
      badges: ["no-wastage", "sale"],
      description: "Complete bridal ring set with matching designs. Elegant set perfect for weddings and special occasions. Includes engagement ring and wedding band with coordinated patterns.",
      sku: "JRB-GR-004",
    },
    {
      id: "5",
      name: "Gold Chain - Rope Design",
      category: "gold",
      subcategory: "chains",
      purity: "22k",
      price: 154365,
      weight: 10.5,
      makingCharges: 1800,
      image: productNecklace,
      rating: { avg: 4.9, count: 89 },
      badges: ["premium"],
      description: "Classic rope design gold chain for everyday wear. Durable and elegant chain that pairs perfectly with pendants or worn alone as a statement piece.",
      sku: "JRB-GC-005",
    },
    {
      id: "6",
      name: "Temple Jewelry Earrings",
      category: "gold",
      subcategory: "earrings",
      purity: "22k",
      price: 79962,
      weight: 5.4,
      makingCharges: 1500,
      image: productCoin,
      rating: { avg: 4.9, count: 78 },
      badges: ["traditional", "no-wastage"],
      description: "Traditional temple jewelry earrings with ruby stones. Authentic South Indian temple jewelry design featuring intricate work and precious stone settings.",
      sku: "JRB-GE-007",
    },
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct || null);
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeText = (badge: string) => {
    const badgeMap: { [key: string]: string } = {
      "no-wastage": "No Wastage",
      "new": "New",
      "sale": "Sale",
      "certified": "Certified",
      "handcrafted": "Handcrafted",
      "premium": "Premium",
      "traditional": "Traditional"
    };
    return badgeMap[badge] || badge;
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "sale":
        return "destructive";
      case "new":
        return "default";
      default:
        return "secondary";
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${quantity} × ${product.name} added to cart!`, {
        description: `Weight: ${product.weight}g each • Total: ₹${(product.price * quantity).toLocaleString()}`,
        duration: 3000,
      });
      setQuantity(1);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id, product.name);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant={getBadgeVariant(badge) as any}
                      className="text-sm"
                    >
                      {getBadgeText(badge)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">
                {product.name}
              </h1>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating.avg)
                        ? "text-gold fill-gold"
                        : "text-muted-foreground"
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.avg} ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-gold">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
              {product.compareAtPrice && (
                <div className="text-sm text-green-600 font-medium">
                  You save {formatPrice(product.compareAtPrice - product.price)}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-muted-foreground">Purity:</span>
                    <span className="ml-2 text-foreground font-medium">{product.purity}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Weight:</span>
                    <span className="ml-2 text-foreground font-medium">{product.weight}g</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-muted-foreground">Category:</span>
                    <span className="ml-2 text-foreground font-medium capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground">Making Charges:</span>
                    <span className="ml-2 text-foreground font-medium">{formatPrice(product.makingCharges)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <Button
                  className="flex-1"
                  variant="hero"
                  onClick={handleAddToCart}
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add {quantity} to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleToggleFavorite}
                  className={favorites.includes(product.id) ? "bg-red-50 text-red-500 border-red-200" : ""}
                >
                  <Heart className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-red-500" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                Certified Hallmark Gold
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                30-Day Return Policy
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                Free Shipping & Insurance
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                Lifetime Exchange Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
