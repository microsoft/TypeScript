//// [privateNameMethodAssignment.ts]
class A3 {
    #method() { };
    constructor(a: A3, b: any) {
        this.#method = () => {} // Error, not writable 
        a.#method = () => { }; // Error, not writable 
        b.#method =  () => { } //Error, not writable 
        ({ x: this.#method } = { x: () => {}}); //Error, not writable 
        let x = this.#method;
        b.#method++ //Error, not writable 
    }
}


//// [privateNameMethodAssignment.js]
var __classPrivateReadonly = (this && this.__classPrivateReadonly) || function () {
    throw new TypeError("private element is not writable");
};
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, accessCheck, fn) {
    if (!accessCheck.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _method, _method_1;
class A3 {
    constructor(a, b) {
        var _a, _b;
        _method.add(this);
        __classPrivateReadonly(); // Error, not writable 
        __classPrivateReadonly(); // Error, not writable 
        __classPrivateReadonly(); //Error, not writable 
        (_a = this, { x: ({ set value(_b) { __classPrivateReadonly(); } }).value } = { x: () => { } }); //Error, not writable 
        let x = __classPrivateMethodGet(this, _method, _method_1);
        __classPrivateReadonly(); //Error, not writable 
    }
    ;
}
_method = new WeakSet(), _method_1 = function _method_1() { };
