"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Navigation,
  Ambulance,
  Clock,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";

const HospitalFinder = () => {
  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [availableAmbulances, setAvailableAmbulances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcpxj38hgqfdOW-5yWXrZqlDMPoDcXt_k&libraries=places`;
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        zoom: 14,
        center: { lat: 20.2961, lng: 85.8245 }, // Default to Bhubaneswar, change if needed
        styles: [
          {
            featureType: "poi.medical",
            stylers: [{ visibility: "on" }],
          },
        ],
      }
    );

    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    const renderer = new window.google.maps.DirectionsRenderer({
      map: mapInstance,
      suppressMarkers: true,
    });
    setDirectionsRenderer(renderer);
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
          map.setCenter(pos);

          new window.google.maps.Marker({
            position: pos,
            map: map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            },
          });

          findNearbyHospitals(pos);
          setLoading(false);
        },
        (error) => {
          console.error("Error:", error);
          setLoading(false);
        }
      );
    }
  };

  const findNearbyHospitals = (location) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: location,
      radius: "5000",
      type: ["hospital"],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setNearbyHospitals(results);
        results.forEach((hospital) => createHospitalMarker(hospital));
      }
    });
  };

  const createHospitalMarker = (hospital) => {
    const marker = new window.google.maps.Marker({
      map: map,
      position: hospital.geometry.location,
      icon: {
        url: "/hospital-icon.png",
        scaledSize: new window.google.maps.Size(32, 32),
      },
      title: hospital.name,
    });

    marker.addListener("click", () => handleHospitalSelect(hospital));
  };

  const calculateRoute = (hospital) => {
    if (!userLocation) return;

    const request = {
      origin: userLocation,
      destination: hospital.geometry.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const duration = result.routes[0].legs[0].duration.text;
        setEstimatedTime(duration);
      }
    });
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    calculateRoute(hospital);
    fetchAvailableAmbulances();
  };

  const fetchAvailableAmbulances = () => {
    // Dummy ambulance data
    const ambulances = [
      { id: 1, driver: "Rajesh Kumar", phone: "9876543210", type: "Basic" },
      { id: 2, driver: "Amit Sharma", phone: "8765432109", type: "ICU" },
      { id: 3, driver: "Sunil Das", phone: "7654321098", type: "Ventilator" },
    ];
    setAvailableAmbulances(ambulances);
  };

  const handleBookAmbulance = () => {
    setShowBooking(true);
  };

  const confirmAmbulance = (ambulance) => {
    alert(
      `Ambulance ${ambulance.type} has been booked! Driver: ${ambulance.driver}`
    );
    setShowBooking(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Emergency Hospital Finder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={getCurrentLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            disabled={loading}
          >
            <Navigation className="h-4 w-4" />
            {loading ? "Finding Hospitals..." : "Find Nearby Hospitals"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div id="map" className="h-[600px] w-full rounded-lg shadow-lg" />
        </div>

        <div className="space-y-4">
          {nearbyHospitals.map((hospital) => (
            <Card
              key={hospital.place_id}
              className="cursor-pointer hover:shadow-md"
              onClick={() => handleHospitalSelect(hospital)}
            >
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hospital.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <MapPin className="h-4 w-4" />
                  <span>{hospital.vicinity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedHospital && (
        <div>
          <h2 className="text-xl font-bold mt-4">Available Ambulances</h2>
          {availableAmbulances.map((ambulance) => (
            <Card key={ambulance.id} className="p-4 mt-2">
              <div className="flex justify-between">
                <span>
                  {ambulance.type} - {ambulance.driver}
                </span>
                <Button onClick={() => confirmAmbulance(ambulance)}>
                  Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalFinder;
