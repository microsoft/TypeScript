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
var _A_field;
class A {
    constructor() {
        var _b;
        this.otherClass = A;
        let y;
        ({ x: ({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value, y } = this.testObject());
        ([({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value, y] = this.testArray());
        ({ a: ({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value, b: [({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value] } = { a: 1, b: [2] });
        [({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value, [({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value]] = [1, [2]];
        ({ a: ({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value = 1, b: [({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value = 1] } = { b: [] });
        [({ set value(_c) { __classStaticPrivateFieldSet(A, A, _A_field, _c); } }).value = 2] = [];
        _b = this.otherClass, [({ set value(_c) { __classStaticPrivateFieldSet(_b, A, _A_field, _c); } }).value = 2] = [];
    }
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    static test(_a) {
        [({ set value(_b) { __classStaticPrivateFieldSet(_a, A, _A_field, _b); } }).value] = [2];
    }
}
_A_field = { value: 1 };
