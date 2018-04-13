/* eslint-disable no-multi-spaces */
import * as Utils       from "utils";
import * as Actions     from "actions";
import * as World       from "world";
import * as Api         from "api";
/* eslint-enable no-multi-spaces */


////////////////////////////////////////////////////////////////////////////////////////////////////


const main = do Utils.Monad.ContST.bind {
    Actions.Editor.configure(World.Lens.mainEditor);
    Actions.Editor.configure(World.Lens.secondaryEditor);

    restored <- Actions.Storage.restore;
    transformed = Api.Transformer.transform(restored);
    Actions.Editor.setContent(World.Lens.mainEditor, restored);
    Actions.Editor.setContent(World.Lens.secondaryEditor, transformed);

    loop = do Utils.Monad.ContST.bind {
        Actions.UI.render;
        nextAction <- Actions.Queue.consume;
        nextAction;
        loop;
    };

    loop;
};


////////////////////////////////////////////////////////////////////////////////////////////////////

main(msg => console.log(msg), World.createWorld());


