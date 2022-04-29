//// [emptyObjectBindingPatternParameter03.ts]
function f({}, a) {
    var x, y, z;
}

//// [emptyObjectBindingPatternParameter03.js]
function f(_a, a) {
    var x, y, z;
}


//// [emptyObjectBindingPatternParameter03.d.ts]
declare function f({}: {}, a: any): void;
