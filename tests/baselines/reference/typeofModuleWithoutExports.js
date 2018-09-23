//// [typeofModuleWithoutExports.ts]
module M {
    var x = 1;
    class C {
        foo: number;
    }
}

var r: typeof M;

//// [typeofModuleWithoutExports.js]
var M = M || (M = {});
(function (M) {
    var x = 1;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
})(M);
var r;
