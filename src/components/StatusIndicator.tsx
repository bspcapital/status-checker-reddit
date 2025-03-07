
import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Status } from '@/utils/statusData';

interface StatusIndicatorProps {
  status: Status;
  message: string;
}

const StatusIndicator = ({ status, message }: StatusIndicatorProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Reset the animation when status changes
    return () => setMounted(false);
  }, [status]);
  
  return (
    <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 space-y-2 animate-fade-in py-6 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-2">
        {status === 'up' && (
          <CheckCircle 
            className="h-16 w-16 md:h-20 md:w-20 text-status-up animate-pulse-slow" 
            strokeWidth={1.5} 
          />
        )}
        {status === 'down' && (
          <AlertCircle 
            className="h-16 w-16 md:h-20 md:w-20 text-status-down animate-pulse-slow" 
            strokeWidth={1.5} 
          />
        )}
        {status === 'issues' && (
          <AlertTriangle 
            className="h-16 w-16 md:h-20 md:w-20 text-status-issues animate-pulse-slow" 
            strokeWidth={1.5} 
          />
        )}
      </div>
      
      <h1 
        className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
          status === 'up' ? 'text-status-up' : 
          status === 'down' ? 'text-status-down' : 
          'text-status-issues'
        }`}
      >
        {message}
      </h1>
      
      <div className="flex items-center justify-center mt-3 gap-2">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary">
          <img 
            src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png" 
            alt="Reddit logo" 
            className="h-5 w-5"
          />
        </div>
        <span className="text-sm font-medium opacity-75">Reddit Status Checker</span>
      </div>
    </div>
  );
};

export default StatusIndicator;
