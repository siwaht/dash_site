export interface VideoPlayerConfig {
  type: 'direct' | 'embed';
  url: string;
}

export function getVideoPlayerConfig(url: string): VideoPlayerConfig {
  if (!url) {
    return { type: 'direct', url: '' };
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes('gumlet.tv') || hostname.includes('gumlet.io')) {
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      const videoId = pathParts[pathParts.length - 1];
      if (videoId) {
        return {
          type: 'embed',
          url: `https://play.gumlet.io/embed/${videoId}`
        };
      }
    }

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = '';
      if (hostname.includes('youtube.com')) {
        videoId = urlObj.searchParams.get('v') || '';
      } else {
        videoId = urlObj.pathname.slice(1);
      }
      return {
        type: 'embed',
        url: `https://www.youtube.com/embed/${videoId}`
      };
    }

    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
      return {
        type: 'embed',
        url: `https://player.vimeo.com/video/${videoId}`
      };
    }

    if (hostname.includes('dailymotion.com')) {
      const videoId = urlObj.pathname.split('/').pop();
      return {
        type: 'embed',
        url: `https://www.dailymotion.com/embed/video/${videoId}`
      };
    }

    return { type: 'direct', url };
  } catch {
    return { type: 'direct', url };
  }
}
