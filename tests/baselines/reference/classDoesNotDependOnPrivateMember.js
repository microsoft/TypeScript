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
declare module M {
    class C {
        private x;
    }
}
