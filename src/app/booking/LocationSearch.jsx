import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

const LocationSearch = ({ onLocationSelect }) => {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    // Load Google Maps JavaScript API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initAutocomplete;
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initAutocomplete = () => {
    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "IN" },
        bounds: {
          north: 19.2813,
          south: 18.875,
          east: 73.0297,
          west: 72.7752,
        },
        strictBounds: true,
        types: ["address"],
      }
    );

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
    <div className="relative">
      <Input
        ref={inputRef}
        className="pl-10"
        placeholder="Enter location in Mumbai"
      />
      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default LocationSearch;
