//// [privateNameField.ts]
// @target es6

class A {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
}

//// [privateNameField.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A(name) {
        this.#name = name;
    }
    return A;
}());
