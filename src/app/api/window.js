/* globals chrome */
import * as Utils from "utils";

const evalWrapper = (code, _, cb) => {
    try {
        return cb(eval(code), { isException: false });
    } catch (e) {
        return cb(null, { isException: true, value: e.stack });
    }
};

const { bind, pure, fromMaybe, pick } = Utils.Monad.Maybe;

const _eval = fromMaybe(do bind {
    chrome          <- pick("chrome", window);
    devtools        <- pick("devtools", chrome);
    inspectedWindow <- pick("inspectedWindow", devtools);
                       pick("eval", inspectedWindow);
}, evalWrapper);

export const evaluate = code => cb => _eval(code, {}, (res, err) => {
    if (err.isException)
       return _eval(`console.error("${err.value.replace(/\n|\r/g, "\\n")}")`, {}, () => cb(null));

    return cb(res);
});
