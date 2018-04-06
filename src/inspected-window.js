/* globals chrome */

export const evaluate = code => cb => {
    return chrome.devtools.inspectedWindow.eval(code, {}, cb);
};
