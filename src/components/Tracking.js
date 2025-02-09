"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Tracking() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    socket.on("locationUpdate", (data) => {
      setLocation(data);
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  return (
    <div className="mt-4 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold">Live Tracking</h2>
      <p>
        🚑 Ambulance Location: {location.lat}, {location.lng}
      </p>
    </div>
  );
}
