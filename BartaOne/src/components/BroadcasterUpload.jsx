import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  Users,
  Upload,
  Bell,
  Search,
  User,
  Video,
  Link,
  FileText,
  Camera,
  Mic,
  Globe,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
} from "lucide-react";

const BroadcasterUpload = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [currentPage, setCurrentPage] = useState("main"); // main, video, url, text
  const [videoFile, setVideoFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [streamUrl, setStreamUrl] = useState("");
  const [isLive, setIsLive] = useState(false);

  // Video upload form data
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "news",
    thumbnail: null,
    privacy: "public",
  });

  // Text news form data
  const [textData, setTextData] = useState({
    headline: "",
    content: "",
    category: "breaking",
    tags: "",
    featured_image: null,
    location: "",
    priority: "normal",
  });

  // Live stream form data
  const [liveData, setLiveData] = useState({
    title: "",
    description: "",
    category: "live",
    thumbnail: null,
    scheduled_time: "",
    url: "",
  });

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (type === "video") {
      setVideoFile(file);
    } else if (type === "thumbnail") {
      setVideoData({ ...videoData, thumbnail: file });
    } else if (type === "image") {
      setTextData({ ...textData, featured_image: file });
    } else if (type === "live-thumbnail") {
      setLiveData({ ...liveData, thumbnail: file });
    }
  };

  const MainUploadPage = () => (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-xl font-bold">BartaOne</span>
            </div>
            <nav className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "home" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <Home size={16} />
                <span>Home</span>
              </button>
              <button
                onClick={() => setActiveTab("chats")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "chats" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <MessageCircle size={16} />
                <span>Chats</span>
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <Users size={16} />
                <span>Users</span>
              </button>
              <button
                onClick={() => setActiveTab("upload")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "upload" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <Upload size={16} />
                <span>Upload</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "notifications" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <Bell size={16} />
                <span>Notifications</span>
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Search size={20} className="text-gray-400" />
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Upload Your Content</h1>
          <p className="text-gray-400 text-lg">
            Choose how you want to share your news with the world
          </p>
        </div>

        {/* Upload Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Upload */}
          <div
            onClick={() => setCurrentPage("video")}
            className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500 transition-colors">
                <Video size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Video Upload</h2>
              <p className="text-gray-400 mb-6">
                Upload pre-recorded videos, interviews, and breaking news
                footage
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>MP4, MOV, AVI</span>
                <span>•</span>
                <span>Max 2GB</span>
              </div>
            </div>
          </div>

          {/* URL/Live Stream */}
          <div
            onClick={() => setCurrentPage("url")}
            className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500 transition-colors">
                <Globe size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Live Stream</h2>
              <p className="text-gray-400 mb-6">
                Share live events, breaking news, and real-time coverage
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>RTMP, HLS</span>
                <span>•</span>
                <span>Live Broadcasting</span>
              </div>
            </div>
          </div>

          {/* Text News */}
          <div
            onClick={() => setCurrentPage("text")}
            className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 cursor-pointer group hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 transition-colors">
                <FileText size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Text News</h2>
              <p className="text-gray-400 mb-6">
                Write and publish articles, reports, and news stories
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>Rich Text</span>
                <span>•</span>
                <span>Images Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Recent Uploads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-700 flex items-center justify-center">
                  <Play size={48} className="text-gray-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">
                    Breaking News Update #{item}
                  </h3>
                  <p className="text-gray-400 text-sm">Published 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );

  const VideoUploadPage = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    {/* Header */}
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setCurrentPage("main")}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back to Upload</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold">BartaOne</span>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
        <p className="text-gray-400">
          Share your video content with your audience
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-8 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Video size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Drop your video here
              </h3>
              <p className="text-gray-400 mb-4">or click to browse files</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, "video")}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors"
              >
                Choose Video File
              </label>
              <p className="text-sm text-gray-500 mt-2">
                MP4, MOV, AVI up to 2GB
              </p>
            </div>
          </div>

          {videoFile && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Video size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{videoFile.name}</h4>
                  <p className="text-sm text-gray-400">
                    {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-500">Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Details Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Video Title*
            </label>
            <input
              type="text"
              value={videoData.title}
              onChange={(e) =>
                setVideoData({ ...videoData, title: e.target.value })
              }
              placeholder="Enter video title"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={videoData.description}
              onChange={(e) =>
                setVideoData({ ...videoData, description: e.target.value })
              }
              placeholder="Describe your video..."
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={videoData.category}
                onChange={(e) =>
                  setVideoData({ ...videoData, category: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              >
                <option value="news">News</option>
                <option value="sports">Sports</option>
                <option value="politics">Politics</option>
                <option value="entertainment">Entertainment</option>
                <option value="technology">Technology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Privacy</label>
              <select
                value={videoData.privacy}
                onChange={(e) =>
                  setVideoData({ ...videoData, privacy: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <input
              type="text"
              value={videoData.tags}
              onChange={(e) =>
                setVideoData({ ...videoData, tags: e.target.value })
              }
              placeholder="Enter tags separated by commas"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "thumbnail")}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
            Upload Video
          </button>
        </div>
      </div>
    </main>
  </div>
);

const LiveStreamPage = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    {/* Header */}
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setCurrentPage("main")}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back to Upload</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold">BartaOne</span>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Live Stream Setup</h1>
        <p className="text-gray-400">Configure your live broadcast settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Stream Configuration */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Globe size={24} className="text-red-500 mr-2" />
              Stream Configuration
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Stream Title*
                </label>
                <input
                  type="text"
                  value={liveData.title}
                  onChange={(e) =>
                    setLiveData({ ...liveData, title: e.target.value })
                  }
                  placeholder="Enter stream title"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Stream URL/Key
                </label>
                <input
                  type="text"
                  value={liveData.url}
                  onChange={(e) =>
                    setLiveData({ ...liveData, url: e.target.value })
                  }
                  placeholder="rtmp://your-stream-url/live/stream-key"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={liveData.description}
                  onChange={(e) =>
                    setLiveData({ ...liveData, description: e.target.value })
                  }
                  placeholder="Describe your live stream..."
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={liveData.category}
                    onChange={(e) =>
                      setLiveData({ ...liveData, category: e.target.value })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  >
                    <option value="live">Live News</option>
                    <option value="breaking">Breaking News</option>
                    <option value="sports">Sports</option>
                    <option value="politics">Politics</option>
                    <option value="events">Events</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Schedule Time
                  </label>
                  <input
                    type="datetime-local"
                    value={liveData.scheduled_time}
                    onChange={(e) =>
                      setLiveData({
                        ...liveData,
                        scheduled_time: e.target.value,
                      })
                    }
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Stream Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Auto-record stream</span>
                <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Enable chat</span>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Send notifications</span>
                <button className="w-12 h-6 bg-blue-600 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Preview/Status */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Stream Status</h3>
            <div className="bg-gray-700 rounded-lg h-48 flex items-center justify-center mb-4">
              <div className="text-center">
                <Camera size={48} className="text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Stream preview will appear here</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Status:</span>
                <span
                  className={`text-sm font-medium ${isLive ? "text-green-500" : "text-gray-400"}`}
                >
                  {isLive ? "Live" : "Offline"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Viewers:</span>
                <span className="text-sm font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Duration:</span>
                <span className="text-sm font-medium">00:00:00</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                isLive
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isLive ? "Stop Stream" : "Start Stream"}
            </button>

            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Test Stream
            </button>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Schedule Stream
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
);

const TextNewsPage = () => (
  <div className="min-h-screen bg-gray-900 text-white">
    {/* Header */}
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setCurrentPage("main")}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} />
            <span>Back to Upload</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-xl font-bold">BartaOne</span>
        </div>
      </div>
    </header>

    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Write News Article</h1>
        <p className="text-gray-400">Create and publish your news story</p>
      </div>

      <div className="space-y-6">
        {/* Article Header */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Headline*
              </label>
              <input
                type="text"
                value={textData.headline}
                onChange={(e) =>
                  setTextData({ ...textData, headline: e.target.value })
                }
                placeholder="Enter compelling headline"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={textData.location}
                onChange={(e) =>
                  setTextData({ ...textData, location: e.target.value })
                }
                placeholder="News location"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={textData.category}
                onChange={(e) =>
                  setTextData({ ...textData, category: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              >
                <option value="breaking">Breaking News</option>
                <option value="politics">Politics</option>
                <option value="sports">Sports</option>
                <option value="business">Business</option>
                <option value="technology">Technology</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select
                value={textData.priority}
                onChange={(e) =>
                  setTextData({ ...textData, priority: e.target.value })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="breaking">Breaking</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
);

  // Render the correct page based on currentPage state
  return (
    <>
      {currentPage === "main" && <MainUploadPage />}
      {currentPage === "video" && <VideoUploadPage />}
      {currentPage === "url" && <LiveStreamPage />}
      {currentPage === "text" && <TextNewsPage />}
    </>
  );
};


export default BroadcasterUpload;