"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {useEffectOnUpdate} from "@/src";

export const useDropdown = (active: boolean, initialHeight = 0): [RefObject<HTMLDivElement>, number] => {
    const contentElement = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(initialHeight);

    const setActualHeight = () => {
        if (active) {
            setHeight(contentElement.current ? contentElement.current.clientHeight : 0);
            return;
        }
        setHeight(initialHeight);
    };

    useEffectOnUpdate(() => {
        setActualHeight();
    }, [active]);

    //TODO: REWRITE TO CALLBACK REF
    useEffect(() => {
        const current = contentElement.current;
        const observer = new ResizeObserver(entries => {
            if (active) {
                setHeight(entries[0].contentRect.height);
            }
        });
        current && observer.observe(current);
        return () => {
            contentElement.current && observer.unobserve(contentElement.current);
        };
    }, [active]);

    return [contentElement, height];
};
