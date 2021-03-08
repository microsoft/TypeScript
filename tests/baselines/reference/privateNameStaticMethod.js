//// [privateNameStaticMethod.ts]
class A1 {
    static #method(param: string): string {
        return "";
    }
    constructor() {
        A1.#method("")
        A1.#method(1) // Error
        A1.#method()  // Error 

    }
}


//// [privateNameStaticMethod.js]
"use strict";
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _a, _A1_method;
class A1 {
    constructor() {
        __classStaticPrivateMethodGet(A1, _a, _A1_method).call(A1, "");
        __classStaticPrivateMethodGet(A1, _a, _A1_method).call(A1, 1); // Error
        __classStaticPrivateMethodGet(A1, _a, _A1_method).call(// Error
        A1); // Error 
    }
}
_a = A1, _A1_method = function _A1_method(param) {
    return "";
};
