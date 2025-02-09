import { useState, useEffect } from "react";

export const useLocation = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string | null>(null); // To handle errors gracefully
    const [isLoading, setIsLoading] = useState<boolean>(true); // To show loading state while fetching location

    useEffect(() => {
        // Options for geolocation request to improve accuracy
        const geoOptions = {
            enableHighAccuracy: true, // Request high accuracy
            timeout: 10000, // 10 seconds timeout
            maximumAge: 0, // No cached location, always get the fresh location
        };

        const successCallback = (position: GeolocationPosition) => {
            setLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setIsLoading(false); // Data fetched successfully
        };

        const errorCallback = (err: GeolocationPositionError) => {
            setError("Location permission denied or failed to get location");
            setIsLoading(false);
            console.error("Geolocation error: ", err);
        };

        // Watch the user's position
        const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback, geoOptions);

        // Cleanup on unmount
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return { location, error, isLoading };
};
