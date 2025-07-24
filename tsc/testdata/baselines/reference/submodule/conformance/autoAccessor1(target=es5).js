//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor1.ts] ////

//// [autoAccessor1.ts]
class C1 {
    accessor a: any;
    accessor b = 1;
    static accessor c: any;
    static accessor d = 2;
}




!!!! File autoAccessor1.js missing from original emit, but present in noCheck emit
//// [autoAccessor1.js]
class C1 {
    accessor a;
    accessor b = 1;
    static accessor c;
    static accessor d = 2;
}
