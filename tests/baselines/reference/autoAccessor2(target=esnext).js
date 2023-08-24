//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor2.ts] ////

//// [autoAccessor2.ts]
class C1 {
    accessor #a: any;
    accessor #b = 1;
    static accessor #c: any;
    static accessor #d = 2;

    constructor() {
        this.#a = 3;
        this.#b = 4;
    }

    static {
        this.#c = 5;
        this.#d = 6;
    }
}


//// [autoAccessor2.js]
class C1 {
    accessor #a;
    accessor #b = 1;
    static accessor #c;
    static accessor #d = 2;
    constructor() {
        this.#a = 3;
        this.#b = 4;
    }
    static {
        this.#c = 5;
        this.#d = 6;
    }
}
