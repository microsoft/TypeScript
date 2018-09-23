//// [moduleWithValuesAsType.ts]
module A {
    var b = 1;
}

var a: A; // no error

//// [moduleWithValuesAsType.js]
var A = A || (A = {});
(function (A) {
    var b = 1;
})(A);
var a; // no error
