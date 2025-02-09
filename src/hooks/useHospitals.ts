import { useState } from 'react';

export interface Hospital {
    id: string;
    name: string;
    address: string;
    location: {
        lat: number;
        lng: number;
    };
    rating: number | null;
    totalRatings: number;
    placeId: string;
    isOpen: boolean | null;
}

interface HospitalsState {
    hospitals: Hospital[];
    loading: boolean;
    error: string | null;
}

export const useHospitals = (userLocation: { lat: number; lng: number; }) => {
    const [state, setState] = useState<HospitalsState>({
        hospitals: [],
        loading: false,
        error: null
    });

    const fetchHospitals = async (lat: number, lng: number) => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const response = await fetch(`api/google/hospitals?lat=${lat}&lng=${lng}`);
            if (!response.ok) {
                throw new Error('Failed to fetch hospitals');
            }

            const data = await response.json();
            console.log('Fetched hospitals:', data);
            setState({
                hospitals: data.data || [],
                loading: false,
                error: null
            });
        } catch (err) {
            setState({
                hospitals: [],
                loading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch hospitals'
            });
        }
    };

    return { ...state, fetchHospitals }; // ✅ Now fetchHospitals is separate from the state type
};