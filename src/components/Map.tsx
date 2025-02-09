"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useAppContext } from "@/context/AuthContext";
import { useHospitals } from "@/hooks/useHospitals";
import Marker from "./Marker";
import useDebounce from "@/hooks/useDebounce";
import useGoogleMap from "@/hooks/useGoogleMaps";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navigation } from "lucide-react";

const FETCH_THRESHOLD = 0.01;

const Map = ({ height = "600px", width = "100%", zoom = 14 }) => {
  const mapRef = useRef(null);
  const lastFetchedLocation = useRef(null);
  const lastPannedLocation = useRef(null);
  const directionsRendererRef = useRef(null);

  const { userLocation } = useAppContext();
  const { hospitals, fetchHospitals } = useHospitals(userLocation);
  const { map, initializeMap } = useGoogleMap(mapRef, zoom);

  const [userMarker, setUserMarker] = useState(null);
  const [nearestHospital, setNearestHospital] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const findNearestHospital = useCallback((userLoc, hospitalList) => {
    if (!hospitalList.length) return null;

    return hospitalList.reduce((nearest, hospital) => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        userLoc,
        new google.maps.LatLng(hospital.location.lat, hospital.location.lng)
      );

      if (!nearest || distance < nearest.distance) {
        return { hospital, distance };
      }
      return nearest;
    }, null)?.hospital;
  }, []);

  const showRoute = useCallback(async (origin, destination) => {
    if (!map) return;

    const directionsService = new google.maps.DirectionsService();

    if (!directionsRendererRef.current) {
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map,
        suppressMarkers: true,
        preserveViewport: true,
      });
    }

    try {
      const result = await directionsService.route({
        origin,
        destination: new google.maps.LatLng(destination.location.lat, destination.location.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      });

      directionsRendererRef.current.setDirections(result);

      const route = result.routes[0].legs[0];
      setRouteInfo({
        distance: route.distance?.text || "N/A",
        duration: route.duration?.text || "N/A",
      });
    } catch (error) {
      console.error("Error calculating route:", error);
    }
  }, [map]);

  const fetchHospitalsStable = useCallback((lat, lng) => {
    const lastFetched = lastFetchedLocation.current;
    if (!lastFetched || Math.abs(lastFetched.lat - lat) > FETCH_THRESHOLD || Math.abs(lastFetched.lng - lng) > FETCH_THRESHOLD) {
      console.log("🚀 Fetching hospitals at:", lat, lng);
      lastFetchedLocation.current = { lat, lng };
      fetchHospitals(lat, lng);
    } else {
      console.log("❌ Fetch skipped: location change is too small");
    }
  }, [fetchHospitals]);

  const debouncedFetchHospitals = useDebounce(fetchHospitalsStable, 2000);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    if (!map || !userLocation) return;

    console.log("📍 Updating user location marker...");

    const userPos = new google.maps.LatLng(userLocation.lat, userLocation.lng);
    if (!userMarker) {
      const marker = new google.maps.Marker({
        position: userPos,
        map,
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      });
      setUserMarker(marker);
    } else {
      userMarker.setPosition(userPos);
    }

    const nearest = findNearestHospital(userPos, hospitals);
    if (nearest) {
      setNearestHospital(nearest);
      showRoute(userPos, nearest);
    }

    debouncedFetchHospitals(userLocation.lat, userLocation.lng);

    const lastPanned = lastPannedLocation.current;
    if (!lastPanned || Math.abs(lastPanned.lat - userLocation.lat) > 0.001 || Math.abs(lastPanned.lng - userLocation.lng) > 0.001) {
      setTimeout(() => {
        map.panTo(userPos);
        lastPannedLocation.current = { lat: userLocation.lat, lng: userLocation.lng };
      }, 500);
    }
  }, [
    userLocation,
    debouncedFetchHospitals,
    map,
    userMarker,
    hospitals,
    findNearestHospital,
    showRoute,
  ]);

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width }} className="rounded-lg shadow-lg" />

      {hospitals.map((hospital) => (
        <Marker key={hospital.id} map={map} position={hospital.location} isNearest={nearestHospital?.id === hospital.id} />
      ))}

      {routeInfo && nearestHospital && (
        <Alert className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur">
          <Navigation className="h-4 w-4" />
          <AlertDescription>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">Nearest Hospital: {nearestHospital.name}</span>
              <span>Distance: {routeInfo.distance} • Estimated Time: {routeInfo.duration}</span>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Map;
