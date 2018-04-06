import ace from "brace";


// IO Actions
export const createEditor = rootNodeId => cb => {
    const editor = ace.edit(rootNodeId);

    return cb({
        setProgrammingLanguage: language => cb => {
            console.log("Programming language set to:", language);
            require("brace/mode/" + language);
            editor.getSession().setMode("ace/mode/" + language);
            return cb(null);
        },

        setTheme: themeName => cb => {
            console.log("Theme set to:", themeName);
            require("brace/theme/" + themeName);
            editor.setTheme("ace/theme/" + themeName);
            return cb(null);
        },

        setKeyboardMode: mode => cb => {
            console.log("Keyboard mode set to:", mode);
            require("brace/keybinding/" + mode);
            editor.setKeyboardHandler("ace/keyboard/" + mode);
            return cb(null);
        },

        setSyntaxCheck: pred => cb => {
            console.log("Syntax check set to:", pred);
            editor.getSession().setUseWorker(pred);
            return cb(null);
        },

        getContent: cb =>
            editor.getSession().on("change", delta => {
                const content = editor.getSession().getValue();
                return cb(content);
            }),

        setContent: content => cb => {
            editor.setValue(content);
            editor.clearSelection();
            return cb(null);
        }
    });
};


