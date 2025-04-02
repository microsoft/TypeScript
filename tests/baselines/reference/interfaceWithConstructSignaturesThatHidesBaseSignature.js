//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithConstructSignaturesThatHidesBaseSignature.ts] ////

//// [interfaceWithConstructSignaturesThatHidesBaseSignature.ts]
interface Foo {
    new (): { a: number };
}

interface Derived extends Foo {
    new (): { a: number; b: number };
}

var d: Derived;
var r = new d();

//// [interfaceWithConstructSignaturesThatHidesBaseSignature.js]
var d;
var r = new d();
