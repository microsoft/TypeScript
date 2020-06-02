//// [arrayFlatNoCrashInferenceDeclarations.ts]
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}

//// [arrayFlatNoCrashInferenceDeclarations.js]
"use strict";
function foo(arr, depth) {
    return arr.flat(depth);
}
