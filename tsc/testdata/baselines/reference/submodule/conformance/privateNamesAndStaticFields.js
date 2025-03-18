//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndStaticFields.ts] ////

//// [privateNamesAndStaticFields.ts]
class A {
    static #foo: number;
    static #bar: number;
    constructor () {
        A.#foo = 3;
        B.#foo; // Error
        B.#bar; // Error
    }
}

class B extends A {
    static #foo: string;
    constructor () {
        super();
        B.#foo = "some string";
    }
}

// We currently filter out static private identifier fields in `getUnmatchedProperties`.
// We will need a more robust solution when we support static fields
const willErrorSomeDay: typeof A = class {}; // OK for now


//// [privateNamesAndStaticFields.js]
class A {
    static #foo;
    static #bar;
    constructor() {
        A.#foo = 3;
        B.#foo;
        B.#bar;
    }
}
class B extends A {
    static #foo;
    constructor() {
        super();
        B.#foo = "some string";
    }
}
const willErrorSomeDay = class {
};
