"use client";

import { Dispatch, useReducer } from "react";
import {PartialObject} from "crowdsoft-utils-lib";

export function useSetComplexObject<T extends object>(initial: T): [T, Dispatch<PartialObject<T>>] {
    const [value, setValue] = useReducer(
        (value: T, newDetails: PartialObject<T>) => ({ ...value, ...newDetails }),
        initial
    );
    return [value, setValue];
}
