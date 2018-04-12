/* eslint-disable no-multi-spaces */
import * as Utils   from "utils";
import * as World   from "world";
import * as Actions from "actions";
import * as Api     from "api";
/* eslint-enable no-multi-spaces */


const noop = () => {};

let editorOnChangeHandler = noop;

export const render = world => cb => {
    const mainEditor = Utils.Lenz.get(World.Lens.mainEditor, world);
    const queue = Utils.Lenz.get(World.Lens.queue, world);


    if (editorOnChangeHandler !== noop)
        mainEditor.getSession().off("change", editorOnChangeHandler);

    editorOnChangeHandler = mainEditor.getSession().on("change", () =>
        queue.produce(
            do Utils.Monad.ContST.bind {
                content <- Actions.Editor.getContent(World.Lens.mainEditor);
                Actions.Storage.save(content);

                transformed = Api.Transformer.transform(content);
                Actions.Editor.setContent(World.Lens.secondaryEditor, transformed);
            }
        )
    );

    document.querySelector("#run").onclick = () => queue.produce(
        do Utils.Monad.ContST.bind {
            content <- Actions.Editor.getContent(World.Lens.secondaryEditor);
            Actions.Window.evaluate(content);
        }
    );

    cb(null);
};


