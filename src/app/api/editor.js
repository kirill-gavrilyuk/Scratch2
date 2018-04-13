import ace from "brace";


export const createEditor = rootNodeId => ace.edit(rootNodeId);


// IO Actions

export const setProgrammingLanguage = (editor, language) => cb => {
    require("brace/mode/" + language);
    editor.getSession().setMode("ace/mode/" + language);
    cb(null);
    return null;
};

export const setTheme = (editor, themeName) => cb => {
    require("brace/theme/" + themeName);
    editor.setTheme("ace/theme/" + themeName);
    cb(null);
    return null;
};

export const setKeyboardMode = (editor, mode) => cb => {
    require("brace/keybinding/" + mode);
    editor.setKeyboardHandler("ace/keyboard/" + mode);
    cb(null);
    return null;
};

export const setSyntaxCheck = (editor, pred) => cb => {
    editor.getSession().setUseWorker(pred);
    cb(null);
    return null;
};

export const setContent = (editor, content) => cb => {
    editor.setValue(content);
    editor.clearSelection();
    cb(null);
    return null;
};

export const getContent = editor => cb => {
    cb(editor.getSession().getValue());
    return null;
};

export const setBlockScrolling = (editor, value) => cb => {
    editor.$blockScrolling = value;
    cb(null);
    return null;
};


