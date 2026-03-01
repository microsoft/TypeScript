//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck27.ts] ////

//// [generatorTypeCheck27.ts]
function* g(): IterableIterator<(x: string) => number> {
    yield * function* () {
        yield x => x.length;
    } ();
}

//// [generatorTypeCheck27.js]
"use strict";
function* g() {
    yield* function* () {
        yield x => x.length;
    }();
}
