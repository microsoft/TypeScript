//// [tests/cases/compiler/moduleReopenedTypeOtherBlock.ts] ////

//// [moduleReopenedTypeOtherBlock.ts]
namespace M {
    export class C1 { }
    export interface I { n: number; }
}
namespace M {
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeOtherBlock.js]
"use strict";
var M;
(function (M) {
    class C1 {
    }
    M.C1 = C1;
})(M || (M = {}));
(function (M) {
    class C2 {
        f() { return null; }
    }
    M.C2 = C2;
})(M || (M = {}));
