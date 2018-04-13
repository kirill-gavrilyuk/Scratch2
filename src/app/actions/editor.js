/* eslint-disable no-multi-spaces */
import * as Api   from "api";
import * as Utils from "utils";
/* eslint-enable no-multi-spaces */

export const configure = editorLens => (cb, world) => {
    const editor = Utils.Lenz.get(editorLens, world);

    const configure = do Utils.Monad.Cont.bind {
        Api.Editor.setBlockScrolling(editor, Infinity);
        Api.Editor.setProgrammingLanguage(editor, "javascript");
        Api.Editor.setTheme(editor, "github");
        Api.Editor.setKeyboardMode(editor, "vim");
        Api.Editor.setSyntaxCheck(editor, false);
    };

    configure(val => cb(val, world));
    return null;
};

export const setContent = (editorLens, content) => (cb, world) => {
    const editor = Utils.Lenz.get(editorLens, world);
    Api.Editor.setContent(editor, content)(val => cb(val, world));
    return null;
};


export const getContent = editorLens => (cb, world) => {
    const editor = Utils.Lenz.get(editorLens, world);
    Api.Editor.getContent(editor, world)(val => cb(val, world));
    return null;
};


