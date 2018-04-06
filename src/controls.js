export const handleEvents = handler => cb => {
    document.querySelector("#run").onclick = () => cb(handler["run"]);
    document.querySelector("#clr").onclick = () => cb(handler["clear"]);
};
