//// [unusedFunctionsinNamespaces3.ts]
namespace Validation {
    var function1 = function(param1:string) {
    }
}

//// [unusedFunctionsinNamespaces3.js]
var Validation = Validation || (Validation = {});
(function (Validation) {
    var function1 = function (param1) {
    };
})(Validation);
