"use client";

import { SyntheticEvent, useCallback, useState } from "react";

export const useDragAndDrop = (onDrop: (...args: any) => unknown) => {
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

    const handleDrop = useCallback(async (event: DragEvent) => {
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
