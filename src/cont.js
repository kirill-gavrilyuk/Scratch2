export const lift = a => fn => fn(a);
export const bind = (mval, fn) => c => mval(val => fn(val)(c));
