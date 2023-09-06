import { useCallback } from "react";
import {useLatest} from "@/src";

export function useEvent<T extends (...args: any[]) => any>(fn: T) {
    const fnRef = useLatest(fn);
    return useCallback(
        (...args: Parameters<T>) => {
            return fnRef.current.apply(null, args);
        },
        [fnRef]
    );
}
