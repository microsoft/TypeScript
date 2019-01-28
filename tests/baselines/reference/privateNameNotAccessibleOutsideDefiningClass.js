//// [privateNameNotAccessibleOutsideDefiningClass.ts]
// @target es6

class A {
    #foo: number = 3;
}

new A().#foo = 4;               // Error


//// [privateNameNotAccessibleOutsideDefiningClass.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A() {
        this.#foo = 3;
    }
    return A;
}());
new A().#foo = 4; // Error
