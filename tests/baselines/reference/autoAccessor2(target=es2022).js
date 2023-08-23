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
    #a_accessor_storage;
    get #a() { return this.#a_accessor_storage; }
    set #a(value) { this.#a_accessor_storage = value; }
    #b_accessor_storage = 1;
    get #b() { return this.#b_accessor_storage; }
    set #b(value) { this.#b_accessor_storage = value; }
    static #c_accessor_storage;
    static get #c() { return C1.#c_accessor_storage; }
    static set #c(value) { C1.#c_accessor_storage = value; }
    static #d_accessor_storage = 2;
    static get #d() { return C1.#d_accessor_storage; }
    static set #d(value) { C1.#d_accessor_storage = value; }
    constructor() {
        this.#a = 3;
        this.#b = 4;
    }
    static {
        this.#c = 5;
        this.#d = 6;
    }
}
