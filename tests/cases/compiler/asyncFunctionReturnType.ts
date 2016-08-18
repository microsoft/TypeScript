// @target: ES6
async function fAsync() {
    // Without explicit type annotation, this is just an array.
    return [1, true];
}

async function fAsyncExplicit(): Promise<[number, boolean]> {
    // This is contextually typed as a tuple.
    return [1, true];
}
