import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import { Status } from '@/utils/statusData';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface StatusIndicatorProps {
  websiteId: number; // Pass the website ID as a prop
}

const StatusIndicator = ({ websiteId }: StatusIndicatorProps) => {
  const [status, setStatus] = useState<Status>('unknown'); // Default to 'unknown'
  const [message, setMessage] = useState('Loading...'); // Default message
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [lastPinged, setLastPinged] = useState<string | null>(null); // Timestamp state

  // Function to fetch status from the backend
  const fetchStatus = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/website-status?website_id=1`);
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }

      const data = await response.json();
      // Update status and message based on the API response
      setStatus(data.status || 'unknown');

      // Set the message based on the status
      switch (data.status) {
        case 'up':
          setMessage('Reddit appears to be operational.');
          break;
        case 'down':
          setMessage('Reddit appears to be down.');
          break;
        case 'issues':
          setMessage('Reddit is experiencing issues.');
          break;
        default:
          setMessage('Unknown status');
      }
      console.log(data.lastPinged);

      // Update the last pinged timestamp
      if (data.lastPinged) {
      const formattedTime = new Date(data.lastPinged).toLocaleTimeString(undefined, {
        hour: 'numeric', // e.g., "6"
        minute: '2-digit', // e.g., "45"
        second: '2-digit', // e.g., "00"
        hour12: true, // Use 12-hour format (e.g., "PM")
        timeZoneName: 'short', // Include timezone abbreviation (e.g., "EDT")
        });
        setLastPinged(formattedTime);
      } else {
        setLastPinged(null); // No timestamp available
      }

    } catch (err) {
      setError(err.message);
      setStatus('unknown');
      setMessage('Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts (page loads)
  useEffect(() => {
    fetchStatus();
  }, [websiteId]); // Re-fetch when websiteId changes

  // Fetch data every minute
  useEffect(() => {
    const interval = setInterval(() => {
      fetchStatus();
    }, 60000); // 60,000 milliseconds = 1 minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [websiteId]); // Re-set interval when websiteId changes

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
        <p className="mt-2 text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-6">
        <AlertCircle className="h-16 w-16 text-status-down" strokeWidth={1.5} />
        <h1 className="text-3xl md:text-4xl font-bold text-status-down">{message}</h1>
        <p className="text-sm text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 space-y-2 animate-fade-in py-6 mt-16 z-40`}>
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
        <span className="text-sm font-medium opacity-75">Reddit Status Checker
        {lastPinged && ` - last pinged at ${lastPinged}`}</span>
      </div>
    </div>
  );
};

export default StatusIndicator;