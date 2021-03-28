//// [privateNameStaticFieldAccess.ts]
class A {
    static #myField = "hello world";
    constructor() {
        console.log(A.#myField); //Ok
        console.log(this.#myField); //Error
    }
}


//// [privateNameStaticFieldAccess.js]
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_myField;
class A {
    constructor() {
        console.log(__classPrivateFieldGet(A, _a, "f", _A_myField)); //Ok
        console.log(__classPrivateFieldGet(this, _a, "f", _A_myField)); //Error
    }
}
_a = A;
_A_myField = { value: "hello world" };
