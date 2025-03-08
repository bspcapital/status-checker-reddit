
import { useEffect, useState } from 'react';
import { DayStatus, formatDate } from '@/utils/statusData';

interface HistoryGraphProps {
  data: DayStatus[];
}

const HistoryGraph = ({ data }: HistoryGraphProps) => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const getStatusText = (status: string): string => {
    switch (status) {
      case 'up': return 'No downtime recorded on this day';
      case 'down': return 'Downtime recorded';
      case 'issues': return 'Issues reported';
      default: return 'Unknown status';
    }
  };
  
  const handleDayMouseEnter = (day: DayStatus, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({ 
      x: rect.left + rect.width / 2, 
      y: rect.top - 10 
    });
    
    const date = new Date(day.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    setTooltipContent(`${formattedDate}\n${getStatusText(day.status)}`);
    setShowTooltip(true);
  };
  
  const handleDayMouseLeave = () => {
    setShowTooltip(false);
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
            {data.map((day, index) => (
              <div
                key={index}
                className={`flex-1 h-10 ${
                  day.status === 'up' ? 'bg-[#8BC34A]' : 
                  day.status === 'down' ? 'bg-status-down/80' : 
                  'bg-status-issues/80'
                }`}
                onMouseEnter={(e) => handleDayMouseEnter(day, e)}
                onMouseLeave={handleDayMouseLeave}
              />
            ))}
          </div>
        </div>
        
        {showTooltip && (
          <div 
            className="fixed z-50 bg-white text-black px-4 py-3 rounded-md text-sm shadow-md whitespace-pre-line border"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 75}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryGraph;
