import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Play, Pause, Check, Clock, Zap, Star, Loader2 } from 'lucide-react';
import { useVideos } from '../contexts/VideoContext';
import { getVideoPlayerConfig } from '../utils/videoUtils';

interface VideoFeatureSectionProps {
    sectionId: string;
    alignment?: 'left' | 'right';
}

// Memoized stat card component
const StatCard = memo(({ label, value, colorClass }: { label: string; value: string; colorClass: string }) => (
    <div className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/[0.04]">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5 font-medium">{label}</p>
        <p className={`${colorClass} font-bold text-sm`}>{value}</p>
    </div>
));
StatCard.displayName = 'StatCard';

// Memoized feature card component
const FeatureCard = memo(({ title, description }: { title: string; description: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group/card">
        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center flex-shrink-0 group-hover/card:bg-indigo-500/15 transition-colors duration-500">
            <Check className="w-4 h-4 text-indigo-400" />
        </div>
        <div>
            <h4 className="text-white font-semibold mb-1 text-sm">{title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
        </div>
    </div>
));
FeatureCard.displayName = 'FeatureCard';

function VideoFeatureSection({ sectionId, alignment = 'left' }: VideoFeatureSectionProps) {
    const { videos } = useVideos();
    const data = videos[sectionId];
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);

    const playerConfig = data ? getVideoPlayerConfig(data.videoUrl) : null;
    const isEmbed = playerConfig?.type === 'embed';

    const togglePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(prev => !prev);
        }
    }, [isPlaying]);

    useEffect(() => {
        const containerElement = containerRef.current;
        if (!containerElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const isVisible = entry.isIntersecting;
                    setIsInView(isVisible);

                    if (!isEmbed && videoRef.current) {
                        if (isVisible) {
                            videoRef.current.play().catch(() => setIsPlaying(false));
                            setIsPlaying(true);
                        } else {
                            videoRef.current.pause();
                            setIsPlaying(false);
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerElement);
        return () => observer.disconnect();
    }, [isEmbed]);

    if (!data || !playerConfig) return null;

    const flexDirection = alignment === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row';

    return (
        <section id={sectionId} className="py-20 sm:py-24 lg:py-28 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                <div className={`flex flex-col ${flexDirection} items-center gap-12 lg:gap-16`}>

                    {/* Video Card Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="relative group">
                            <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl p-2 border border-white/[0.06] shadow-2xl">
                                <div ref={containerRef} className="relative aspect-video rounded-xl overflow-hidden bg-slate-950">
                                    {isEmbed ? (
                                        isInView ? (
                                            <iframe
                                                src={playerConfig.url}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                allowFullScreen
                                                loading="lazy"
                                                title={data.title}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-950">
                                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                                            </div>
                                        )
                                    ) : (
                                        <>
                                            <video
                                                ref={videoRef}
                                                src={playerConfig.url}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                loop
                                                muted
                                                autoPlay
                                                playsInline
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                                <div>
                                                    <p className="text-white font-semibold text-lg">{data.title}</p>
                                                    <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" /> {data.stats.duration}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                                                        <span className="flex items-center gap-1">
                                                            <Star className="w-3 h-3" /> {data.stats.quality}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={togglePlayPause}
                                                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all duration-300"
                                                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                                                >
                                                    {isPlaying ? (
                                                        <Pause className="w-4 h-4 fill-current" />
                                                    ) : (
                                                        <Play className="w-4 h-4 fill-current" />
                                                    )}
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-3 gap-4 mt-4 px-2 pb-2">
                                    <StatCard label="Duration" value={data.stats.duration} colorClass="text-indigo-400" />
                                    <StatCard label="Quality" value={data.stats.quality} colorClass="text-emerald-400" />
                                    <StatCard label="Delivery" value={data.stats.delivery} colorClass="text-violet-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-1/2 space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">
                                {data.title}
                            </h2>
                            <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>

                        <div className="grid gap-3">
                            {data.features.map((feature, index) => (
                                <FeatureCard key={index} title={feature.title} description={feature.description} />
                            ))}
                        </div>

                        <a 
                            href="#demo-form" 
                            className="group inline-flex items-center gap-2 text-indigo-400 font-medium text-sm hover:text-indigo-300 transition-colors duration-300"
                        >
                            Learn more about {data.title}
                            <Zap className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default memo(VideoFeatureSection);
