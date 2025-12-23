import { useState, useRef } from 'react';
import { useVideos } from '../contexts/VideoContext';
import { Save, Upload, LayoutDashboard, ArrowLeft, Loader2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Admin() {
    const { videos, updateVideo } = useVideos();
    const [activeTab, setActiveTab] = useState<string>(Object.keys(videos)[0]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUrlChange = (id: string, url: string) => {
        updateVideo(id, { videoUrl: url });
    };

    const handleLogout = () => {
        localStorage.removeItem('siwaht_admin_session');
        window.location.href = '/';
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            setUploadError('Please select a valid video file');
            setTimeout(() => setUploadError(null), 5000);
            return;
        }

        if (!supabase) {
            setUploadError('Storage service not available. Please check your configuration.');
            setTimeout(() => setUploadError(null), 5000);
            return;
        }

        setUploading(true);
        setUploadError(null);
        setUploadSuccess(false);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('videos')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('videos')
                .getPublicUrl(filePath);

            updateVideo(activeTab, { videoUrl: publicUrl });
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError(error instanceof Error ? error.message : 'Failed to upload video');
            setTimeout(() => setUploadError(null), 5000);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

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
                                onClick={() => setActiveTab(video.id)}
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
                                    <h2 className="text-2xl font-bold mb-2">{videos[activeTab].title}</h2>
                                    <p className="text-slate-400 text-sm">Update the video content for this section.</p>
                                </div>
                                <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                                    Active
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* Video Preview */}
                                <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-white/10 relative group">
                                    <video
                                        key={videos[activeTab].videoUrl} // Force reload on URL change
                                        src={videos[activeTab].videoUrl}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                </div>

                                {/* URL Input */}
                                <div className="space-y-4">
                                    <label className="block text-sm font-medium text-slate-300">Video URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={videos[activeTab].videoUrl}
                                            onChange={(e) => handleUrlChange(activeTab, e.target.value)}
                                            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                                            placeholder="https://example.com/video.mp4"
                                        />
                                        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors flex items-center gap-2">
                                            <Save className="w-4 h-4" />
                                            Save
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Enter a direct link to an MP4 file or a supported video URL.
                                    </p>
                                </div>

                                {/* File Upload */}
                                <div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={handleUploadClick}
                                        className={`border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/50 hover:bg-white/5 transition-all duration-300 cursor-pointer group ${
                                            uploading ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            {uploading ? (
                                                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                                            ) : (
                                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                                            )}
                                        </div>
                                        <h3 className="text-white font-medium mb-1">
                                            {uploading ? 'Uploading...' : 'Upload New Video'}
                                        </h3>
                                        <p className="text-sm text-slate-400">
                                            {uploading ? 'Please wait while your video is being uploaded' : 'Click to browse and select a video file'}
                                        </p>
                                    </div>
                                    {uploadError && (
                                        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-sm text-red-400">{uploadError}</p>
                                        </div>
                                    )}
                                    {uploadSuccess && (
                                        <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                            <p className="text-sm text-emerald-400">Video uploaded successfully!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
