//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPatternParameter03.ts] ////

//// [emptyArrayBindingPatternParameter03.ts]
function f(a, []) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter03.js]
function f(a, _a) {
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter03.d.ts]
declare function f(a: any, []: any[]): void;
