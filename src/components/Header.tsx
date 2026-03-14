import { useState, useEffect } from "react";
import { Search, User, Heart, ShoppingCart, Menu, X, LogIn, UserPlus, LogOut, Package, Settings, RefreshCw, Phone, Mail, ChevronDown } from "lucide-react";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchBox from "@/components/SearchBox";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useGoldRates } from "@/hooks/useGoldRates";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState('');
  const { cart, favorites } = useCart();
  const navigate = useNavigate();
  const { gold24k, gold22k, silver, isLoading, error } = useGoldRates();

  // Check if user is logged in (in a real app, this would come from your auth context)
  useEffect(() => {
    // TODO: Replace with actual auth check
    const checkAuthStatus = () => {
      // For demo purposes, check if there's a token in localStorage
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);

      // Set user initials for avatar
      const userName = localStorage.getItem('userName') || 'User';
      setUserInitials(
        userName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .substring(0, 2)
      );
    };

    checkAuthStatus();

    // Listen for auth state changes (in a real app, this would be from your auth context)
    window.addEventListener('storage', checkAuthStatus);
    return () => window.removeEventListener('storage', checkAuthStatus);
  }, []);

  const handleLogout = () => {
    // TODO: Implement proper logout logic
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navigationLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const shopCategories = [
    { name: "Gold Jewelry", href: "/shop?category=gold" },
    { name: "Silver Collection", href: "/shop?category=silver" },
    { name: "Coins", href: "/shop?category=coins" },
    { name: "Gift Cards", href: "/gift-cards" },
  ];


  const trendingProducts = [
    { id: '1', name: 'Gold Bangles', category: 'Bangles', price: 125553, image: productBangle },
    { id: '2', name: 'Diamond Rings', category: 'Rings', price: 91286, image: productCoin },
    { id: '3', name: 'Temple Jewelry', category: 'Necklaces', price: 424895, image: productNecklace },
    { id: '4', name: 'Antique Necklaces', category: 'Necklaces', price: 154365, image: productBangle },
  ];

  const handleProductSelect = (product: any) => {
    // Navigate to product detail page
    navigate(`/product/${product.id}`);
  };

  const handleAccountClick = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const [lastToggledProduct, setLastToggledProduct] = useState<string | null>(null);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/favorites');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="text-white" style={{ background: 'rgb(202, 138, 4)' }}>
        <div className="container mx-auto">
          <div className="flex items-center justify-center py-2 xs:py-3 text-xs xs:text-sm">
            <div className="flex flex-col xs:flex-row items-center xs:space-x-4 lg:space-x-6 font-medium text-center xs:text-left">
              <span className="tracking-wide">₹{isLoading ? '...' : gold24k.toLocaleString('en-IN')}/g Gold (24K)</span>
              <span className="tracking-wide">₹{isLoading ? '...' : gold22k.toLocaleString('en-IN')}/g Gold (22K)</span>
              <span className="tracking-wide">₹{isLoading ? '...' : silver.toLocaleString('en-IN')}/g Silver</span>
              <span className="text-xs opacity-75 mt-1 xs:mt-0 xs:ml-2">*Indicative rates—visit store for exact rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b">
        <div className="container mx-auto">
          <div className="flex h-14 xs:h-16 lg:h-18 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center h-full">
              <a href="/" className="group flex items-center space-x-2 xs:space-x-3 lg:space-x-4 h-full py-2 transition-all duration-300 hover:scale-105">
                <img
                  src="/logo1.png?v=1"
                  alt="JRB Gold Pvt Ltd Logo"
                  className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain brightness-110 contrast-110 flex-shrink-0 transition-transform duration-300 group-hover:rotate-3"
                />
                <span className="font-playfair text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold leading-none tracking-wide whitespace-nowrap transition-colors duration-300 drop-shadow-lg" style={{ color: 'rgb(202, 138, 4)' }}>
                  JRB GOLD PVT LTD
                </span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {/* Shop Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-foreground hover:text-gold transition-colors duration-200 font-medium p-0 h-auto">
                    Shop
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {shopCategories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <a href={category.href} className="cursor-pointer">
                        {category.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>


              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-gold transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Utilities */}
            <div className="flex items-center space-x-2 xs:space-x-3">
              {/* Search */}
              <div className="hidden md:block relative w-40 lg:w-48 xl:w-56 2xl:w-64">
                <SearchBox
                  onProductSelect={handleProductSelect}
                  placeholder="Search jewelry..."
                  className="w-full text-sm"
                  trendingProducts={trendingProducts}
                  showTrending={true}
                />
              </div>

              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <Search className="h-4 w-4" />
              </Button>

              <div className="flex items-center space-x-1 xs:space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative ${lastToggledProduct ? 'animate-ping-once' : ''}`}
                  onClick={handleWishlistClick}
                  title="View Favorites"
                >
                  <Heart
                    className={`h-5 w-5 ${lastToggledProduct ? 'fill-current text-red-500' : ''}`}
                    fill={favorites.includes(lastToggledProduct || '') ? 'currentColor' : 'none'}
                  />
                  {favorites.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {favorites.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={handleCartClick}
                  title="Cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                      {cart.length}
                    </Badge>
                  )}
                </Button>

                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-yellow-100 text-yellow-800">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/account/orders')}>
                        <Package className="mr-2 h-4 w-4" />
                        <span>My Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/account/settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="flex space-x-1 xs:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/signin')}
                      className="hidden md:flex items-center text-xs lg:text-sm px-2 lg:px-3"
                    >
                      <LogIn className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      <span>Sign In</span>
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => navigate('/signup')}
                      className="hidden md:flex items-center text-xs lg:text-sm px-2 lg:px-3"
                    >
                      <UserPlus className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                      <span>Sign Up</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden h-8 w-8"
                      onClick={() => navigate('/signin')}
                      title="Account"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[280px] xs:w-[320px] sm:w-[380px]">
                    <div className="flex flex-col space-y-3 xs:space-y-4 py-3 xs:py-4">
                      {/* Mobile Search */}
                      <SearchBox
                        onProductSelect={handleProductSelect}
                        placeholder="Search jewelry..."
                        className="w-full"
                      />

                      {/* Mobile Navigation */}
                      <nav className="flex flex-col space-y-2">
                        {/* Mobile Shop Categories */}
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-muted-foreground px-3 py-2">Shop</div>
                          {shopCategories.map((category) => (
                            <Button
                              key={category.href}
                              variant="ghost"
                              className="w-full justify-start pl-6"
                              onClick={() => {
                                navigate(category.href);
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              {category.name}
                            </Button>
                          ))}
                        </div>


                        {navigationLinks.map((link) => (
                          <Button
                            key={link.href}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => {
                              navigate(link.href);
                              // Close the sheet after navigation
                              document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                            }}
                          >
                            {link.name}
                          </Button>
                        ))}

                        {/* Mobile Auth Buttons */}
                        {isLoggedIn ? (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/account/orders');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              My Orders
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/account/settings');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <Settings className="mr-2 h-4 w-4" />
                              Account Settings
                            </Button>
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-700"
                              onClick={handleLogout}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Sign Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/signin');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <LogIn className="mr-2 h-4 w-4" />
                              Sign In
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full justify-start"
                              onClick={() => {
                                navigate('/signup');
                                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Create Account
                            </Button>
                          </>
                        )}
                      </nav>

                      {/* Mobile Cart and Wishlist */}
                      <div className="flex flex-col space-y-2 pt-3 xs:pt-4 border-t border-border">
                        <Button variant="outline" className="justify-start text-sm" onClick={handleWishlistClick}>
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist ({favorites.length})
                        </Button>
                        <Button variant="outline" className="justify-start text-sm" onClick={handleCartClick}>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart ({cart.length})
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;