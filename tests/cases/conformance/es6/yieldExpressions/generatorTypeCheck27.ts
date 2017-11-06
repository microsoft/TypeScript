//@target: ES6
function* g(): Iterator<(x: string) => number> {
    yield * function* () {
        yield x => x.length;
    } ();
}