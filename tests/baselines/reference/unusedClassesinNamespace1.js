//// [tests/cases/compiler/unusedClassesinNamespace1.ts] ////

//// [unusedClassesinNamespace1.ts]
namespace Validation {
    class c1 {

    }
}

//// [unusedClassesinNamespace1.js]
var Validation;
(function (Validation) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
})(Validation || (Validation = {}));
