import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Ambulance, MapPin, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-2 px-4 text-center flex items-center justify-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">Need immediate help? Call 108</span>
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 px-4 py-12">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Emergency? Get an Ambulance Instantly.
            </h1>
            <p className="text-xl text-gray-600">
              Fast. Reliable. Life-saving. Book an ambulance in seconds and
              track it in real time.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
            >
              <Ambulance className="mr-2 h-5 w-5" />
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto ml-0 sm:ml-4"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Find Nearest Hospital
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Quick Booking</h2>
            <form className="space-y-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Input placeholder="Enter your location" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Ambulance Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Ambulance</SelectItem>
                  <SelectItem value="icu">ICU Ambulance</SelectItem>
                  <SelectItem value="ventilator">
                    Ventilator Ambulance
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <Input placeholder="Emergency Contact (Optional)" type="tel" />
              </div>

              <Button className="w-full bg-red-600 hover:bg-red-700">
                Find Ambulance
              </Button>
            </form>
          </Card>

          {/* Map Placeholder - Replace with actual map implementation */}
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gray-100 rounded-lg">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map View
              {/* Integrate your preferred map service here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
