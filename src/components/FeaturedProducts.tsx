import { useState, useEffect } from "react";
import { Star, Heart, ShoppingCart, Eye, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import LazyImage from "@/components/LazyImage";
import SkeletonLoader from "@/components/SkeletonLoader";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const { addToCart, toggleFavorite, favorites } = useCart();

  // Quantity state for each product
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Simulate loading delay for smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (productId: string) => {
    setLoadedImages(prev => new Set([...prev, productId]));
  };

  const products = [
    {
      id: "1",
      name: "Gold Bangle",
      category: "22k",
      price: 125553,
      compareAtPrice: 130000,
      weight: 8.5,
      image: productBangle,
      rating: { avg: 4.8, count: 24 },
      badges: ["no-wastage", "new"],
    },
    {
      id: "2",
      name: "Gold Coin",
      category: "24k",
      price: 31924,
      weight: 2.0,
      image: productCoin,
      rating: { avg: 4.9, count: 156 },
      badges: ["certified"],
    },
    {
      id: "3",
      name: "Silver Necklace",
      category: "Pure Silver",
      price: 8000,
      weight: 25.0,
      image: "/silver necklace.jpg",
      rating: { avg: 4.7, count: 43 },
      badges: ["handcrafted"],
    },
    {
      id: "4",
      name: "Gold Ring Set",
      category: "22k",
      price: 91286,
      compareAtPrice: 95000,
      weight: 6.2,
      image: "/gold ring set.jpg",
      rating: { avg: 4.8, count: 67 },
      badges: ["no-wastage", "sale"],
    },
    {
      id: "5",
      name: "Gold Chain",
      category: "22k",
      price: 154365,
      weight: 10.5,
      image: "/Gold Chain - Rope Design.jpg",
      rating: { avg: 4.9, count: 89 },
      badges: ["premium"],
    },
    {
      id: "6",
      name: "Silver Bracelet",
      category: "Pure Silver",
      price: 41300,
      weight: 131.0,
      image: "/Silver Bracelet.jpg",
      rating: { avg: 4.6, count: 32 },
      badges: ["handcrafted"],
    },
  ];

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

  const getBadgeText = (badge: string) => {
    switch (badge) {
      case "no-wastage":
        return "No Wastage";
      case "new":
        return "New";
      case "sale":
        return "Sale";
      case "certified":
        return "Certified";
      case "handcrafted":
        return "Handcrafted";
      case "premium":
        return "Premium";
      default:
        return badge;
    }
  };

  const getQuantity = (productId: string) => {
    return quantities[productId] || 1;
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }));
    }
  };

  const handleAddToCart = (product: any) => {
    const quantity = getQuantity(product.id);
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.name} added to cart!`, {
      description: `Weight: ${product.weight}g each • Total: ₹${(product.price * quantity).toLocaleString()}`,
      duration: 3000,
    });
    // Reset quantity to 1 after adding to cart
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const handleToggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId);
    toggleFavorite(productId, product?.name);
  };

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-8 xs:py-12 lg:py-16 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 xs:mb-10 lg:mb-12">
          <h2 className="text-2xl xs:text-3xl lg:text-4xl xl:text-5xl font-playfair font-bold text-foreground mb-3 xs:mb-4">
            Featured Collection
          </h2>
          <p className="text-sm xs:text-base lg:text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium jewelry crafted with precision and care.
          </p>
        </div>
        <div className="divider-gold mt-6 max-w-24 mx-auto" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 lg:gap-8">
          {isLoading ? (
            // Skeleton Loading Cards
            [...Array(6)].map((_, index) => (
              <Card key={`skeleton-${index}`} className="overflow-hidden border-0 shadow-md bg-white">
                <SkeletonLoader variant="image" height="12rem" className="xs:h-56 lg:h-64" />
                <CardContent className="p-4 xs:p-5 lg:p-6">
                  <div className="space-y-3">
                    <SkeletonLoader variant="text" width="80%" />
                    <SkeletonLoader variant="text" width="60%" />
                    <div className="flex items-center space-x-2">
                      <SkeletonLoader variant="text" width="40%" />
                      <SkeletonLoader variant="text" width="30%" />
                    </div>
                    <div className="flex justify-between items-center">
                      <SkeletonLoader variant="button" width="60px" />
                      <div className="flex space-x-2">
                        <SkeletonLoader variant="button" width="32px" height="32px" />
                        <SkeletonLoader variant="button" width="32px" height="32px" />
                        <SkeletonLoader variant="button" width="60px" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            products.map((product, index) => (
              <Card key={product.id} className={`group overflow-hidden border-0 shadow-md hover:shadow-luxury transition-all duration-300 bg-white animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <LazyImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 xs:h-56 lg:h-64 group-hover:scale-105 transition-transform duration-300"
                    onLoad={() => handleImageLoad(product.id)}
                  />

                  {/* Badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {product.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant={getBadgeVariant(badge)}
                          className="badge-premium text-xs"
                        >
                          {getBadgeText(badge)}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => handleToggleFavorite(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewProduct(product)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="hero"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <CardContent className="p-4 xs:p-5 lg:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-base xs:text-lg text-foreground mb-1">{product.name}</h3>
                      <p className="text-xs xs:text-sm text-muted-foreground">{product.category}</p>
                    </div>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 xs:h-4 xs:w-4 ${i < Math.floor(product.rating.avg)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  {/* Price and Weight */}
                  <div className="flex flex-col mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl xs:text-2xl font-bold text-foreground">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm xs:text-base text-muted-foreground line-through">
                          ₹{product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Weight: {product.weight}g
                    </p>
                  </div>

                  {/* Actions: Quantity and Add to Cart */}
                  <div className="flex items-center gap-2 mt-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-white border-2 border-gold/30 rounded-lg h-10 px-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                        disabled={getQuantity(product.id) <= 1}
                        className="h-8 w-8 hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-bold text-base">{getQuantity(product.id)}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                        className="h-8 w-8 hover:bg-gold/10 hover:text-gold transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      className="flex-1 h-10 px-4 text-xs font-bold border-2 border-gold/50 hover:bg-gold hover:text-charcoal transition-all bg-transparent text-charcoal shadow-sm"
                      variant="outline-gold"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      ADD TO CART
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

      </div>

      {/* Product Detail Modal */}
      <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-charcoal">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={() => handleToggleFavorite(selectedProduct.id)}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {selectedProduct.category}
                    </Badge>
                    <p className="text-muted-foreground">
                      Premium quality {selectedProduct.category} gold jewelry crafted with precision and care.
                    </p>
                  </div>

                  {/* Rating */}
                  {selectedProduct.rating && (
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating.avg)
                              ? "text-gold fill-gold"
                              : "text-muted-foreground"
                              }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {selectedProduct.rating.avg} ({selectedProduct.rating.count} reviews)
                      </span>
                    </div>
                  )}

                  {/* Specifications */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Specifications</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <span className="ml-2">{selectedProduct.weight}g</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Purity:</span>
                        <span className="ml-2">{selectedProduct.category}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2">{selectedProduct.category}</span>
                      </div>
                      {selectedProduct.badges && (
                        <div>
                          <span className="text-muted-foreground">Quality:</span>
                          <span className="ml-2">{selectedProduct.badges.join(", ")}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gold">
                        {formatPrice(selectedProduct.price)}
                      </span>
                      {selectedProduct.compareAtPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          {formatPrice(selectedProduct.compareAtPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Selector for Modal */}
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(selectedProduct.id, getQuantity(selectedProduct.id) - 1)}
                      disabled={getQuantity(selectedProduct.id) <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-12 text-center font-medium">Qty: {getQuantity(selectedProduct.id)}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateQuantity(selectedProduct.id, getQuantity(selectedProduct.id) + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button
                      className="flex-1"
                      variant="hero"
                      onClick={() => handleAddToCart(selectedProduct)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add {getQuantity(selectedProduct.id)} to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleToggleFavorite(selectedProduct.id)}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedProducts;