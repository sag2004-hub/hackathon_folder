import React from 'react';
import Img from '../assets/1.1.png';
import { Link } from 'react-router-dom';

function Promo1() {
  return (
    <div className="min-h-screen relative text-center flex flex-col items-center justify-center px-4 space-y-6">

      <img
        src={Img}
        alt="Description"
        className="w-[350px] mx-auto"
      />

      <h1 className="text-lime-200 text-6xl font-bold">
        Stay Ahead, Instantly!
      </h1>

      <p className="text-white text-2xl max-w-3xl">
        Get instant updates on breaking news and live regional coverage — straight to your phone.
      </p>

      <p className="text-orange-400 text-2xl max-w-2xl">
        Never miss a moment. Be the first to know.
      </p>

      <div className="flex space-x-3 text-4xl text-amber-400 mt-0.5">
        <i className="ri-circle-fill"></i>
        <i className="ri-circle-line"></i>
        <i className="ri-circle-line"></i>
      </div>

      {/* 👇 Go Next Button Positioned at Bottom Right */}
      <Link
        to="/promo2"
        className="absolute bottom-14 right-10 px-5 py-2 bg-amber-500 text-black font-semibold rounded-full shadow-lg hover:bg-amber-600 transition"
      >
        Go Next →
      </Link>

    </div>
  );
}

export default Promo1;
