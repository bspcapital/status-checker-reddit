
import { useEffect, useRef, useState } from 'react';

interface AdPlacementProps {
  position: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const AdPlacement = ({ position, className = '' }: AdPlacementProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  
  useEffect(() => {
    // This is a placeholder for actual ad loading code
    // In a real implementation, you would initialize your ad library here
    const loadAd = setTimeout(() => {
      setAdLoaded(true);
    }, 1000);
    
    return () => clearTimeout(loadAd);
  }, []);
  
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'w-full h-[90px] mx-auto my-4';
      case 'bottom':
        return 'w-full h-[90px] mx-auto my-4';
      case 'left':
        return 'w-[160px] h-[600px] my-8 mx-auto';
      case 'right':
        return 'w-[160px] h-[600px] my-8 mx-auto';
      default:
        return 'w-full h-[90px] mx-auto my-4';
    }
  };
  
  return (
    <div 
      ref={adRef}
      className={`${getPositionStyles()} ${className} glass rounded-lg border overflow-hidden flex items-center justify-center transition-opacity duration-500 ${adLoaded ? 'opacity-100' : 'opacity-0'}`}
      data-ad-position={position}
    >
      <div className="text-xs text-muted-foreground opacity-70">
        Advertisement
      </div>
    </div>
  );
};

export default AdPlacement;
