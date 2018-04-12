/* eslint-disable no-multi-spaces */
import * as Api  from "api";

export * as Lens from "./lens.js";
/* eslint-enable no-multi-spaces */

export const createWorld = () => ({
    editors: [
        Api.Editor.createEditor("fst"),
        Api.Editor.createEditor("snd"),
    ],
    queue: Api.Queue.createQueue()
});
