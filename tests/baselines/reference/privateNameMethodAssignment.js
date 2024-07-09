//// [tests/cases/conformance/classes/members/privateNames/privateNameMethodAssignment.ts] ////

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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A3_instances, _A3_method;
class A3 {
    ;
    constructor(a, b) {
        var _a, _b, _c;
        _A3_instances.add(this);
        __classPrivateFieldSet(this, _A3_instances, () => { }, "m"); // Error, not writable 
        __classPrivateFieldSet(a, _A3_instances, () => { }, "m"); // Error, not writable 
        __classPrivateFieldSet(b, _A3_instances, () => { }, "m"); //Error, not writable 
        (_a = this, { x: ({ set value(_b) { __classPrivateFieldSet(_a, _A3_instances, _b, "m"); } }).value } = { x: () => { } }); //Error, not writable 
        let x = __classPrivateFieldGet(this, _A3_instances, "m", _A3_method);
        __classPrivateFieldSet(_b = b, _A3_instances, (_c = __classPrivateFieldGet(_b, _A3_instances, "m", _A3_method), _c++, _c), "m"); //Error, not writable 
    }
}
_A3_instances = new WeakSet(), _A3_method = function _A3_method() { };
