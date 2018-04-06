/* globals chrome */

const STORAGE_KEY = "8ba8b329276a";

export const saveContent = code => cb => chrome.storage.sync.set({
    [STORAGE_KEY]: code
}, cb);

export const restoreContent = cb => chrome.storage.sync.get(STORAGE_KEY, result => {
    const content = result[STORAGE_KEY];
    if (typeof content !== "string")
        return cb("");

    return cb(content);
});

