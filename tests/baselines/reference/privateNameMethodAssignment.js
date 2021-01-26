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
var __classPrivateMethodGet = (this && this.__classPrivateMethodGet) || function (receiver, instances, fn) {
    if (!instances.has(receiver)) {
        throw new TypeError("attempted to get private method on non-instance");
    }
    return fn;
};
var _A3_method, _A3_instances;
class A3 {
    constructor(a, b) {
        var _a, _b;
        _A3_instances.add(this);
        __classPrivateReadonly(this, () => { }); // Error, not writable 
        __classPrivateReadonly(// Error, not writable 
        a, () => { }); // Error, not writable 
        __classPrivateReadonly(// Error, not writable 
        b, () => { }); //Error, not writable 
        (_a = this, { x: ({ set value(_b) { __classPrivateReadonly(_a, _b); } }).value } = { x: () => { } }); //Error, not writable 
        let x = __classPrivateMethodGet(this, _A3_instances, _A3_method);
        __classPrivateReadonly(_b = b, +__classPrivateMethodGet(_b, _A3_instances, _A3_method) + 1); //Error, not writable 
    }
    ;
}
_A3_instances = new WeakSet(), _A3_method = function _A3_method() { };
