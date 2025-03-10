
import { useState, useEffect } from 'react';
import StatusIndicator from '@/components/StatusIndicator';
import HistoryGraph from '@/components/HistoryGraph';
import UserReporting from '@/components/UserReporting';
import RelatedSites from '@/components/RelatedSites';
import ReportStatistics from '@/components/ReportStatistics';
import AdPlacement from '@/components/AdPlacement';
import { getCurrentStatus, historyData } from '@/utils/statusData';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [currentStatus, setCurrentStatus] = useState(getCurrentStatus());
  const isMobile = useIsMobile();
  
  // In a real app, you would poll or use websockets to get real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStatus(getCurrentStatus());
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center py-4 px-4 max-w-4xl mx-auto w-full pb-20">
        {/* Top Ad */}
        <div className="w-full mb-3">
          <AdPlacement position="top" />
        </div>

        {/* SEO Headings */}
        <header className="w-full mb-6 text-center text-background">
          {/* Main Heading (H1) */}
          <h1 className="text-3xl font-semibold mb-2">
            Is Reddit Down? Live Status & Outage Reports
          </h1>
          {/* Sub Heading (H2) */}
          <h2 className="text-xl mb-4">
            Stay informed with real-time Reddit server status and historical data.
          </h2>
        </header>
        
        {/* Status Indicator */}
        <div className="w-full mb-3">
          <StatusIndicator websiteId={1} />
        </div>
        
        {/* History Graph */}
        <div className="w-full mb-3">
          <HistoryGraph websiteId={1} />
        </div>

        {/* User Reporting */}
        <div className="w-full mb-3">
          <UserReporting />
        </div>
        
        {/* City Statistics */}
        <div className="w-full mb-3">
          <ReportStatistics />
        </div>
                
        {/* Related Sites - with increased visibility */}
        <div className="w-full mb-4 mt-1">
          <RelatedSites />
        </div>
        
        {/* Bottom Ad */}
        <div className="w-full mb-3">
          <AdPlacement position="bottom" />
        </div>
      </main>
      
      {/* Desktop Side Ads */}
      {!isMobile && (
        <>
          <div className="fixed top-1/2 left-0 transform -translate-y-1/2 hidden lg:block">
            <AdPlacement position="left" />
          </div>
          <div className="fixed top-1/2 right-0 transform -translate-y-1/2 hidden lg:block">
            <AdPlacement position="right" />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
