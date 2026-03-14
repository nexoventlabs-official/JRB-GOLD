import { useState } from "react";
import { Filter, SlidersHorizontal, Grid3X3, List, Star, Heart, ShoppingCart, Eye, ChevronDown, Plus, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import silverBraceletSet from "@/assets/silver-bracelet-set.jpg";
import { useParams } from 'react-router-dom';

interface ShopProps {
}

const Shop: React.FC<ShopProps> = () => {
  const { category } = useParams<{ category?: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>(category || '');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([500, 150000]);
  const [weightRange, setWeightRange] = useState([1, 100]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { addToCart, toggleFavorite, favorites } = useCart();

  const [filters, setFilters] = useState({
    categories: [] as string[],
    purities: [] as string[],
  });

  // Quantity state for each product
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const products = [
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
      description: "Exquisite handcrafted gold bangle with traditional motifs",
      sku: "JRB-GB-001",
    },
    {
      id: "2",
      name: "Pure Gold Gold Coin - Lakshmi",
      category: "coins",
      subcategory: "religious",
      purity: "24k",
      price: 31924,
      weight: 2.0,
      makingCharges: 200,
      image: productCoin,
      rating: { avg: 4.9, count: 156 },
      badges: ["certified"],
      description: "24k pure gold coin with Goddess Lakshmi design",
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
      image: "/silver necklace.jpg",
      rating: { avg: 4.7, count: 43 },
      badges: ["handcrafted"],
      description: "Contemporary silver necklace with oxidized finish",
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
      image: "/gold ring set.jpg",
      rating: { avg: 4.8, count: 67 },
      badges: ["no-wastage", "sale"],
      description: "Complete bridal ring set with matching designs",
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
      image: "/Gold Chain - Rope Design.jpg",
      rating: { avg: 4.9, count: 89 },
      badges: ["premium"],
      description: "Classic rope design gold chain for everyday wear",
      sku: "JRB-GC-005",
    },
    {
      id: "6",
      name: "Silver Bracelet Set",
      category: "silver",
      subcategory: "bracelets",
      purity: "pure-silver",
      price: 41300,
      weight: 131.0,
      makingCharges: 2000,
      image: "/Silver Bracelet.jpg",
      rating: { avg: 4.6, count: 32 },
      badges: ["handcrafted"],
      description: "Set of 3 matching silver bracelets with charms",
      sku: "JRB-SB-006",
    },
    {
      id: "7",
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
      description: "Traditional temple jewelry earrings with ruby stones",
      sku: "JRB-GE-007",
    },
    {
      id: "8",
      name: "Silver Anklets Pair",
      category: "silver",
      subcategory: "anklets",
      purity: "pure-silver",
      price: 10500,
      weight: 32.0,
      makingCharges: 900,
      image: "/silver necklace.jpg",
      rating: { avg: 4.5, count: 21 },
      badges: ["traditional"],
      description: "Traditional silver anklets with bell charms",
      sku: "JRB-SA-008",
    },
  ];

  const categories = [
    { id: 'gold', name: 'Gold Jewelry', count: 5 },
    { id: 'silver', name: 'Silver Jewelry', count: 3 },
    { id: 'coins', name: 'Gold Coins', count: 1 },
    { id: 'ornaments', name: 'Ornaments', count: 0 },
  ];

  const purities = [
    { id: '24k', name: '24K Gold', count: 1 },
    { id: '22k', name: '22K Gold', count: 4 },
    { id: '18k', name: '18K Gold', count: 0 },
    { id: 'pure-silver', name: 'Pure Silver', count: 3 },
  ];

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

  const toggleFilter = (type: 'categories' | 'purities', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(item => item !== value)
        : [...prev[type], value]
    }));
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

  const filteredProducts = products.filter(product => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category);
    const purityMatch = filters.purities.length === 0 || filters.purities.includes(product.purity);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const weightMatch = product.weight >= weightRange[0] && product.weight <= weightRange[1];

    return categoryMatch && purityMatch && priceMatch && weightMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'popular':
        return b.rating.count - a.rating.count;
      case 'newest':
      default:
        return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => toggleFilter('categories', category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-sm text-foreground cursor-pointer flex-1"
              >
                {category.name} ({category.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Purity */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Purity</h3>
        <div className="space-y-2">
          {purities.map((purity) => (
            <div key={purity.id} className="flex items-center space-x-2">
              <Checkbox
                id={purity.id}
                checked={filters.purities.includes(purity.id)}
                onCheckedChange={() => toggleFilter('purities', purity.id)}
              />
              <label
                htmlFor={purity.id}
                className="text-sm text-foreground cursor-pointer flex-1"
              >
                {purity.name} ({purity.count})
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">
          Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100000}
          min={1000}
          step={1000}
          className="w-full"
        />
      </div>

      {/* Weight Range */}
      <div>
        <h3 className="font-semibold mb-3 text-foreground">
          Weight Range: {weightRange[0]}g - {weightRange[1]}g
        </h3>
        <Slider
          value={weightRange}
          onValueChange={setWeightRange}
          max={50}
          min={1}
          step={0.5}
          className="w-full"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-display font-playfair text-foreground mb-4">
            Jewelry Collection
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover our exquisite collection of gold and silver jewelry
          </p>
          <div className="divider-gold mt-4 max-w-24" />
        </div>

        {/* Featured Collection */}
        <div className="mb-12">
          <h2 className="text-2xl font-playfair text-foreground mb-6">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gold Chain - Rope Design */}
            <Card className="card-luxury group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg aspect-square">
                  <img
                    src="/Gold Chain - Rope Design.jpg"
                    alt="Gold Chain - Rope Design"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge variant="secondary" className="absolute top-3 left-3 text-xs">
                    Premium
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Gold Chain - Rope Design</h3>
                  <p className="text-sm text-muted-foreground mb-2">22k • 10.5g</p>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gold">₹1,54,365</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      4.9 (89)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver Bracelet Set */}
            <Card className="card-luxury group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg aspect-square">
                  <img
                    src="/Silver Bracelet.jpg"
                    alt="Silver Bracelet Set"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge variant="outline" className="absolute top-3 left-3 text-xs">
                    Handcrafted
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Silver Bracelet Set</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pure Silver • 131.0g</p>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gold">₹41,300</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      4.6 (32)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Silver Designer Necklace */}
            <Card className="card-luxury group cursor-pointer">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg aspect-square">
                  <img
                    src={productNecklace}
                    alt="Silver Designer Necklace"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge variant="outline" className="absolute top-3 left-3 text-xs">
                    Handcrafted
                  </Badge>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Silver Designer Necklace</h3>
                  <p className="text-sm text-muted-foreground mb-2">Pure Silver • 25.0g</p>
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gold">₹8,000</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      4.7 (43)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="card-luxury p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-title font-playfair text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilters({ categories: [], purities: [] })}
                  className="text-muted-foreground hover:text-gold"
                >
                  Clear All
                </Button>
              </div>
              <FilterContent />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="text-sm text-muted-foreground">
                  {sortedProducts.length} products found
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.categories.length > 0 || filters.purities.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categories.map(category => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => toggleFilter('categories', category)}
                  >
                    {categories.find(c => c.id === category)?.name} ×
                  </Badge>
                ))}
                {filters.purities.map(purity => (
                  <Badge
                    key={purity}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => toggleFilter('purities', purity)}
                  >
                    {purities.find(p => p.id === purity)?.name} ×
                  </Badge>
                ))}
              </div>
            )}

            {/* Products Grid/List */}
            <div className={viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
              : "space-y-4 sm:space-y-6"
            }>
              {sortedProducts.map((product) => (
                <Card key={product.id} className={`card-luxury group cursor-pointer ${viewMode === 'grid' ? 'flex flex-col h-full' : ''}`}>
                  <CardContent className={viewMode === 'grid' ? "p-0" : "p-6"}>
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        <div className="relative overflow-hidden rounded-t-lg aspect-square">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />

                          {product.badges && product.badges.length > 0 && (
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                              {product.badges.map((badge) => (
                                <Badge
                                  key={badge}
                                  variant={getBadgeVariant(badge)}
                                  className="text-xs"
                                >
                                  {getBadgeText(badge)}
                                </Badge>
                              ))}
                            </div>
                          )}

                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
                            onClick={() => handleToggleFavorite(product.id)}
                          >
                            <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                          </Button>

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

                        <div className="p-3 sm:p-4 flex flex-col h-full">
                          <div className="flex-1">
                            <div className="mb-2">
                              <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-gold transition-colors line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">{product.purity}</p>
                            </div>

                            {product.rating && (
                              <div className="flex items-center mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${i < Math.floor(product.rating.avg)
                                        ? "text-gold fill-gold"
                                        : "text-muted-foreground"
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground ml-1">
                                  ({product.rating.count})
                                </span>
                              </div>
                            )}

                            <div className="mb-3">
                              <div className="flex flex-col space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm sm:text-base font-bold text-foreground">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {product.compareAtPrice && (
                                    <span className="text-xs text-muted-foreground line-through">
                                      ₹{product.compareAtPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                                <span>{product.weight}g</span>
                                {product.makingCharges && (
                                  <span>+₹{product.makingCharges.toLocaleString()}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Actions: Quantity and Add to Cart */}
                          <div className="flex items-center gap-2 mt-auto">
                            {/* Quantity Selector */}
                            <div className="flex items-center bg-white border-2 border-gold/30 rounded-lg h-9 sm:h-10 px-0.5 sm:px-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                                disabled={getQuantity(product.id) <= 1}
                                className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-gold/10 hover:text-gold transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-5 sm:w-8 text-center font-bold text-xs sm:text-sm">{getQuantity(product.id)}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                                className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-gold/10 hover:text-gold transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Add to Cart Button */}
                            <Button
                              className="flex-1 h-9 sm:h-10 px-2 text-[10px] sm:text-xs font-bold border-2 border-gold/50 hover:bg-gold hover:text-charcoal transition-all bg-transparent text-charcoal shadow-sm"
                              variant="outline-gold"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                              ADD TO CART
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      // List View
                      <div className="flex gap-6 h-full">
                        <div className="flex-shrink-0">
                          <div className="relative overflow-hidden rounded-lg aspect-square w-32 sm:w-36 md:w-40">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                            {product.badges && product.badges.length > 0 && (
                              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                {product.badges.map((badge) => (
                                  <Badge
                                    key={badge}
                                    variant={getBadgeVariant(badge)}
                                    className="text-xs"
                                  >
                                    {getBadgeText(badge)}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div className="flex-1 pr-4">
                                <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{product.purity} • SKU: {product.sku}</p>
                              </div>

                              <div className="flex flex-col items-end">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-xl font-bold text-foreground">
                                    {formatPrice(product.price)}
                                  </span>
                                  {product.compareAtPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      {formatPrice(product.compareAtPrice)}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground text-right">
                                  <div>Weight: {product.weight}g</div>
                                  {product.makingCharges && (
                                    <div>Making: {formatPrice(product.makingCharges)}</div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                              {product.description}
                            </p>

                            {product.rating && (
                              <div className="flex items-center mb-4">
                                <div className="flex mr-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(product.rating.avg)
                                        ? "text-gold fill-gold"
                                        : "text-muted-foreground"
                                        }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  ({product.rating.count} reviews)
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quantity Selector for List View */}
                          <div className="flex items-center justify-center space-x-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, getQuantity(product.id) - 1)}
                              disabled={getQuantity(product.id) <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{getQuantity(product.id)}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(product.id, getQuantity(product.id) + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-end space-x-3 mt-auto pt-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleFavorite(product.id)}
                            >
                              <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => handleViewProduct(product)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => handleAddToCart(product)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Add {getQuantity(product.id)} to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your criteria
                </p>
                <Button
                  variant="outline-gold"
                  onClick={() => setFilters({ categories: [], purities: [] })}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

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
                      {selectedProduct.description}
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
                        <span className="ml-2">{selectedProduct.purity}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Making:</span>
                        <span className="ml-2">₹{selectedProduct.makingCharges}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-2">{selectedProduct.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gold">
                        ₹{selectedProduct.price.toLocaleString()}
                      </span>
                      {selectedProduct.compareAtPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ₹{selectedProduct.compareAtPrice.toLocaleString()}
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

      <Footer />
    </div>
  );
};

export default Shop;