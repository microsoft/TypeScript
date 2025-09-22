//// [tests/cases/compiler/moduleReopenedTypeOtherBlock.ts] ////

//// [moduleReopenedTypeOtherBlock.ts]
namespace M {
    export class C1 { }
    export interface I { n: number; }
}
namespace M {
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeOtherBlock.js]
var M;
(function (M) {
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    M.C1 = C1;
})(M || (M = {}));
(function (M) {
    var C2 = /** @class */ (function () {
        function C2() {
        }
        C2.prototype.f = function () { return null; };
        return C2;
    }());
    M.C2 = C2;
})(M || (M = {}));
