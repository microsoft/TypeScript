//// [privateNameAndIndexSignature.ts]
// @target es6

class A {
    [k: string]: any;
    constructor(message: string) {
        this.#f = 3                 // Error Property '#f' does not exist on type 'A'.
    }
}


//// [privateNameAndIndexSignature.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A(message) {
        this.#f = 3; // Error Property '#f' does not exist on type 'A'.
    }
    return A;
}());
