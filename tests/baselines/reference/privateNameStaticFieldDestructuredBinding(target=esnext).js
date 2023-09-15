//// [tests/cases/conformance/classes/members/privateNames/privateNameStaticFieldDestructuredBinding.ts] ////

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
class A {
    static #field = 1;
    testObject() {
        return { x: 10, y: 6 };
    }
    testArray() {
        return [10, 11];
    }
    constructor() {
        this.otherClass = A;
        let y;
        ({ x: A.#field, y } = this.testObject());
        ([A.#field, y] = this.testArray());
        ({ a: A.#field, b: [A.#field] } = { a: 1, b: [2] });
        [A.#field, [A.#field]] = [1, [2]];
        ({ a: A.#field = 1, b: [A.#field = 1] } = { b: [] });
        [A.#field = 2] = [];
        [this.otherClass.#field = 2] = [];
    }
    static test(_a) {
        [_a.#field] = [2];
    }
}
