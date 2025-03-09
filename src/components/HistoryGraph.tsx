import { useEffect, useState } from 'react';
import { DayStatus, formatDate } from '@/utils/statusData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

interface HistoryGraphProps {
  websiteId: number; // Pass the website ID as a prop
}

const HistoryGraph = ({ websiteId }: HistoryGraphProps) => {
  const [mounted, setMounted] = useState(false);
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [data, setData] = useState<DayStatus[]>([]);
  const [uptimePercentage, setUptimePercentage] = useState<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    fetchHistoryData();
  }, [websiteId]);

  const fetchHistoryData = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/website-status?website_id=${websiteId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch history data');
      }
      const { history } = await response.json();
      setData(history);

      // Calculate uptime percentage
      const totalDays = history.length;
      const upDays = history.filter((day) => day.status === 'up').length;
      const uptime = ((upDays / totalDays) * 100).toFixed(2); // Uptime percentage with 2 decimal places
      setUptimePercentage(parseFloat(uptime));
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'up': return 'No issues';
      case 'down': return 'Downtime';
      case 'issues': return 'Issues reported';
      default: return 'Unknown status';
    }
  };

  const handleBlockClick = (index: number) => {
    if (isMobile) {
      setOpenTooltipIndex(openTooltipIndex === index ? null : index);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto px-4 animate-slide-up ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="glass rounded-2xl p-4 sm:p-6 border">
        <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-0">
              <img 
                src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png" 
                alt="Reddit logo" 
                className="h-5 w-5"
              />
              <span className="font-medium">reddit.com</span>
            </div>
            <p className="text-sm text-status-up font-medium mt-1">Operational</p>
          </div>
          <div className="text-right">
            {/* Display dynamic uptime percentage */}
            <p className="text-sm text-muted-foreground">{uptimePercentage !== null ? `${uptimePercentage}% uptime in the past 90 days.` : 'Calculating uptime...'}</p>
          </div>
        </div>
        
        <div className="relative h-12 mb-4">
          <div className="flex w-full h-10 gap-[1px]">
            <TooltipProvider>
              {data.map((day, index) => (
                <Tooltip key={index} open={isMobile ? openTooltipIndex === index : undefined}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex-1 h-10 ${
                        day.status === 'up' ? 'bg-[#8BC34A]' : 
                        day.status === 'down' ? 'bg-status-down/80' : 
                        'bg-status-issues/80'}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getStatusText(day.status)} on {formatDate(day.date)}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
        {/* Updated 90 days ago/Today line */}
        <div className="text-center text-sm text-muted-foreground mt-2">
          <div className="flex justify-between items-center">
            <span>Past 90 Days</span>
            <span>Today</span>
          </div>
          <div className="w-full border-t border-muted-foreground mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default HistoryGraph;