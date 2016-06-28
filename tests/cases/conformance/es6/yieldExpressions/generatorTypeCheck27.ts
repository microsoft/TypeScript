//@target: ES6
function* g(): IterableIterator<(x: string) => number> {
    yield * function* () {
        yield x => x.length;
    } ();
}