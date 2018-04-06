/* eslint-disable no-console*/

import ejs from "ejs";
import fs from "fs";

////////////////////////////////////////////////////////////////////////////////////////////////////

class htmlInjector {
    // { include, extra, filename, template } <- all fields are mandatory! No default options or error checks!
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.plugin("emit", (compilation, callback) => {
            const { template, include, extra, filename } = this.options;
            const { publicPath = "" } = compilation.options.output;

            const chunksScripts = compilation.chunks.reduce((prev, ch) => ({ ...prev,
                [ch.name]: {
                    js: ch.files.filter(file => file.endsWith(".js")).map(file => publicPath + "/" + file),
                    css: ch.files.filter(file => file.endsWith(".css")).map(file => publicPath + "/" + file),
                }
            }), {});

            const scripts = {
                ...chunksScripts,
                ...Object.keys(extra).reduce((prev, key) => ({ ...prev, [key]: { css: [], ...extra[key] } }), {})
            };

            const getScriptByName = name => {
                if (scripts[name] !== void 0)
                    return scripts[name];

                console.warn("No such chunk:", name);
                console.warn("Chunks:", Object.keys(scripts).join(", "));

                return { js: [], css: [] };
            };

            const urls = include.reduce((prev, name) => ({
                js: [...prev.js, ...getScriptByName(name).js],
                css: [...prev.css, ...getScriptByName(name).css]
            }), { js: [], css: [] });

            const templateCode = fs.readFileSync(template, "utf8");
            const html = ejs.render(templateCode, { urls });

            compilation.assets[filename] = {
                source: () => html,
                size: () => html.length
            };

            callback();
        });
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////

export default htmlInjector;
