import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 500); // Delay before hiding loading screen
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random increment between 5-20
      });
    }, 100);

    // Preload logo
    const img = new Image();
    img.onload = () => setLogoLoaded(true);
    img.src = '/logo1.png?v=1';

    return () => clearInterval(progressInterval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-white via-amber-50 to-yellow-100 flex flex-col items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold-dark/20"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(202, 138, 4, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(202, 138, 4, 0.1) 0%, transparent 50%)`
          }}
        ></div>
      </div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative mb-6 xs:mb-8">
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-gold/20 animate-spin" 
               style={{ 
                 width: '120px', 
                 height: '120px',
                 animationDuration: '3s',
                 transform: 'scale(1.2)'
               }}>
          </div>
          <div className="absolute inset-0 rounded-full border-t-4 border-gold animate-spin" 
               style={{ 
                 width: '120px', 
                 height: '120px',
                 animationDuration: '1.5s',
                 transform: 'scale(1.2)'
               }}>
          </div>
          
          {/* Logo */}
          <div className={`relative transition-all duration-1000 ${logoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="w-20 h-20 xs:w-24 xs:h-24 lg:w-28 lg:h-28 bg-white rounded-full shadow-luxury flex items-center justify-center animate-pulse">
              <img 
                src="/logo1.png?v=1" 
                alt="JRB Gold Logo" 
                className="w-14 h-14 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain filter brightness-110 contrast-110"
                style={{ animation: 'logoGlow 2s ease-in-out infinite alternate' }}
              />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center mb-6 xs:mb-8">
          <h1 className="font-playfair text-2xl xs:text-3xl lg:text-4xl font-bold text-gold mb-2 animate-fade-in">
            JRB GOLD
          </h1>
          <p className="text-sm xs:text-base text-gray-600 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Premium Gold & Silver Jewelry
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 xs:w-64 lg:w-80 mb-4">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gold to-gold-dark transition-all duration-300 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-xs xs:text-sm text-gray-500 animate-pulse">
            {progress < 30 ? 'Loading...' : 
             progress < 60 ? 'Preparing your experience...' : 
             progress < 90 ? 'Almost ready...' : 
             'Welcome!'}
          </p>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold/30 rounded-full animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
