
import { Facebook, Youtube, Twitter, Instagram, MessageSquare, Twitch } from 'lucide-react';

const RelatedSites = () => {
  const sites = [
    { name: 'Facebook', url: 'https://isfacebookdown.net', icon: <Facebook size={16} /> },
    { name: 'YouTube', url: 'https://isyoutubedown.net', icon: <Youtube size={16} /> },
    { name: 'Twitter', url: 'https://istwitterdown.net', icon: <Twitter size={16} /> },
    { name: 'Instagram', url: 'https://isinstagramdown.net', icon: <Instagram size={16} /> },
    { name: 'Discord', url: 'https://isdiscorddown.net', icon: <MessageSquare size={16} /> },
    { name: 'Twitch', url: 'https://istwitchdown.net', icon: <Twitch size={16} /> }
  ];
  
  return (
    <div className="w-full max-w-md mx-auto animate-slide-up glass rounded-2xl p-4 border border-primary/20 shadow-sm" style={{ animationDelay: '150ms' }}>
      <h3 className="text-center text-base font-medium mb-3">Check other sites:</h3>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 overflow-y-auto max-h-[150px] py-1">
        {sites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
          >
            {site.icon}
            <span>{site.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedSites;
