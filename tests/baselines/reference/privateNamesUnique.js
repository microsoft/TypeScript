//// [privateNamesUnique.ts]
// @target es6

class A {
    #foo: number;
}

class B {
    #foo: number;
}

const b: A = new B();     // Error: Property #foo is missing


//// [privateNamesUnique.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var b = new B(); // Error: Property #foo is missing
