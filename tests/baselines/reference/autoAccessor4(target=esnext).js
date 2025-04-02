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
    accessor 0;
    accessor 1 = 1;
    static accessor 2;
    static accessor 3 = 2;
}
