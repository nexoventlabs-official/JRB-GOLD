import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Truck, Package, XCircle, HelpCircle } from "lucide-react";

export default function Orders() {
  const { orders } = useCart();
  const navigate = useNavigate();

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h2>
            <p className="mt-1 text-gray-500">You haven't placed any orders yet.</p>
            <div className="mt-6">
              <Button onClick={() => navigate('/shop')}>
                Start Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Order #{order.orderNumber}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="text-sm font-medium">
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
              
              <div className="border-b border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <li key={index} className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                          <img
                            src={item.product.image || '/logo1.png'}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {item.product.name}
                          </h4>
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
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Subtotal: <span className="font-medium">₹{order.subtotal.toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Tax: <span className="font-medium">₹{order.tax.toLocaleString()}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Shipping: <span className="font-medium">
                      {order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}
                    </span>
                  </p>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    Total: ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-end space-x-4">
                <Button variant="outline" onClick={() => navigate(`/orders/${order.id}`)}>
                  View Details
                </Button>
                <Button>
                  Track Order
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
