//// [tests/cases/compiler/nonexistentPropertyUnavailableOnPromisedType.ts] ////

//// [nonexistentPropertyUnavailableOnPromisedType.ts]
function f(x: Promise<number>) {
    x.toLowerCase();
}


//// [nonexistentPropertyUnavailableOnPromisedType.js]
function f(x) {
    x.toLowerCase();
}
