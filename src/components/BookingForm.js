"use client";
import { useState } from "react";

const users = [
  { id: "user1", name: "Swasti", location: { lat: 20.593, lng: 78.9615 } },
];

const ambulances = [
  {
    id: "amb1",
    driverId: "123",
    location: { lat: 20.5937, lng: 78.9629 },
    status: "available",
  },
  {
    id: "amb2",
    driverId: "456",
    location: { lat: 20.5945, lng: 78.965 },
    status: "available",
  },
];

export default function BookingForm() {
  const [booking, setBooking] = useState(null);

  const handleBooking = () => {
    const user = users[0];
    const availableAmbulance = ambulances.find(
      (amb) => amb.status === "available"
    );

    if (!availableAmbulance) {
      alert("No ambulances available!");
      return;
    }

    const newBooking = {
      userId: user.id,
      ambulanceId: availableAmbulance.id,
      status: "confirmed",
    };

    setBooking(newBooking);
  };

  return (
    <div className="p-4 text-black shadow-md rounded-md">
      <h2 className="text-xl font-bold">Book an Ambulance</h2>
      <button
        onClick={handleBooking}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Confirm Booking
      </button>
      {booking && (
        <div className="mt-2 text-green-600">
          🚑 Ambulance {booking.ambulanceId} is on the way!
        </div>
      )}
    </div>
  );
}
