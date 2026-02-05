//// [tests/cases/compiler/declFileWithInternalModuleNameConflictsInExtendsClause3.ts] ////

//// [declFileWithInternalModuleNameConflictsInExtendsClause3.ts]
namespace X.A.C {
    export interface Z {
    }
}
namespace X.A.B.C {
    export class W implements X.A.C.Z { // This needs to be referred as X.A.C.Z as A has conflict
    }
}

namespace X.A.B.C {
    export namespace A {
    }
}

//// [declFileWithInternalModuleNameConflictsInExtendsClause3.js]
"use strict";
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


//// [declFileWithInternalModuleNameConflictsInExtendsClause3.d.ts]
declare namespace X.A.C {
    interface Z {
    }
}
declare namespace X.A.B.C {
    class W implements X.A.C.Z {
    }
}
declare namespace X.A.B.C {
    namespace A {
    }
}
