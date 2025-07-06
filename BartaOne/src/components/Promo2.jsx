import React from 'react';
import Img from '../assets/2.1.png';
import { Link } from 'react-router-dom';

function Promo2() {
  return (
    <div className="min-h-screen relative text-center flex flex-col items-center justify-center px-4 space-y-6">

      <img
        src={Img}
        alt="Description"
        className="w-[350px] mx-auto"
      />

      <h1 className="text-lime-200 text-6xl font-bold">
        Your News, Your Language
      </h1>

      <p className="text-white text-2xl max-w-3xl">
        Read news articles in your native language — stay informed the way you understand best.
      </p>

      <p className="text-orange-400 text-2xl max-w-2xl">
        No barriers. Just your language.
      </p>

      <div className="flex space-x-3 text-4xl text-amber-400 mt-0.5">
        <i className="ri-circle-line"></i>
        <i className="ri-circle-fill"></i>
        <i className="ri-circle-line"></i>
      </div>

      {/* 👇 Go Next Button Positioned at Bottom Right */}
      <Link
        to="/promo3"
        className="absolute bottom-14 right-10 px-5 py-2 bg-amber-500 text-black font-semibold rounded-full shadow-lg hover:bg-amber-600 transition"
      >
        Go Next →
      </Link>

    </div>
  );
}

export default Promo2;
