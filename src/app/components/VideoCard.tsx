import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  videoUrl: string;
  description?: string;
}

export function VideoCard({ title, thumbnail, videoUrl, description }: VideoCardProps) {
  const handleClick = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="relative cursor-pointer group overflow-hidden rounded-[var(--radius-card)] shadow-[var(--elevation-md)] transition-transform hover:scale-[1.02]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Assistir vídeo: ${title}`}
    >
      {/* 16:9 Aspect Ratio Container */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="p-4 bg-card">
        <h3
          className="font-semibold mb-1"
          style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}
        >
          {title}
        </h3>
        {description && (
          <p
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-label)' }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
