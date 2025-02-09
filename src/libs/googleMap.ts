const cache = new Map<string, any>();

export const fetchNearestHospitals = async (lat: number, lng: number) => {
    try {
        if (lat === undefined || lng === undefined) {
            throw new Error('Invalid coordinates');
        }

        const cacheKey = `${lat},${lng}`;
        if (cache.has(cacheKey)) {
            console.log("Returning cached hospital data...");
            return cache.get(cacheKey);
        }

        const res = await fetch(`/api/google/hospitals?lat=${lat}&lng=${lng}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to fetch hospitals');
        }

        const data = await res.json();
        cache.set(cacheKey, data); // Store in cache
        return data;
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        throw error;
    }
};