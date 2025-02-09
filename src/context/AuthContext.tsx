"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "../hooks/useLocation";
import { useHospitals } from "../hooks/useHospitals";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    const { location, error, isLoading } = useLocation(); // Using the updated useLocation hook
    const ambulanceLocation = { lat: 28.6139, lng: 77.2090 }; // Dummy ambulance location
    const hospitals = useHospitals(location); // Fetch hospitals based on user's location

    // If there are hospitals, set the nearest hospital, else null
    const nearestHospital = hospitals.hospitals.length > 0 ? hospitals.hospitals[0] : null;

    // Loading and error states handling
    if (isLoading) {
        return <div>Loading your location...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <AppContext.Provider value={{ userLocation: location, ambulanceLocation, hospitals, nearestHospital }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
