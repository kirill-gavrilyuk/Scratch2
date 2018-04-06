import * as Editor      from "editor.js";
import * as Transformer from "transformer.js";
import * as Cont        from "cont.js";

////////////////////////////////////////////////////////////////////////////////////////////////////

const main = do Cont.bind {
    createConfiguredEditor = nodeId => do Cont.bind {
        editor <- Editor.createEditor(nodeId);
        editor.setProgrammingLanguage("javascript");
        editor.setTheme("github");
        editor.setKeyboardMode("vim");
        editor.setSyntaxCheck(false);
        Cont.lift(editor);
    };

    fstEditor <- createConfiguredEditor("fst");
    sndEditor <- createConfiguredEditor("snd");

    content <- fstEditor.getContent;
    transformed <- Transformer.transform(content);
    sndEditor.setContent(transformed);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

main(msg => console.log(msg));


