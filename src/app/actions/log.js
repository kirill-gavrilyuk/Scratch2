export const log = msg => (cb, world) => {
    cb(console.log(msg), world);
    return null;
};
