"use client";
import { useEffect } from "react";
import { useAppContext } from "@/context/AuthContext";

const Route = ({ map }) => {
    const { userLocation, ambulanceLocation, nearestHospital } = useAppContext();

    useEffect(() => {
        if (!map || !userLocation || !ambulanceLocation || !nearestHospital || !window.google) return;

        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setMap(map);

        const request = {
            origin: ambulanceLocation,
            destination: nearestHospital.location,
            waypoints: [{ location: userLocation, stopover: true }],
            travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") directionsRenderer.setDirections(result);
        });
    }, [map, userLocation, ambulanceLocation, nearestHospital]);

    return null;
};

export default Route;