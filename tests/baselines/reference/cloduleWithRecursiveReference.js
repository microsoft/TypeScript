//// [tests/cases/compiler/cloduleWithRecursiveReference.ts] ////

//// [cloduleWithRecursiveReference.ts]
namespace M
{
  export class C {  }
  export namespace C {
    export var C = M.C
  }
}

//// [cloduleWithRecursiveReference.js]
"use strict";
var M;
(function (M) {
    class C {
    }
    M.C = C;
    (function (C_1) {
        C_1.C = M.C;
    })(C = M.C || (M.C = {}));
})(M || (M = {}));
