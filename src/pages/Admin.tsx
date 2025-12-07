import { useState, useRef } from 'react';
import { useVideos } from '../contexts/VideoContext';
import { Save, Upload, LayoutDashboard, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Admin() {
    const { videos, updateVideo } = useVideos();
    const [activeTab, setActiveTab] = useState<string>(Object.keys(videos)[0]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUrlChange = (id: string, url: string) => {
        updateVideo(id, { videoUrl: url });
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !supabase) return;

        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${activeTab}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { data, error: uploadError } = await supabase.storage
                .from('videos')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                console.error('Upload error details:', uploadError);
                throw new Error(uploadError.message || 'Upload failed');
            }

            const { data: { publicUrl } } = supabase.storage
                .from('videos')
                .getPublicUrl(filePath);

            updateVideo(activeTab, { videoUrl: publicUrl });
            setUploadProgress(100);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            alert(`Failed to upload video: ${error.message || 'Please try again.'}`);
        } finally {
            setUploading(false);
            setTimeout(() => setUploadProgress(0), 1000);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-12">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">

                <div className="flex items-center gap-4 mb-12">
                    <a href="/" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </a>
                    <div>
                        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                        <p className="text-slate-400">Manage your video content and assets</p>
                    </div>
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
                                <div
                                    onClick={handleUploadClick}
                                    className={`border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-indigo-500/50 hover:bg-white/5 transition-all duration-300 cursor-pointer group ${uploading ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="video/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
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
                                        {uploading ? `${uploadProgress}% complete` : 'Drag and drop or click to browse'}
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
