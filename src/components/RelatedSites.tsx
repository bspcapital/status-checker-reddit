
const RelatedSites = () => {
  const sites = [
    { name: 'Is Facebook Down', url: 'https://isfacebookdown.net' },
    { name: 'Is YouTube Down', url: 'https://isyoutubedown.net' },
    { name: 'Is Twitter Down', url: 'https://istwitterdown.net' },
    { name: 'Is Instagram Down', url: 'https://isinstagramdown.net' },
  ];
  
  return (
    <div className="w-full animate-slide-up" style={{ animationDelay: '150ms' }}>
      <div className="text-center text-sm text-muted-foreground">
        <div className="mb-1">Check other sites:</div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {sites.map((site, index) => (
            <a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline transition-colors duration-150"
            >
              {site.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedSites;
