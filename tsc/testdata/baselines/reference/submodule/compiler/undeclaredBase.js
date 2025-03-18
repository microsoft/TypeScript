//// [tests/cases/compiler/undeclaredBase.ts] ////

//// [undeclaredBase.ts]
module M { export class C extends M.I { } }



//// [undeclaredBase.js]
var M;
(function (M) {
    class C extends M.I {
    }
    M.C = C;
})(M || (M = {}));
