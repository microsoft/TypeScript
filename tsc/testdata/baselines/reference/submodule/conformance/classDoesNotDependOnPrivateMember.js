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
    class C {
        x;
    }
    M.C = C;
})(M || (M = {}));
