import { useState, useCallback } from 'react';
import { useVideos } from '../contexts/VideoContext';
import { Save, LayoutDashboard, ArrowLeft, Loader2, LogOut } from 'lucide-react';
import { getVideoPlayerConfig } from '../utils/videoUtils';

export default function Admin() {
    const { videos, updateAndSaveVideo } = useVideos();
    const [activeTab, setActiveTab] = useState<string>(Object.keys(videos)[0]);
    const [currentUrl, setCurrentUrl] = useState(videos[activeTab]?.videoUrl || '');
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    // Update local state when active tab changes
    const handleTabChange = useCallback((id: string) => {
        setActiveTab(id);
        setCurrentUrl(videos[id]?.videoUrl || '');
        setSaveError(null);
        setSaveSuccess(false);
    }, [videos]);

    const handleSave = useCallback(() => {
        if (!currentUrl.trim()) {
            setSaveError('Please enter a valid video URL');
            return;
        }

        setSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        // Use the combined update and save function - fixes the stale state bug
        const result = updateAndSaveVideo(activeTab, { videoUrl: currentUrl.trim() });

        if (result.success) {
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } else {
            setSaveError(result.error || 'Failed to save video');
            setTimeout(() => setSaveError(null), 5000);
        }
        setSaving(false);
    }, [activeTab, currentUrl, updateAndSaveVideo]);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('siwaht_admin_session');
        window.location.href = '/';
    }, []);

    const activeVideo = videos[activeTab];
    if (!activeVideo) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <p>No videos available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">

                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <a href="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </a>
                        <div>
                            <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                            <p className="text-slate-400">Manage your video content and assets</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors flex items-center gap-2 text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        {Object.values(videos).map((video) => (
                            <button
                                key={video.id}
                                onClick={() => handleTabChange(video.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${activeTab === video.id
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                {video.title}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-2">{activeVideo.title}</h2>
                                    <p className="text-slate-400 text-sm">Update the video content for this section.</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                    Active
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Video Preview */}
                                <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10 relative group">
                                    {(() => {
                                        const playerConfig = getVideoPlayerConfig(activeVideo.videoUrl);
                                        return playerConfig.type === 'embed' ? (
                                            <iframe
                                                key={activeVideo.videoUrl}
                                                src={playerConfig.url}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                                allowFullScreen
                                                frameBorder="0"
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        ) : (
                                            <video
                                                key={activeVideo.videoUrl}
                                                src={playerConfig.url}
                                                className="w-full h-full object-cover"
                                                controls
                                            />
                                        );
                                    })()}
                                </div>

                                {/* URL Input */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-slate-300">Video URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={currentUrl}
                                            onChange={(e) => setCurrentUrl(e.target.value)}
                                            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="https://example.com/video.mp4"
                                        />
                                        <button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {saving ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <Save className="w-4 h-4" />
                                                    Save
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    {saveError && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-sm text-red-400">{saveError}</p>
                                        </div>
                                    )}
                                    {saveSuccess && (
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                            <p className="text-sm text-emerald-400">Video URL saved successfully!</p>
                                        </div>
                                    )}
                                    <p className="text-xs text-slate-500">
                                        Enter a direct link to an MP4 file or paste URLs from Gumlet, YouTube, Vimeo, or Dailymotion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
