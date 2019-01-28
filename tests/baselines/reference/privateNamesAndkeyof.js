//// [privateNamesAndkeyof.ts]
// @target es6

class A {
    #foo = 3;
    bar = 3;
    baz = 3;
}

type T = keyof A     // should not include '#foo'


tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js(5,14): error TS1011: An element access expression should take an argument.


==== tests/cases/conformance/classes/members/privateNames/privateNamesAndkeyof.js (1 errors) ====
    "use strict";
    // @target es6
    var A = /** @class */ (function () {
        function A() {
            this[] = 3;
                 
!!! error TS1011: An element access expression should take an argument.
            this.bar = 3;
            this.baz = 3;
        }
        return A;
    }());
    