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
var X = X || (X = {});
(function (X) {
    var A = X.A || (X.A = {});
    (function (A) {
        var B = A.B || (A.B = {});
        (function (B) {
            var C = B.C || (B.C = {});
            (function (C) {
                var W = /** @class */ (function () {
                    function W() {
                    }
                    return W;
                }());
                C.W = W;
            })(C);
        })(B);
    })(A);
})(X);


//// [declFileWithInternalModuleNameConflictsInExtendsClause1.d.ts]
declare module X.A.C {
    interface Z {
    }
}
declare module X.A.B.C {
    class W implements X.A.C.Z {
    }
}
