//// [unusedFunctionsinNamespaces4.ts]
namespace Validation {
    var function1 = function() {
    }

    export function function2() {

    }
}

//// [unusedFunctionsinNamespaces4.js]
var Validation;
(function (Validation) {
    var function1 = function () {
    };
    function function2() {
    }
    Validation.function2 = function2;
})(Validation || (Validation = {}));
