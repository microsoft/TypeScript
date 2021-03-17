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
var __classStaticPrivateFieldSet = (this && this.__classStaticPrivateFieldSet) || function (receiver, classConstructor, propertyDescriptor, value) {
    if (receiver !== classConstructor) {
        throw new TypeError("Private static access of wrong provenance");
    }
    if (propertyDescriptor === undefined) {
        throw new TypeError("Private static field was accessed before its declaration.");
    }
    propertyDescriptor.value = value;
    return value;
};
var _b, _A_field;
class A {
    constructor() {
        var _c;
        this.otherClass = A;
        let y;
        ({ x: ({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value, y } = this.testObject());
        ([({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value, y] = this.testArray());
        ({ a: ({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value, b: [({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value] } = { a: 1, b: [2] });
        [({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value, [({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value]] = [1, [2]];
        ({ a: ({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value = 1, b: [({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value = 1] } = { b: [] });
        [({ set value(_b) { __classStaticPrivateFieldSet(A, _b, _A_field, _b); } }).value = 2] = [];
        _c = this.otherClass, [({ set value(_b) { __classStaticPrivateFieldSet(_c, _b, _A_field, _b); } }).value = 2] = [];
    }
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    static test(_a) {
        [({ set value(_c) { __classStaticPrivateFieldSet(_a, _b, _A_field, _c); } }).value] = [2];
    }
}
_b = A;
_A_field = { value: 1 };
