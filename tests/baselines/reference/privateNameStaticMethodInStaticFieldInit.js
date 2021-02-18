//// [privateNameStaticMethodInStaticFieldInit.ts]
class C {
    static s = C.#method();
    static #method() { return 42; }
}

console.log(C.s);


//// [privateNameStaticMethodInStaticFieldInit.js]
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _C_method;
class C {
}
_C_method = function _C_method() { return 42; };
C.s = __classStaticPrivateMethodGet(C, C, _C_method).call(C);
console.log(C.s);
