//// [privateNameField.ts]
// @target es6

class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}

tests/cases/conformance/classes/members/privateNames/privateNameField.js(5,15): error TS1003: Identifier expected.


==== tests/cases/conformance/classes/members/privateNames/privateNameField.js (1 errors) ====
    "use strict";
    // @target es6
    var A = /** @class */ (function () {
        function A(name) {
            this. = name;
                  ~
!!! error TS1003: Identifier expected.
        }
        return A;
    }());
    