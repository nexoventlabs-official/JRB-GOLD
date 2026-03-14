import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Truck, Package, XCircle, HelpCircle, ArrowLeft } from 'lucide-react';

export default function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useCart();
  const navigate = useNavigate();
  
  const order = getOrder(orderId || '');

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <HelpCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Order not found</h2>
          <p className="mt-1 text-gray-500">We couldn't find the order you're looking for.</p>
          <div className="mt-6">
            <Button onClick={() => navigate('/orders')}>
              Back to Orders
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-purple-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6 -ml-2 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </Button>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Order Header */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Order #{order.orderNumber}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                {getStatusIcon(order.status)}
                <span className="text-sm font-medium">
                  Status: {getStatusText(order.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                    <img
                      src={item.product.image || '/logo1.png'}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{order.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Tax</span>
                  <span className="text-sm font-medium text-gray-900">
                    ₹{order.tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Shipping</span>
                  <span className="text-sm font-medium text-gray-900">
                    {order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">
                    ₹{order.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.shippingAddress.email}<br />
                  {order.shippingAddress.phone}
                </p>
                
                <h3 className="mt-4 text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {order.paymentMethod}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Payment Status: <span className="font-medium">
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-end space-x-3">
            <Button variant="outline" onClick={() => window.print()}>
              Print Invoice
            </Button>
            <Button>
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
