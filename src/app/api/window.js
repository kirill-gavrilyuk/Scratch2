/* globals chrome */
import * as Utils from "utils";

const evalWrapper = (code, _, cb) => cb(eval(code));

const { bind, pure, fromMaybe, pick } = Utils.Monad.Maybe;

const _eval = fromMaybe(do bind {
    chrome          <- pick("chrome", window);
    devtools        <- pick("devtools", chrome);
    inspectedWindow <- pick("inspectedWindow", devtools);
                       pick("eval", inspectedWindow);
}, evalWrapper);

export const evaluate = code => cb => _eval(code, {}, cb);
