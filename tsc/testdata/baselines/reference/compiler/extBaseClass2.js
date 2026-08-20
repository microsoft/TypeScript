//// [tests/cases/compiler/extBaseClass2.ts] ////

//// [extBaseClass2.ts]
namespace N {
    export class C4 extends M.B {
    }
}

namespace M {
    export class C5 extends B {
    }
}


//// [extBaseClass2.js]
"use strict";
var N;
(function (N) {
    class C4 extends M.B {
    }
    N.C4 = C4;
})(N || (N = {}));
var M;
(function (M) {
    class C5 extends B {
    }
    M.C5 = C5;
})(M || (M = {}));
