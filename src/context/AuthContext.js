"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Client, Databases } from "appwrite";
import { useLocation } from "../hooks/useLocation";
import { useHospitals } from "../hooks/useHospitals";

const AppContext = createContext(null);

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a7f3330010f063b8a6");

const database = new Databases(client);

export const AppProvider = ({ children }) => {
  const { user, isLoading: authLoading } = useUser();
  const { location, error, isLoading: locationLoading } = useLocation();
  const hospitals = useHospitals(location);
  const ambulanceLocation = { lat: 28.6139, lng: 77.2090 }; // Dummy ambulance location

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.sub) {
        try {
          const response = await database.listDocuments(
            "UserDB",
            "users",
            [] // Query where auth0Id equals user.sub
          );
          if (response.documents.length > 0) {
            setUserDetails(response.documents[0]);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, [user]);

  const updateUserDetails = async (details) => {
    try {
      const response = await database.createDocument(
        "UserDB",
        "users",
        "unique()",
        { auth0Id: user?.sub, ...details }
      );
      setUserDetails(response);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  };

  const nearestHospital = hospitals.hospitals.length > 0 ? hospitals.hospitals[0] : null;

  if (authLoading || locationLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <AppContext.Provider
      value={{
        user,
        userDetails,
        loading,
        updateUserDetails,
        userLocation: location,
        ambulanceLocation,
        hospitals,
        nearestHospital,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
