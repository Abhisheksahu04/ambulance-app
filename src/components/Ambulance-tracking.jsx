import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Navigation2 } from "lucide-react";

const AmbulanceTracking = ({ ambulanceData, contactDetails }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [estimatedTime, setEstimatedTime] = useState("12 mins");
  const [distance, setDistance] = useState("2.5 km");

  // Simulate ambulance movement
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime((prev) => {
        const mins = parseInt(prev);
        return mins > 1 ? `${mins - 1} mins` : "Arriving";
      });
      setDistance((prev) => {
        const km = parseFloat(prev);
        return km > 0.1 ? `${(km - 0.2).toFixed(1)} km` : "Nearby";
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Ambulance En Route
      </h1>
      {/* Map Placeholder */}
      <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <Navigation2 className="h-8 w-8 text-blue-500 mx-auto animate-pulse" />
            <p className="text-gray-500">Live tracking map</p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              ETA & Distance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-600">
                {estimatedTime}
              </p>
              <p className="text-gray-600">Distance: {distance}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Phone className="h-5 w-5" />
              Driver Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">{ambulanceData.driverName}</p>
              <p className="text-gray-600">{ambulanceData.vehicleNumber}</p>
              <p className="text-gray-600">{ambulanceData.type}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Contact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MapPin className="h-5 w-5" />
            Pickup Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="font-medium">Contact: {contactDetails.contactName}</p>
            <p className="text-gray-600">
              Phone: {contactDetails.contactPhone}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmbulanceTracking;
