//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck31.ts] ////

//// [generatorTypeCheck31.ts]
function* g2(): Iterator<() => Iterable<(x: string) => number>> {
    yield function* () {
        yield x => x.length;
    } ()
}

//// [generatorTypeCheck31.js]
function* g2() {
    yield function* () {
        yield x => x.length;
    }();
}
