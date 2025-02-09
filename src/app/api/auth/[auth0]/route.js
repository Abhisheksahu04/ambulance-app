import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();

// app/api/auth/[auth0]/route.ts
// import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
// import { NextResponse } from "next/server";
// import { Client, Databases, Query } from "appwrite";

// // Initialize Appwrite client
// const client = new Client()
//     .setEndpoint('YOUR_APPWRITE_ENDPOINT') // Get this from Appwrite Console
//     .setProject('YOUR_PROJECT_ID');        // Get this from Appwrite Console

// const databases = new Databases(client);

// export const GET = handleAuth({
//     callback: async (req, ctx) => {
//         try {
//             const res = await handleCallback(req, ctx);
//             const user = res.data.user;

//             // Check if user exists in Appwrite
//             const users = await databases.listDocuments(
//                 'YOUR_DATABASE_ID',     // Get this from Appwrite Console
//                 'users',               // Your collection name
//                 [
//                     Query.equal('auth0Id', user.sub)
//                 ]
//             );

//             // If user doesn't exist in Appwrite, redirect to registration
//             if (users.documents.length === 0) {
//                 return NextResponse.redirect(new URL('/register', req.url));
//             }

//             // If user exists, redirect to dashboard
//             return NextResponse.redirect(new URL('/dashboard', req.url));
//         } catch (error) {
//             console.error('Auth callback error:', error);
//             return NextResponse.redirect(new URL('/error', req.url));
//         }
//     }
// });