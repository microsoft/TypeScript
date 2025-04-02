//// [tests/cases/compiler/arrayFlatNoCrashInference.ts] ////

//// [arrayFlatNoCrashInference.ts]
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}

//// [arrayFlatNoCrashInference.js]
"use strict";
function foo(arr, depth) {
    return arr.flat(depth);
}
