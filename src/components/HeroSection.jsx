"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  CreditCard,
  Hospital,
  Ambulance,
  Clock,
  Phone,
  ArrowRight,
  Activity,
  Navigation2,
} from "lucide-react";
import Link from "next/link";
import Container from "./Container";

const HeroSection = () => {
  return (
      <div className="relative min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9IiMxZTI5M2IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgMTAiLz48L3N2Zz4=')] opacity-10" />
        </div>

        {/* Main content */}
        <div className="relative container mx-auto px-4">
          <div className="flex min-h-screen items-center">
            <div className="grid lg:grid-cols-2 gap-16 w-full py-20">
              {/* Left column - Content */}
              <div className="space-y-8">
                {/* Emergency badge */}
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 text-red-400">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-sm font-medium">
                    24/7 Emergency Response
                  </span>
                </div>

                {/* Main heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white">
                    Smart
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                      Emergency Care
                    </span>
                    At Your Fingertips
                  </h1>
                  <p className="text-xl text-slate-400 max-w-xl">
                    Experience lightning-fast ambulance booking with real-time
                    tracking and AI-powered emergency response system.
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/booking">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg h-14 px-8"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Book Emergency Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/hospitals">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-black text-lg border border-white h-14 px-8"
                    >
                      <Hospital className="mr-2 h-5 w-5" />
                      Find Hospitals
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-800">
                  <div>
                    <div className="text-3xl font-bold text-white">5min</div>
                    <div className="text-slate-400">Average Response</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-slate-400">Daily Rescues</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-slate-400">Active Support</div>
                  </div>
                </div>
              </div>

              {/* Right column - Visual */}
              <div className="relative">
                {/* Main container with gorgeous glass effect */}
                <div className="relative bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-slate-900/20 rounded-3xl border border-white/10 backdrop-blur-xl p-8 h-full shadow-2xl">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-cyan-500/10 blur-3xl" />
                  </div>

                  {/* Floating Stats Card */}
                  <div className="absolute -top-8 -right-8 bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] rounded-2xl rotate-3 shadow-xl">
                    <div className="bg-slate-950 rounded-2xl p-4 backdrop-blur-xl">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute -inset-1 bg-blue-500/20 rounded-full animate-ping" />
                          <Ambulance className="h-12 w-12 text-blue-400" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-lg">
                            Ambulance #A127
                          </div>
                          <div className="text-cyan-400 font-medium">
                            <span className="inline-flex items-center gap-1">
                              <Activity className="h-4 w-4" />3 mins away
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Map Area with Enhanced Visuals */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900/80 border border-white/10">
                    {/* Map Background */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b,#0f172a)]">
                      {/* Grid Pattern */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle at center, #334155 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />

                      {/* Animated Route */}
                      <div className="absolute inset-0">
                        <svg className="w-full h-full">
                          <path
                            d="M100,500 Q300,400 500,100"
                            stroke="url(#blueGradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="6 6"
                            className="animate-[dash_3s_linear_infinite]"
                          />
                          <defs>
                            <linearGradient
                              id="blueGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* Location Markers */}
                      <div className="absolute top-1/4 right-1/4">
                        <div className="relative">
                          <div className="absolute -inset-4 bg-blue-500/20 rounded-full animate-ping" />
                          <Hospital className="w-8 h-8 text-blue-400" />
                        </div>
                      </div>
                    </div>

                    {/* Feature Cards with Enhanced Design */}
                    <div className="absolute inset-0 p-6">
                      <div className="grid grid-cols-2 gap-6 h-full">
                        {[
                          {
                            icon: <Clock className="h-8 w-8" />,
                            title: "Quick Booking",
                            desc: "Book in seconds",
                            gradient: "from-blue-400 to-blue-600",
                          },
                          {
                            icon: <MapPin className="h-8 w-8" />,
                            title: "Live Tracking",
                            desc: "Real-time updates",
                            gradient: "from-cyan-400 to-cyan-600",
                          },
                          {
                            icon: <CreditCard className="h-8 w-8" />,
                            title: "Secure Payment",
                            desc: "Multiple options",
                            gradient: "from-indigo-400 to-indigo-600",
                          },
                          {
                            icon: <Navigation2 className="h-8 w-8" />,
                            title: "Smart Routing",
                            desc: "AI-powered path",
                            gradient: "from-sky-400 to-sky-600",
                          },
                        ].map((feature, i) => (
                          <div
                            key={i}
                            className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                          >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                            <div
                              className={`inline-flex p-2 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 text-white mb-3`}
                            >
                              {feature.icon}
                            </div>
                            <div className="font-semibold text-white text-lg mb-1">
                              {feature.title}
                            </div>
                            <div className="text-slate-400">{feature.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
