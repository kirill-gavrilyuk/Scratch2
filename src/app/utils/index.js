/* eslint-disable no-multi-spaces */
export * as Lenz from  "./lenz.js";
export * as Monad from "./monad";
/* eslint-enable no-multi-spaces */

////////////////////////////////////////////////////////////////////////////////////////////////////


const _curry = (arity, fn) => (...args) => args.length < arity ? _curry(arity - args.length, (...nextArgs) => fn(...args, ...nextArgs)) : fn(...args);
export const curry2 = fn => _curry(2, fn);
export const curry3 = fn => _curry(3, fn);
export const curry4 = fn => _curry(4, fn);
export const curry5 = fn => _curry(5, fn);
export const curry6 = fn => _curry(6, fn);


////////////////////////////////////////////////////////////////////////////////////////////////////


export const id = a => a;
export const apply = curry2((fn, ...args) => fn(...args));
export const thunk = fn => (...args) => () => fn(...args);
export const fix = f => (...args) => f(fix(f), ...args);
export const fixA = (f, ...args) => fix(f)(...args);
export const constant = val => () => val;
export const compose = (...fns) => init => fns.reduceRight((prev, fn) => fn(prev), init);

export const allKeys = obj => {
    const keys = [];
    for (const key in obj)
        keys.push(key);

    return keys;
};


////////////////////////////////////////////////////////////////////////////////////////////////////


