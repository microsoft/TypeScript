//// [unusedVariablesinNamespaces1.ts]
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
}

//// [unusedVariablesinNamespaces1.js]
var Validation = Validation || (Validation = {});
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
})(Validation);
