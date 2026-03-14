interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'image' | 'card' | 'avatar' | 'button';
  lines?: number;
  width?: string;
  height?: string;
}

const SkeletonLoader = ({ 
  className = '', 
  variant = 'text', 
  lines = 1, 
  width = '100%', 
  height = 'auto' 
}: SkeletonLoaderProps) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]";
  
  const variantClasses = {
    text: "h-4 rounded",
    image: "rounded-lg",
    card: "rounded-xl",
    avatar: "rounded-full",
    button: "h-10 rounded-md"
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{ 
              width: i === lines - 1 ? '75%' : width,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    />
  );
};

export default SkeletonLoader;
