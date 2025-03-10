import { Share2, Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface SocialShareProps {
  title?: string;
  url?: string;
}

const SocialShare = ({ title = 'Reddit Status Check', url = window.location.href }: SocialShareProps) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
    window.open(twitterUrl, '_blank');
  };
  
  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(facebookUrl, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard",
        duration: 3000,
      });
      setTimeout(() => setIsCopied(false), 3000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      toast({
        title: "Copy failed",
        description: "Could not copy the link to clipboard",
        variant: "destructive",
        duration: 3000,
      });
    });
  };
  
  return (
    <div className="social-share my-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
            <Facebook className="mr-2 h-4 w-4" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
            <LinkIcon className="mr-2 h-4 w-4" />
            <span>Copy link</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SocialShare;