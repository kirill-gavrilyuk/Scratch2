export const lift = a => cb => cb(a);
export const bind = (mval, fn) => cb => mval(val => fn(val)(cb));



