import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate page loading
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [location.pathname, children]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-8 h-8 xs:w-10 xs:h-10 border-4 border-gold/20 rounded-full animate-spin">
                <div className="absolute inset-0 border-t-4 border-gold rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 animate-pulse">Loading...</p>
          </div>
        </div>
      )}
      
      <div className={`transition-all duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {displayChildren}
      </div>
    </div>
  );
};

export default PageTransition;
