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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _method;
class A3 {
    constructor(a, b) {
        var _a, _b;
        __classPrivateFieldSet(this, _method, () => { }); // Error, not writable 
        __classPrivateFieldSet(// Error, not writable 
        a, _method, () => { }); // Error, not writable 
        __classPrivateFieldSet(// Error, not writable 
        b, _method, () => { }); //Error, not writable 
        (_a = this, { x: ({ set value(_b) { __classPrivateFieldSet(_a, _method, _b); } }).value } = { x: () => { } }); //Error, not writable 
        let x = __classPrivateFieldGet(this, _method);
        __classPrivateFieldSet(_b = b, _method, +__classPrivateFieldGet(_b, _method) + 1); //Error, not writable 
    }
    () { }
    ;
}
_method = new WeakMap();
