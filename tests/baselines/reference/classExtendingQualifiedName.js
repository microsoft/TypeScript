//// [tests/cases/compiler/classExtendingQualifiedName.ts] ////

//// [classExtendingQualifiedName.ts]
namespace M {
    class C {
    }

    class D extends M.C {
    }
}

//// [classExtendingQualifiedName.js]
"use strict";
var M;
(function (M) {
    class C {
    }
    class D extends M.C {
    }
})(M || (M = {}));
