import * as Utils from "utils";


const editors = Utils.Lenz.makeLens(
    world => world.editors,
    (world, newV) => ({
        ...world,
        editors: newV
    })
);


const element = idx => Utils.Lenz.makeLens(
   arr => arr[idx],
   (arr, newV) => arr.map((val, _idx) => _idx === idx
       ? newV
       : val
   )
);


export const mainEditor = Utils.compose(editors, element(0));
export const secondaryEditor = Utils.compose(editors, element(1));

export const queue = Utils.Lenz.makeLens(
    world => world.queue,
    (world, newV) => ({
        ...world,
        queue: newV
    })
);
