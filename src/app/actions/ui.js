import * as Api from "api";

export const render = (cb, world) => {
    Api.UI.render(world)(val => cb(val, world));
    return null;
};
