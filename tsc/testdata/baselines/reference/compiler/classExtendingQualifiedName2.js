//// [tests/cases/compiler/classExtendingQualifiedName2.ts] ////

//// [classExtendingQualifiedName2.ts]
namespace M {
    export class C {
    }

    class D extends M.C {
    }
}

//// [classExtendingQualifiedName2.js]
"use strict";
var M;
(function (M) {
    class C {
    }
    M.C = C;
    class D extends M.C {
    }
})(M || (M = {}));
