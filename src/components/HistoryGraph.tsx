
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
      case 'up': return 'No issues';
      case 'down': return 'Down';
      case 'issues': return 'Having issues';
      default: return 'Unknown status';
    }
  };
  
  const handleDayMouseEnter = (day: DayStatus, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setTooltipPosition({ 
      x: rect.left + rect.width / 2, 
      y: rect.top - 10 
    });
    setTooltipContent(`${getStatusText(day.status)} on ${formatDate(day.date)}`);
    setShowTooltip(true);
  };
  
  const handleDayMouseLeave = () => {
    setShowTooltip(false);
  };
  
  return (
    <div className={`w-full max-w-3xl mx-auto px-4 animate-slide-up ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="glass rounded-2xl p-4 sm:p-6 border">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">90-Day History</h2>
          <p className="text-sm text-muted-foreground">Status history for the past 90 days</p>
        </div>
        
        <div className="grid grid-cols-15 sm:grid-cols-18 md:grid-cols-30 gap-1 sm:gap-1.5">
          {data.map((day, index) => (
            <div
              key={index}
              className={`history-day aspect-square rounded cursor-pointer ${
                day.status === 'up' ? 'bg-status-up/80' : 
                day.status === 'down' ? 'bg-status-down/80' : 
                'bg-status-issues/80'
              }`}
              onMouseEnter={(e) => handleDayMouseEnter(day, e)}
              onMouseLeave={handleDayMouseLeave}
              style={{ animationDelay: `${index * 10}ms` }}
            />
          ))}
        </div>
        
        <div className="flex justify-between mt-3 text-xs text-muted-foreground">
          <span>90 days ago</span>
          <span>Today</span>
        </div>
        
        {showTooltip && (
          <div 
            className="fixed z-50 bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm shadow-md animate-scale"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 35}px`,
              transform: 'translateX(-50%)'
            }}
          >
            {tooltipContent}
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-popover transform rotate-45 translate-y-1/2 -translate-x-1/2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryGraph;
