import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center py-4 border-b border-gray-100">
                    <div className="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                      <img
                        src={item.image || '/logo1.png'}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</p>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 space-y-1">
                        {item.quantity && item.quantity > 1 && (
                          <p>Quantity: {item.quantity} × ₹{item.price?.toLocaleString()} each</p>
                        )}
                        {item.weight && (
                          <p>Weight: {item.weight}g {item.quantity && item.quantity > 1 ? 'each' : ''}</p>
                        )}
                        {item.category && (
                          <p>Category: {item.category}</p>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="mt-3 flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 hover:text-gray-800"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-medium text-gray-900">₹{total.toLocaleString()}</span>
                </div>
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full mt-6"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
