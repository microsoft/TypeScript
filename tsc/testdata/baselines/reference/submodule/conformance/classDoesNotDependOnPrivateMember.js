//// [tests/cases/conformance/declarationEmit/classDoesNotDependOnPrivateMember.ts] ////

//// [classDoesNotDependOnPrivateMember.ts]
namespace M {
    interface I { }
    export class C {
        private x: I;
    }
}

//// [classDoesNotDependOnPrivateMember.js]
"use strict";
var M;
(function (M) {
    class C {
        x;
    }
    M.C = C;
})(M || (M = {}));


//// [classDoesNotDependOnPrivateMember.d.ts]
declare namespace M {
    class C {
        private x;
    }
}
