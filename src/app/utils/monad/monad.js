import { id, allKeys } from "./index.js";

const liftC = a => cb => cb(a);
const bindC = (mval, fn) => cb => mval(val => fn(val)(cb));

export const Cont = {
    lift: liftC,
    bind: bindC
};


////////////////////////////////////////////////////////////////////////////////////////////////////


const bindSTC = (mval, fn) => (cb, st) => mval((val, st1) => fn(val)(cb, st1), st);
const liftSTC = a => (cb, st) => cb(a, st);


export const ContST = {
    lift: liftSTC,
    bind: bindSTC
};


////////////////////////////////////////////////////////////////////////////////////////////////////

const Nothing = {};

const bindMaybe = (mval, fn) => mval === Nothing
    ? Nothing
    : fn(mval);

const liftMaybe = id;

const pickMaybe = (key, obj) =>
    -1 === allKeys(obj).indexOf(key)
        ? Nothing
        : obj[key];


export const Maybe = {
    bind: bindMaybe,
    lift: liftMaybe,
    pick: pickMaybe
};
