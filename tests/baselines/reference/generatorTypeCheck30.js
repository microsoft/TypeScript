//// [generatorTypeCheck30.ts]
function* g2(): Iterator<Iterable<(x: string) => number>> {
    yield function* () {
        yield x => x.length;
    } ()
}

//// [generatorTypeCheck30.js]
function* g2() {
    yield function* () {
        yield x => x.length;
    }();
}
