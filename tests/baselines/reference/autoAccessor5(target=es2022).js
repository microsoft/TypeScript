//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor5.ts] ////

//// [autoAccessor5.ts]
class C1 {
    accessor ["w"]: any;
    accessor ["x"] = 1;
    static accessor ["y"]: any;
    static accessor ["z"] = 2;
}

declare var f: any;
class C2 {
    accessor [f()] = 1;
}

//// [autoAccessor5.js]
var _a;
class C1 {
    #_a_accessor_storage;
    get ["w"]() { return this.#_a_accessor_storage; }
    set ["w"](value) { this.#_a_accessor_storage = value; }
    #_b_accessor_storage = 1;
    get ["x"]() { return this.#_b_accessor_storage; }
    set ["x"](value) { this.#_b_accessor_storage = value; }
    static #_c_accessor_storage;
    static get ["y"]() { return C1.#_c_accessor_storage; }
    static set ["y"](value) { C1.#_c_accessor_storage = value; }
    static #_d_accessor_storage = 2;
    static get ["z"]() { return C1.#_d_accessor_storage; }
    static set ["z"](value) { C1.#_d_accessor_storage = value; }
}
class C2 {
    #_a_accessor_storage = 1;
    get [_a = f()]() { return this.#_a_accessor_storage; }
    set [_a](value) { this.#_a_accessor_storage = value; }
}
