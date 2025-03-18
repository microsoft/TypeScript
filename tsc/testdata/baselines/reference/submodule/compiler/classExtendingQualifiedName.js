//// [tests/cases/compiler/classExtendingQualifiedName.ts] ////

//// [classExtendingQualifiedName.ts]
module M {
    class C {
    }

    class D extends M.C {
    }
}

//// [classExtendingQualifiedName.js]
var M;
(function (M) {
    class C {
    }
    class D extends M.C {
    }
})(M || (M = {}));
