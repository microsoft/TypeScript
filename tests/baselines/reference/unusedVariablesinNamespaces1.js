//// [tests/cases/compiler/unusedVariablesinNamespaces1.ts] ////

//// [unusedVariablesinNamespaces1.ts]
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
}

//// [unusedVariablesinNamespaces1.js]
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
})(Validation || (Validation = {}));
