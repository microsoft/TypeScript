//// [declFileWithInternalModuleNameConflictsInExtendsClause3.ts]

module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    export class W implements X.A.C.Z { // This needs to be refered as X.A.C.Z as A has conflict
    }
}

module X.A.B.C {
    export module A {
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause3.js]
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


////[declFileWithInternalModuleNameConflictsInExtendsClause3.d.ts]
declare module X.A.C {
    interface Z {
    }
}
declare module X.A.B.C {
    class W implements X.A.C.Z {
    }
}
declare module X.A.B.C {
    module A {
    }
}
