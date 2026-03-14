// Payment Gateway Service for JRB Gold - Paytm Integration
// All sensitive config lives on the backend. Frontend only needs the backend URL.

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://jrb-gold-zvna.onrender.com';

export interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
  paymentMethod?: 'credit' | 'debit' | 'netbanking' | 'upi';
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  message: string;
  redirectUrl?: string;
}

class PaymentService {
  private backendUrl: string;

  constructor() {
    this.backendUrl = BACKEND_URL;
    console.log('Payment Service initialized, backend:', this.backendUrl);
  }

  async initiatePayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
    try {
      console.log('Initiating payment via backend...');

      const response = await fetch(`${this.backendUrl}/api/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          customerId: paymentData.customerEmail,
          email: paymentData.customerEmail,
          mobile: paymentData.customerPhone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend error:', response.status, errorData);
        return {
          success: false,
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          status: 'failed',
          message: errorData.error || 'Failed to initiate payment. The payment server may be temporarily unavailable. Please try again in a moment.'
        };
      }

      const data = await response.json();
      console.log('Backend response:', {
        success: data.success,
        hasRedirectUrl: !!data.redirectUrl,
        orderId: data.orderId,
        environment: data.environment
      });

      if (!data.success || !data.redirectUrl) {
        return {
          success: false,
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          status: 'failed',
          message: data.error || 'Failed to get payment parameters from server.'
        };
      }

      return {
        success: true,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        status: 'pending',
        message: 'Redirecting to Paytm payment gateway...',
        redirectUrl: data.redirectUrl
      };

    } catch (error) {
      console.error('Payment initiation failed:', error);

      const isNetworkError = error instanceof TypeError && error.message.includes('fetch');

      return {
        success: false,
        orderId: paymentData.orderId,
        amount: paymentData.amount,
        status: 'failed',
        message: isNetworkError
          ? 'Payment server is temporarily unavailable. Please try again in a few minutes.'
          : 'Failed to initiate payment. Please try again.'
      };
    }
  }

  async verifyPayment(transactionId: string, orderId: string, status: string): Promise<boolean> {
    try {
      console.log('Verifying payment:', { transactionId, orderId, status });
      if (status === 'TXN_SUCCESS' || status === 'success') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Payment verification failed:', error);
      return false;
    }
  }
}

export const paymentService = new PaymentService();
