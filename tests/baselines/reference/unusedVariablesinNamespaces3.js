//// [tests/cases/compiler/unusedVariablesinNamespaces3.ts] ////

//// [unusedVariablesinNamespaces3.ts]
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export const anotherUnusedVariable = "Dummy value";

    export class LettersOnlyValidator {
        isAcceptable(s2: string) {
            return lettersRegexp.test(s2);
        }
    }
}

//// [unusedVariablesinNamespaces3.js]
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    Validation.anotherUnusedVariable = "Dummy value";
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s2) {
            return lettersRegexp.test(s2);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));
