//// [privateNameConstructorReserved.ts]
// @target es6

class A {
    #constructor() {}      // Error: `#constructor` is a reserved word.
}


//// [privateNameConstructorReserved.js]
// @target es6
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.#constructor = function () { }; // Error: `#constructor` is a reserved word.
    return A;
}());
