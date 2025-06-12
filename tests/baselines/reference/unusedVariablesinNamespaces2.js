//// [tests/cases/compiler/unusedVariablesinNamespaces2.ts] ////

//// [unusedVariablesinNamespaces2.ts]
namespace Validation {
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;

    export class LettersOnlyValidator {
        isAcceptable(s2: string) {
            return lettersRegexp.test(s2);
        }
    }
}

//// [unusedVariablesinNamespaces2.js]
var Validation;
(function (Validation) {
    const lettersRegexp = /^[A-Za-z]+$/;
    const numberRegexp = /^[0-9]+$/;
    class LettersOnlyValidator {
        isAcceptable(s2) {
            return lettersRegexp.test(s2);
        }
    }
    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));
