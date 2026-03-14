import React from 'react';

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancellation & Refund Policy</h1>
          <p className="text-lg text-gray-600 mb-8">Fair, Transparent, and Customer-Centric</p>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm leading-relaxed mb-6">
              At JRB Gold Pvt Limited, we strive to deliver genuine, high-quality gold and silver jewelry with complete transparency. While we work hard to ensure every order meets your expectations, we recognize that occasional issues may arise. This policy outlines how cancellations, returns, and refunds are handled for retail and wholesale customers.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Order Cancellations</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Retail Orders:</h3>
            <ul className="text-sm space-y-2 mb-4 ml-6">
              <li>• Cancellations must be requested within 2 hours of order placement.</li>
              <li>• Once an order is processed, packed, or dispatched, cancellations are not possible.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Custom/Personalized Jewelry:</h3>
            <ul className="text-sm space-y-2 mb-4 ml-6">
              <li>• Orders for engraved, made-to-order, or specially customized items cannot be cancelled once production begins.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Wholesale Orders:</h3>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Cancellations for bulk or trade orders are subject to the agreed purchase contract. Any cancellation after procurement or production has begun may incur a restocking or processing fee.</li>
            </ul>

            <p className="text-sm leading-relaxed mb-6">
              To request cancellation, contact us via phone or email with your Order ID and details.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Returns & Exchanges</h2>
            <p className="text-sm leading-relaxed mb-4">
              We maintain strict quality checks before dispatch. However, if you receive:
            </p>
            <ul className="text-sm space-y-2 mb-4 ml-6">
              <li>• A damaged product</li>
              <li>• A wrong item or incorrect order fulfillment</li>
              <li>• A manufacturing defect</li>
            </ul>
            <p className="text-sm leading-relaxed mb-4">
              You must report the issue within 48 hours of delivery.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              On verification, we will provide one of the following:
            </p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Replacement of the same product</li>
              <li>• Exchange with another item of equal value</li>
              <li>• Refund (where replacement is not possible)</li>
            </ul>
            <p className="text-sm leading-relaxed mb-6">
              <strong>Note:</strong> Minor variations in weight, finish, or design (common with handcrafted jewelry) are not considered defects.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Non-Returnable Items</h2>
            <p className="text-sm leading-relaxed mb-4">We cannot accept returns or refunds for:</p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Custom-made, engraved, or personalized jewelry</li>
              <li>• Items damaged due to improper handling after delivery</li>
              <li>• Products returned without prior authorization</li>
              <li>• Orders where tamper-proof packaging is broken or missing</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Refund Process</h2>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Once a refund is approved, it will be initiated within 3–5 business days.</li>
              <li>• Refunds are processed via the original payment method (card, UPI, bank transfer).</li>
              <li>• Refund timelines depend on your bank/payment provider (usually 5–10 business days).</li>
              <li>• For wholesale/export clients, refunds may be adjusted as credit notes for future orders, based on contractual terms.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Exceptions</h2>
            <p className="text-sm leading-relaxed mb-4">
              Refunds or cancellations will not apply in the following cases:
            </p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Delays caused by courier/logistics partners beyond our control</li>
              <li>• Daily fluctuations in gold/silver market rates affecting price differences</li>
              <li>• Change of mind after dispatch or acceptance of delivery</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Need Assistance?</h2>
            <p className="text-sm leading-relaxed mb-4">
              For support with cancellations, refunds, or return claims, please contact:
            </p>
            <div className="text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">JRB Gold Pvt Limited</p>
              <p>Address - No: 1539, 1st Floor,</p>
              <p>Soundar Complex, Vellore Road</p>
              <p>Near Anna Arch</p>
              <p>Thiruvannamalai</p>
              <p>Tamil Nadu - 606604</p>
              <p>Mobile - 82204 21317</p>
              <p>Email: jrbgoldprivateltd@gmail.com</p>
              <p>Email: inforjrb@gmail.com</p>
              <p>Website: https://www.jrbgold.co.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationRefund;
