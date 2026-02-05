//// [tests/cases/conformance/es6/yieldExpressions/generatorTypeCheck7.ts] ////

//// [generatorTypeCheck7.ts]
interface WeirdIter extends IterableIterator<number> {
    hello: string;
}
function* g1(): WeirdIter { }

//// [generatorTypeCheck7.js]
"use strict";
function* g1() { }
