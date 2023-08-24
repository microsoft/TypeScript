//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor10.ts] ////

//// [autoAccessor10.ts]
class C1 {
    accessor a0 = 1;
}

class C2 {
    #a1_accessor_storage = 1;
    accessor a1 = 2;
}

class C3 {
    static #a2_accessor_storage = 1;
    static {
        class C3_Inner {
            accessor a2 = 2;
            static {
                #a2_accessor_storage in C3;
            }
        }
    }
}

class C4_1 {
    static accessor a3 = 1;
}

class C4_2 {
    static accessor a3 = 1;
}

//// [autoAccessor10.js]
class C1 {
    #a0_accessor_storage = 1;
    get a0() { return this.#a0_accessor_storage; }
    set a0(value) { this.#a0_accessor_storage = value; }
}
class C2 {
    #a1_accessor_storage = 1;
    #a1_1_accessor_storage = 2;
    get a1() { return this.#a1_1_accessor_storage; }
    set a1(value) { this.#a1_1_accessor_storage = value; }
}
class C3 {
    static #a2_accessor_storage = 1;
    static {
        class C3_Inner {
            #a2_1_accessor_storage = 2;
            get a2() { return this.#a2_1_accessor_storage; }
            set a2(value) { this.#a2_1_accessor_storage = value; }
            static {
                #a2_accessor_storage in C3;
            }
        }
    }
}
class C4_1 {
    static #a3_accessor_storage = 1;
    static get a3() { return C4_1.#a3_accessor_storage; }
    static set a3(value) { C4_1.#a3_accessor_storage = value; }
}
class C4_2 {
    static #a3_accessor_storage = 1;
    static get a3() { return C4_2.#a3_accessor_storage; }
    static set a3(value) { C4_2.#a3_accessor_storage = value; }
}
