import React from "react";

const subscriptions = [
  {
    title: "E-paper / Article Plan",
    price: "\u20B999",
    duration: "1 Month",
    description: "Publish up to 15 articles per month.",
    nextBilling: "27 July 2025"
  },
  {
    title: "Article + Video Creator Plan",
    price: "\u20B9159",
    duration: "1 Month",
    description: "Includes 25 articles and 10 video uploads monthly.",
    nextBilling: "27 July 2025"
  },
  {
    title: "Broadcaster Full Plan",
    price: "\u20B9399",
    duration: "1 Month",
    description: "50 articles, 25 videos, and 3 livestreams monthly.",
    nextBilling: "27 July 2025"
  }
];

const SubscriptionCard = ({ title, price, duration, description, nextBilling }) => (
  <div className="bg-zinc-900 text-white rounded-2xl shadow-xl p-6 w-full max-w-sm flex flex-col justify-between border border-fuchsia-700 hover:scale-105 transition-all">
    <div>
      <h3 className="text-xl font-semibold text-orange-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{price}</p>
      <p className="text-sm text-gray-400">{duration}</p>
      <p className="mt-4 text-sm text-gray-300">{description}</p>
    </div>
    <div className="mt-6">
      <p className="text-sm text-gray-400">Next billing due on {nextBilling}</p>
      <button className="mt-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 px-4 rounded-xl w-full">
        Continue Watching
      </button>
    </div>
  </div>
);

export default function Subscription() {
  return (
    <div className="min-h-screen bg-black text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Choose the Right Plan for Your News Platform
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Flexible subscription plans tailored for publishers, creators, and broadcasters.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        {subscriptions.map((plan, index) => (
          <SubscriptionCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
}