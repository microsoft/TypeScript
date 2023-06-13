//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor7.ts] ////

//// [autoAccessor7.ts]
abstract class C1 {
    abstract accessor a: any;
}

class C2 extends C1 {
    accessor a = 1;
}

class C3 extends C1 {
    get a() { return 1; }
}


//// [autoAccessor7.js]
class C1 {
}
class C2 extends C1 {
    accessor a = 1;
}
class C3 extends C1 {
    get a() { return 1; }
}
