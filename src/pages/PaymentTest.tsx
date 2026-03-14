import { useSearchParams } from 'react-router-dom';

export default function PaymentTest() {
  const [searchParams] = useSearchParams();
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Test Page</h2>
        <p className="text-gray-600 mb-4">This page is working correctly.</p>
        
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">URL Parameters:</h3>
          <pre className="text-sm">
            {searchParams.toString() || 'No parameters'}
          </pre>
        </div>
        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">All Parameters:</h3>
          <div className="text-sm space-y-1">
            {Array.from(searchParams.entries()).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}