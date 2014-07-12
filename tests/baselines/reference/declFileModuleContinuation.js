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
})(A || (A = {}));


////[declFileModuleContinuation.d.ts]
declare module A.C {
    interface Z {
    }
}
declare module A.B.C {
    class W implements A.C.Z {
    }
}
