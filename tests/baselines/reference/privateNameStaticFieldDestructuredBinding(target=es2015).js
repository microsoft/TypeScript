//// [privateNameStaticFieldDestructuredBinding.ts]
class A {
    static #field = 1;
    otherClass = A;
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    constructor() {
        let y: number;
        ({ x: A.#field, y } = this.testObject());
        ([A.#field, y] = this.testArray());
        ({ a: A.#field, b: [A.#field] } = { a: 1, b: [2] });
        [A.#field, [A.#field]] = [1, [2]];
        ({ a: A.#field = 1, b: [A.#field = 1] } = { b: [] });
        [A.#field = 2] = [];
        [this.otherClass.#field = 2] = [];
    }
    static test(_a: typeof A) {
        [_a.#field] = [2];
    }
}


//// [privateNameStaticFieldDestructuredBinding.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _b, _A_field;
class A {
    constructor() {
        var _c;
        this.otherClass = A;
        let y;
        ({ x: ({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value, y } = this.testObject());
        ([({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value, y] = this.testArray());
        ({ a: ({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value, b: [({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value] } = { a: 1, b: [2] });
        [({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value, [({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value]] = [1, [2]];
        ({ a: ({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value = 1, b: [({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value = 1] } = { b: [] });
        [({ set value(_b) { __classPrivateFieldSet(A, _b, _b, "f", _A_field); } }).value = 2] = [];
        _c = this.otherClass, [({ set value(_b) { __classPrivateFieldSet(_c, _b, _b, "f", _A_field); } }).value = 2] = [];
    }
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    static test(_a) {
        [({ set value(_c) { __classPrivateFieldSet(_a, _b, _c, "f", _A_field); } }).value] = [2];
    }
}
_b = A;
_A_field = { value: 1 };
