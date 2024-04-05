//// [tests/cases/conformance/classes/propertyMemberDeclarations/autoAccessor3.ts] ////

//// [autoAccessor3.ts]
class C1 {
    accessor "w": any;
    accessor "x" = 1;
    static accessor "y": any;
    static accessor "z" = 2;
}


//// [autoAccessor3.js]
class C1 {
    accessor "w";
    accessor "x" = 1;
    static accessor "y";
    static accessor "z" = 2;
}
