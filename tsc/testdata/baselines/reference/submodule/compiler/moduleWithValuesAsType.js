//// [tests/cases/compiler/moduleWithValuesAsType.ts] ////

//// [moduleWithValuesAsType.ts]
module A {
    var b = 1;
}

var a: A; // no error

//// [moduleWithValuesAsType.js]
var A;
(function (A) {
    var b = 1;
})(A || (A = {}));
var a; // no error
