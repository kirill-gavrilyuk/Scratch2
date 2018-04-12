import * as Api from "api";


export const evaluate = code => (cb, world) => {
    Api.Window.evaluate(code)(val => cb(val, world));
    return null;
};
