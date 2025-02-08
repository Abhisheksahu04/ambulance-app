"use client";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { MapPin, Ambulance, CreditCard, Phone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FakePaymentForm from "@/components/FakePaymentForm";
import AmbulanceTracking from "@/components/Ambulance-tracking";
import { DUMMY_AMBULANCES } from "./Ambulance_data";
import RealTimeTracking from "@/components/RealTimetracking";

// const DUMMY_AMBULANCES = [
//   {
//     id: 1,
//     type: "Basic Life Support",
//     vehicleNumber: "DL01AB1234",
//     driverName: "Rajesh Kumar",
//     distance: "1.5",
//     eta: "5 mins",
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     type: "Advanced Life Support",
//     vehicleNumber: "DL02CD5678",
//     driverName: "Amit Singh",
//     distance: "2.3",
//     eta: "8 mins",
//     rating: 4.9,
//   },
//   {
//     id: 3,
//     type: "Patient Transport",
//     vehicleNumber: "DL03EF9012",
//     driverName: "Priya Sharma",
//     distance: "3.0",
//     eta: "12 mins",
//     rating: 4.7,
//   },
// ];

const LocationInput = ({ location, setLocation, setShowAmbulances }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MapPin className="h-5 w-5" /> Your Location
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-2">
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
          className="flex-1"
        />
        <Button onClick={() => setShowAmbulances(location.trim() !== "")}>
          Search
        </Button>
      </div>
    </CardContent>
  </Card>
);

const AmbulanceCard = ({ ambulance, isSelected, onSelect }) => (
  <div
    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
      isSelected ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
    }`}
    onClick={() => onSelect(ambulance)}
  >
    <div className="flex justify-between items-center">
      <div>
        <div className="font-medium">{ambulance.type}</div>
        <div className="text-sm text-gray-600">
          Driver: {ambulance.driverName} • Rating: {ambulance.rating}⭐
        </div>
        <div className="text-sm text-gray-600">
          Vehicle: {ambulance.vehicleNumber}
        </div>
        <div className="text-sm text-gray-600">
          Distance: {ambulance.distance} km • ETA: {ambulance.eta}
        </div>
      </div>
      <Ambulance className="h-6 w-6 text-blue-500" />
    </div>
  </div>
);

const AmbulanceList = ({
  ambulances,
  selectedAmbulance,
  setSelectedAmbulance,
}) => (
  <div className="mt-4 space-y-3">
    <h3 className="font-semibold">Available Ambulances</h3>
    {ambulances.map((ambulance) => (
      <AmbulanceCard
        key={ambulance.id}
        ambulance={ambulance}
        isSelected={selectedAmbulance?.id === ambulance.id}
        onSelect={setSelectedAmbulance}
      />
    ))}
  </div>
);

const ContactDetailsForm = ({ booking, setBooking }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Phone className="h-5 w-5" /> Contact Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4"> 
      <Input
        placeholder="Contact Person Name"
        value={booking.contactName}
        onChange={(e) =>
          setBooking({ ...booking, contactName: e.target.value })
        }
      />
      <Input
        placeholder="Emergency Contact Number"
        value={booking.contactPhone}
        onChange={(e) =>
          setBooking({ ...booking, contactPhone: e.target.value })
        }
      />
    </CardContent>
  </Card>
);

const PaymentSection = ({ handleProceedToFakePayment, booking }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <CreditCard className="h-5 w-5" /> Payment Details
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Button
        className="w-full"
        onClick={handleProceedToFakePayment}
        disabled={!booking.contactName || !booking.contactPhone}
      >
        Proceed to Payment
      </Button>
    </CardContent>
  </Card>
);

const AmbulanceBooking = () => {
  const [location, setLocation] = useState("");
  const [showAmbulances, setShowAmbulances] = useState(false);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [booking, setBooking] = useState({ contactName: "", contactPhone: "" });
  const [showFakePayment, setShowFakePayment] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [userLocation, setUserLocation] = useState(null);


  const handleProceedToFakePayment = () => setShowFakePayment(true);

  
  const handleFakePaymentSuccess = () => {
    setShowFakePayment(false);
    setBookingComplete(true);
  };

  if (bookingComplete)
    return (
      <RealTimeTracking ambulanceData={selectedAmbulance} contactDetails={booking} />
    );

  return (
    <div className="max-w-4xl min-h-screen mx-auto p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Emergency Ambulance Booking</h1>
      </div>
      <LocationInput
        location={location}
        setLocation={setLocation}
        setShowAmbulances={setShowAmbulances}
      />
      {showAmbulances && (
        <AmbulanceList
          ambulances={DUMMY_AMBULANCES}
          selectedAmbulance={selectedAmbulance}
          setSelectedAmbulance={setSelectedAmbulance}
        />
      )}
      {selectedAmbulance && (
        <>
          <ContactDetailsForm booking={booking} setBooking={setBooking} />
          <PaymentSection
            handleProceedToFakePayment={handleProceedToFakePayment}
            booking={booking}
          />
        </>
      )}
      {showFakePayment && (
        <FakePaymentForm onSuccess={handleFakePaymentSuccess} />
      )}
    </div>
  );
};

export default AmbulanceBooking;
