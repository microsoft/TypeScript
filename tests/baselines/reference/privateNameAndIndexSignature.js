//// [privateNameAndIndexSignature.ts]
// @target es6

class A {
    [k: string]: any;
    constructor(message: string) {
        this.#f = 3                 // Error Property '#f' does not exist on type 'A'.
    }
}


tests/cases/conformance/classes/members/privateNames/privateNameAndIndexSignature.js(5,15): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNameAndIndexSignature.js (1 errors) ====
    "use strict";
    // @target es6
    var A = /** @class */ (function () {
        function A(message) {
            this. = 3; // Error Property '#f' does not exist on type 'A'.
                  ~
!!! error TS1003: Identifier expected.
        }
        return A;
    }());
    