import { useSearchParams } from 'react-router-dom';

export default function PaymentDebug() {
  const [searchParams] = useSearchParams();
  
  // Get all parameters
  const allParams = Object.fromEntries(searchParams.entries());
  const urlString = window.location.href;
  const searchString = window.location.search;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Payment Callback Debug</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Full URL:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {urlString}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Search String:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {searchString}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Parsed Parameters:</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
              {JSON.stringify(allParams, null, 2)}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Individual Parameters:</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2 text-left">Parameter</th>
                  <th className="border border-gray-300 p-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(allParams).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border border-gray-300 p-2 font-mono">{key}</td>
                    <td className="border border-gray-300 p-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Required Parameters Check:</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${searchParams.get('ORDERID') || searchParams.get('orderid') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>ORDERID: {searchParams.get('ORDERID') || searchParams.get('orderid') || 'MISSING'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${searchParams.get('TXNID') || searchParams.get('txnid') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>TXNID: {searchParams.get('TXNID') || searchParams.get('txnid') || 'MISSING'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${searchParams.get('STATUS') || searchParams.get('status') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>STATUS: {searchParams.get('STATUS') || searchParams.get('status') || 'MISSING'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-full ${searchParams.get('TXNAMOUNT') || searchParams.get('txnamount') ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>TXNAMOUNT: {searchParams.get('TXNAMOUNT') || searchParams.get('txnamount') || 'MISSING'}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="/payment/callback" 
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block"
            >
              Go to Payment Callback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}