//// [privateNameStaticMethodAssignment.ts]
class A3 {
    static #method() { };
    constructor(a: typeof A3, b: any) {
        A3.#method = () => {} // Error, not writable 
        a.#method = () => { }; // Error, not writable 
        b.#method =  () => { } //Error, not writable 
        ({ x: A3.#method } = { x: () => {}}); //Error, not writable 
        let x = A3.#method;
        b.#method++ //Error, not writable 
    }
}


//// [privateNameStaticMethodAssignment.js]
var __classStaticPrivateReadonly = (this && this.__classStaticPrivateReadonly) || function () {
    throw new TypeError("Private static element is not writable");
};
var __classStaticPrivateMethodGet = (this && this.__classStaticPrivateMethodGet) || function (receiver, classConstructor, fn) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    return fn;
};
var _a, _A3_method;
class A3 {
    constructor(a, b) {
        var _b;
        __classStaticPrivateReadonly(A3, () => { }); // Error, not writable 
        __classStaticPrivateReadonly(// Error, not writable 
        a, () => { }); // Error, not writable 
        __classStaticPrivateReadonly(// Error, not writable 
        b, () => { }); //Error, not writable 
        ({ x: ({ set value(_b) { __classStaticPrivateReadonly(A3, _b); } }).value } = { x: () => { } }); //Error, not writable 
        let x = __classStaticPrivateMethodGet(A3, _a, _A3_method);
        __classStaticPrivateReadonly(_b = b, +__classStaticPrivateMethodGet(_b, _a, _A3_method) + 1); //Error, not writable 
    }
    ;
}
_a = A3, _A3_method = function _A3_method() { };
