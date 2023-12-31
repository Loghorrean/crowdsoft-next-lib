"use client";

import { useState } from "react";
import {useEffectOnUpdate} from "./useEffectOnUpdate";

export function useDebounce<T>(value: T, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffectOnUpdate(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, delay]);

    return debouncedValue;
}
