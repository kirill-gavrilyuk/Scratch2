export const bind = (mval, fn) => (cb, st) => mval((val, st1) => fn(val)(cb, st1), st);
export const lift = a => (cb, st) => cb(a, st);
