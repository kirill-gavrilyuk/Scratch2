import { id, allKeys } from "utils";

const Nothing = {};

export const bind = (mval, fn) => mval === Nothing
    ? Nothing
    : fn(mval);

export const lift = id;

export const pick = (key, obj) =>
    -1 === allKeys(obj).indexOf(key)
        ? Nothing
        : obj[key];

export const fromMaybe = (mval, def) => mval === Nothing ? def : mval;



