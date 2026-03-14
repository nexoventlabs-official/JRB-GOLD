import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { paymentService } from '@/services/paymentService';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'processing' | 'success' | 'failed' | 'unknown'>('processing');
  const [message, setMessage] = useState('Processing your payment...');
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});

  // Add error boundary
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Debug: Log all search params
        const allParams = Object.fromEntries(searchParams.entries());
        console.log('Payment callback received with params:', allParams);
        console.log('Full URL:', window.location.href);
        
        // Extract params with case-insensitive fallbacks
        let transactionId = searchParams.get('TXNID') || searchParams.get('txnid') || '';
        let orderId = searchParams.get('ORDERID') || searchParams.get('orderid') || searchParams.get('ORDER_ID') || '';
        let paymentStatus = searchParams.get('STATUS') || searchParams.get('status') || '';
        let responseCode = searchParams.get('RESPCODE') || searchParams.get('respcode') || '';
        let responseMsg = searchParams.get('RESPMSG') || searchParams.get('respmsg') || '';
        let txnAmount = searchParams.get('TXNAMOUNT') || searchParams.get('txnamount') || '';

        console.log('Extracted params:', {
          transactionId, orderId, paymentStatus, responseCode, responseMsg, txnAmount
        });

        // Store payment details for display
        setPaymentDetails({
          orderId: orderId || 'N/A',
          transactionId: transactionId || 'N/A',
          amount: txnAmount || 'N/A',
          status: paymentStatus || 'N/A',
          responseCode: responseCode || 'N/A',
          responseMsg: responseMsg || 'N/A'
        });

        // If no URL parameters, check if data was passed via sessionStorage (from POST)
        if (!transactionId && !orderId && !paymentStatus) {
          const postData = sessionStorage.getItem('paytmCallbackData');
          if (postData) {
            const data = JSON.parse(postData);
            transactionId = data.TXNID || '';
            orderId = data.ORDERID || '';
            paymentStatus = data.STATUS || '';
            responseCode = data.RESPCODE || '';
            responseMsg = data.RESPMSG || '';
            txnAmount = data.TXNAMOUNT || '';
            sessionStorage.removeItem('paytmCallbackData');
          }
        }

        // If STATUS is missing but we have ORDERID, try to infer from RESPCODE
        if (!paymentStatus && orderId) {
          if (responseCode === '01') {
            paymentStatus = 'TXN_SUCCESS';
            console.log('STATUS missing, inferred TXN_SUCCESS from RESPCODE=01');
          } else if (responseCode) {
            paymentStatus = 'TXN_FAILURE';
            console.log(`STATUS missing, inferred TXN_FAILURE from RESPCODE=${responseCode}`);
          }
        }

        // If we have ORDERID but still no STATUS, show unknown status with details
        if (orderId && !paymentStatus) {
          setStatus('unknown');
          setMessage(
            `Payment status could not be determined for Order ID: ${orderId}. ` +
            `Amount: ₹${txnAmount || 'N/A'}. ` +
            `Please contact support with your Order ID for verification.`
          );
          console.warn('Payment status unknown:', { orderId, txnAmount, allParams });
          return;
        }

        // If completely missing both orderId and paymentStatus, this is a direct/invalid access
        if (!orderId && !paymentStatus) {
          setStatus('failed');
          setMessage('Invalid payment callback. No payment parameters received.');
          console.error('No payment parameters found:', { allParams });
          return;
        }

        // If we only have orderId but no status (edge case — shouldn't reach here)
        if (!orderId) {
          setStatus('failed');
          setMessage('Missing Order ID in payment response. Please contact support.');
          return;
        }

        // Transaction ID is optional for some payment methods
        if (!transactionId) {
          console.warn('Transaction ID missing, using order ID as fallback');
          transactionId = orderId;
        }

        const isValid = await paymentService.verifyPayment(
          transactionId,
          orderId,
          paymentStatus
        );

        // Paytm success status is 'TXN_SUCCESS'
        if (isValid && (paymentStatus === 'TXN_SUCCESS' || paymentStatus === 'success')) {
          setStatus('success');
          setMessage(responseMsg || 'Payment completed successfully!');
          
          // Update order status in localStorage
          const userEmail = localStorage.getItem('userEmail');
          if (userEmail) {
            const userOrdersKey = `orders_${userEmail}`;
            const orders = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
            const updatedOrders = orders.map((order: any) => 
              order.id === orderId 
                ? { ...order, paymentStatus: 'completed', transactionId, paymentGateway: 'Paytm', txnAmount }
                : order
            );
            localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders));
          }

          // Redirect to order details after 3 seconds
          setTimeout(() => {
            navigate(`/order/${orderId}`);
          }, 3000);
        } else {
          setStatus('failed');
          setMessage(
            responseMsg || 
            `Payment was not successful. Status: ${paymentStatus || 'Unknown'}. Please try again or contact support.`
          );
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setHasError(true);
        setStatus('failed');
        setMessage('An error occurred while processing your payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  // If there's an error, show a simple error page
  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Processing Error</h2>
          <p className="text-gray-600 mb-4">There was an error processing the payment callback.</p>
          <div className="bg-gray-100 p-3 rounded mb-4">
            <p className="text-xs text-gray-500 break-all">URL: {window.location.href}</p>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/cart')}
              className="w-full"
            >
              Return to Cart
            </Button>
            <Button 
              onClick={() => navigate('/contact')}
              variant="outline"
              className="w-full"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {status === 'processing' && (
          <>
            <Loader2 className="h-16 w-16 text-yellow-600 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {paymentDetails.orderId && paymentDetails.orderId !== 'N/A' && (
              <div className="bg-green-50 p-4 rounded-lg mb-4 text-left">
                <p className="text-sm text-gray-700"><strong>Order ID:</strong> {paymentDetails.orderId}</p>
                {paymentDetails.transactionId !== 'N/A' && (
                  <p className="text-sm text-gray-700"><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
                )}
                {paymentDetails.amount !== 'N/A' && (
                  <p className="text-sm text-gray-700"><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
                )}
              </div>
            )}
            <p className="text-sm text-gray-500">Redirecting to order details...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {paymentDetails.orderId && paymentDetails.orderId !== 'N/A' && (
              <div className="bg-red-50 p-4 rounded-lg mb-4 text-left">
                <p className="text-sm text-gray-700"><strong>Order ID:</strong> {paymentDetails.orderId}</p>
                {paymentDetails.amount !== 'N/A' && (
                  <p className="text-sm text-gray-700"><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
                )}
                {paymentDetails.responseCode !== 'N/A' && (
                  <p className="text-sm text-gray-700"><strong>Response Code:</strong> {paymentDetails.responseCode}</p>
                )}
              </div>
            )}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/cart')}
                className="w-full"
              >
                Return to Cart
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full"
              >
                Contact Support
              </Button>
            </div>
          </>
        )}

        {status === 'unknown' && (
          <>
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Status Pending</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            {paymentDetails.orderId && paymentDetails.orderId !== 'N/A' && (
              <div className="bg-amber-50 p-4 rounded-lg mb-4 text-left">
                <p className="text-sm text-gray-700"><strong>Order ID:</strong> {paymentDetails.orderId}</p>
                {paymentDetails.amount !== 'N/A' && (
                  <p className="text-sm text-gray-700"><strong>Amount:</strong> ₹{paymentDetails.amount}</p>
                )}
              </div>
            )}
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/my-orders')}
                className="w-full"
              >
                Check My Orders
              </Button>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="w-full"
              >
                Contact Support
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
