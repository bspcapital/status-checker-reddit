
import { useState } from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { submitUserReport } from '@/utils/statusData';

const UserReporting = () => {
  const [isSubmitting, setIsSubmitting] = useState<'down' | 'slow' | null>(null);
  
  const handleReport = async (type: 'down' | 'slow') => {
    try {
      setIsSubmitting(type);
      await submitUserReport(type);
      toast.success(`Thanks for your report! We've recorded that Reddit is ${type === 'down' ? 'down' : 'slow'}.`);
    } catch (error) {
      toast.error('Unable to submit your report. Please try again later.');
    } finally {
      setIsSubmitting(null);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto px-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="glass rounded-2xl p-4 sm:p-6 border text-center">
        <h3 className="text-base font-medium mb-4">Are you experiencing issues with Reddit?</h3>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleReport('down')}
            disabled={isSubmitting !== null}
            className={`
              flex items-center px-4 py-2 rounded-lg border hover:shadow transition-all
              ${isSubmitting === 'down' ? 'opacity-75 cursor-not-allowed bg-red-50' : 'hover:-translate-y-0.5 active:translate-y-0'}
            `}
          >
            <AlertCircle className="w-4 h-4 mr-2 text-status-down" />
            <span>Report Down</span>
          </button>
          
          <button
            onClick={() => handleReport('slow')}
            disabled={isSubmitting !== null}
            className={`
              flex items-center px-4 py-2 rounded-lg border hover:shadow transition-all
              ${isSubmitting === 'slow' ? 'opacity-75 cursor-not-allowed bg-yellow-50' : 'hover:-translate-y-0.5 active:translate-y-0'}
            `}
          >
            <AlertTriangle className="w-4 h-4 mr-2 text-status-issues" />
            <span>Report Slow</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserReporting;
