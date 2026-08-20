//// [tests/cases/compiler/undeclaredBase.ts] ////

//// [undeclaredBase.ts]
namespace M { export class C extends M.I { } }



//// [undeclaredBase.js]
"use strict";
var M;
(function (M) {
    class C extends M.I {
    }
    M.C = C;
})(M || (M = {}));
