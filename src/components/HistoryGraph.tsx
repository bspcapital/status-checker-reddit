
import { useEffect, useState } from 'react';
import { DayStatus, formatDate } from '@/utils/statusData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface HistoryGraphProps {
  data: DayStatus[];
}

const HistoryGraph = ({ data }: HistoryGraphProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'up': return 'No issues';
      case 'down': return 'Downtime';
      case 'issues': return 'Issues reported';
      default: return 'Unknown status';
    }
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 animate-slide-up ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="glass rounded-2xl p-4 sm:p-6 border">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
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
            <p className="text-sm text-muted-foreground">99.99% uptime</p>
            <p className="text-sm text-muted-foreground">Today</p>
          </div>
        </div>
        
        <div className="relative h-12 mb-4">
          <div className="flex w-full h-10 gap-[1px]">
            <TooltipProvider>
              {data.map((day, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      className={`flex-1 h-10 ${
                        day.status === 'up' ? 'bg-[#8BC34A]' : 
                        day.status === 'down' ? 'bg-status-down/80' : 
                        'bg-status-issues/80'
                      }`}
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
      </div>
    </div>
  );
};

export default HistoryGraph;
