//// [emptyObjectBindingPatternParameter04.ts]

function f({} = {a: 1, b: "2", c: true}) {
    var x, y, z;
}

//// [emptyObjectBindingPatternParameter04.js]
function f(_a) {
    var _a = { a: 1, b: "2", c: true };
    var x, y, z;
}
