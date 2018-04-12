const noop = () => {};

export const createQueue = () => {
    let queue = [];
    let _consume = () => {};

    const consume = cb => {
        _consume = () => {
            _consume = noop;
            const first = queue[0];
            queue = queue.slice(1);
            cb(first);
        };

        if (queue.length !== 0)
            _consume();

        return null;
    };

    const produce = action => {
        queue.push(action);
        if (queue.length !== 0)
            _consume();

        return null;
    };

    return {
        consume,
        produce
    };
};
