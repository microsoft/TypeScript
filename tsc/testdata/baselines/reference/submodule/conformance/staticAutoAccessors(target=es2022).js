//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAutoAccessors.ts] ////

//// [staticAutoAccessors.ts]
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    static accessor x = 1;

    // uses 'this'
    accessor y = 2;
}



//// [staticAutoAccessors.js]
// https://github.com/microsoft/TypeScript/issues/53752
class A {
    // uses class reference
    static accessor x = 1;
    // uses 'this'
    accessor y = 2;
}
