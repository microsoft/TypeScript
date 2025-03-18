//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck30.ts] ////

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
