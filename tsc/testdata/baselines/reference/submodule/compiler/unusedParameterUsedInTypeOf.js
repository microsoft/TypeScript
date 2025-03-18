//// [tests/cases/compiler/unusedParameterUsedInTypeOf.ts] ////

//// [unusedParameterUsedInTypeOf.ts]
function f1 (a: number, b: typeof a) {
    return b;
}

//// [unusedParameterUsedInTypeOf.js]
function f1(a, b) {
    return b;
}
