import React, { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Phone, Clock, Navigation2 } from "lucide-react";

const RealTimeTracking = ({ ambulanceData, userLocation, contactDetails }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const [eta, setEta] = useState("Calculating...");
  const [distance, setDistance] = useState("Calculating...");

  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      zoom: 13,
      center: { lat: userLocation.lat, lng: userLocation.lng },
      styles: [
        /* Custom map styles */
      ],
    });

    // User location marker
    markerRef.current = new window.google.maps.Marker({
      position: { lat: userLocation.lat, lng: userLocation.lng },
      map: googleMapRef.current,
      icon: {
        url: "/user-location.png",
        scaledSize: new window.google.maps.Size(30, 30),
      },
    });

    // Ambulance marker
    ambulanceMarkerRef.current = new window.google.maps.Marker({
      position: calculateInitialAmbulancePosition(),
      map: googleMapRef.current,
      icon: {
        url: "/ambulance-icon.png",
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });

    // Start ambulance movement simulation
    simulateAmbulanceMovement();
  };

  const calculateInitialAmbulancePosition = () => {
    // Calculate starting position based on ambulance.distance
    const heading = Math.random() * 360;
    const distance = parseFloat(ambulanceData.distance);
    return google.maps.geometry.spherical.computeOffset(
      new google.maps.LatLng(userLocation.lat, userLocation.lng),
      distance * 1000, // Convert km to meters
      heading
    );
  };

  const simulateAmbulanceMovement = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const ambulancePos = ambulanceMarkerRef.current.getPosition();
    const userPos = markerRef.current.getPosition();

    directionsService.route(
      {
        origin: ambulancePos,
        destination: userPos,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          const path = result.routes[0].overview_path;
          animateAmbulance(path, 0);

          // Update ETA and distance
          const route = result.routes[0].legs[0];
          setEta(route.duration.text);
          setDistance(route.distance.text);
        }
      }
    );
  };

  const animateAmbulance = (path, index) => {
    if (index < path.length - 1) {
      setTimeout(() => {
        ambulanceMarkerRef.current.setPosition(path[index]);
        animateAmbulance(path, index + 1);
      }, 1000); // Adjust speed as needed
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Ambulance En Route
      </h1>

      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg"
      />

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Live Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-blue-600">{eta}</p>
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
    </div>
  );
};

export default RealTimeTracking;
