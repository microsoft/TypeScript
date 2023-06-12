//// [tests/cases/conformance/classes/members/privateNames/privateNameFieldDestructuredBinding.ts] ////

//// [privateNameFieldDestructuredBinding.ts]
class A {
    #field = 1;
    otherObject = new A();
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    constructor() {
        let y: number;
        ({ x: this.#field, y } = this.testObject());
        ([this.#field, y] = this.testArray());
        ({ a: this.#field, b: [this.#field] } = { a: 1, b: [2] });
        [this.#field, [this.#field]] = [1, [2]];
        ({ a: this.#field = 1, b: [this.#field = 1] } = { b: [] });
        [this.#field = 2] = [];
        [this.otherObject.#field = 2] = [];
    }
    static test(_a: A) {
        [_a.#field] = [2];
    }
}


//// [privateNameFieldDestructuredBinding.js]
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _A_field;
class A {
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    constructor() {
        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        _A_field.set(this, 1);
        this.otherObject = new A();
        let y;
        (_b = this, { x: ({ set value(_m) { __classPrivateFieldSet(_b, _A_field, _m, "f"); } }).value, y } = this.testObject());
        (_c = this, [({ set value(_m) { __classPrivateFieldSet(_c, _A_field, _m, "f"); } }).value, y] = this.testArray());
        (_d = this, _e = this, { a: ({ set value(_m) { __classPrivateFieldSet(_d, _A_field, _m, "f"); } }).value, b: [({ set value(_m) { __classPrivateFieldSet(_e, _A_field, _m, "f"); } }).value] } = { a: 1, b: [2] });
        _f = this, _g = this, [({ set value(_m) { __classPrivateFieldSet(_f, _A_field, _m, "f"); } }).value, [({ set value(_m) { __classPrivateFieldSet(_g, _A_field, _m, "f"); } }).value]] = [1, [2]];
        (_h = this, _j = this, { a: ({ set value(_m) { __classPrivateFieldSet(_h, _A_field, _m, "f"); } }).value = 1, b: [({ set value(_m) { __classPrivateFieldSet(_j, _A_field, _m, "f"); } }).value = 1] } = { b: [] });
        _k = this, [({ set value(_m) { __classPrivateFieldSet(_k, _A_field, _m, "f"); } }).value = 2] = [];
        _l = this.otherObject, [({ set value(_m) { __classPrivateFieldSet(_l, _A_field, _m, "f"); } }).value = 2] = [];
    }
    static test(_a) {
        [({ set value(_b) { __classPrivateFieldSet(_a, _A_field, _b, "f"); } }).value] = [2];
    }
}
_A_field = new WeakMap();
