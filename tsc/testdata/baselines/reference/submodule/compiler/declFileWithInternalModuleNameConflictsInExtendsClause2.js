//// [tests/cases/compiler/declFileWithInternalModuleNameConflictsInExtendsClause2.ts] ////

//// [declFileWithInternalModuleNameConflictsInExtendsClause2.ts]
module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    export class W implements A.C.Z { // This can refer to it as A.C.Z
    }
}

module X.A.B.C {
    module A {
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause2.js]
var X;
(function (X) {
    let A;
    (function (A) {
        let B;
        (function (B) {
            let C;
            (function (C) {
                class W {
                }
                C.W = W;
            })(C = B.C || (B.C = {}));
        })(B = A.B || (A.B = {}));
    })(A = X.A || (X.A = {}));
})(X || (X = {}));
