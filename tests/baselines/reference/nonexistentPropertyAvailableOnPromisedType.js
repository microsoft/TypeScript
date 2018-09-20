//// [nonexistentPropertyAvailableOnPromisedType.ts]
function f(x: Promise<string>) {
    x.toLowerCase();
}


//// [nonexistentPropertyAvailableOnPromisedType.js]
function f(x) {
    x.toLowerCase();
}
