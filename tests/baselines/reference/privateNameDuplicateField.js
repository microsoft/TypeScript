//// [privateNameDuplicateField.ts]
// @target es6

class A {
    #foo = "foo";
    #foo = "foo";
}


//// [privateNameDuplicateField.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A() {
        this.#foo = "foo";
        this.#foo = "foo";
    }
    return A;
}());
