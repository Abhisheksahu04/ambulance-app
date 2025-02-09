"use client"

import React, { useState, useEffect } from "react";
import { MapPin, Ambulance, CreditCard, Phone, Star, Clock, Navigation, Shield, Star, Clock, Navigation, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Alert, AlertDescription } from "@/components/ui/alert";
import dynamic from "next/dynamic";
import RealTimeTracking from "@/components/RealTimetracking";

const DUMMY_AMBULANCES = [
  {
    id: 1,
    type: "Basic Life Support",
    driverName: "Rajesh Kumar",
    rating: 4.8,
    vehicleNumber: "MH 01 AB 1234",
    distance: "2.5",
    eta: "10 mins",
  },
  {
    id: 2,
    type: "Advanced Life Support",
    driverName: "Priya Singh",
    rating: 4.9,
    vehicleNumber: "MH 01 CD 5678",
    distance: "3.2",
    eta: "15 mins",
  },
  {
    id: 3,
    type: "Patient Transport",
    driverName: "Amit Patel",
    rating: 4.7,
    vehicleNumber: "MH 01 EF 9012",
    distance: "1.8",
    eta: "8 mins",
  },
  {
    id: 4,
    type: "Critical Care",
    driverName: "Suresh Reddy",
    rating: 5.0,
    vehicleNumber: "MH 01 GH 3456",
    distance: "4.0",
    eta: "18 mins",
  },
];
// Dynamically import client-side components
const FakePaymentForm = dynamic(() => import("@/components/FakePaymentForm"), {
  ssr: false,
});

// const RealTimeTracking = dynamic(
//   () => import("@/components/RealTimetracking"),
//   {
//     ssr: false,
//   }
// );

// Moved AmbulanceList component definition here
const AmbulanceList = ({
  ambulances,
  selectedAmbulance,
  setSelectedAmbulance,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Ambulance className="h-5 w-5" /> Available Ambulances
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {ambulances.map((ambulance) => (
        <AmbulanceCard
          key={ambulance.id}
          ambulance={ambulance}
          isSelected={selectedAmbulance?.id === ambulance.id}
          onSelect={setSelectedAmbulance}
        />
      ))}
    </CardContent>
  </Card>
);

const LocationInput = ({ onLocationSelect }) => {
  const inputRef = React.useRef(null);
  const autocompleteRef = React.useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "IN" },
      bounds: {
        north: 19.2813,
        south: 18.875,
        east: 73.0297,
        west: 72.7752,
      },
      strictBounds: true,
      types: ["address"],
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        onLocationSelect({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <MapPin className="h-6 w-6 text-red-500" /> Enter Your Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              placeholder="Enter your location in Mumbai"
              className="pl-10 h-12 text-lg"
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AmbulanceCard = ({ ambulance, isSelected, onSelect }) => (
  <div
    className={`p-6 border rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
      isSelected ? "border-blue-500 bg-blue-50 shadow-md" : "hover:border-gray-400"
    }`}
    onClick={() => onSelect(ambulance)}
  >
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">{ambulance.type}</span>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Available Now
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span>{ambulance.rating}</span>
          <span>•</span>
          <span>{ambulance.driverName}</span>
        </div>
        <div className="text-sm text-gray-600">
          Vehicle: {ambulance.vehicleNumber}
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center text-blue-600">
            <Navigation className="h-4 w-4 mr-1" />
            {ambulance.distance} km away
          </span>
          <span className="flex items-center text-green-600">
            <Clock className="h-4 w-4 mr-1" />
            ETA: {ambulance.eta}
          </span>
        </div>
      </div>
      <Ambulance className="h-8 w-8 text-blue-500" />
    </div>
  </div>
);

const ContactDetailsForm = ({ booking, setBooking }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Phone className="h-6 w-6 text-blue-500" /> Emergency Contact Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Contact Person Name</label>
        <Input
          className="h-12"
          placeholder="Enter full name"
          value={booking.contactName}
          onChange={(e) => setBooking({ ...booking, contactName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Emergency Contact Number</label>
        <Input
          className="h-12"
          placeholder="Enter mobile number"
          value={booking.contactPhone}
          onChange={(e) => setBooking({ ...booking, contactPhone: e.target.value })}
        />
      </div>
    </CardContent>
  </Card>
);

const PaymentSection = ({ handleProceedToFakePayment, booking }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-green-500" /> Secure Payment
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Alert className="mb-4">
        <AlertDescription>
          Your payment information is secure and encrypted. No advance payment required for emergency services.
        </AlertDescription>
      </Alert>
      <Button
        className="w-full h-12 text-lg font-semibold"
        onClick={handleProceedToFakePayment}
        disabled={!booking.contactName || !booking.contactPhone}
      >
        Confirm Booking
      </Button>
    </CardContent>
  </Card>
);

const AmbulanceBooking = () => {
  const [availableAmbulances, setAvailableAmbulances] = useState([]);
  const [showAmbulances, setShowAmbulances] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [booking, setBooking] = useState({ contactName: "", contactPhone: "" });
  const [showFakePayment, setShowFakePayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleLocationSelect = async (location) => {
    setUserLocation(location);
    const nearbyAmbulances = await findNearbyAmbulances(location);
    setAvailableAmbulances(nearbyAmbulances);
    setShowAmbulances(true);
  };

  const handleProceedToFakePayment = () => setShowFakePayment(true);
  const handleFakePaymentSuccess = () => {
    setShowFakePayment(false);
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <RealTimeTracking
        ambulanceData={selectedAmbulance}
        userLocation={userLocation}
        contactDetails={booking}
      />
    );
  }

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-4 space-y-6">
      <div className="text-center">
      <h1 className="text-3xl font-bold">Emergency Ambulance Booking</h1>
      </div>
      
      <LocationInput onLocationSelect={handleLocationSelect} />

      {showAmbulances && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ambulance className="h-6 w-6 text-blue-500" /> Available Ambulances
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableAmbulances.map((ambulance) => (
              <AmbulanceCard
                key={ambulance.id}
                ambulance={ambulance}
                isSelected={selectedAmbulance?.id === ambulance.id}
                onSelect={setSelectedAmbulance}
              />
            ))}
          </CardContent>
        </Card>
      )}

      {selectedAmbulance && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ContactDetailsForm booking={booking} setBooking={setBooking} />
          <PaymentSection
            handleProceedToFakePayment={handleProceedToFakePayment}
            booking={booking}
          />
        </div>
      )}

      {showFakePayment && (
        <FakePaymentForm onSuccess={handleFakePaymentSuccess} />
      )}
    </div>
  );
};

export default AmbulanceBooking;