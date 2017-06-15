//// [unusedParameterUsedInTypeOf.ts]
function f1 (a: number, b: typeof a) {
    b++;
}

//// [unusedParameterUsedInTypeOf.js]
function f1(a, b) {
    b++;
}
