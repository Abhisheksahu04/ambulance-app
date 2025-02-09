// src/contexts/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Client, Account, Databases } from "appwrite";

const AuthContext = createContext(undefined);

// Initialize Appwrite
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a7f3330010f063b8a6");

const database = new Databases(client);

export function AuthProvider({ children }) {
  const { user, isLoading } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user?.sub) {
        try {
          // Fetch user details from Appwrite
          const response = await database.listDocuments(
            "UserDB",// Database ID
            "users",// Collection name
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
        {
          auth0Id: user?.sub,
          ...details,
        }
      );
      setUserDetails(response);
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userDetails, loading, updateUserDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
