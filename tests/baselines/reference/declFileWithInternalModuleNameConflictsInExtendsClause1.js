//// [declFileWithInternalModuleNameConflictsInExtendsClause1.ts]

module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    module A {
    }
    export class W implements X.A.C.Z { // This needs to be refered as X.A.C.Z as A has conflict
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause1.js]
var X;
(function (X) {
    (function (A) {
        (function (B) {
            (function (C) {
                var W = (function () {
                    function W() {
                    }
                    return W;
                })();
                C.W = W;
            })(B.C || (B.C = {}));
            var C = B.C;
        })(A.B || (A.B = {}));
        var B = A.B;
    })(X.A || (X.A = {}));
    var A = X.A;
})(X || (X = {}));


//// [declFileWithInternalModuleNameConflictsInExtendsClause1.d.ts]
