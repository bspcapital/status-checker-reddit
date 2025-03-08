
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
      <main className="flex-1 flex flex-col items-center py-4 md:py-6 px-4 max-w-4xl mx-auto w-full">
        {/* Top Ad */}
        <div className="w-full mb-4">
          {!isMobile && <AdPlacement position="top" />}
        </div>
        
        {/* Status Indicator */}
        <div className="w-full mb-4">
          <StatusIndicator status={currentStatus.status} message={currentStatus.message} />
        </div>
        
        {/* History Graph */}
        <div className="w-full mb-4">
          <HistoryGraph data={historyData} />
        </div>
        
        {/* City Statistics */}
        <div className="w-full mb-4">
          <ReportStatistics />
        </div>
        
        {/* User Reporting */}
        <div className="w-full mb-4">
          <UserReporting />
        </div>
        
        {/* Related Sites - with increased visibility */}
        <div className="w-full mb-6 mt-2">
          <RelatedSites />
        </div>
        
        {/* Mobile Bottom Ad */}
        {isMobile && (
          <div className="w-full mb-4">
            <AdPlacement position="bottom" />
          </div>
        )}
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
      
      {/* Bottom Ad for desktop */}
      {!isMobile && (
        <div className="w-full max-w-4xl mx-auto mb-4">
          <AdPlacement position="bottom" />
        </div>
      )}
    </div>
  );
};

export default Index;
