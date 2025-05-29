//// [tests/cases/compiler/declFileModuleContinuation.ts] ////

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
    let B;
    (function (B) {
        let C;
        (function (C) {
            class W {
            }
            C.W = W;
        })(C = B.C || (B.C = {}));
    })(B = A.B || (A.B = {}));
})(A || (A = {}));


//// [declFileModuleContinuation.d.ts]
declare namespace A.C {
    interface Z {
    }
}
declare namespace A.B.C {
    class W implements A.C.Z {
    }
}
