
import { useState, useEffect } from 'react';

interface CityReport {
  city: string;
  state: string;
  count: number;
}

const ReportStatistics = () => {
  const [topCities, setTopCities] = useState<CityReport[]>([
    { city: 'Los Angeles', state: 'CA', count: 50 },
    { city: 'New York', state: 'NY', count: 42 },
    { city: 'Chicago', state: 'IL', count: 36 }
  ]);
  
  // In a real implementation, this would fetch data from your Supabase database
  useEffect(() => {
    // Mock data for demonstration
    // Replace with actual Supabase query in production
    const fetchTopCities = async () => {
      try {
        // Simulating data fetch
        // const { data, error } = await supabase
        //  .from('reports')
        //  .select('city, state, count')
        //  .order('count', { ascending: false })
        //  .limit(3);
        
        // For now, we'll use the mock data initialized in state
      } catch (error) {
        console.error('Error fetching report statistics:', error);
      }
    };
    
    fetchTopCities();
  }, []);
  
  return (
    <div className="w-full max-w-3xl mx-auto px-4 animate-slide-up" style={{ animationDelay: '75ms' }}>
      <div className="glass rounded-2xl p-4 sm:p-6 border">
        <ul className="list-disc pl-5 space-y-1">
          {topCities.map((city, index) => (
            <li key={index} className="text-sm">
              <span className="font-medium">{city.count}</span> users from {city.city}, {city.state} have reported issues with Reddit today.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReportStatistics;
