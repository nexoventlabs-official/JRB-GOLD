import { useEffect, useState } from 'react';
import { Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentRedirect() {
  const [isTestMode, setIsTestMode] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    console.log('PaymentRedirect: Starting redirect process');
    
    // Check for test mode data first
    const mockPaymentDataStr = sessionStorage.getItem('mockPaymentData');
    console.log('PaymentRedirect: mockPaymentData found:', !!mockPaymentDataStr);
    
    if (mockPaymentDataStr) {
      const mockData = JSON.parse(mockPaymentDataStr);
      console.log('PaymentRedirect: Using test mode with data:', mockData);
      setIsTestMode(true);
      setPaymentData(mockData);
      return;
    }

    // Get Paytm redirect URL from sessionStorage (modern txnToken-based flow)
    const paytmRedirectUrl = sessionStorage.getItem('paytmRedirectUrl');
    
    console.log('PaymentRedirect: Redirect URL found:', !!paytmRedirectUrl);

    if (paytmRedirectUrl) {
      console.log('PaymentRedirect: Redirecting to Paytm showPaymentPage:', paytmRedirectUrl);
      
      // Clean up sessionStorage before redirecting
      sessionStorage.removeItem('paytmRedirectUrl');
      
      // Direct browser redirect to Paytm payment page (uses txnToken)
      window.location.href = paytmRedirectUrl;
    } else {
      console.log('PaymentRedirect: No payment data found, redirecting to checkout');
      // Redirect back to checkout if no redirect URL
      setTimeout(() => {
        window.location.href = '/checkout';
      }, 3000); // Give user time to see the message
    }
  }, []);

  const handleTestPayment = (success: boolean) => {
    if (!paymentData) return;

    // Generate mock transaction ID
    const mockTxnId = `PAYTM${Date.now()}${Math.random().toString(36).substring(7).toUpperCase()}`;
    
    // Create callback URL with test parameters
    const status = success ? 'TXN_SUCCESS' : 'TXN_FAILURE';
    const respCode = success ? '01' : '02';
    const respMsg = success ? 'Txn Success' : 'Transaction Failed';
    
    const callbackUrl = `${paymentData.returnUrl}?` +
      `ORDERID=${paymentData.orderId}&` +
      `TXNID=${mockTxnId}&` +
      `TXNAMOUNT=${paymentData.amount.toFixed(2)}&` +
      `STATUS=${status}&` +
      `RESPCODE=${respCode}&` +
      `RESPMSG=${respMsg}&` +
      `TXNDATE=${new Date().toISOString()}&` +
      `GATEWAYNAME=PAYTM&` +
      `BANKNAME=TEST&` +
      `PAYMENTMODE=CREDIT_CARD`;
    
    // Clean up sessionStorage
    sessionStorage.removeItem('mockPaymentData');
    
    // Redirect to callback
    window.location.href = callbackUrl;
  };

  if (isTestMode && paymentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Payment Gateway</h2>
            <p className="text-gray-600">This is a simulated payment for testing</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Payment Details:</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono">{paymentData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>₹{paymentData.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{paymentData.customerName}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => handleTestPayment(true)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Simulate Successful Payment
            </Button>
            <Button 
              onClick={() => handleTestPayment(false)}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              Simulate Failed Payment
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            This is a test environment. No real payment will be processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Loader2 className="h-16 w-16 text-yellow-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting to Payment Gateway</h2>
        <p className="text-gray-600">Please wait while we redirect you to Paytm...</p>
        <p className="text-sm text-gray-500 mt-4">
          If you are not redirected automatically, please go back and try again.
        </p>
        
        {/* Debug info */}
        <div className="mt-6 p-4 bg-gray-100 rounded text-left text-xs">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <div>Test Mode: {isTestMode ? 'Yes' : 'No'}</div>
          <div>Payment Data: {paymentData ? 'Found' : 'Not Found'}</div>
          <div>SessionStorage mockPaymentData: {sessionStorage.getItem('mockPaymentData') ? 'Found' : 'Not Found'}</div>
          <div>SessionStorage paytmRedirectUrl: {sessionStorage.getItem('paytmRedirectUrl') ? 'Found' : 'Not Found'}</div>
        </div>
      </div>
    </div>
  );
}