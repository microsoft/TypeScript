//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor6.ts] ////

//// [autoAccessor6.ts]
class C1 {
    accessor a: any;
}

class C2 extends C1 {
    a = 1;
}

class C3 extends C1 {
    get a() { return super.a; }
}


//// [autoAccessor6.js]
class C1 {
    #a_accessor_storage;
    get a() { return this.#a_accessor_storage; }
    set a(value) { this.#a_accessor_storage = value; }
}
class C2 extends C1 {
    a = 1;
}
class C3 extends C1 {
    get a() { return super.a; }
}
