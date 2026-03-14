import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Banknote, CheckCircle, Package, Calendar, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { paymentService } from "@/services/paymentService";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import productBangle from "@/assets/product-bangle.jpg";
import productCoin from "@/assets/product-coin.jpg";
import productNecklace from "@/assets/product-necklace.jpg";

// G20 Countries with tax rates and states
const G20_COUNTRIES = [
  { code: 'US', name: 'United States', taxRate: 0.07, states: [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ]},
  { code: 'GB', name: 'United Kingdom', taxRate: 0.20, states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { code: 'CA', name: 'Canada', taxRate: 0.13, states: [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
    'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan', 'Yukon'
  ]},
  { code: 'AU', name: 'Australia', taxRate: 0.10, states: [
    'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
    'South Australia', 'Tasmania', 'Victoria', 'Western Australia'
  ]},
  { code: 'IN', name: 'India', taxRate: 0.18, states: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
    'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ]},
  { code: 'JP', name: 'Japan', taxRate: 0.10, states: [
    'Hokkaido', 'Aomori', 'Iwate', 'Miyagi', 'Akita', 'Yamagata', 'Fukushima', 'Ibaraki',
    'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Toyama', 'Ishikawa',
    'Fukui', 'Yamanashi', 'Nagano', 'Gifu', 'Shizuoka', 'Aichi', 'Mie', 'Shiga', 'Kyoto', 'Osaka',
    'Hyogo', 'Nara', 'Wakayama', 'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi',
    'Tokushima', 'Kagawa', 'Ehime', 'Kochi', 'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita',
    'Miyazaki', 'Kagoshima', 'Okinawa'
  ]},
  { code: 'DE', name: 'Germany', taxRate: 0.19, states: [
    'Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse',
    'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate',
    'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'
  ]},
  { code: 'FR', name: 'France', taxRate: 0.20, states: [
    'Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Brittany', 'Centre-Val de Loire',
    'Corsica', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandy', 'Nouvelle-Aquitaine',
    'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'
  ]},
  { code: 'IT', name: 'Italy', taxRate: 0.22, states: [
    'Abruzzo', 'Aosta Valley', 'Apulia', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
    'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardy', 'Marche', 'Molise', 'Piedmont',
    'Sardinia', 'Sicily', 'Trentino-South Tyrol', 'Tuscany', 'Umbria', 'Veneto'
  ]},
  { code: 'BR', name: 'Brazil', taxRate: 0.17, states: [
    'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo',
    'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba',
    'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul',
    'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
  ]},
  // Add more G20 countries as needed
];

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Address form state
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [states, setStates] = useState<string[]>([]);
  const [taxRate, setTaxRate] = useState(0);
  
  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('credit'); // 'credit', 'debit', or 'netbanking'
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  // Order confirmation state
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
  const tax = subtotal * taxRate;
  const shipping = 0; // Free shipping for G20 countries
  const total = subtotal + tax + shipping;

  useEffect(() => {
    if (selectedCountry) {
      const country = G20_COUNTRIES.find(c => c.code === selectedCountry);
      if (country) {
        setTaxRate(country.taxRate);
        setStates(country.states);
        setSelectedState('');
      }
    } else {
      setStates([]);
      setSelectedState('');
      setTaxRate(0);
    }
  }, [selectedCountry]);

  const generateOrderId = () => {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `JRB${timestamp.slice(-6)}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCountry || !selectedState) {
      toast.error('Please select your country and state');
      return;
    }
    
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const zip = formData.get('zip') as string;
    
    // Check if user is authenticated
    const authToken = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (!authToken || !userEmail) {
      toast.error('Please sign in to complete your order');
      navigate('/signin');
      return;
    }
    
    // Generate order details
    const orderId = generateOrderId();
    const orderNumber = `ORD-${Date.now()}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    
    const order = {
      id: orderId,
      orderNumber: orderNumber,
      items: cart.map(item => {
        // Map product images based on product ID or name
        let productImage = item.image;
        if (!productImage || productImage === '/logo1.png' || productImage.includes('blob:')) {
          if (item.name?.toLowerCase().includes('bangle')) {
            productImage = '/product-bangle.jpg';
          } else if (item.name?.toLowerCase().includes('coin')) {
            productImage = '/product-coin.jpg';
          } else if (item.name?.toLowerCase().includes('necklace') || item.name?.toLowerCase().includes('chain')) {
            productImage = '/product-necklace.jpg';
          } else {
            productImage = '/product-bangle.jpg'; // Default fallback
          }
        }
        
        return {
          ...item,
          image: productImage,
          category: item.category || 'Jewelry',
          weight: item.weight || 10
        };
      }),
      subtotal: subtotal,
      tax: tax,
      shipping: 0,
      total: total,
      status: 'Processing',
      paymentMethod: paymentMethod === 'credit' ? 'Credit Card' : paymentMethod === 'debit' ? 'Debit Card' : 'Net Banking',
      paymentStatus: 'pending',
      createdAt: orderDate,
      customerEmail: userEmail,
      shippingAddress: {
        fullName: `${firstName} ${lastName}`,
        address: address,
        city: city,
        state: selectedState,
        postalCode: zip,
        country: G20_COUNTRIES.find(c => c.code === selectedCountry)?.name || '',
        email: email,
        phone: phone
      }
    };
    
    // Save order to user-specific localStorage key
    const userOrdersKey = `orders_${userEmail}`;
    const existingOrders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
    existingOrders.push(order);
    localStorage.setItem(userOrdersKey, JSON.stringify(existingOrders));
    
    // Also save to general orders for order lookup
    const allOrders = JSON.parse(localStorage.getItem('allOrders') || '[]');
    allOrders.push(order);
    localStorage.setItem('allOrders', JSON.stringify(allOrders));
    
    // Initiate payment
    setIsProcessingPayment(true);
    
    try {
      const paymentResponse = await paymentService.initiatePayment({
        orderId: orderId,
        amount: total,
        currency: 'INR',
        customerName: `${firstName} ${lastName}`,
        customerEmail: email,
        customerPhone: phone,
        returnUrl: `${window.location.origin}/payment/callback`,
        cancelUrl: `${window.location.origin}/checkout`,
        paymentMethod: paymentMethod as 'credit' | 'debit' | 'netbanking'
      });

      if (paymentResponse.success && paymentResponse.redirectUrl) {
        // Clear cart before redirecting to payment gateway
        clearCart();
        
        // Redirect to payment gateway
        window.location.href = paymentResponse.redirectUrl;
      } else {
        toast.error(paymentResponse.message || 'Failed to initiate payment');
        setIsProcessingPayment(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred while processing payment');
      setIsProcessingPayment(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Please add some items to your cart before checking out.</p>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Input id="firstName" name="firstName" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Input id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input id="phone" name="phone" type="tel" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={setSelectedCountry} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        {G20_COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name} ({country.taxRate * 100}% Tax)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State/Province <span className="text-red-500">*</span>
                    </label>
                    <Select 
                      value={selectedState}
                      onValueChange={setSelectedState}
                      disabled={!selectedCountry}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <Input id="address" name="address" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input id="city" name="city" required />
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP/Postal Code <span className="text-red-500">*</span>
                    </label>
                    <Input id="zip" name="zip" required />
                  </div>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  
                  {/* Payment Method Toggle */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <button
                        type="button"
                        className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors border ${
                          paymentMethod === 'credit'
                            ? 'bg-white shadow-sm text-yellow-700 border-yellow-300'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('credit')}
                      >
                        <div className="flex flex-col items-center">
                          <CreditCard className="h-5 w-5 mb-1" />
                          <span>Credit Card</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors border ${
                          paymentMethod === 'debit'
                            ? 'bg-white shadow-sm text-yellow-700 border-yellow-300'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('debit')}
                      >
                        <div className="flex flex-col items-center">
                          <CreditCard className="h-5 w-5 mb-1" />
                          <span>Debit Card</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors border ${
                          paymentMethod === 'netbanking'
                            ? 'bg-white shadow-sm text-yellow-700 border-yellow-300'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setPaymentMethod('netbanking')}
                      >
                        <div className="flex flex-col items-center">
                          <Banknote className="h-5 w-5 mb-1" />
                          <span>NetBanking</span>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    {paymentMethod === 'netbanking' ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sbi">State Bank of India</SelectItem>
                              <SelectItem value="hdfc">HDFC Bank</SelectItem>
                              <SelectItem value="icici">ICICI Bank</SelectItem>
                              <SelectItem value="axis">Axis Bank</SelectItem>
                              <SelectItem value="pnb">Punjab National Bank</SelectItem>
                              <SelectItem value="bob">Bank of Baroda</SelectItem>
                              <SelectItem value="yes">Yes Bank</SelectItem>
                              <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="mt-2 text-xs text-gray-500">
                            You will be redirected to your bank's secure payment page
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            {paymentMethod === 'credit' ? 'Credit Card Payment' : 'Debit Card Payment'}
                          </h4>
                          <p className="text-xs text-gray-600">
                            You will be redirected to a secure payment gateway to complete your {paymentMethod} card transaction.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Button type="submit" className="w-full" disabled={isProcessingPayment}>
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'netbanking' 
                          ? `Pay ₹${total.toFixed(2)} via NetBanking`
                          : `Pay ₹${total.toFixed(2)} with ${paymentMethod === 'credit' ? 'Credit' : 'Debit'} Card`}
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-4 border-b border-gray-200 pb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      {item.quantity && item.quantity > 1 ? (
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ₹{item.price?.toLocaleString()} each
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500">₹{item.price?.toLocaleString()}</p>
                      )}
                      {item.weight && (
                        <p className="text-xs text-gray-500">
                          {item.weight}g {item.quantity && item.quantity > 1 ? 'each' : ''}
                        </p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} items)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {selectedCountry && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  {selectedCountry && (
                    <div className="text-sm text-gray-500 mt-1">
                      Includes ₹{tax.toLocaleString()} in taxes for {G20_COUNTRIES.find(c => c.code === selectedCountry)?.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <Dialog open={showOrderConfirmation} onOpenChange={setShowOrderConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          
          {orderDetails && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-semibold text-green-700">{orderDetails.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold">{orderDetails.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-semibold flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {orderDetails.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-semibold">{orderDetails.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Ordered Items ({orderDetails.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)} items)
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {orderDetails.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="text-sm text-gray-600">
                          {item.quantity && item.quantity > 1 ? (
                            <p>Quantity: {item.quantity} × ₹{item.price?.toLocaleString()} each</p>
                          ) : (
                            <p>₹{item.price?.toLocaleString()}</p>
                          )}
                          <p>{item.category} • {item.weight}g {item.quantity && item.quantity > 1 ? 'each' : ''}</p>
                        </div>
                      </div>
                      <p className="font-semibold">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{orderDetails.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{orderDetails.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  className="flex-1" 
                  onClick={() => navigate('/shop')}
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowOrderConfirmation(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
