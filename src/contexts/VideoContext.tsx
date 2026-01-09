import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface VideoData {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl?: string;
    stats: {
        duration: string;
        quality: string;
        delivery: string;
    };
    features: { title: string; description: string }[];
}

interface VideoContextType {
    videos: Record<string, VideoData>;
    updateVideo: (id: string, data: Partial<VideoData>) => void;
    updateAndSaveVideo: (id: string, data: Partial<VideoData>) => { success: boolean; error?: string };
}

const STORAGE_KEY = 'siwaht_videos';
const STORAGE_VERSION = 'v5'; // Bump this to force refresh of defaults

const defaultVideos: Record<string, VideoData> = {
    'chat-agents': {
        id: 'chat-agents',
        title: 'Chat Agents',
        description: 'AI-powered chatbots for WhatsApp, websites, and social media that handle customer inquiries, qualify leads, and provide 24/7 support.',
        videoUrl: 'https://gumlet.tv/watch/694c0aa2b122cbf1763c9e71',
        stats: { duration: '24/7', quality: 'Auto', delivery: 'Instant' },
        features: [
            { title: 'Instant Customer Support', description: 'Respond to customer queries in seconds, any time of day.' },
            { title: 'Lead Qualification', description: 'Automatically identify and prioritize high-value prospects.' },
            { title: 'Multi-Platform Integration', description: 'Deploy on WhatsApp, web, Instagram, and more.' },
            { title: 'Smart Escalation', description: 'Seamlessly hand off complex issues to human agents.' }
        ]
    },
    'ai-avatars': {
        id: 'ai-avatars',
        title: 'AI Avatars',
        description: 'Photorealistic digital presenters that deliver your message with human-like expressions, perfect for training videos, product demos, and personalized content.',
        videoUrl: 'https://gumlet.tv/watch/694bff80e086c47a8221f5a6',
        stats: { duration: 'Custom', quality: '4K', delivery: '24 Hours' },
        features: [
            { title: 'Lifelike Expressions', description: 'Natural facial movements and gestures that engage viewers.' },
            { title: 'Multi-Language Voice', description: 'Speak to global audiences in 30+ languages.' },
            { title: 'Brand Customization', description: 'Match your avatar to your brand identity and style.' },
            { title: 'Scalable Production', description: 'Create hundreds of videos without studio costs.' }
        ]
    },
    'video-ads': {
        id: 'video-ads',
        title: 'AI Generated Videos',
        description: 'Professional video content created by AI in hours, not weeks. From marketing videos to explainers, scaled to your needs.',
        videoUrl: 'https://gumlet.tv/watch/694bfeb6b122cbf1763bdd74',
        stats: { duration: '15-60s', quality: '1080p', delivery: '48 Hours' },
        features: [
            { title: 'Rapid Production', description: 'Get professional videos in 48 hours or less.' },
            { title: 'Consistent Quality', description: 'Maintain brand standards across all content.' },
            { title: 'Easy Revisions', description: 'Quick edits without reshooting or re-rendering.' },
            { title: 'Multiple Formats', description: 'Optimized for social media, web, and ads.' }
        ]
    },
    'voice-agents': {
        id: 'voice-agents',
        title: 'Voice Calling Agents',
        description: 'AI voice agents that handle inbound and outbound calls naturally. Schedule appointments, answer questions, and qualify leads over the phone.',
        videoUrl: 'https://gumlet.tv/watch/694c0f24b122cbf1763ce88c',
        stats: { duration: 'Unlimited', quality: 'HD Voice', delivery: 'Real-time' },
        features: [
            { title: 'Natural Conversations', description: 'Human-like dialogue that builds customer trust.' },
            { title: 'Appointment Booking', description: 'Schedule meetings directly into your calendar.' },
            { title: 'CRM Integration', description: 'Sync call data with Salesforce, HubSpot, and more.' },
            { title: 'Call Analytics', description: 'Track performance and optimize conversations.' }
        ]
    }
};

const loadVideosFromStorage = (): Record<string, VideoData> => {
    try {
        // Check version - if outdated, clear and use new defaults
        const version = localStorage.getItem(`${STORAGE_KEY}_version`);
        if (version !== STORAGE_VERSION) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(`${STORAGE_KEY}_version`, STORAGE_VERSION);
            return defaultVideos;
        }

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const merged = { ...defaultVideos };

            Object.keys(defaultVideos).forEach(key => {
                if (parsed[key]) {
                    merged[key] = {
                        ...defaultVideos[key],
                        ...parsed[key],
                        stats: {
                            ...defaultVideos[key].stats,
                            ...(parsed[key].stats || {})
                        }
                    };
                }
            });
            return merged;
        }
    } catch (error) {
        console.error('Failed to parse saved videos:', error);
    }
    return defaultVideos;
};

const saveVideosToStorage = (videos: Record<string, VideoData>): { success: boolean; error?: string } => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
        return { success: true };
    } catch (error) {
        console.error('Error saving videos to localStorage:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to save video'
        };
    }
};

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: React.ReactNode }) {
    const [videos, setVideos] = useState<Record<string, VideoData>>(loadVideosFromStorage);
    const videosRef = useRef(videos);

    // Keep ref in sync with state
    useEffect(() => {
        videosRef.current = videos;
    }, [videos]);

    const updateVideo = useCallback((id: string, data: Partial<VideoData>) => {
        setVideos(prev => ({
            ...prev,
            [id]: { ...prev[id], ...data }
        }));
    }, []);

    // Combined update and save - solves the stale state issue
    const updateAndSaveVideo = useCallback((id: string, data: Partial<VideoData>): { success: boolean; error?: string } => {
        const currentVideos = videosRef.current;
        const updatedVideos = {
            ...currentVideos,
            [id]: { ...currentVideos[id], ...data }
        };
        
        // Update state
        setVideos(updatedVideos);
        
        // Save to localStorage immediately with the new data
        return saveVideosToStorage(updatedVideos);
    }, []);

    return (
        <VideoContext.Provider value={{ videos, updateVideo, updateAndSaveVideo }}>
            {children}
        </VideoContext.Provider>
    );
}

export function useVideos() {
    const context = useContext(VideoContext);
    if (context === undefined) {
        throw new Error('useVideos must be used within a VideoProvider');
    }
    return context;
}
