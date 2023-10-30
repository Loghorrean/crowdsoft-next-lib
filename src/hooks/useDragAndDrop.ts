"use client";

import { SyntheticEvent, useCallback, useState } from "react";
import * as React from "react";

export function useDragAndDrop<T = Element>(onDrop: (...args: any) => unknown) {
    const [dragActive, setDragActive] = useState(false);
    const handleDrag = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(async (event: React.DragEvent<T>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        onDrop(event);
    }, []);

    return {
        dragActive,
        handleDrag,
        handleDrop,
    };
};
