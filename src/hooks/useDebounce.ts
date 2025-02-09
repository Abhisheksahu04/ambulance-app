"use client";

import { useRef } from "react";

function useDebounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    const timeout = useRef<NodeJS.Timeout | null>(null);

    return (...args: Parameters<T>) => {
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => func(...args), wait);
    };
}

export default useDebounce;