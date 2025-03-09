import { useState, useEffect } from 'react';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface CityReport {
  city: string;
  state: string;
  downCount: number; // Number of "down" reports
  issuesCount: number; // Number of "issues" reports
}

const ReportStatistics = () => {
  const [topCities, setTopCities] = useState<CityReport[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [hasReportsToday, setHasReportsToday] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchReportStatistics = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch(`${apiBaseUrl}/api/website-status?website_id=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch report statistics');
        }

        const data = await response.json();

        // Check if there are any reports today
        setHasReportsToday(data.hasReportsToday);

        // Convert locationCount to an array of CityReport objects
        const topCities = Object.entries(data.locationCount)
          .map(([key, counts]) => {
            const [city, state] = key.split(', ');
            const downCount = counts.down; // Number of "down" reports
            const issuesCount = counts.issues; // Number of "issues" reports
            return { city, state, downCount, issuesCount };
          })
          .sort((a, b) => (b.downCount + b.issuesCount) - (a.downCount + a.issuesCount)) // Sort by total reports (descending)
          .slice(0, 3); // Limit to top 3 cities

        setTopCities(topCities);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportStatistics();
  }, []);

  // Get today's date, time, and timezone abbreviation
  const getTimezoneAbbreviation = (date: Date, timezone: string) => {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    timeZoneName: 'short',
  })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value;
  };
  const today = new Date();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timezoneAbbreviation = getTimezoneAbbreviation(today, timezone); // Get the abbreviation
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: timezone,
  });
  const formattedTime = today.toLocaleTimeString('en-US', {
    hour: 'numeric', // 1, 2, ..., 12
    minute: '2-digit', // 04, 05, ..., 59
    hour12: true, // Use 12-hour format
    timeZone: timezone, // Use the user's timezone
  });

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 animate-slide-up" style={{ animationDelay: '75ms' }}>
        <div className="glass rounded-2xl p-4 sm:p-6 border">
          <p className="text-sm text-gray-600">Loading report statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 animate-slide-up" style={{ animationDelay: '75ms' }}>
        <div className="glass rounded-2xl p-4 sm:p-6 border">
          <p className="text-sm text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 animate-slide-up" style={{ animationDelay: '75ms' }}>
      <div className="glass rounded-2xl p-4 sm:p-6 border">
        {/* Display today's reports message */}
        {hasReportsToday === false && (
          <div className="text-center text-sm text-gray-500 mb-4">
            No users have reported issues with Reddit today (as of {formattedDate}, {formattedTime} {timezoneAbbreviation}).
          </div>
        )}

        {/* Display top 3 cities */}
        <ul className="list-disc pl-5 space-y-1">
          {topCities.map((city, index) => (
            <li key={index} className="text-sm">
              {/* Display "down" reports */}
              {city.downCount > 0 && (
                <p>
                  <span className="font-medium">{city.downCount}</span> users from {city.city}, {city.state} reported that Reddit was <span className="text-status-down font-medium">down</span> today.
                </p>
              )}
              {/* Display "issues" reports */}
              {city.issuesCount > 0 && (
                <p>
                  <span className="font-medium">{city.issuesCount}</span> users from {city.city}, {city.state} reported <span className="text-status-issues font-medium">issues</span> with Reddit today.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportStatistics;