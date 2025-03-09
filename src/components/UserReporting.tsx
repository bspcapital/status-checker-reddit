import { useState } from 'react';
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const UserReporting = () => {
  const [isSubmitting, setIsSubmitting] = useState<'down' | 'issues' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track if the user has submitted a report

  const handleReport = async (type: 'down' | 'issues') => {
    try {
      setIsSubmitting(type);

      // Get the user's IP address (using a free IP API)
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const { ip: ip_address } = await ipResponse.json();


      const resp fetch('https://status-checker-backend.vercel.app/api/test')
      .then(response => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      // Send the report to the backend
      const response = await fetch(`${apiBaseUrl}/api/user-reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          website_id: 1, // Replace with the actual website ID
          status: type, // 'down' or 'issues'
          ip_address, // User's IP address
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to submit report');
      }

      // Show a success message
      toast.success(`Thanks for your report! We've recorded that Reddit is ${type === 'down' ? 'down' : 'experiencing issues'}.`);

      // Update the UI to show the "Thank you" message
      setHasSubmitted(true);
    } catch (error) {
      toast.error(error.message || 'Unable to submit your report. Please try again later.');
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <div className="bg-customGray p-4 rounded-lg shadow-lg w-full max-w-md mx-auto px-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
      <div className="bg-customGray glass rounded-2xl p-4 sm:p-6 border text-center">
        {hasSubmitted ? (
          <h3 className="text-base font-medium mb-4">Thank you for your input!</h3>
        ) : (
          <>
            <h3 className="text-base font-medium mb-4">Are you experiencing issues with Reddit?</h3>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => handleReport('down')}
                disabled={isSubmitting !== null}
                className={`
                  bg-customRed flex items-center px-4 py-2 rounded-lg border hover:shadow transition-all
                  ${isSubmitting === 'down' ? 'opacity-75 cursor-not-allowed bg-red-50' : 'hover:-translate-y-0.5 active:translate-y-0'}
                `}
              >
                <AlertCircle className="w-4 h-4 mr-2 text-status-down" />
                <span>Report Down</span>
              </button>

              <button
                onClick={() => handleReport('issues')}
                disabled={isSubmitting !== null}
                className={`
                  bg-customYellow flex items-center px-4 py-2 rounded-lg border hover:shadow transition-all
                  ${isSubmitting === 'issues' ? 'opacity-75 cursor-not-allowed bg-yellow-50' : 'hover:-translate-y-0.5 active:translate-y-0'}
                `}
              >
                <AlertTriangle className="w-4 h-4 mr-2 text-status-issues" />
                <span>Report Issues/Slow</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserReporting;