import React from "react";
import { Link } from "react-router-dom";
import myImage from "../assets/myImage.png"; // Adjust this path to your image location

export default function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-slate-900 text-center px-4">
      <img
        src={myImage}
        alt="BartaOne Logo"
        className="w-[300px] md:w-[350px] mb-4"
      />
      <h1 className="text-3xl md:text-5xl font-bold text-rose-200">
        Your Street, Your Story | BartaOne Has It All!
      </h1>
      <Link to="/promo1">
        <button className="mt-6 px-6 py-3 rounded-full bg-amber-600 text-black text-lg font-semibold shadow-md transition duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:brightness-110 hover:scale-105">
          Get Started
        </button>
      </Link>
    </div>
  );
}
