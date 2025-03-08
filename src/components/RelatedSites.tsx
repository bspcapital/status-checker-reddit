
const RelatedSites = () => {
  const sites = [
    { name: 'Is Facebook Down', url: 'https://isfacebookdown.net' },
    { name: 'Is YouTube Down', url: 'https://isyoutubedown.net' },
    { name: 'Is Twitter Down', url: 'https://istwitterdown.net' },
    { name: 'Is Instagram Down', url: 'https://isinstagramdown.net' },
    { name: 'Is Discord Down', url: 'https://isdiscorddown.net' },
    { name: 'Is Twitch Down', url: 'https://istwitchdown.net' }
  ];
  
  return (
    <div className="w-full animate-slide-up glass rounded-2xl p-4 sm:p-6 border border-primary/20 shadow-sm" style={{ animationDelay: '150ms' }}>
      <h3 className="text-center text-base font-medium mb-3">Check other sites:</h3>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2.5">
        {sites.map((site, index) => (
          <a
            key={index}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors duration-150"
          >
            {site.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default RelatedSites;
