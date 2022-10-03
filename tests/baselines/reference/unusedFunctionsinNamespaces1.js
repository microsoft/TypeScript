//// [unusedFunctionsinNamespaces1.ts]
namespace Validation {
    function function1() {
    }
}

//// [unusedFunctionsinNamespaces1.js]
var Validation;
(function (Validation) {
    function function1() {
    }
})(Validation || (Validation = {}));
