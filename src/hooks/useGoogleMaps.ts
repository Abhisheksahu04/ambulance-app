"use client";
import { Loader } from "@googlemaps/js-api-loader";
import { useState, useRef, useCallback } from "react";

const useGoogleMap = (mapRef: React.RefObject<HTMLDivElement>, zoom: number) => {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const isMapInitialized = useRef(false);

    const initializeMap = useCallback(async () => {
        if (typeof window === 'undefined' || !mapRef.current || isMapInitialized.current) return;
        isMapInitialized.current = true;  // Ensures we only run this once

        try {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
                version: "weekly",
                libraries: ["places"]
            });

            await loader.importLibrary("maps");
            await loader.importLibrary("geometry");
            await loader.importLibrary("places");

            const googleMap = new google.maps.Map(mapRef.current, {
                center: { lat: 28.7041, lng: 77.1025 }, // Default to New Delhi
                zoom,
                mapTypeControl: true,
                streetViewControl: true,
                fullscreenControl: true,
                zoomControl: true,
                styles: [
                    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
                    { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
                ]
            });

            setMap(googleMap);
            setDirectionsService(new google.maps.DirectionsService());
            setDirectionsRenderer(new google.maps.DirectionsRenderer({ map: googleMap, suppressMarkers: true }));
        } catch (err) {
            console.error("Map initialization error:", err);
        }
    }, [mapRef, zoom]);  // 🔹 Removed map dependency here

    return { map, directionsService, directionsRenderer, initializeMap };
};

export default useGoogleMap;