//// [tests/cases/conformance/es6/destructuring/emptyArrayBindingPatternParameter04.ts] ////

//// [emptyArrayBindingPatternParameter04.ts]
function f([] = [1,2,3,4]) {
    var x, y, z;
}

//// [emptyArrayBindingPatternParameter04.js]
function f(_a) {
    _a = [1, 2, 3, 4];
    var x, y, z;
}


//// [emptyArrayBindingPatternParameter04.d.ts]
declare function f([]?: number[]): void;
