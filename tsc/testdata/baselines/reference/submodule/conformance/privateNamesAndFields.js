//// [tests/cases/conformance/classes/members/privateNames/privateNamesAndFields.ts] ////

//// [privateNamesAndFields.ts]
class A {
    #foo: number;
    constructor () {
        this.#foo = 3;
    }
}

class B extends A {
    #foo: string;
    constructor () {
        super();
        this.#foo = "some string";
    }
}


//// [privateNamesAndFields.js]
class A {
    #foo;
    constructor() {
        this.#foo = 3;
    }
}
class B extends A {
    #foo;
    constructor() {
        super();
        this.#foo = "some string";
    }
}
