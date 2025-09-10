//// [tests/cases/compiler/moduleReopenedTypeSameBlock.ts] ////

//// [moduleReopenedTypeSameBlock.ts]
namespace M { export class C1 { } }
namespace M {
    export interface I { n: number; }
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeSameBlock.js]
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
