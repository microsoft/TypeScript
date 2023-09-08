//// [tests/cases/compiler/arrayFlatNoCrashInferenceDeclarations.ts] ////

//// [arrayFlatNoCrashInferenceDeclarations.ts]
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}

//// [arrayFlatNoCrashInferenceDeclarations.js]
"use strict";
function foo(arr, depth) {
    return arr.flat(depth);
}


//// [arrayFlatNoCrashInferenceDeclarations.d.ts]
declare function foo<T>(arr: T[], depth: number): T[];
