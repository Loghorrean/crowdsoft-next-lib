"use client";

import { useEffect } from "react";
import {useEvent} from "./useEvent";

export const useWindowEvent = (type: keyof GlobalEventHandlersEventMap, cb: (event: Event) => void) => {
    const eventCb = useEvent(cb);

    useEffect(() => {
        window.addEventListener(type, eventCb);

        return () => window.removeEventListener(type, eventCb);
    }, [eventCb]);
}
