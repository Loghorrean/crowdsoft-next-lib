import {debounce} from "crowdsoft-utils-lib";

export const useDebounceFn = (fn: (...args: any) => any, timeout = 350) => {
    return debounce(fn, timeout);
};
