"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-gradient-to-r from-blue-600 to-indigo-800 text-white">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          🚑 Smart <span className="text-yellow-300">Ambulance Booking</span>
        </h1>
        <p className="text-lg md:text-xl opacity-90">
          Get emergency medical help instantly with real-time ambulance tracking
          and seamless booking. Fast, secure, and reliable!
        </p>
        <button className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold text-lg rounded-xl shadow-md hover:bg-yellow-300 transition">
          Book Now
        </button>
      </div>

      {/* Right Side - Lottie Animation */}
      <div className="md:w-1/2 flex justify-center">
        <DotLottieReact
          src="https://lottie.host/457d3af1-83a2-4f2f-9190-49849cfd637b/zeBaP8XP37.lottie"
          loop
          autoplay
          className="w-80 h-80 md:w-[400px] md:h-[400px]"
        />
      </div>

      {/* Background Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-black opacity-10"></div>
    </section>
  );
};

export default HeroSection;
