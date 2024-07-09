//// [tests/cases/conformance/interfaces/interfaceDeclarations/interfaceWithCallSignaturesThatHidesBaseSignature2.ts] ////

//// [interfaceWithCallSignaturesThatHidesBaseSignature2.ts]
interface Foo {
    (): { a: number; b: number };
}

interface Derived extends Foo { // error
    (): { a: number };
}

var d: Derived;
var r = d();

//// [interfaceWithCallSignaturesThatHidesBaseSignature2.js]
var d;
var r = d();
