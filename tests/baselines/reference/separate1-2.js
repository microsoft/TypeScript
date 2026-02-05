//// [tests/cases/compiler/separate1-2.ts] ////

//// [separate1-2.ts]
namespace X {
    export function f() { }
}

//// [separate1-2.js]
"use strict";
var X;
(function (X) {
    function f() { }
    X.f = f;
})(X || (X = {}));
