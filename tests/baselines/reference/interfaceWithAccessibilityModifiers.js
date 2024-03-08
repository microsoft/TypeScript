//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithAccessibilityModifiers.ts] ////

//// [interfaceWithAccessibilityModifiers.ts]
// Errors
interface Foo {
    public a: any;
    private b: any;
    protected c: any;
}

//// [interfaceWithAccessibilityModifiers.js]
