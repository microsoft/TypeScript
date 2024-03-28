//// [tests/cases/conformance/declarationEmit/classDoesNotDependOnPrivateMember.ts] ////

//// [classDoesNotDependOnPrivateMember.ts]
module M {
    interface I { }
    export class C {
        private x: I;
    }
}

//// [classDoesNotDependOnPrivateMember.js]
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
    M.C = C;
})(M || (M = {}));


//// [classDoesNotDependOnPrivateMember.d.ts]
declare namespace M {
    class C {
        private x;
    }
}
