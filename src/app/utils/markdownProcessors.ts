export interface VideoLink {
  title: string;
  url: string;
}

export function extractVideoLinks(markdown: string): Map<string, VideoLink> {
  const videoLinks = new Map<string, VideoLink>();
  const lines = markdown.split('\n');

  const videoKeywords = ['vídeo', 'video', 'assistir', 'watch', 'Clique para assistir'];

  lines.forEach((line, index) => {
    // Match markdown links: [text](url)
    const linkMatches = line.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g);

    for (const match of linkMatches) {
      const text = match[1];
      const url = match[2];

      // Check if this is a video link
      const isVideo = videoKeywords.some(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
      );

      if (isVideo && url) {
        const placeholder = `__VIDEO_PLACEHOLDER_${index}__`;
        videoLinks.set(placeholder, { title: text, url });
      }
    }
  });

  return videoLinks;
}

export function replaceVideoLinksWithPlaceholders(markdown: string, videoLinks: Map<string, VideoLink>): string {
  let processedMarkdown = markdown;
  let placeholderIndex = 0;

  const lines = processedMarkdown.split('\n');
  const videoKeywords = ['vídeo', 'video', 'assistir', 'watch', 'Clique para assistir'];

  const processedLines = lines.map((line, index) => {
    // Check if line contains only a video link (with optional bold markers)
    const linkMatch = line.match(/^\*\*([^*]+):\*\*\s*\[([^\]]+)\]\(([^)]+)\)$/);
    const simpleLinkMatch = line.match(/^-?\s*\*?\*?\[([^\]]+)\]\(([^)]+)\)\*?\*?$/);

    if (linkMatch) {
      const [, label, text, url] = linkMatch;
      const isVideo = videoKeywords.some(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
      );

      if (isVideo) {
        const placeholder = `__VIDEO_PLACEHOLDER_${placeholderIndex}__`;
        videoLinks.set(placeholder, { title: text, url });
        placeholderIndex++;
        return placeholder;
      }
    } else if (simpleLinkMatch) {
      const [, text, url] = simpleLinkMatch;
      const isVideo = videoKeywords.some(keyword =>
        text.toLowerCase().includes(keyword.toLowerCase())
      );

      if (isVideo) {
        const placeholder = `__VIDEO_PLACEHOLDER_${placeholderIndex}__`;
        videoLinks.set(placeholder, { title: text, url });
        placeholderIndex++;
        return placeholder;
      }
    }

    return line;
  });

  return processedLines.join('\n');
}
