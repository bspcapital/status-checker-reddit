
import { useState, useEffect } from 'react';
import StatusIndicator from '@/components/StatusIndicator';
import HistoryGraph from '@/components/HistoryGraph';
import UserReporting from '@/components/UserReporting';
import RelatedSites from '@/components/RelatedSites';
import ReportStatistics from '@/components/ReportStatistics';
import SocialShare from '@/components/SocialShare';
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
      <div className="w-full flex justify-center mt-6 relative">
        <SocialShare title="Is Reddit Down⚡Live Status & Outage Reports | IsRedditDown.net" />
      </div>
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center -mt-20 py-0 px-4 max-w-4xl mx-auto w-full pb-20">
        {/* Top Ad */}
      {/*
        <div className="w-full mb-3">
          <AdPlacement position="top" />
        </div> */}

        {/* SEO Headings */}
        <header className="w-full text-center">
          {/* Main Heading (H1) */}
          <h1 className="text-3xl font-semibold mb-2 sr-only">
            Is Reddit Down? Live Status & Outage Reports
          </h1>
          {/* Sub Heading (H2) */}
          <h2 className="text-xl mb-4 sr-only">
            Stay informed with real-time Reddit server status and historical data.
          </h2>
        </header>
       
        {/* Status Indicator */}
        <div className="w-full mb-3">
          <h2 className="sr-only">Current Status</h2>
          <StatusIndicator websiteId={1} />
        </div>
        
        {/* History Graph */}
        <div className="w-full mb-3">
          <h2 className="sr-only">Outage History</h2>
          <HistoryGraph websiteId={1} />
        </div>

        {/* User Reporting */}
        <div className="w-full mb-3">
          <h2 className="sr-only">Report an Issue</h2>
          <UserReporting />
        </div>
        
        {/* City Statistics */}
        <div className="w-full mb-3">
          <h2 className="sr-only">Report Statistics</h2>
          <ReportStatistics />
        </div>
                
        {/* Related Sites - with increased visibility */}
        <div className="w-full mb-4 mt-1">
          <h2 className="sr-only">Related Sites</h2>
          <RelatedSites />
        </div>
        
        {/* Bottom Ad */}
        {/*
        <div className="w-full mb-3">
          <AdPlacement position="bottom" />
        </div> */}
      </main>
      
      {/* Desktop Side Ads */}
      {/*
      {!isMobile && (
        <>
          <div className="fixed top-1/2 left-0 transform -translate-y-1/2 hidden lg:block">
            <AdPlacement position="left" />
          </div>
          <div className="fixed top-1/2 right-0 transform -translate-y-1/2 hidden lg:block">
            <AdPlacement position="right" />
          </div>
        </> */}
      
    </div>
  );
};

export default Index;
