"use client";

import { useCallback, useEffect, useState } from "react";
import {isValueEmpty} from "crowdsoft-utils-lib";

export type ClientNotificationConfig = {
    session?: boolean;
};

const defaultConfig: ClientNotificationConfig = {
    session: false,
};

export const useOneTimeClientNotification = (
    key: string,
    config: ClientNotificationConfig = defaultConfig
): [boolean, () => void] => {
    const windowKey = `${key}-closed`;
    const [isVisible, setIsVisible] = useState(false);
    const close = useCallback(() => {
        const storage = config.session ? window.sessionStorage : window.localStorage;
        setIsVisible(false);
        storage.setItem(windowKey, "true");
    }, []);
    useEffect(() => {
        const storage = config.session ? window.sessionStorage : window.localStorage;
        const value = storage.getItem(windowKey);
        setIsVisible(isValueEmpty(value));
    }, []);
    return [isVisible, close];
};
