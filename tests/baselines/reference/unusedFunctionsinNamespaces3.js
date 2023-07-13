//// [tests/cases/compiler/unusedFunctionsinNamespaces3.ts] ////

//// [unusedFunctionsinNamespaces3.ts]
namespace Validation {
    var function1 = function(param1:string) {
    }
}

//// [unusedFunctionsinNamespaces3.js]
var Validation;
(function (Validation) {
    var function1 = function (param1) {
    };
})(Validation || (Validation = {}));
