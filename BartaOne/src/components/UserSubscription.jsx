import React from "react";
import { Sparkles, Newspaper, Brain, Gift, HandCoins } from "lucide-react";

// Card & CardContent (custom, clean)
function Card({ children }) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 p-[2px] rounded-xl z-0" />
      {/* Inner Card */}
      <div className="relative z-10 bg-[#1a1a1a] text-white rounded-xl p-6 h-full flex flex-col justify-between shadow-md">
        {children}
      </div>
    </div>
  );
}

function CardContent({ icon, title, desc, price }) {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-sm text-gray-300">{desc}</p>
      <div className="mt-auto text-right text-xl font-bold text-indigo-400">{price}</div>
      <div className="flex justify-end">
        <button className="mt-3 bg-gradient-to-r from-red-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-2 hover:brightness-110 transition">
          Continue
        </button>
      </div>
    </div>
  );
}

// Subscription data
const subscriptions = [
  {
    icon: <Sparkles className="w-6 h-6 text-blue-400" />,
    title: "Ad-free Live News (24hr)",
    price: "50 NICE",
    desc: "Enjoy uninterrupted live news streaming for 24 hours.",
  },
  {
    icon: <Newspaper className="w-6 h-6 text-emerald-400" />,
    title: "Unlock Premium Articles",
    price: "100 NICE",
    desc: "Access high-quality premium articles behind the paywall.",
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    title: "AI Video Summarizer",
    price: "100 NICE / video",
    desc: "Get instant summaries of videos (first 2 free per week).",
  },
  {
    icon: <Gift className="w-6 h-6 text-pink-400" />,
    title: "Premium Subscription Discount",
    price: "500 NICE",
    desc: "Unlock exclusive discounts on your premium subscription plans.",
  },
  {
    icon: <HandCoins className="w-6 h-6 text-yellow-400" />,
    title: "Tip Broadcasters",
    price: "25–500 NICE",
    desc: "Support your favorite broadcasters directly with tips.",
  },
];

export default function UserSubscription() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto bg-slate-900 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-white">
        User Subscription Plans
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subscriptions.map((sub, idx) => (
          <Card key={idx}>
            <CardContent
              icon={sub.icon}
              title={sub.title}
              desc={sub.desc}
              price={sub.price}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
