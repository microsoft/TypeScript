//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofModuleWithoutExports.ts] ////

//// [typeofModuleWithoutExports.ts]
namespace M {
    var x = 1;
    class C {
        foo: number;
    }
}

var r: typeof M;

//// [typeofModuleWithoutExports.js]
var M;
(function (M) {
    var x = 1;
    var C = /** @class */ (function () {
        function C() {
        }
        return C;
    }());
})(M || (M = {}));
var r;
