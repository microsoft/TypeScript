//@noUnusedLocals:true
//@noUnusedParameters:true

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