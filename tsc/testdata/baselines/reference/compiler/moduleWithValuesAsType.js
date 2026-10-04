//// [tests/cases/compiler/moduleWithValuesAsType.ts] ////

//// [moduleWithValuesAsType.ts]
namespace A {
    var b = 1;
}

var a: A; // no error

//// [moduleWithValuesAsType.js]
"use strict";
var A;
(function (A) {
    var b = 1;
})(A || (A = {}));
var a; // no error
