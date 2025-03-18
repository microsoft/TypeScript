//// [tests/cases/compiler/declFileWithInternalModuleNameConflictsInExtendsClause1.ts] ////

//// [declFileWithInternalModuleNameConflictsInExtendsClause1.ts]
module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    module A {
    }
    export class W implements X.A.C.Z { // This needs to be referred as X.A.C.Z as A has conflict
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause1.js]
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
