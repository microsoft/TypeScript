//// [moduleReopenedTypeOtherBlock.ts]
module M {
    export class C1 { }
    export interface I { n: number; }
}
module M {
    export class C2 { f(): I { return null; } }
}


//// [moduleReopenedTypeOtherBlock.js]
var M;
(function (M) {
    var C1 = (function () {
        function C1() {
        }
        return C1;
    }());
    M.C1 = C1;
})(M || (M = {}));
(function (M) {
    var C2 = (function () {
        function C2() {
        }
        var proto_1 = C2.prototype;
        proto_1.f = function () { return null; };
        return C2;
    }());
    M.C2 = C2;
})(M || (M = {}));
