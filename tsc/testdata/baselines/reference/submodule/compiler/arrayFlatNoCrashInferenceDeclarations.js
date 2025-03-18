//// [tests/cases/compiler/arrayFlatNoCrashInferenceDeclarations.ts] ////

//// [arrayFlatNoCrashInferenceDeclarations.ts]
function foo<T>(arr: T[], depth: number) {
    return arr.flat(depth);
}

//// [arrayFlatNoCrashInferenceDeclarations.js]
function foo(arr, depth) {
    return arr.flat(depth);
}
