import * as Api from "api";


export const save = content => (cb, world) => {
    Api.Storage.saveContent(content)(val => cb(val, world));
    return null;
};

export const restore = (cb, world) => {
    Api.Storage.restoreContent(val => cb(val, world));
    return null;
};

