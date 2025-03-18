//// [tests/cases/conformance/classes/propertyMemberDeclarations/staticAutoAccessorsWithDecorators.ts] ////

//// [staticAutoAccessorsWithDecorators.ts]
// https://github.com/microsoft/TypeScript/issues/53752

class A {
    // uses class reference
    @((t, c) => {})
    static accessor x = 1;

    // uses 'this'
    @((t, c) => {})
    accessor y = 2;
}


//// [staticAutoAccessorsWithDecorators.js]
class A {
    @((t, c) => { })
    static accessor x = 1;
    @((t, c) => { })
    accessor y = 2;
}
