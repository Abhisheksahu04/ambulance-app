// app/api/google/hospitals/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Type definitions for API responses
interface Location {
    lat: number;
    lng: number;
}

interface Hospital {
    name: string;
    address: string;
    location: Location;
    rating: number | null;
    totalRatings: number;
    placeId: string;
    isOpen: boolean | null;
}

interface GooglePlacesResponse {
    results: Array<{
        name: string;
        vicinity: string;
        geometry: {
            location: Location;
        };
        rating?: number;
        user_ratings_total?: number;
        place_id: string;
        opening_hours?: {
            open_now: boolean;
        };
    }>;
    status: string;
    error_message?: string;
    next_page_token?: string;
}

export async function GET(request: NextRequest) {
    try {
        // 1. Extract and validate parameters
        const searchParams = request.nextUrl.searchParams;
        const lat = searchParams.get('lat');
        const lng = searchParams.get('lng');

        console.log('Received request for coordinates:', { lat, lng });

        if (!lat || !lng) {
            console.error('Missing coordinates in request');
            return NextResponse.json(
                { error: 'Missing coordinates' },
                { status: 400 }
            );
        }

        // 2. Validate coordinate values
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (isNaN(latitude) || isNaN(longitude) ||
            latitude < -90 || latitude > 90 ||
            longitude < -180 || longitude > 180) {
            console.error('Invalid coordinate values:', { latitude, longitude });
            return NextResponse.json(
                { error: 'Invalid coordinate values' },
                { status: 400 }
            );
        }

        // 3. Check for API key
        const apiKey = 'AIzaSyDcpxj38hgqfdOW-5yWXrZqlDMPoDcXt_k';
        if (!apiKey) {
            console.error('Missing Google Maps API key');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // 4. Construct Google Places API URL
        const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
        const url = new URL(baseUrl);
        url.searchParams.append('location', `${latitude},${longitude}`);
        url.searchParams.append('rankby', 'distance'); // Sort by distance
        url.searchParams.append('type', 'hospital');
        url.searchParams.append('key', apiKey);
        url.searchParams.append('language', 'en');

        console.log('Fetching from Google Places API');

        // 5. Make request to Google Places API
        const response = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
            },
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            console.error('Google Places API error:', response.status);
            throw new Error(`Google Places API error: ${response.status}`);
        }

        // 6. Parse and transform response
        const data: GooglePlacesResponse = await response.json();

        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            console.error('Google Places API returned error status:', data.status);
            return NextResponse.json(
                { error: `Location search failed: ${data.status}`},
                { status: 500 }
            );
        }

        // 7. Format the results
        const hospitals: Hospital[] = data.results.map(place => ({
            name: place.name,
            address: place.vicinity,
            location: {
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng
            },
            rating: place.rating || null,
            totalRatings: place.user_ratings_total || 0,
            placeId: place.place_id,
            isOpen: place.opening_hours?.open_now ?? null
        }));

        console.log(`Found ${hospitals.length} hospitals`);

        // 8. Return formatted response
        return NextResponse.json({
            status: 'success',
            data: hospitals,
            nextPageToken: data.next_page_token || null
        }, {
            headers: {
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch hospital data' },
            { status: 500 }
        );
    }
}