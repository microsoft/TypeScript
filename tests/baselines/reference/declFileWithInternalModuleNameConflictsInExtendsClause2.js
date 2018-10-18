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


//// [declFileWithInternalModuleNameConflictsInExtendsClause2.d.ts]
declare module X.A.C {
    interface Z {
    }
}
declare module X.A.B.C {
    class W implements A.C.Z {
    }
}
declare module X.A.B.C {
}
