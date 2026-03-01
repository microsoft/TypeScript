//// [tests/cases/compiler/structural1.ts] ////

//// [structural1.ts]
namespace M {
    export interface I {
        salt:number;
        pepper:number;
    }

    export function f(i:I) {
    }

    f({salt:2,pepper:0});
}


//// [structural1.js]
"use strict";
var M;
(function (M) {
    function f(i) {
    }
    M.f = f;
    f({ salt: 2, pepper: 0 });
})(M || (M = {}));
