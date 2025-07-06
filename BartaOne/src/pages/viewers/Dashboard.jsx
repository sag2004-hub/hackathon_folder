import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import {
  ChevronRight,
  Bell,
  Video,
  CheckCircle,
  Rocket,
  Play,
  Menu,
  X,
  Globe,
  Zap,
  Users,
  Award,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BartaOneDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [isCountingComplete, setIsCountingComplete] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
  const [newsStories, setNewsStories] = useState(0);
  const [languages, setLanguages] = useState(0);
  const [statsCountingComplete, setStatsCountingComplete] = useState(false);
  const navigate = useNavigate();

  // Visitor counter logic
  useEffect(() => {
    const targetCount = 15432; // The fixed value to reach
    const incrementSpeed = 50; // Speed of counting in milliseconds
    const startDelay = 1000; // Delay before starting to count

    const timer = setTimeout(() => {
      let currentCount = 0;
      const increment = Math.ceil(targetCount / 100); // Adjust increment size

      const countInterval = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
          setVisitorCount(targetCount);
          setIsCountingComplete(true);
          clearInterval(countInterval);
        } else {
          setVisitorCount(currentCount);
        }
      }, incrementSpeed);

      return () => clearInterval(countInterval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, []);

  // Stats counter logic
  useEffect(() => {
    const targets = {
      activeUsers: 12500,
      newsStories: 750,
      languages: 18,
    };

    const startDelay = 1500; // Start after visitor counter
    const incrementSpeed = 80;

    const timer = setTimeout(() => {
      let currentActiveUsers = 0;
      let currentNewsStories = 0;
      let currentLanguages = 0;

      const activeUsersIncrement = Math.ceil(targets.activeUsers / 80);
      const newsStoriesIncrement = Math.ceil(targets.newsStories / 80);
      const languagesIncrement = Math.ceil(targets.languages / 80);

      const countInterval = setInterval(() => {
        // Update Active Users
        if (currentActiveUsers < targets.activeUsers) {
          currentActiveUsers += activeUsersIncrement;
          if (currentActiveUsers >= targets.activeUsers) {
            currentActiveUsers = targets.activeUsers;
          }
          setActiveUsers(currentActiveUsers);
        }

        // Update News Stories
        if (currentNewsStories < targets.newsStories) {
          currentNewsStories += newsStoriesIncrement;
          if (currentNewsStories >= targets.newsStories) {
            currentNewsStories = targets.newsStories;
          }
          setNewsStories(currentNewsStories);
        }

        // Update Languages
        if (currentLanguages < targets.languages) {
          currentLanguages += languagesIncrement;
          if (currentLanguages >= targets.languages) {
            currentLanguages = targets.languages;
          }
          setLanguages(currentLanguages);
        }

        // Check if all counters are complete
        if (
          currentActiveUsers >= targets.activeUsers &&
          currentNewsStories >= targets.newsStories &&
          currentLanguages >= targets.languages
        ) {
          setStatsCountingComplete(true);
          clearInterval(countInterval);
        }
      }, incrementSpeed);

      return () => clearInterval(countInterval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = [
    {
      name: "Local News",
      icon: "🏘️",
      color: "from-blue-500 to-blue-600",
      count: "234",
    },
    {
      name: "Politics",
      icon: "🗳️",
      color: "from-red-500 to-red-600",
      count: "156",
    },
    {
      name: "Trending News",
      icon: "🔥",
      color: "from-orange-500 to-orange-600",
      count: "89",
    },
    {
      name: "Daily News",
      icon: "📰",
      color: "from-green-500 to-green-600",
      count: "456",
    },
    {
      name: "Pollution",
      icon: "🌍",
      color: "from-emerald-500 to-emerald-600",
      count: "67",
    },
    {
      name: "Weather",
      icon: "🌤️",
      color: "from-purple-500 to-purple-600",
      count: "123",
    },
  ];

  const features = [
    {
      title: "For Local Broadcasters Only",
      desc: "Exclusive platform for verified local journalists",
      icon: Users,
    },
    {
      title: "Real-time News in Hindi, Bengali & Regional Languages",
      desc: "Multi-language support for diverse audiences",
      icon: Globe,
    },
    {
      title: "Break Time-Sensitive Updates",
      desc: "Instant alerts for breaking news stories",
      icon: Zap,
    },
    {
      title: "AI-Personalized Panel",
      desc: "Smart recommendations based on your interests",
      icon: TrendingUp,
    },
    {
      title: "Earn Tokens for Reading",
      desc: "Get rewarded for staying informed",
      icon: Award,
    },
    {
      title: "Multilingual Support",
      desc: "Content available in multiple regional languages",
      icon: MapPin,
    },
  ];

  const stats = [
    {
      number: `${activeUsers > 0 ? Math.floor(activeUsers / 1000) : 10}K+`,
      label: "Active Users",
      animated: activeUsers,
    },
    {
      number: `${newsStories > 0 ? newsStories : 500}+`,
      label: "News Stories Daily",
      animated: newsStories,
    },
    { number: "24/7", label: "Live Coverage", animated: null },
    {
      number: `${languages > 0 ? languages : 15}+`,
      label: "Languages",
      animated: languages,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen font-sans">
      {/* Visitor Counter Overlay */}
      <div className="fixed top-20 right-6 z-50 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-orange-500" />
          <div className="text-sm">
            <span className="text-slate-300">Visitors: </span>
            <span
              className={`font-bold ${isCountingComplete ? "text-green-400" : "text-orange-400"}`}
            >
              {visitorCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className=" bg-gradient-to-r rounded-full flex items-center justify-center">
              <img src={logo} className="w-25 h-25" />
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-medium text-white">
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Home</span>
            </a>
            <a
              href="/news"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>News</span>
            </a>
            <a
              href="#"
              className="hover:text-orange-400 transition-colors duration-200 flex items-center space-x-1"
            >
              <span>Live</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </a>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-200" onClick={()=>navigate('/user-subscription')}>
              Subscription
            </button>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50">
            <div className="px-6 py-4 space-y-4">
              <a
                href="#"
                className="block hover:text-orange-400 transition-colors"
              >
                Home
              </a>
              <Link
               to="/news"
                className="block hover:text-orange-400 transition-colors"
              >
                News
              </Link>
              <a
                href="#"
                className="block hover:text-orange-400 transition-colors"
              >
                Live
              </a>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative p-8 rounded-2xl shadow-2xl">
                <div className="w-70 h-50 bg-gradient-to-r rounded-2xl flex items-center justify-center mx-auto">
                  <img src={logo} className="w-100 h-45" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent leading-tight">
            Instant Alerts for What Matters Most
          </h1>

          <p className="text-xl md:text-2xl font-medium text-slate-300 mb-6 max-w-3xl mx-auto">
            Your Region. Your Voice. Your News – All In One Place
          </p>

          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Stay connected with breaking news, local stories, and real-time
            updates from your community in your preferred language
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2">
              <span>Explore News</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="group border-2 border-orange-500 text-orange-500 font-semibold px-8 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Get Alerts</span>
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div
                  className={`text-3xl font-bold mb-1 transition-colors duration-300 ${
                    stat.animated !== null
                      ? statsCountingComplete
                        ? "text-green-400"
                        : "text-orange-500"
                      : "text-orange-500"
                  }`}
                >
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Alerts Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full mb-6">
            <Bell className="w-5 h-5 text-red-400 animate-pulse" />
            <span className="text-red-400 font-medium">Live Alerts</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Stay Alerted for What Matters
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Get instant notifications about breaking news, weather alerts, and
            important events in your area. Never miss what matters most to your
            community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Enable Notifications</span>
            </button>
            <button className="border border-slate-600 px-8 py-4 rounded-full font-semibold hover:bg-slate-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced News Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Explore by Category</h3>
            <p className="text-xl text-slate-400">
              Discover news that matters to you across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className={`group relative bg-gradient-to-br ${cat.color} p-8 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                onMouseEnter={() => setActiveCategory(idx)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {cat.name}
                  </h4>
                  <p className="text-white/80 mb-4">
                    {cat.count} stories today
                  </p>

                  <div className="flex items-center justify-between">
                    <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium hover:bg-white/30 transition-colors">
                      Read More
                    </button>
                    <ChevronRight
                      className={`w-5 h-5 text-white transition-transform duration-300 ${activeCategory === idx ? "translate-x-1" : ""}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why Choose BartaOne?</h3>
            <p className="text-xl text-slate-400">
              Powerful features designed for modern news consumption
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="group bg-slate-700/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-600/50 hover:border-orange-500/50 hover:bg-slate-700/70 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feat.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">
                  {feat.title}
                </h4>
                <p className="text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Broadcaster Promo */}
      <section className="py-20 px-6 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-slate-700 to-slate-600 p-8 rounded-3xl border border-slate-600">
                <div className="w-full h-64 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-orange-500 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-5xl font-bold leading-tight mb-6">
                  Stream Live to a{" "}
                  <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text">
                    Regional Audience
                  </span>
                </h3>
                <p className="text-xl text-slate-300 mb-8">
                  Join thousands of local broadcasters sharing stories that
                  matter to their communities
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Video,
                    text: "Stream Live Instantly",
                    desc: "Go live with one click",
                  },
                  {
                    icon: CheckCircle,
                    text: "Get Verified Fast",
                    desc: "Quick verification process",
                  },
                  {
                    icon: Rocket,
                    text: "Monetize Your Content",
                    desc: "Earn from your broadcasts",
                  },
                  {
                    icon: Bell,
                    text: "Push Notifications",
                    desc: "Alert your audience",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {item.text}
                      </h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2" onClick={()=>navigate("/broadcast-signup")}>
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-r rounded-full flex items-center justify-center">
                </div>
               <img src={logo} className="w-25 h-25" />
              </div>
              <p className="text-slate-400">
                Your trusted source for local news and real-time updates across
                India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-slate-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  News
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Live
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Categories
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Help Center
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Feedback
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Report Issue
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-slate-400">
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
                <a
                  href="#"
                  className="block hover:text-white transition-colors"
                >
                  Disclaimer
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>
              &copy; 2025 BartaOne. All rights reserved. Made with ❤️ in India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BartaOneDashboard;
