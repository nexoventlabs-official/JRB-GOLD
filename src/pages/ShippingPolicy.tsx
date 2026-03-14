import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Policy</h1>
          <p className="text-lg text-gray-600 mb-8">Secure, Insured, and On-Time Delivery – Every Time</p>

          <div className="prose prose-gray max-w-none">
            <p className="text-sm leading-relaxed mb-6">
              At JRB Gold Pvt Limited, we are committed to delivering your jewelry safely, securely, and within the promised timeframe. Whether it's a single ornament or a bulk wholesale consignment, every shipment is handled with utmost care, reflecting our values of transparency and trust.
            </p>

            <p className="text-sm leading-relaxed mb-6">
              This Shipping Policy outlines our order processing, delivery timelines, logistics, and support.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Order Processing Time</h2>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• <strong>Retail Orders:</strong> Processing begins once payment is confirmed. Standard processing time is 1–3 business days, which includes quality checks, secure packing, and logistics handover.</li>
              <li>• <strong>Custom/Personalized Orders:</strong> These may require extended preparation time depending on design complexity. Estimated timelines will be communicated at the time of order confirmation.</li>
              <li>• <strong>Bulk/Wholesale Orders:</strong> Large or export orders may require 7–14 business days for preparation, documentation, and coordination.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Shipping Destinations & Delivery Timelines</h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Domestic (India)</h3>
            <ul className="text-sm space-y-2 mb-4 ml-6">
              <li>• <strong>Metro Cities:</strong> 2–5 business days post-dispatch</li>
              <li>• <strong>Non-Metro & Rural Areas:</strong> 5–8 business days post-dispatch</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">International</h3>
            <p className="text-sm leading-relaxed mb-4">
              We serve select global destinations for wholesale and export clients:
            </p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• <strong>Asia & Middle East:</strong> 7–12 business days</li>
              <li>• <strong>Europe & North America:</strong> 10–20 business days</li>
              <li>• <strong>Other Regions:</strong> Based on courier and customs processes</li>
            </ul>
            <p className="text-sm leading-relaxed mb-6">
              <strong>Note:</strong> Delivery times are estimates. Customs, local regulations, or courier delays may extend timelines.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Shipping Charges</h2>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• <strong>Domestic Orders:</strong> Shipping charges are calculated based on order value, weight, and destination. Free shipping may be offered on select orders above a specified value (announced via promotions).</li>
              <li>• <strong>International Orders:</strong> Charges depend on destination country, weight, insurance, and applicable duties/taxes. All applicable import duties or customs fees are the buyer's responsibility.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Packaging & Security</h2>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• All jewelry is packed in tamper-proof, sealed packaging with discreet labeling for security.</li>
              <li>• Shipments are insured up to the value of the order.</li>
              <li>• Tracking details are shared via SMS, WhatsApp, or email upon dispatch.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Tracking Your Order</h2>
            <p className="text-sm leading-relaxed mb-4">Once dispatched, you will receive:</p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• A tracking number</li>
              <li>• A link to monitor your shipment's status in real time</li>
              <li>• Updates on estimated delivery timelines</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Delays & Exceptions</h2>
            <p className="text-sm leading-relaxed mb-4">Delivery may be delayed due to:</p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• National holidays or festivals</li>
              <li>• Courier or logistics partner disruptions</li>
              <li>• Customs clearance (for exports)</li>
              <li>• Unforeseen circumstances beyond our control (natural calamities, strikes, etc.)</li>
            </ul>
            <p className="text-sm leading-relaxed mb-6">
              In such cases, we will proactively update you on revised timelines.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Wholesale & Export Orders</h2>
            <p className="text-sm leading-relaxed mb-4">For bulk/B2B shipments, our logistics team provides:</p>
            <ul className="text-sm space-y-2 mb-6 ml-6">
              <li>• Export documentation support (Invoice, Packing List, Certificates if required)</li>
              <li>• Secure consignment packing with valuation reports</li>
              <li>• Coordination with client-nominated freight partners (if applicable)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Need Help?</h2>
            <p className="text-sm leading-relaxed mb-4">
              For shipping-related queries or support, please contact:
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

export default ShippingPolicy;
