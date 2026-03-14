import { useSearchParams } from 'react-router-dom';

export default function PaymentCallbackSimple() {
  const [searchParams] = useSearchParams();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Callback - Simple</h2>
        <p className="text-gray-600 mb-4">This is a simplified callback page for testing.</p>
        
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Current URL:</h3>
          <p className="text-sm break-all">{window.location.href}</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">URL Parameters:</h3>
          <pre className="text-sm">
            {searchParams.toString() || 'No parameters'}
          </pre>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">All Parameters:</h3>
          <div className="text-sm space-y-1">
            {Array.from(searchParams.entries()).length === 0 ? (
              <p className="text-gray-500">No parameters found</p>
            ) : (
              Array.from(searchParams.entries()).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}