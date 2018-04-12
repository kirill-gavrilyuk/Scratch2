import * as Utils from "utils";
import * as World from "world";

export const consume = (cb, world) => {
    const queue = Utils.Lenz.get(World.Lens.queue, world);
    queue.consume(val => cb(val, world));
    return null;
};
