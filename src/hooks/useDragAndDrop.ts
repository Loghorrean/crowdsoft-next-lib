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

    //TODO: CHANGE TYPE
    const handleDrop = useCallback(async (event: any) => {
        console.log(typeof event);
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        onDrop(event);
        // if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
        //     await handleUpload(event.dataTransfer.files);
        // }
    }, []);

    return {
        dragActive,
        handleDrag,
        handleDrop,
    };
};
