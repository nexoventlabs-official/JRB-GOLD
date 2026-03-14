import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, MapPin, Lock, CheckCircle, XCircle, Package, Calendar, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Using public folder images for better compatibility
const productBangle = '/product-bangle.jpg';
const productCoin = '/product-coin.jpg';
const productNecklace = '/product-necklace.jpg';

// G20 Countries with tax rates and states
const G20_COUNTRIES = [
  { code: 'US', name: 'United States', taxRate: 0.07, states: ['California', 'New York', 'Texas', 'Florida'] },
  { code: 'IN', name: 'India', taxRate: 0.18, states: ['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Gujarat'] },
  { code: 'GB', name: 'United Kingdom', taxRate: 0.20, states: ['England', 'Scotland', 'Wales', 'Northern Ireland'] },
  { code: 'CA', name: 'Canada', taxRate: 0.13, states: ['Ontario', 'Quebec', 'British Columbia', 'Alberta'] },
  { code: 'AU', name: 'Australia', taxRate: 0.10, states: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'] },
  { code: 'DE', name: 'Germany', taxRate: 0.19, states: ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony'] },
  { code: 'FR', name: 'France', taxRate: 0.20, states: ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Occitanie'] },
  { code: 'JP', name: 'Japan', taxRate: 0.10, states: ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi'] },
  { code: 'BR', name: 'Brazil', taxRate: 0.17, states: ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia'] },
  { code: 'IT', name: 'Italy', taxRate: 0.22, states: ['Lombardy', 'Lazio', 'Campania', 'Sicily'] }
];

// Default user data structure
const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  country: 'IN',
  pincode: '',
  state: '',
  city: '',
  dateOfBirth: '',
  gender: 'male',
  emailVerified: false,
  phoneVerified: false
};

// Function to get user orders from localStorage
const getUserOrders = (userEmail: string) => {
  const orders = localStorage.getItem(`orders_${userEmail}`);
  if (orders) {
    return JSON.parse(orders);
  }
  
  // Return sample orders for demo purposes if user is logged in
  if (userEmail) {
    const sampleOrders = [
      {
        id: 'JRB123456ABC7D',
        orderNumber: 'ORD-1735288076615',
        date: '25 Dec, 2024',
        status: 'Delivered',
        paymentMethod: 'Credit Card',
        total: 82543,
        items: [
          {
            id: '1',
            name: 'Elegant Gold Bangle',
            category: '22k Gold',
            price: 82543,
            weight: 8.5,
            image: '/product-bangle.jpg'
          }
        ]
      },
      {
        id: 'JRB789012DEF3G',
        orderNumber: 'ORD-1735188076615',
        date: '20 Dec, 2024',
        status: 'Shipped',
        paymentMethod: 'Debit Card',
        total: 10050,
        items: [
          {
            id: '2',
            name: 'Gold Coin',
            category: '24k Gold',
            price: 20734,
            weight: 2.0,
            image: '/product-coin.jpg'
          },
          {
            id: '3',
            name: 'Silver Chain',
            category: 'Pure Silver',
            price: 2200,
            weight: 15.0,
            image: '/product-necklace.jpg'
          }
        ]
      },
      {
        id: 'JRB456789HIJ1K',
        orderNumber: 'ORD-1735088076615',
        date: '15 Dec, 2024',
        status: 'Processing',
        paymentMethod: 'Net Banking',
        total: 32400,
        items: [
          {
            id: '4',
            name: 'Gold Ring Set',
            category: '22k Gold',
            price: 32400,
            weight: 6.2,
            image: '/product-bangle.jpg'
          }
        ]
      }
    ];
    
    // Store sample orders for this user
    localStorage.setItem(`orders_${userEmail}`, JSON.stringify(sampleOrders));
    return sampleOrders;
  }
  
  return [];
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(defaultUser);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    orderUpdates: true,
    promotions: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load user data and orders on component mount
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    
    if (authToken && userEmail) {
      setIsLoggedIn(true);
      
      // Load user profile data
      const [firstName, lastName] = userName ? userName.split(' ') : ['', ''];
      setFormData({
        ...defaultUser,
        firstName: firstName || '',
        lastName: lastName || '',
        email: userEmail,
        phone: userPhone || '',
        emailVerified: true,
        phoneVerified: !!userPhone
      });
      
      // Load user orders
      const orders = getUserOrders(userEmail);
      setUserOrders(orders);
    } else {
      // Redirect to sign in if not authenticated
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your profile settings.",
        variant: "destructive",
      });
      navigate('/signin');
    }
  }, [navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNotifications(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update localStorage with new profile data
    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userPhone', formData.phone);
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would validate the current password and update it
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Clear all user data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPhone');
      localStorage.removeItem(`orders_${formData.email}`);
      
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      });
      
      navigate('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-playfair font-bold text-gray-900">Account Settings</h1>
        <p className="mt-2 text-gray-600">Welcome back, {formData.firstName || 'User'}! Manage your profile, orders, and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 max-w-2xl mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">
            <Mail className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center mt-1 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Email verified</span>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex items-center mt-1 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>Phone verified</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <div className="relative mt-1">
                    <div className="absolute top-3 left-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      disabled={!isEditing}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 mt-0"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select 
                      value={formData.country} 
                      onValueChange={(value) => setFormData({...formData, country: value, state: ''})}
                      disabled={!isEditing}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {G20_COUNTRIES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Select 
                      value={formData.state} 
                      onValueChange={(value) => setFormData({...formData, state: value})}
                      disabled={!isEditing || !formData.country}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.country && G20_COUNTRIES.find(c => c.code === formData.country)?.states.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode/ZIP Code</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <div className="flex space-x-4 mt-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value="other"
                          checked={formData.gender === 'other'}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Other</span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <p className="text-sm text-gray-500">View your past purchases and order details</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-6">
                    {/* Order Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 space-x-4">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {order.date}
                          </span>
                          <span className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1" />
                            {order.paymentMethod}
                          </span>
                          <span className="font-medium">
                            Order ID: {order.id}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{order.total.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Items Purchased:</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={item.image || '/product-bangle.jpg'} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/product-bangle.jpg';
                            }}
                          />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                            <p className="text-sm text-gray-600">{item.category}</p>
                            <p className="text-sm text-gray-600">Weight: {item.weight}g</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex space-x-2">
                        {order.status === 'Delivered' && (
                          <Button variant="outline" size="sm">
                            Reorder
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                      {order.status === 'Shipped' && (
                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {userOrders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
                    <Button onClick={() => navigate('/shop')}>
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-lg">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1"
                        required
                      />
                      <p className="mt-1 text-sm text-gray-500">Use 8 or more characters with a mix of letters, numbers & symbols</p>
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>
                    <div className="pt-2">
                      <Button type="submit">Update Password</Button>
                    </div>
                  </form>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-red-600 mb-4">Danger Zone</h3>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Delete Account</h4>
                        <p className="text-sm text-gray-600">Once you delete your account, there is no going back. Please be certain.</p>
                      </div>
                      <Button 
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <p className="text-sm text-gray-500">Manage how you receive notifications</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email">Account notifications</Label>
                        <p className="text-sm text-gray-500">Order updates, account changes, and more</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="email"
                          name="email"
                          type="checkbox"
                          checked={notifications.email}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="orderUpdates">Order updates</Label>
                        <p className="text-sm text-gray-500">Get updates about your orders</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="orderUpdates"
                          name="orderUpdates"
                          type="checkbox"
                          checked={notifications.orderUpdates}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="promotions">Promotions & Offers</Label>
                        <p className="text-sm text-gray-500">Get updates about our latest offers and deals</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="promotions"
                          name="promotions"
                          type="checkbox"
                          checked={notifications.promotions}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms">Order updates via SMS</Label>
                        <p className="text-sm text-gray-500">Get order status updates via SMS</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="sms"
                          name="sms"
                          type="checkbox"
                          checked={notifications.sms}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-4">WhatsApp Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="whatsapp">Order updates on WhatsApp</Label>
                        <p className="text-sm text-gray-500">Get order status updates on WhatsApp</p>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="whatsapp"
                          name="whatsapp"
                          type="checkbox"
                          checked={notifications.whatsapp}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
