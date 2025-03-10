import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const RelatedSites = () => {
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
            <DialogTitle className="text-center">Coming Soon!</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-muted-foreground">
            This feature is currently in development and will be available soon.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RelatedSites;
