//// [declFileModuleContinuation.ts]
module A.C {
    export interface Z {
    }
}

module A.B.C {
    export class W implements A.C.Z {
    }
}

//// [declFileModuleContinuation.js]
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
})(A || (A = {}));


//// [declFileModuleContinuation.d.ts]
declare module A.C {
    interface Z {
    }
}
declare module A.B.C {
    class W implements A.C.Z {
    }
}
