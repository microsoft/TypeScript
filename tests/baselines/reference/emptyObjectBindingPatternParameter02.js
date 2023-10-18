//// [tests/cases/conformance/es6/destructuring/emptyObjectBindingPatternParameter02.ts] ////

//// [emptyObjectBindingPatternParameter02.ts]
function f(a, {}) {
    var x, y, z;
}

//// [emptyObjectBindingPatternParameter02.js]
function f(a, _a) {
    var x, y, z;
}


//// [emptyObjectBindingPatternParameter02.d.ts]
declare function f(a: any, {}: {}): void;
