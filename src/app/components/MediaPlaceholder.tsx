import { Play, Image as ImageIcon } from 'lucide-react';

interface MediaPlaceholderProps {
  type: 'video' | 'image';
  title?: string;
  url?: string;
}

export function MediaPlaceholder({ type, title, url }: MediaPlaceholderProps) {
  const Icon = type === 'video' ? Play : ImageIcon;

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-lg border overflow-hidden ${url ? 'cursor-pointer transition-all hover:shadow-md' : ''}`}
      onClick={handleClick}
      style={{
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
        borderWidth: '1px'
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(214, 64, 0, 0.03) 0%, rgba(214, 64, 0, 0.08) 100%)'
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center transition-transform hover:scale-110"
          style={{
            backgroundColor: 'rgba(214, 64, 0, 0.1)',
            border: '2px solid rgba(214, 64, 0, 0.2)'
          }}
        >
          <Icon
            className="w-10 h-10"
            style={{ color: 'var(--primary)' }}
          />
        </div>

        {title && (
          <div className="flex flex-col items-center gap-2">
            <p
              className="text-center font-semibold max-w-md"
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                fontFamily: "'Source Sans 3', sans-serif"
              }}
            >
              {title}
            </p>

            {url && (
              <p
                className="text-center"
                style={{
                  fontSize: 'var(--text-label)',
                  color: 'var(--muted-foreground)',
                  fontFamily: "'Source Sans 3', sans-serif"
                }}
              >
                Clique para {type === 'video' ? 'assistir' : 'ver imagem'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
