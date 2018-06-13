/* globals chrome */

import "file-loader?name=manifest.json!manifest.json";

chrome.devtools.panels.create(
    "Scratch 2",
    null,
    "/main.html",
    panel => console.log(panel) // eslint-disable-line no-console
);
