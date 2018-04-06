import * as Editor          from "editor.js";
import * as Transformer     from "transformer.js";
import * as Cont            from "cont.js";
import * as InspectedWindow from "inspected-window.js";
import * as Storage         from "storage.js";


const Controls = {
    handleEvents: handler => cb => {
        document.querySelector("#run").onclick = () => cb(handler["run"]);
        document.querySelector("#clr").onclick = () => cb(handler["clear"]);

    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////

const createConfiguredEditor = nodeId => do Cont.bind {
    editor <- Editor.createEditor(nodeId);
    editor.setProgrammingLanguage("javascript");
    editor.setTheme("github");
    editor.setKeyboardMode("vim");
    editor.setSyntaxCheck(false);
    Cont.lift(editor);
};

const main = do Cont.bind {
    // Init editors
    fstEditor <- createConfiguredEditor("fst");
    sndEditor <- createConfiguredEditor("snd");

    // Restore content and load into first editor
    savedContent <- Storage.restoreContent;
    fstEditor.setContent(savedContent);

    // Sync second editor
    transformed <- Transformer.transform(savedContent);
    sndEditor.setContent(transformed);

    // Get new content
    content <- fstEditor.getContent;
    Storage.saveContent(content);

    // Sync second editor
    transformed <- Transformer.transform(content);
    sndEditor.setContent(transformed);

    // Handle interface actions
    nextAction <- Controls.handleEvents({
        run: InspectedWindow.evaluate(transformed),
        clear: fstEditor.setContent("")
    });
    nextAction;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

main(msg => console.log(msg));


