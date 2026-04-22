import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { MediaPlaceholder } from './MediaPlaceholder';
import { extractVideoLinks, replaceVideoLinksWithPlaceholders, VideoLink } from '../utils/markdownProcessors';

interface MarkdownRendererProps {
  markdownPath: string;
  onHeadingsExtracted?: (headings: Array<{ id: string; title: string; level: number }>) => void;
}

export function MarkdownRenderer({ markdownPath, onHeadingsExtracted }: MarkdownRendererProps) {
  const [content, setContent] = useState<string>('');
  const [videoLinks, setVideoLinks] = useState<Map<string, VideoLink>>(new Map());

  useEffect(() => {
    fetch(markdownPath)
      .then(response => response.text())
      .then(text => {
        // Extract and replace video links with placeholders
        const links = new Map<string, VideoLink>();
        const processedText = replaceVideoLinksWithPlaceholders(text, links);

        setVideoLinks(links);
        setContent(processedText);

        // Extract headings for navigation
        if (onHeadingsExtracted) {
          const headings: Array<{ id: string; title: string; level: number }> = [];
          const lines = text.split('\n');

          lines.forEach(line => {
            const h2Match = line.match(/^## (.+)$/);
            const h3Match = line.match(/^### (.+)$/);
            const h4Match = line.match(/^#### (.+)$/);

            if (h2Match) {
              const title = h2Match[1];
              const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              headings.push({ id, title, level: 2 });
            } else if (h3Match) {
              const title = h3Match[1];
              const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              headings.push({ id, title, level: 3 });
            } else if (h4Match) {
              const title = h4Match[1];
              const id = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
              headings.push({ id, title, level: 4 });
            }
          });

          onHeadingsExtracted(headings);
        }
      })
      .catch(err => console.error('Error loading markdown:', err));
  }, [markdownPath, onHeadingsExtracted]);

  return (
    <div className="markdown-content prose prose-slate max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1
              className="font-semibold mb-8 mt-12 scroll-mt-24"
              style={{
                fontSize: 'var(--text-h1)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: '1.2'
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            const text = String(children).toUpperCase();
            return (
              <h2
                id={id}
                className="font-semibold mb-6 mt-12 scroll-mt-24 pb-4"
                style={{
                  fontSize: 'var(--text-h3)',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--primary)',
                  fontFamily: "'Source Sans 3', sans-serif",
                  borderBottom: '2px solid var(--border)',
                  letterSpacing: '0.5px'
                }}
              >
                {text}
              </h2>
            );
          },
          h3: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return (
              <h3
                id={id}
                className="font-semibold mb-4 mt-8 scroll-mt-24"
                style={{
                  fontSize: '20px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  fontFamily: "'Source Sans 3', sans-serif"
                }}
              >
                {children}
              </h3>
            );
          },
          h4: ({ children }) => {
            const id = String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            return (
              <h4
                id={id}
                className="font-semibold mb-3 mt-6 scroll-mt-24"
                style={{
                  fontSize: '18px',
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--foreground)',
                  fontFamily: "'Source Sans 3', sans-serif"
                }}
              >
                {children}
              </h4>
            );
          },
          p: ({ children }) => {
            // Check if this paragraph is a video placeholder
            const text = String(children);
            if (text.startsWith('__VIDEO_PLACEHOLDER_')) {
              const videoData = videoLinks.get(text);
              if (videoData) {
                return (
                  <div className="my-6">
                    <MediaPlaceholder type="video" title={videoData.title} url={videoData.url} />
                  </div>
                );
              }
            }

            return (
              <p
                className="mb-5 leading-relaxed"
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--foreground)',
                  fontFamily: "'Source Sans 3', sans-serif",
                  lineHeight: '1.6'
                }}
              >
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul className="mb-6 space-y-3 ml-6" style={{ listStyleType: 'disc', listStylePosition: 'outside' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 space-y-3 ml-6" style={{ listStyleType: 'decimal', listStylePosition: 'outside' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li
              className="leading-relaxed pl-2"
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: '1.6'
              }}
            >
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:underline transition-colors"
              style={{
                color: 'var(--primary)',
                fontSize: 'var(--text-base)',
                fontFamily: "'Source Sans 3', sans-serif"
              }}
            >
              {children}
              {href?.startsWith('http') && (
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded text-sm font-mono"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--foreground)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4"
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius-card)'
                }}
              >
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote
              className="pl-6 pr-6 py-4 my-6"
              style={{
                borderLeft: '4px solid var(--primary)',
                backgroundColor: 'rgba(214, 64, 0, 0.05)',
                borderRadius: 'var(--radius-card)',
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 'var(--text-base)',
                lineHeight: '1.6'
              }}
            >
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-8 rounded-lg" style={{ border: '1px solid var(--border)' }}>
              <table className="min-w-full border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead style={{ backgroundColor: 'var(--muted)' }}>
              {children}
            </thead>
          ),
          th: ({ children }) => (
            <th
              className="px-5 py-4 text-left font-semibold"
              style={{
                borderBottom: '2px solid var(--border)',
                fontSize: 'var(--text-label)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--foreground)',
                fontFamily: "'Source Sans 3', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              className="px-5 py-4"
              style={{
                borderBottom: '1px solid var(--border)',
                fontSize: 'var(--text-base)',
                color: 'var(--foreground)',
                fontFamily: "'Source Sans 3', sans-serif",
                lineHeight: '1.6'
              }}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-12" style={{
              border: 'none',
              borderTop: '1px solid var(--border)',
              opacity: 0.5
            }} />
          ),
          strong: ({ children }) => (
            <strong style={{
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--primary)'
            }}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
