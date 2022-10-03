//// [declFileWithInternalModuleNameConflictsInExtendsClause3.ts]
module X.A.C {
    export interface Z {
    }
}
module X.A.B.C {
    export class W implements X.A.C.Z { // This needs to be referred as X.A.C.Z as A has conflict
    }
}

module X.A.B.C {
    export module A {
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause3.js]
var X;
(function (X) {
    var A;
    (function (A) {
        var B;
        (function (B) {
            var C;
            (function (C) {
                var W = /** @class */ (function () {
                    function W() {
                    }
                    return W;
                }());
                C.W = W;
            })(C = B.C || (B.C = {}));
        })(B = A.B || (A.B = {}));
    })(A = X.A || (X.A = {}));
})(X || (X = {}));


//// [declFileWithInternalModuleNameConflictsInExtendsClause3.d.ts]
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
