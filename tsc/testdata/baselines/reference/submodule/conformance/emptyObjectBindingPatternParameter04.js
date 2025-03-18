//// [tests/cases/conformance/es6/destructuring/emptyObjectBindingPatternParameter04.ts] ////

//// [emptyObjectBindingPatternParameter04.ts]
function f({} = {a: 1, b: "2", c: true}) {
    var x, y, z;
}

//// [emptyObjectBindingPatternParameter04.js]
function f({} = { a: 1, b: "2", c: true }) {
    var x, y, z;
}
