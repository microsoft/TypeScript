//@target: ES6
function* g(): IterableIterator<(x: string) => number> {
    yield x => x.length;
    yield *[x => x.length];
    return x => x.length;
}