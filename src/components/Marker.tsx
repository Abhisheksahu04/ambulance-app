"use client";

import { useEffect } from "react";

interface MarkerProps {
    map: google.maps.Map | null;
    position: google.maps.LatLngLiteral;
    label?: string;
    icon?: { url: string; scaledSize?: google.maps.Size | null };
    onClick?: () => void;
    isNearest?: boolean;
}

const Marker = ({ map, position, label, icon, onClick }: MarkerProps) => {
    useEffect(() => {
        if (!map) return;

        const marker = new google.maps.Marker({
            map,
            position,
            label,
            icon
        });

        if (onClick) {
            marker.addListener("click", onClick);
        }

        return () => {
            marker.setMap(null);
        };
    }, [map, position, label, icon, onClick]);

    return null;
};

export default Marker;