//// [generatorTypeCheck27.ts]
function* g(): Iterator<(x: string) => number> {
    yield * function* () {
        yield x => x.length;
    } ();
}

//// [generatorTypeCheck27.js]
function* g() {
    yield* function* () {
        yield x => x.length;
    }();
}
