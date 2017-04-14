//// [unusedClassesinNamespace2.ts]
namespace Validation {
    class c1 {

    }

    export class c2 {

    }
}

//// [unusedClassesinNamespace2.js]
var Validation;
(function (Validation) {
    var c1 = (function () {
        function c1() {
        }
        return c1;
    }());
    var c2 = (function () {
        function c2() {
        }
        return c2;
    }());
    Validation.c2 = c2;
})(Validation || (Validation = {}));
