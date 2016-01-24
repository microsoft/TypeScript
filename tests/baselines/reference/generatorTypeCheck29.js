//// [generatorTypeCheck29.ts]
function* g2(): Iterator<Iterable<(x: string) => number>> {
    yield function* () {
        yield x => x.length;
    } ()
}

//// [generatorTypeCheck29.js]
function* g2() {
    yield function* () {
        yield x => x.length;
    }();
}
