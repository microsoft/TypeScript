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
declare function foo<T>(arr: T[], depth: number): FlatArray<T, 0 | 1 | -1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20>[];
