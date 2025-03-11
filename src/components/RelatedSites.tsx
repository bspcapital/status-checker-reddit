import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';


const RelatedSites = () => {
  const sites = [
    { name: 'Is TikTok Down', url: 'https://istiktokdown.net' },
  ];
  const [dialogOpen, setDialogOpen] = useState(false);
  
  return (
    <div className="w-full max-w-md mx-auto animate-slide-up glass rounded-2xl p-4 border border-primary/20 shadow-sm" style={{ animationDelay: '150ms' }}>
      <div className="text-center">
        <Button 
          onClick={() => setDialogOpen(true)} 
          variant="secondary" 
          className="mx-auto"
        >
          Check Other Sites
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Check if TikTok's down, more to come!</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {sites.map((site, index) => (
                <a
                  key={index}
                  href="https://istiktokdown.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-colors duration-150 flex items-center"
                >
                <img
                  src="/favicon2.png" // Path to your image in the public folder
                  alt="TikTok Icon"
                  className="mr-2 h-6 w-6" // Optional: adjust size and spacing
                />
                  Is TikTok Down – Live Status Checker
                </a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RelatedSites;
