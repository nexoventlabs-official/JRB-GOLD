import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, Calendar, CreditCard, MapPin, User, ArrowLeft } from 'lucide-react';

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder } = useCart();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      const orderData = getOrder(orderId);
      if (orderData) {
        setOrder(orderData);
      } else {
        // If no order found, redirect to home
        navigate('/');
      }
    }
  }, [orderId, getOrder, navigate]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
                <p className="text-gray-600">Thank you for your purchase</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold text-green-700">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="font-semibold">{order.orderNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Order Date
                </p>
                <p className="font-semibold">{order.createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Customer Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{order.shippingAddress.fullName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{order.shippingAddress.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Shipping Address
            </h2>
            
            <div className="space-y-2">
              <p className="font-medium">{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>{order.shippingAddress.postalCode}</p>
              <p className="font-medium">{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Order Items ({order.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)} items)
          </h2>
          
          <div className="space-y-4">
            {order.items.map((item: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={item.product?.image || item.image || '/product-bangle.jpg'} 
                  alt={item.product?.name || item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/product-bangle.jpg';
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.product?.name || item.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {(item.quantity || 1) > 1 ? (
                      <p>Quantity: {item.quantity || 1} × ₹{(item.price || item.product?.price)?.toLocaleString()} each</p>
                    ) : (
                      <p>₹{(item.price || item.product?.price)?.toLocaleString()}</p>
                    )}
                    {(item.product?.weight || item.weight) && (
                      <p>Weight: {item.product?.weight || item.weight}g {(item.quantity || 1) > 1 ? 'each' : ''}</p>
                    )}
                    {(item.product?.category || item.category) && (
                      <p>Category: {item.product?.category || item.category}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{((item.price || item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Information
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium capitalize">{order.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className={`font-medium ${
                  order.paymentStatus === 'completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {order.paymentStatus === 'completed' ? 'Paid' : 'Pending'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Order Status</span>
                <span className="font-medium text-blue-600 capitalize">{order.status}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{order.subtotal.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>₹{order.tax.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">
                  {order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}
                </span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => navigate('/shop')} variant="outline">
            Continue Shopping
          </Button>
          <Button onClick={() => navigate('/account/orders')}>
            View All Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
