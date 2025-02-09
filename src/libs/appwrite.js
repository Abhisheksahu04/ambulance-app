// lib/appwrite.ts
import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a7f3330010f063b8a6");

export const databases = new Databases(client);


// Database Schema
/*
Collection: users
Attributes:
- auth0Id (string, unique)
- type (string, enum['patient', 'driver'])
- name (string)
- address (string)
- pincode (string)
- emergencyContact (string)
- vehicleNumber (string)
- licenseNumber (string)
- serviceArea (string)
- availabilitySlots (string[])
*/
