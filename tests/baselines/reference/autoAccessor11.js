//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor11.ts] ////

//// [autoAccessor11.ts]
class C {
    accessor
    a

    static accessor
    b

    static
    accessor
    c

    accessor accessor
    d;
}


//// [autoAccessor11.js]
class C {
    accessor;
    a;
    static accessor;
    b;
    static accessor;
    c;
    #accessor_accessor_storage;
    get accessor() { return this.#accessor_accessor_storage; }
    set accessor(value) { this.#accessor_accessor_storage = value; }
    d;
}
