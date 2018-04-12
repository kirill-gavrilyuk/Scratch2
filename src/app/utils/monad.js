export const liftC = a => cb => cb(a);
export const bindC = (mval, fn) => cb => mval(val => fn(val)(cb));

export const Cont = {
    lift: liftC,
    bind: bindC
};


////////////////////////////////////////////////////////////////////////////////////////////////////


export const bindSTC = (mval, fn) => (cb, st) => mval((val, st1) => fn(val)(cb, st1), st);
export const liftSTC = a => (cb, st) => cb(a, st);


export const ContST = {
    lift: liftSTC,
    bind: bindSTC
};


