import { compose, constant } from "./index.js";


////////////////////////////////////////////////////////////////////////////////////////////////////


const Identity = val => ({
    fmap: fn => Identity(fn(val)),
    val
});

const Constant = val => ({
    fmap: () => Constant(val),
    val
});


////////////////////////////////////////////////////////////////////////////////////////////////////


export const makeLens = (destructor, constructor) => pure => struct =>
    pure(destructor(struct))
        .fmap(newVal => constructor(struct, newVal));

export const get = (lens, struct) => lens(Constant)(struct).val;
export const mod = (lens, modifier, struct) => lens(compose(Identity, modifier))(struct).val;
export const set = (lens, newVal, struct) => mod(lens, constant(newVal), struct);
