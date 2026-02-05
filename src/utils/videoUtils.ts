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

    if (hostname.includes('gumlet.tv') || hostname.includes('gumlet.io') || hostname.includes('play.gumlet')) {
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      // Handle URLs like /watch/694c0f24b122cbf1763ce88c/ or /embed/694c0f24b122cbf1763ce88c
      let videoId = '';
      const watchIndex = pathParts.indexOf('watch');
      const embedIndex = pathParts.indexOf('embed');
      
      if (watchIndex !== -1 && pathParts[watchIndex + 1]) {
        videoId = pathParts[watchIndex + 1];
      } else if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
        videoId = pathParts[embedIndex + 1];
      } else {
        // Fallback: get last non-empty segment
        videoId = pathParts[pathParts.length - 1];
      }
      
      if (videoId) {
        // Add autoplay, loop, muted, and preload params for continuous playback like siwaht.com
        return {
          type: 'embed',
          url: `https://play.gumlet.io/embed/${videoId}?autoplay=true&loop=true&muted=true&preload=true`
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
      // Add autoplay, loop, mute params for continuous playback
      return {
        type: 'embed',
        url: `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}`
      };
    }

    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').filter(Boolean).pop();
      // Add autoplay, loop, muted params for continuous playback
      return {
        type: 'embed',
        url: `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`
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
