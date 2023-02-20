//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessorNoUseDefineForClassFields.ts] ////

//// [file1.ts]
// https://github.com/microsoft/TypeScript/issues/51528
class C1 {
    static accessor x = 0;
}

//// [file2.ts]
class C2 {
    static accessor #x = 0;
}

//// [file3.ts]
class C3 {
    static accessor #x = 0;
    accessor #y = 0;
}

//// [file3.ts]
class C3 {
    accessor x = 0;
}

//// [file4.ts]
class C4 {
    accessor #x = 0;
}

//// [file5.ts]
class C5 {
    x = 0;
    accessor #x = 1;
}

//// [file6.ts]
class C6 {
    accessor #x = 0;
    x = 1;
}


//// [file1.js]
// https://github.com/microsoft/TypeScript/issues/51528
class C1 {
    static accessor x = 0;
}
//// [file2.js]
class C2 {
    static accessor #x = 0;
}
//// [file3.js]
class C3 {
    accessor x = 0;
}
//// [file4.js]
class C4 {
    accessor #x = 0;
}
//// [file5.js]
class C5 {
    constructor() {
        this.x = 0;
        this.#x_accessor_storage = 1;
    }
    #x_accessor_storage;
    get #x() { return this.#x_accessor_storage; }
    set #x(value) { this.#x_accessor_storage = value; }
}
//// [file6.js]
class C6 {
    constructor() {
        this.#x_accessor_storage = 0;
        this.x = 1;
    }
    #x_accessor_storage;
    get #x() { return this.#x_accessor_storage; }
    set #x(value) { this.#x_accessor_storage = value; }
}
