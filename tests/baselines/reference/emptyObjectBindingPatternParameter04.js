//// [tests/cases/conformance/es6/destructuring/emptyObjectBindingPatternParameter04.ts] ////

//// [emptyObjectBindingPatternParameter04.ts]
function f({} = {a: 1, b: "2", c: true}) {
    var x, y, z;
}

//// [emptyObjectBindingPatternParameter04.js]
function f({} = { a: 1, b: "2", c: true }) {
    var x, y, z;
}


//// [emptyObjectBindingPatternParameter04.d.ts]
declare function f({}?: {
    a: number;
    b: string;
    c: boolean;
}): void;
