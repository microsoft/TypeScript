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
    accessor a;
}
class C2 extends C1 {
    constructor() {
        super(...arguments);
        this.a = 1;
    }
}
class C3 extends C1 {
    get a() { return super.a; }
}
