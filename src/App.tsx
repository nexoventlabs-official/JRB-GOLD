import { useState, useEffect } from 'react';
import { Toaster as SonarToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';
import Index from './pages/Index';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Consultation from './pages/Consultation';
import SignIn from './pages/auth/SignIn';
import CreateAccount from './pages/auth/CreateAccount';
import MyOrders from './pages/account/MyOrders';
import ProfileSettings from './pages/account/ProfileSettings';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';
import PaymentCallback from './pages/PaymentCallback';
import PaymentRedirect from './pages/PaymentRedirect';
import PaymentTest from './pages/PaymentTest';
import PaymentCallbackSimple from './pages/PaymentCallbackSimple';
import PaymentDebug from './pages/PaymentDebug';
import Help from './pages/Help';
import RePledgeTransfer from "./pages/services/RePledgeTransfer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CancellationRefund from "./pages/CancellationRefund";
import ShippingPolicy from "./pages/ShippingPolicy";
import { CartProvider } from './contexts/CartContext';


// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check authentication from localStorage
  const authToken = localStorage.getItem('authToken');
  const userEmail = localStorage.getItem('userEmail');
  const isAuthenticated = !!(authToken && userEmail);

  if (!isAuthenticated) {
    // Redirect to sign-in page if not authenticated
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Preload critical resources
    const preloadResources = async () => {
      try {
        // Preload fonts
        await document.fonts.ready;

        // Preload critical images
        const criticalImages = [
          '/logo1.png?v=1',
          '/hero-jewelry.jpg',
          '/craftsmanship.jpg'
        ];

        const imagePromises = criticalImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Don't fail on image errors
            img.src = src;
          });
        });

        await Promise.all(imagePromises);

        // Minimum loading time for smooth experience
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsAppReady(true);
      } catch (error) {
        console.warn('Some resources failed to preload:', error);
        setIsAppReady(true);
      }
    };

    preloadResources();
  }, []);

  const handleLoadingComplete = () => {
    setIsInitialLoading(false);
  };

  if (isInitialLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Sonner />
          <SonarToaster />
          <Router>
            <PageTransition>
              <div className="min-h-screen bg-background animate-fade-in">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/payment/redirect" element={<PaymentRedirect />} />
                  <Route path="/payment/callback" element={<PaymentCallback />} />
                  <Route path="/payment/callback-simple" element={<PaymentCallbackSimple />} />
                  <Route path="/payment/test" element={<PaymentTest />} />
                  <Route path="/payment/debug" element={<PaymentDebug />} />
                  <Route path="/paytm/callback" element={<PaymentCallback />} />
                  <Route path="/order/:orderId" element={<OrderDetails />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/location" element={<Location />} />
                  <Route path="/consultation" element={<Consultation />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/services/re-pledge-transfer" element={<RePledgeTransfer />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/cancellation-refund" element={<CancellationRefund />} />
                  <Route path="/shipping-policy" element={<ShippingPolicy />} />

                  {/* Authentication Routes */}
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<CreateAccount />} />

                  {/* Protected Routes */}
                  <Route
                    path="/account/orders"
                    element={
                      <ProtectedRoute>
                        <MyOrders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account/settings"
                    element={
                      <ProtectedRoute>
                        <ProfileSettings />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Not Found */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </PageTransition>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
