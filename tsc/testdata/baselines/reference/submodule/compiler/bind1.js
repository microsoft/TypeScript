//// [tests/cases/compiler/bind1.ts] ////

//// [bind1.ts]
namespace M {
    export class C implements I {} // this should be an unresolved symbol I error
}



//// [bind1.js]
"use strict";
var M;
(function (M) {
    class C {
    } // this should be an unresolved symbol I error
    M.C = C;
})(M || (M = {}));
