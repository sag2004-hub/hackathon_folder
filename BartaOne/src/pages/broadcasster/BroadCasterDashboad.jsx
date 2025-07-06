import React, { useState, useEffect } from "react";
import media from '../../assets/media.png'
import {
  Home,
  MessageCircle,
  Users,
  Upload,
  Bell,
  Search,
  ThumbsUp,
  MessageSquare,
  Share,
  Bookmark,
  BarChart3,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BroadcasterDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [animatedReach, setAnimatedReach] = useState(0);
  const [animatedEngagement, setAnimatedEngagement] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const navigate = useNavigate();
  // Mock data for the dashboard
  const reachData = {
    total: 8000,
    occasionalVisitors: 55.8,
    dailyViewers: 45.2,
  };

  const engagementData = {
    total: 400,
    occasionalVisitors: 15,
    dailyViewers: 85,
  };

  // Animation effect for progress charts
  useEffect(() => {
    const reachDuration = 2000; // 2 seconds
    const engagementDuration = 2500; // 2.5 seconds
    const reachSteps = 60;
    const engagementSteps = 75;

    const reachIncrement = reachData.occasionalVisitors / reachSteps;
    const engagementIncrement = engagementData.dailyViewers / engagementSteps;

    let reachStep = 0;
    let engagementStep = 0;

    const reachInterval = setInterval(() => {
      reachStep++;
      setAnimatedReach(
        Math.min(reachStep * reachIncrement, reachData.occasionalVisitors)
      );

      if (reachStep >= reachSteps) {
        clearInterval(reachInterval);
      }
    }, reachDuration / reachSteps);

    const engagementInterval = setInterval(() => {
      engagementStep++;
      setAnimatedEngagement(
        Math.min(
          engagementStep * engagementIncrement,
          engagementData.dailyViewers
        )
      );

      if (engagementStep >= engagementSteps) {
        clearInterval(engagementInterval);
        setAnimationComplete(true);
      }
    }, engagementDuration / engagementSteps);

    return () => {
      clearInterval(reachInterval);
      clearInterval(engagementInterval);
    };
  }, []);

  const CircularProgress = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = "#8b5cf6",
    animated = false,
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const displayPercentage = animated
      ? percentage
      : animationComplete
        ? percentage
        : 0;
    const offset = circumference - (displayPercentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-75 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white"></span>
        </div>
      </div>
    );
  };

  return (
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
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "home" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => {
                  console.log("hi");
                  navigate("/broadcaster-dashboad");
                }}
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
                onClick={() => {
                  console.log("hi");
                  navigate("/upload");
                }}
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
              <button
                onClick={() => navigate("/subsription")}
                className={`flex items-center space-x-1 px-3 py-2 rounded ${activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"}`}
              >
                <span>Subscriptions</span>
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

      <div className="flex">
        {/* Sidebar with Post */}
        <aside className="w-80 bg-gray-800 border-r border-gray-700 p-6">
          {/* Post Card */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="relative">
              <img
                src={media}
                alt="Emergency scene"
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold inline-block mb-2">
                  BREAKING NEWS
                </div>
                <h3 className="text-white font-bold text-lg mb-1">
                  सड़क हादसा: रेस्क्यू ऑपरेशन जारी
                </h3>
                <p className="text-gray-300 text-sm">
                  हादसे से दुर्घटना शुरू: लाइव अपडेट्स
                </p>
              </div>
            </div>

            {/* Post Actions */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-gray-400">
                <button className="flex items-center space-x-2 hover:text-blue-400">
                  <ThumbsUp size={16} />
                  <span className="text-sm">Like</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-400">
                  <MessageSquare size={16} />
                  <span className="text-sm">Comment</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-purple-400">
                  <Share size={16} />
                  <span className="text-sm">Share</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-yellow-400">
                  <Bookmark size={16} />
                  <span className="text-sm">Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Post Insights Button */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
            <BarChart3 size={16} />
            <span>Post Insights</span>
          </button>

          {/* Overview Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>Overview</span>
              <div className="w-4 h-4 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-xs">?</span>
              </div>
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Reached</span>
                <span className="text-white font-bold">
                  {reachData.total.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Account Engaged</span>
                <span className="text-white font-bold">
                  {engagementData.total}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reach Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl font-semibold">Reach</h2>
                <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  {reachData.total.toLocaleString()}
                </div>
                <div className="text-gray-400">Account Reached</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CircularProgress
                    percentage={animatedReach}
                    size={140}
                    color="#8b5cf6"
                    animated={true}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                      <div className="text-sm font-semibold">
                        {animatedReach.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400">Occasional Visitors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">
                    {(100 - animatedReach).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <h2 className="text-xl font-semibold">Engagement</h2>
                <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-xs">?</span>
                </div>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  {engagementData.total}
                </div>
                <div className="text-gray-400">Account Engaged</div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="relative">
                  <CircularProgress
                    percentage={animatedEngagement}
                    size={140}
                    color="#a855f7"
                    animated={true}
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-center">
                      <div className="text-sm font-semibold">
                        {animatedEngagement.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="text-center">
                    <div className="text-gray-400">Occasional</div>
                    <div className="text-gray-400">Visitors</div>
                    <div className="text-white font-semibold">
                      {(100 - animatedEngagement).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <div className="text-center">
                    <div className="text-gray-400">Daily</div>
                    <div className="text-gray-400">Viewers</div>
                    <div className="text-white font-semibold">
                      {animatedEngagement.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-xl font-bold text-white">BartaOne</span>
              </div>
              <p className="text-gray-400 text-sm max-w-md">
                Your Region. Your Voice. Your News - All in One Place.
              </p>
            </div>

            {/* My Account Section */}
            <div>
              <h3 className="text-white font-semibold mb-4">My Account</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Broadcasters
                  </a>
                </li>
              </ul>
            </div>

            {/* Helps Section */}
            <div>
              <h3 className="text-white font-semibold mb-4">Helps</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Faqs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 mt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2025 BartaOne. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BroadcasterDashboard;
