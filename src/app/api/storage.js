/* globals chrome */
import * as Utils from "utils";

// Randomly choosen key.
const STORAGE_KEY = "8ba8b329276a";

const localStorageWrappers = {
    get: (keys, cb) =>
        cb(keys.reduce((prev, key) => ({
            ...prev,
            [key]: localStorage.getItem(key)
        }), {})),

    set: (obj, cb) => {
        Object
            .keys(obj)
            .forEach(key => localStorage.setItem(key, obj[key]));
        return cb(null);
    }
};

const { bind, fromMaybe, pick } = Utils.Monad.Maybe;

const storage = fromMaybe(do bind {
    chrome  <- pick("chrome", window);
    storage <- pick("storage", chrome);
               pick("sync", storage);
}, localStorageWrappers);

export const saveContent = code => cb => storage.set({ [STORAGE_KEY]: code }, cb);

export const restoreContent = cb => storage.get([STORAGE_KEY], result => {
    const content = result[STORAGE_KEY];
    if (typeof content !== "string")
        return cb("");

    return cb(content);
});


