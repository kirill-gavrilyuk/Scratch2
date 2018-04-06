import * as Babel from "@babel/standalone/babel.js";
////////////////////////////////////////////////////////////////////////////////////////////////////

export const transform = code => cb => {
    try {
        const tCode = Babel.transform(code, {
            presets: [ "es2015", "react", "stage-0" ]
        }).code;
        return cb(tCode);
    } catch (e) {
        return cb(e.message);
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////
