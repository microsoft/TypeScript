//// [unusedClassesinNamespace5.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }

    class c3 {
        public x: c1;
    }
}

//// [unusedClassesinNamespace5.js]
var Validation;
(function (Validation) {
    var c1 = /** @class */ (function () {
        function c1() {
        }
        return c1;
    }());
    var c2 = /** @class */ (function () {
        function c2() {
        }
        return c2;
    }());
    Validation.c2 = c2;
    var c3 = /** @class */ (function () {
        function c3() {
        }
        return c3;
    }());
})(Validation || (Validation = {}));
