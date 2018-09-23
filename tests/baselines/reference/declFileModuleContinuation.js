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
var A = A || (A = {});
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


//// [declFileModuleContinuation.d.ts]
declare module A.C {
    interface Z {
    }
}
declare module A.B.C {
    class W implements A.C.Z {
    }
}
