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
