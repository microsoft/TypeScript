//// [tests/cases/compiler/global.ts] ////

//// [global.ts]
namespace M {
    export function f(y:number) {
        return x+y;
    }
}

var x=10;
M.f(3);



//// [global.js]
"use strict";
var M;
(function (M) {
    function f(y) {
        return x + y;
    }
    M.f = f;
})(M || (M = {}));
var x = 10;
M.f(3);
