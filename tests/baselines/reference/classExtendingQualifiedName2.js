//// [tests/cases/compiler/classExtendingQualifiedName2.ts] ////

//// [classExtendingQualifiedName2.ts]
module M {
    export class C {
    }

    class D extends M.C {
    }
}

//// [classExtendingQualifiedName2.js]
var M;
(function (M) {
    class C {
    }
    M.C = C;
    class D extends M.C {
    }
})(M || (M = {}));
