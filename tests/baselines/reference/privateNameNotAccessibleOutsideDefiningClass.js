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
        this[] = 3;
    }
    return A;
}());
new A(). = 4; // Error
