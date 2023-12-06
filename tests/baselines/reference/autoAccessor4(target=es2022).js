//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor4.ts] ////

//// [autoAccessor4.ts]
class C1 {
    accessor 0: any;
    accessor 1 = 1;
    static accessor 2: any;
    static accessor 3 = 2;
}


//// [autoAccessor4.js]
class C1 {
    #_a_accessor_storage;
    get 0() { return this.#_a_accessor_storage; }
    set 0(value) { this.#_a_accessor_storage = value; }
    #_b_accessor_storage = 1;
    get 1() { return this.#_b_accessor_storage; }
    set 1(value) { this.#_b_accessor_storage = value; }
    static #_c_accessor_storage;
    static get 2() { return C1.#_c_accessor_storage; }
    static set 2(value) { C1.#_c_accessor_storage = value; }
    static #_d_accessor_storage = 2;
    static get 3() { return C1.#_d_accessor_storage; }
    static set 3(value) { C1.#_d_accessor_storage = value; }
}
